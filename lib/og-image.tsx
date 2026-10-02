import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Shared Open Graph / Twitter card renderer: page title on a brand gradient
 * with the clinic logo, matching the site's plum and coral palette.
 * Used by the route-level `opengraph-image.tsx` files.
 */

const logo = `data:image/png;base64,${readFileSync(
  path.join(process.cwd(), "public/images/brand/niramay-logo.png")
).toString("base64")}`;

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogImage(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #faf6f9 0%, #f3ecf2 45%, #fdf3ee 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -140,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(242,149,122,.4), transparent)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -100,
            bottom: -160,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(142,90,131,.22), transparent)",
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} height={84} style={{ objectFit: "contain" }} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8e5a83",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: title.length > 60 ? 52 : 64,
              lineHeight: 1.08,
              fontWeight: 700,
              color: "#2a2440",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: "#5a5468" }}>
            Niramay Clinics, Dhantoli, Nagpur
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
