import type { Preview } from "@storybook/nextjs-vite";

import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";

// Same as <html> in the root layout: the font tokens resolve on :root.
document.documentElement.classList.add(
  ...fontVariables.split(" "),
  "antialiased",
);

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    // Figma mobile and desktop frames, plus the tablet width.
    viewport: {
      options: {
        mobile: {
          name: "Mobile (402px)",
          styles: { width: "402px", height: "874px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet (768px)",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop (1280px)",
          styles: { width: "1280px", height: "800px" },
          type: "desktop",
        },
      },
    },
  },
};

export default preview;
