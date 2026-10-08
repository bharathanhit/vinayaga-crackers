import React, { useEffect } from 'react';
import Hero from './Hero';
import Products from './Products';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home = () => {
    useEffect(() => {
        document.title = "Vinayaga Crackers Sivakasi | Direct Factory Wholesale Diwali Crackers & Fireworks";
    }, []);
    return (
        <main>
            <Hero />
            <Products />
            <About />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
        </main>
    );
};

export default Home;
