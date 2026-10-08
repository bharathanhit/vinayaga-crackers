import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Download, PhoneCall, Award } from 'lucide-react';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';
import skyShotsImg from '../assets/crackers/sky-shots.jpg';
import flowerPotsImg from '../assets/crackers/flower-pots.jpg';

const Hero = () => {
    const images = [
        heroFireworksImg,
        skyShotsImg,
        flowerPotsImg,
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=2000", // Fireworks burst
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-night">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0 bg-black">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={{ opacity: 0.65, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.08 }}
                        transition={{
                            opacity: { duration: 2, ease: "easeInOut" },
                            scale: { duration: 6, ease: [0.33, 1, 0.68, 1] }
                        }}
                        className="absolute inset-0"
                    >
                        <img
                            src={images[currentImage]}
                            alt="Diwali Fireworks Celebration"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center center' }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Dark Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-black/60 z-10" />
            </div>

            <div className="container relative z-20">
                <div className="max-w-4xl">
                    {/* Top Festive Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-900/80 to-amber-900/80 border border-amber-400/40 backdrop-blur-md mb-6 shadow-lg shadow-rose-950/50"
                    >
                        <Sparkles size={14} className="text-amber-400 animate-pulse" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-300">
                            Diwali 2026 Pre-Booking Open • Direct Sivakasi Factory Rates
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl sm:text-6xl lg:text-7xl mb-6 leading-[1.05] text-white font-black tracking-tight font-cinzel text-shadow-lg"
                    >
                        Celebrate Diwali with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400">
                            Vinayaga Crackers
                        </span> <br />
                        <span className="text-2xl sm:text-4xl lg:text-5xl font-light text-white/90">
                            Directly from Sivakasi!
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
                        className="text-lg md:text-2xl text-slate-200/90 mb-8 max-w-2xl leading-relaxed font-normal"
                    >
                        100% Certified <strong className="text-amber-400 font-bold">Green Crackers</strong> manufactured with superior pyrotechnic brilliance. Enjoy up to <strong className="text-amber-300 font-black">70% discount</strong> off MRP with safe, insured doorstep transport across India.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                        className="flex flex-wrap items-center gap-4 mb-10"
                    >
                        <motion.a
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            href="#products"
                            className="btn btn-secondary px-8 py-4 text-xs sm:text-sm shadow-2xl font-black tracking-widest uppercase group inline-flex items-center gap-2"
                        >
                            Explore Crackers Catalog <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            href="https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi,%20please%20send%20me%20the%20Diwali%202026%20wholesale%20price%20list%20and%20order%20form."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl px-7 py-4 text-xs sm:text-sm font-black tracking-widest uppercase inline-flex items-center gap-2"
                        >
                            <PhoneCall size={16} /> WhatsApp Order
                        </motion.a>

                        <motion.button
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => window.dispatchEvent(new CustomEvent('openInquiryPopup'))}
                            className="btn bg-white/10 hover:bg-white hover:text-rose-950 text-white border border-amber-400/30 backdrop-blur-md px-7 py-4 text-xs sm:text-sm font-black tracking-widest uppercase transition-all inline-flex items-center gap-2"
                        >
                            <Download size={16} /> Instant Price List
                        </motion.button>
                    </motion.div>

                    {/* Trust Badges Strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <Award size={16} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white leading-tight">100% Green</p>
                                <p className="text-[10px] text-slate-400">CSIR-NEERI Certified</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                                <Flame size={16} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white leading-tight">70% Off MRP</p>
                                <p className="text-[10px] text-slate-400">Direct Sivakasi Rates</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                                <ShieldCheck size={16} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white leading-tight">PESO Licensed</p>
                                <p className="text-[10px] text-slate-400">Govt Approved Safety</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white leading-tight">Pan-India Delivery</p>
                                <p className="text-[10px] text-slate-400">Safe Parcel Packing</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-500 ${currentImage === idx ? 'bg-amber-400 w-8' : 'bg-white/30 w-2 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
