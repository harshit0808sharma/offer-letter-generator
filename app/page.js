import CTASection from "./components/Home/CTA";
import FaqSection from "./components/Home/Faqs";
import FeatureSection from "./components/Home/Features";
import Hero from "./components/Home/Hero";
import HowItWorks from "./components/Home/HowItWorks";
import StatsSection from "./components/Home/Stats";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

export default function Home() {
  // throw new Error("This is a test error for the error page!");
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <Header/>
      <Hero/>
      <HowItWorks/>
      <FeatureSection/>
      <FaqSection/>
      <StatsSection/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
