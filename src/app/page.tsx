import { Categories } from "@/components/categories/Categories";
import { Community } from "@/components/community/Community";
import { Contact } from "@/components/contact/Contact";
import { FeaturedCourse } from "@/components/featured-course/FeaturedCourse";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { Testimonial } from "@/components/testimonial/Testimonial";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Categories />
        <FeaturedCourse />
        <HowItWorks />
        <Testimonial />
        <Community />
        <Contact />
      </main>
    </>
  );
}
