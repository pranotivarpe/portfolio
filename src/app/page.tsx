import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TransitLine from "@/components/TransitLine";
import WorldBackdrop from "@/components/WorldBackdrop";

export default function Home() {
  return (
    <>
      <Navbar />
      <TransitLine />
      <div className="relative flex flex-1 flex-col">
        <WorldBackdrop />
        <main id="main" className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
