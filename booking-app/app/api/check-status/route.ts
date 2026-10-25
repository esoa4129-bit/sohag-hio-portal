import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(targetUrl, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) HIO-HealthCheck/1.0",
      },
      cache: "no-store",
    }).catch(async () => {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 3500);
      const getRes = await fetch(targetUrl, {
        method: "GET",
        signal: getController.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) HIO-HealthCheck/1.0",
        },
        cache: "no-store",
      });
      clearTimeout(getTimeout);
      return getRes;
    });

    clearTimeout(timeoutId);
    const latency = Date.now() - startTime;

    if (res && res.status) {
      return NextResponse.json({
        online: true,
        status: res.status,
        latency,
      });
    }

    return NextResponse.json({ online: false, latency });
  } catch {
    return NextResponse.json({ online: false, latency: Date.now() - startTime });
  }
}
