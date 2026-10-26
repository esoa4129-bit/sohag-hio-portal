import { NextRequest, NextResponse } from "next/server";

// Cache at edge for 5 minutes (300 seconds) to avoid redundant Serverless Invocations
export const revalidate = 300;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const startTime = Date.now();
  const isDirectIp = /https?:\/\/(196\.219|41\.33|81\.21|10\.|192\.168)/i.test(targetUrl);

  const cacheHeaders = {
    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(targetUrl, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) HIO-HealthCheck/1.0",
      },
      cache: "no-store",
    }).catch(async () => {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 3000);
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
      return NextResponse.json(
        {
          online: true,
          status: res.status,
          latency,
          isDirectIp,
        },
        { headers: cacheHeaders }
      );
    }

    return NextResponse.json(
      {
        online: false,
        isDirectIp,
        message: isDirectIp ? "سيرفر داخلي يتطلب شبكة التأمين" : "السيرفر لا يستجيب حالياً",
      },
      { headers: cacheHeaders }
    );
  } catch {
    const latency = Date.now() - startTime;
    return NextResponse.json(
      {
        online: false,
        isDirectIp,
        latency,
        message: isDirectIp ? "سيرفر داخلي يتطلب شبكة التأمين" : "غير متاح حالياً",
      },
      { headers: cacheHeaders }
    );
  }
}
