import { describe, expect, it } from "vitest";

import { serializeJsonLd, siteJsonLd } from "./structured-data";

describe("serializeJsonLd", () => {
  it("escapes < so the data cannot close the script tag", () => {
    const json = serializeJsonLd({ name: "</script><script>alert(1)" });

    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ name: "</script><script>alert(1)" });
  });

  it("serializes the site graph as valid JSON", () => {
    expect(JSON.parse(serializeJsonLd(siteJsonLd))).toEqual(siteJsonLd);
  });
});
