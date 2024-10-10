import { FaqGrid } from "@/components/FaqGrid";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <FaqGrid />
      <Footer/>
    </>
  );
}
