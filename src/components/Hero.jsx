import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';
import skyShotsImg from '../assets/crackers/sky-shots.jpg';
import flowerPotsImg from '../assets/crackers/flower-pots.jpg';

const heroImages = [heroFireworksImg, skyShotsImg, flowerPotsImg];

const Hero = () => {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] flex items-center">
            {/* ── Vivid fireworks background ── */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentImage}
                        src={heroImages[currentImage]}
                        alt="Diwali Fireworks"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: 'center 40%' }}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, ease: 'easeInOut' }}
                    />
                </AnimatePresence>
                {/* Lighter overlay — text readable but fireworks clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#030C1C]/75 via-[#030C1C]/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />
            </div>

            {/* ── Two-column layout ── */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-12 pt-24 sm:pt-36 pb-12 sm:pb-20">

                {/* LEFT: text */}
                <div className="flex-1 min-w-0 max-w-2xl">
                    <div className="flex items-center gap-2 mb-2">
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="text-xs sm:text-base font-semibold font-tamil text-slate-300 tracking-wide"
                        >
                            இந்த தீபாவளியில்
                        </motion.p>
                        
                        {/* Mobile-only 90% OFF badge */}
                        <span className="sm:hidden inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-md animate-pulse">
                            90% வரை தள்ளுபடி
                        </span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.65 }}
                        className="font-black font-tamil leading-[1.1] tracking-tight mb-3"
                        style={{ fontSize: 'clamp(1.85rem, 5.5vw, 4rem)', color: '#FDE047', textShadow: '0 2px 28px rgba(250,204,21,0.5)' }}
                    >
                        வானத்தை நிறைக்கும்<br />
                        <span style={{ background: 'linear-gradient(90deg,#FEF08A,#FBBF24,#FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            வண்ணங்கள்!
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.6 }}
                        className="text-xs sm:text-sm text-slate-300 font-tamil leading-relaxed max-w-sm mb-5 sm:mb-6"
                    >
                        பாதுகாப்பானதும் தரமானதுமான பட்டாசுகள் உங்கள் கொண்டாட்டத்தை சிறப்பாக்கும். 100% அரசு அங்கீகாரம் பெற்ற பசுமை பட்டாசுகள் நேரடி சிவகாசி மொத்த விலையில்!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.36, duration: 0.55 }}
                        className="flex flex-wrap items-center gap-2.5 sm:gap-3"
                    >
                        <Link
                            to="/buy"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full font-black font-tamil text-slate-950 text-xs sm:text-sm uppercase tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-transform text-center"
                            style={{ background: 'linear-gradient(135deg,#FBBF24,#F59E0B)' }}
                        >
                            இப்போதே வாங்க <ArrowRight size={16} />
                        </Link>
                        <a
                            href="#special-bundles"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 rounded-full font-black text-white text-xs sm:text-sm uppercase tracking-wide bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 shadow-xl shadow-rose-900/40 hover:scale-105 active:scale-95 transition-transform text-center border border-amber-300/40"
                        >
                            <Sparkles size={14} className="text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                            <span>60 & 70 காம்போ பேக் (₹2499)</span>
                        </a>
                        <a
                            href="https://wa.me/918940921075?text=வணக்கம்%20Vinayaga%20Crackers%20Sivakasi,%20விலைப்பட்டியல்%20அனுப்பவும்."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full font-extrabold text-white text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:scale-105 transition-transform text-center"
                        >
                            <PhoneCall size={14} /> WhatsApp
                        </a>
                    </motion.div>

                    {/* Quick trust badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-wrap items-center gap-2 mt-3"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/80 text-white text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-md">
                            🚚 All India Delivery
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-amber-300 text-[10px] sm:text-xs font-bold border border-amber-400/30">
                            இந்தியா முழுவதும் பார்சல் டெலிவரி
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/70 text-white text-[10px] sm:text-xs font-bold">
                            ✓ 100% Safe Transport
                        </span>
                    </motion.div>
                </div>

                {/* RIGHT: Circular discount badge */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.28, duration: 0.85, type: 'spring', stiffness: 110 }}
                    className="hidden sm:flex flex-col items-center gap-3 shrink-0"
                >
                    <div
                        className="relative flex flex-col items-center justify-center text-center rounded-full border-4 border-white/80 cursor-pointer hover:scale-105 transition-transform"
                        style={{
                            width: 176, height: 176,
                            background: 'linear-gradient(145deg,#FEF08A,#FBBF24,#F59E0B)',
                            boxShadow: '0 0 55px rgba(251,191,36,0.7), 0 0 110px rgba(251,191,36,0.25)'
                        }}
                        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        {/* Spinning dashed outer ring */}
                        <div
                            className="absolute rounded-full border-2 border-dashed border-amber-900/50 animate-spin"
                            style={{ inset: -8, animationDuration: '14s' }}
                        />
                        <span className="text-[10px] font-black font-tamil text-slate-900 leading-snug px-4">
                            தீபாவளி அதிரடி தள்ளுபடி
                        </span>
                        <span className="text-5xl font-black text-slate-950 leading-none" style={{ fontFamily: 'serif' }}>90%</span>
                        <span className="text-base font-black font-tamil text-slate-900 leading-none">வரை OFF</span>
                        <span
                            className="mt-2 px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white"
                            style={{ background: '#DC2626' }}
                        >
                            சிவகாசி நேரடி
                        </span>
                    </div>
                    <p className="text-amber-200 text-xs font-bold italic font-serif text-center leading-snug">
                        Flat 90% Off<br />Direct Sivakasi Rates
                    </p>
                </motion.div>
            </div>

            {/* Disclaimer bar */}
            <div className="absolute bottom-1 left-0 right-0 z-20 text-center pointer-events-none">
                <span className="text-[10px] sm:text-[11px] text-amber-200/70 font-tamil tracking-wide bg-black/50 px-3 py-0.5 rounded-full backdrop-blur-sm border border-white/5">
                    * புகைப்படங்கள் விளம்பர நோக்கத்திற்காக மட்டுமே • Images are for advertising purpose only
                </span>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {heroImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${currentImage === i ? 'bg-amber-400 w-6' : 'bg-white/30 w-1.5'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
