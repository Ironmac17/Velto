import React from "react";
import Navbar from "../../components/Landing/Navbar";
import Hero from "../../components/Landing/Hero";
import Features from "../../components/Landing/Features";
import Testimonial from "../../components/Landing/Testimonial";
import Footer from "../../components/Landing/Footer";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-[#f3f0ff]">
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default LandingPage;
