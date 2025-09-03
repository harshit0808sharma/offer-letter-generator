import Hero from "./components/Home/Hero";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  );
}
