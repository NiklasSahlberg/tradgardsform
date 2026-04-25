import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import USP from "@/components/USP";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import CTABanner from "@/components/CTABanner";

const Reviews = dynamic(() => import("@/components/Reviews"), {
  loading: () => (
    <section
      className="bg-forest py-8 md:py-10 px-6 min-h-[28rem]"
      aria-busy="true"
      aria-label="Laddar kundomdömen"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 pt-8">
        <div className="h-8 w-56 rounded-full bg-white/10 animate-pulse" />
        <div className="h-12 w-72 max-w-full rounded-lg bg-white/10 animate-pulse" />
      </div>
    </section>
  ),
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => (
    <section
      className="bg-cream py-24 px-6 min-h-[32rem]"
      aria-busy="true"
      aria-label="Laddar frågor och svar"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 pt-8">
        <div className="h-8 w-48 rounded-full bg-sand animate-pulse" />
        <div className="h-14 w-64 max-w-full rounded-lg bg-sand animate-pulse" />
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <>
      <Hero />
      <USP />
      <About />
      <Projects />
      <Process />
      <Services />
      <Reviews />
      <FAQ />
      <CTABanner />
    </>
  );
}
