import type { Metadata } from "next";

import { Categories } from "@/components/categories/Categories";
import { Community } from "@/components/community/Community";
import { Contact } from "@/components/contact/Contact";
import { FeaturedCourse } from "@/components/featured-course/FeaturedCourse";
import { FinalCta } from "@/components/final-cta/FinalCta";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Testimonial } from "@/components/testimonial/Testimonial";
import { serializeJsonLd, siteJsonLd } from "@/lib/structured-data";

// Set here, not in the layout, so the 404 page has no canonical to home.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Categories />
        <FeaturedCourse />
        <HowItWorks />
        <Testimonial />
        <Community />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
