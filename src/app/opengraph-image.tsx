import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { Logo } from "@/components/ui/Logo";
import { heroContent } from "@/data/hero";
import { siteConfig } from "@/data/site";

// Generated at build time. Twitter uses the same image (inherited by Next).
export const alt = `${siteConfig.name}: ${heroContent.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colors from the @theme tokens in globals.css (Satori does not read CSS).
const colors = { cream: "#f9f8f3", ink: "#171b2c", primary: "#3157f6" };

// Read once at module level, as in the Next docs example.
const [font, photo] = await Promise.all([
  // Static woff: Satori reads neither woff2 nor variable fonts.
  readFile(
    join(process.cwd(), "src/assets/plus-jakarta-sans-latin-800-normal.woff"),
  ),
  readFile(join(process.cwd(), "public", heroContent.image.src)),
]);
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 72px",
        backgroundColor: colors.cream,
        color: colors.ink,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
        <Logo height={51} />
        <p
          style={{
            marginTop: 64,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            color: colors.primary,
          }}
        >
          {heroContent.eyebrow}
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "Plus Jakarta Sans",
            fontSize: 64,
            lineHeight: "70px",
            letterSpacing: -1.6,
          }}
        >
          {heroContent.title}
        </h1>
      </div>
      <img
        src={photoSrc}
        alt=""
        width={400}
        height={489}
        style={{ borderRadius: 24, objectFit: "cover" }}
      />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: font,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
