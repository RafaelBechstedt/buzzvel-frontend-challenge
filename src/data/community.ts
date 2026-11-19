import type { NavLink } from "./navigation";

/** A value per mosaic geometry: `sm` is the Figma mobile frame, `md` the desktop one (from md). */
export type MosaicValue = { sm: number; md: number };

/** Width and height in Figma px. */
type Size = [width: number, height: number];

export type MosaicPhoto = {
  src: string;
  sm: Size;
  md: Size;
};

export type MosaicColumn = {
  /** `end` right-aligns narrower photos (first column). */
  align: "start" | "end";
  paddingTop: MosaicValue;
  photos: MosaicPhoto[];
};

export type CommunityContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: NavLink;
  mosaic: {
    /** Mosaic width in Figma; every other value is scaled to the rendered width. */
    width: MosaicValue;
    columnGap: MosaicValue;
    rowGap: MosaicValue;
    /** Diameter of the circle behind the photos. */
    circle: MosaicValue;
    columns: MosaicColumn[];
  };
};

const photo = (n: number, sm: Size, md: Size): MosaicPhoto => ({
  src: `/images/community/community-${String(n).padStart(2, "0")}.jpg`,
  sm,
  md,
});

export const communityContent: CommunityContent = {
  eyebrow: "The people",
  title: "Meet international students & teachers",
  // Lorem ipsum as in the design (docs/decisions.md).
  description:
    "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
  // Out of scope, like the course pages (docs/decisions.md).
  cta: { label: "Explore teachers and students", href: "/community" },
  mosaic: {
    width: { sm: 362, md: 520 },
    columnGap: { sm: 12, md: 16 },
    rowGap: { sm: 8, md: 12.84 },
    circle: { sm: 330, md: 500 },
    columns: [
      {
        align: "end",
        paddingTop: { sm: 48, md: 64.2 },
        photos: [
          photo(1, [72, 96], [102.72, 154.08]),
          photo(2, [94, 129], [138.03, 207.05]),
        ],
      },
      {
        align: "start",
        paddingTop: { sm: 0, md: 25.68 },
        photos: [
          photo(3, [72, 106], [102.72, 170.13]),
          photo(4, [72, 107.5], [102.72, 172.54]),
          photo(5, [72, 80], [102.72, 128.4]),
        ],
      },
      {
        align: "start",
        paddingTop: { sm: 0, md: 0 },
        photos: [
          photo(6, [72, 85.5], [102.72, 137.23]),
          photo(7, [72, 86], [102.72, 138.03]),
          photo(8, [72, 96], [102.72, 154.08]),
        ],
      },
      {
        align: "start",
        paddingTop: { sm: 0, md: 0 },
        photos: [
          photo(9, [88, 127.5], [128.4, 204.64]),
          photo(10, [72, 82.5], [102.72, 132.42]),
        ],
      },
    ],
  },
};
