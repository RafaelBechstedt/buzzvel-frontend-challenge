import { Categories } from "@/components/categories/Categories";
import { FeaturedCourse } from "@/components/featured-course/FeaturedCourse";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Categories />
        <FeaturedCourse />
      </main>
    </>
  );
}
