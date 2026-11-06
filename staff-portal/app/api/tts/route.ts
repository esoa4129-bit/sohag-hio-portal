export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

function cleanArabicText(raw: string): string {
  return raw
    .replace(/[*_#`~>\[\]\(\)]/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^\u0600-\u06FF\sa-zA-Z0-9.,!؟]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitIntoChunks(text: string, maxLen = 170): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  const sentences = text.split(/([.،!؟\n]+)/);
  let current = "";

  for (const part of sentences) {
    if ((current + part).length <= maxLen) {
      current += part;
    } else {
      if (current.trim()) chunks.push(current.trim());
      if (part.length <= maxLen) {
        current = part;
      } else {
        const words = part.split(" ");
        current = "";
        for (const w of words) {
          if ((current + " " + w).length <= maxLen) {
            current = current ? current + " " + w : w;
          } else {
            if (current.trim()) chunks.push(current.trim());
            current = w;
          }
        }
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.slice(0, 4); // Limit to 4 chunks (~600 chars) for responsive audio
}

async function fetchAudioChunk(chunk: string): Promise<Buffer | null> {
  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encodeURIComponent(chunk)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      cache: "force-cache"
    });
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.error("TTS fetch chunk error:", err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const clean = cleanArabicText(text);

    if (!clean) {
      return new NextResponse("Text required", { status: 400 });
    }

    const chunks = splitIntoChunks(clean);
    const bufferPromises = chunks.map((c) => fetchAudioChunk(c));
    const buffers = await Promise.all(bufferPromises);

    const validBuffers = buffers.filter((b): b is Buffer => b !== null && b.length > 0);
    if (validBuffers.length === 0) {
      return new NextResponse("Failed to generate audio", { status: 502 });
    }

    const finalBuffer = Buffer.concat(validBuffers);

    return new NextResponse(finalBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": finalBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, s-maxage=86400"
      }
    });
  } catch (err) {
    console.error("TTS route error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
