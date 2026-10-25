import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const startTime = Date.now();
  const isDirectIp = /https?:\/\/(196\.219|41\.33|81\.21|10\.|192\.168)/i.test(targetUrl);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    // Node fetch allows self-signed if rejectedUnauthorized is handled, or simple fetch
    const res = await fetch(targetUrl, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) HIO-HealthCheck/1.0",
      },
      // Next.js cache bypass
      cache: "no-store",
    }).catch(async () => {
      // If HEAD fails, try GET with short abort
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

    // Any HTTP status (200, 301, 302, 401, 403, 500) proves the server is running and reachable
    if (res && res.status) {
      return NextResponse.json({
        online: true,
        status: res.status,
        latency,
        isDirectIp,
      });
    }

    return NextResponse.json({
      online: false,
      isDirectIp,
      message: isDirectIp ? "سيرفر داخلي يتطلب شبكة التأمين" : "السيرفر لا يستجيب حالياً",
    });
  } catch (error: unknown) {
    const latency = Date.now() - startTime;
    return NextResponse.json({
      online: false,
      isDirectIp,
      latency,
      message: isDirectIp ? "سيرفر داخلي يتطلب شبكة التأمين" : "غير متاح حالياً",
    });
  }
}
