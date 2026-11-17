import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Shared by the root layout and Storybook so both expose the same CSS variables.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const fontVariables = `${inter.variable} ${plusJakartaSans.variable}`;
