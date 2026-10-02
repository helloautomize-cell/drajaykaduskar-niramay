import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Pre-launch protection (removed at launch):
 * - SITE_PASSWORD set -> HTTP Basic Auth on every page (user: niramay)
 * - SITE_INDEXABLE !== "true" -> X-Robots-Tag: noindex, nofollow on every response
 * Static assets, images, favicon and icons stay open so styles/fonts work
 * behind the password prompt and social/validity checks still render.
 */
const OPEN_PREFIXES = ["/_next/static", "/_next/image", "/images"];
const OPEN_FILES = ["/favicon.ico", "/icon.png", "/apple-icon.png"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const open =
    OPEN_PREFIXES.some((p) => pathname.startsWith(p)) ||
    OPEN_FILES.includes(pathname);

  if (!open && process.env.SITE_PASSWORD) {
    const header = request.headers.get("authorization") || "";
    const [scheme, encoded] = header.split(" ");
    let ok = false;
    if (scheme === "Basic" && encoded) {
      try {
        const [user, pass] = atob(encoded).split(":");
        ok = user === "niramay" && pass === process.env.SITE_PASSWORD;
      } catch {
        ok = false;
      }
    }
    if (!ok) {
      return new NextResponse("Restricted until launch.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Niramay Clinics", charset="UTF-8"',
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }
  }

  const res = NextResponse.next();
  if (process.env.SITE_INDEXABLE !== "true") {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  // everything except _next internals and files with an extension
  matcher: ["/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)"],
};
