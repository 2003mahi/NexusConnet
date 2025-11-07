
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './landing/Hero';
import Features from './landing/Features';
import Pricing from './landing/Pricing';
import Testimonials from './landing/Testimonials';
import FAQ from './landing/FAQ';

const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
