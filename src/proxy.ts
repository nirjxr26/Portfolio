import { NextRequest, NextResponse } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase().replace(/:\d+$/, "");

  if (host === "nirjar.me") {
    const url = request.nextUrl.clone();
    url.port = "";
    url.protocol = "https:";
    url.hostname = "www.nirjar.me";
    const response = NextResponse.redirect(url, { status: 308 });
    applySecurityHeaders(response);
    response.headers.set("Content-Security-Policy", "default-src 'none'");
    return response;
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/icons/")) {
    const response = NextResponse.next();
    applySecurityHeaders(response);
    response.headers.set("Content-Security-Policy", "sandbox");
    return response;
  }

  // Static pages are pre-rendered at build time without nonce attributes on
  // <script> tags. At runtime Next.js injects framework scripts (hydration,
  // RSC data) as inline scripts that lack both nonces and our pre-computed
  // SHA-256 hashes, so a nonce/hash-based script-src breaks hydration.
  //
  // 'unsafe-inline' is safe here because the site has no user-generated
  // content, no API routes, and no dynamic code execution. The real security
  // value comes from the other directives (object-src, frame-ancestors, etc.).
  // In development, 'unsafe-eval' is also required for Turbopack HMR.
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
  ].join(" ");

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data:",
    "object-src 'none'",
    "media-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  const response = NextResponse.next();
  applySecurityHeaders(response);
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
