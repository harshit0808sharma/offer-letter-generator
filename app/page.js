import CTASection from "./components/Home/CTA";
import FeatureSection from "./components/Home/Features";
import Hero from "./components/Home/Hero";
import HowItWorks from "./components/Home/HowItWorks";
import StatsSection from "./components/Home/Stats";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <Header/>
      <Hero/>
      <HowItWorks/>
      <FeatureSection/>
      <StatsSection/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
