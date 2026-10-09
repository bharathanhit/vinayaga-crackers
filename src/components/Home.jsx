import React, { useEffect } from 'react';
import Hero from './Hero';
import TrustBar from './TrustBar';
import PromoBanners from './PromoBanners';
import Products from './Products';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home = () => {
    useEffect(() => {
        document.title = "Vinayaga Crackers Sivakasi | வானத்தை நிறைக்கும் வண்ணங்கள்! • Direct Wholesale Diwali Crackers";
    }, []);
    return (
        <main>
            <Hero />
            <TrustBar />
            <PromoBanners />
            <Products />
            <About />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
        </main>
    );
};

export default Home;
