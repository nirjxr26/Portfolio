import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
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

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/icons/")) {
    return NextResponse.next({
      headers: { "Content-Security-Policy": "sandbox" },
    });
  }

  const nonce = crypto.randomUUID().replaceAll("-", "");

  // sha256 hashes of the two inline scripts rendered in src/app/layout.tsx:
  // - application/ld+json (schema.org graph)
  // - document.documentElement.classList.remove("light")
  // If their content changes, recompute the hashes or CSP will block them.
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'sha256-X4xW7arPKv8Fh38P/yz4qzmNCzk+aSFkmnXTICtVywQ='",
    "'sha256-S60uYo2p2s6naeaxsYttb6zaXQ+Zo39ZVPOHcMRjowo='",
    ...(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
  ].join(" ");

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
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
