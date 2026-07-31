import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase().replace(/:\d+$/, "");

  if (host === "nirjar.me") {
    const url = request.nextUrl.clone();
    url.port = "";
    url.protocol = "https:";
    url.hostname = "www.nirjar.me";
    return NextResponse.redirect(url, {
      status: 308,
      headers: {
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
        "Content-Security-Policy": "default-src 'none'",
      },
    });
  }

  const nonce = crypto.randomUUID().replaceAll("-", "");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  return NextResponse.next({
    request: { headers: requestHeaders },
    headers: { "Content-Security-Policy": csp },
  });
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
