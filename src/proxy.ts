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

  // sha256 hashes of the inline scripts rendered outside the nonce:
  // - application/ld+json (schema.org graph) in src/app/layout.tsx
  // - document.documentElement.classList.remove("light") in src/app/layout.tsx
  // - application/ld+json breadcrumbs in works/{bastion,hookdrop,kost}/...Client.tsx
  // - application/ld+json breadcrumb (Home → Works) in src/app/works/WorksClient.tsx
  // If their content changes, recompute the hashes or CSP will block them.
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'sha256-X4xW7arPKv8Fh38P/yz4qzmNCzk+aSFkmnXTICtVywQ='",
    "'sha256-S60uYo2p2s6naeaxsYttb6zaXQ+Zo39ZVPOHcMRjowo='",
    "'sha256-Qvda3G/OZ++W606q9TtuHY796ZT9m76YBja5lSasVI8='",
    "'sha256-wwpqCiegWybWeYCHzVErJoZlTfeOEkXOgpIFiR/D4p8='",
    "'sha256-bSxH7N/x9BdtZ96Qn3/X4th0iZBC0e/faO/lutgxllE='",
    "'sha256-h08GCS8BigBHR1eBdNPnP8ZWgm8bBy44BiEo79AE7Xo='",
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
