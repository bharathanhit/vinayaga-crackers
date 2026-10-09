import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Award, Target, Eye, Sparkles, HeartHandshake, ArrowLeft, Flame, PhoneCall, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import flowerPotsImg from '../assets/crackers/flower-pots.jpg';
import sparklersImg from '../assets/crackers/sparklers.jpg';
import groundChakkarsImg from '../assets/crackers/ground-chakkars.jpg';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';

const AboutPage = () => {
    useEffect(() => {
        document.title = "About Vinayaga Crackers Sivakasi | Heritage, Quality & Green Fireworks";
    }, []);

    return (
        <div className="min-h-screen bg-[#080C14] text-white">
            {/* Hero Header */}
            <section className="relative pt-44 pb-20 bg-gradient-to-b from-rose-950/40 via-night to-[#080C14] overflow-hidden border-b border-amber-500/20">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-end mb-8"
                    >
                        <Link
                            to="/#"
                            className="inline-flex items-center gap-2 text-slate-300 bg-white/10 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl text-xs font-bold transition-all tracking-wider uppercase backdrop-blur-md border border-white/10"
                        >
                            <ArrowLeft size={14} /> Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-400/30 rounded-full text-amber-300 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <Sparkles size={12} className="text-amber-400" />
                            Direct From Sivakasi, Tamil Nadu
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 uppercase font-cinzel leading-none">
                            The Story of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400">
                                Vinayaga Crackers
                            </span>
                        </h1>
                        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
                            Dedicated to illuminating Indian celebrations with authentic Sivakasi artistry, 100% certified green pyrotechnics, and genuine factory wholesale prices.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Story Section */}
            <section className="py-20 md:py-28 overflow-hidden">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-4 pt-8"
                            >
                                <img
                                    src={sparklersImg}
                                    className="rounded-3xl shadow-2xl border-2 border-amber-400/20 object-cover aspect-[4/5] w-full"
                                    alt="Sparklers Manufacturing"
                                />
                                <img
                                    src={groundChakkarsImg}
                                    className="rounded-3xl shadow-2xl border-2 border-amber-400/20 object-cover aspect-square w-full"
                                    alt="Ground Chakkars"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-4"
                            >
                                <img
                                    src={flowerPotsImg}
                                    className="rounded-3xl shadow-2xl border-2 border-amber-400/20 object-cover aspect-square w-full"
                                    alt="Flower Pots"
                                />
                                <img
                                    src={heroFireworksImg}
                                    className="rounded-3xl shadow-2xl border-2 border-amber-400/20 object-cover aspect-[4/5] w-full"
                                    alt="Sky Shots Fireworks"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-400 text-xs font-black uppercase tracking-widest block mb-3">Our Mission & Roots</span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-cinzel mb-6 leading-tight">
                            Bringing Sivakasi Sparks To Every Indian Home
                        </h2>
                        <p className="text-slate-300 text-base leading-relaxed mb-6 font-normal">
                            Sivakasi produces over 90% of India’s fireworks. For generations, families across the nation had to pay heavily marked-up prices at local roadside stalls. <strong>Vinayaga Crackers</strong> was established with a clear goal: to make authentic, safe, high-burst Sivakasi crackers available directly to retail customers and wholesale buyers at true factory rates.
                        </p>
                        <p className="text-slate-300 text-base leading-relaxed mb-8 font-normal">
                            We pride ourselves on using 100% CSIR-NEERI approved formulations that reduce emissions by 30-35% and completely eliminate banned chemicals like barium nitrate. Every cracker batch undergoes stringent flash, sound decibel, and shelf-life checks.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "100% Certified Green Crackers",
                                "PESO Approved Manufacturing License",
                                "Factory Direct Wholesale Savings (Flat 90% OFF)",
                                "Zero Child Labor Guarantee",
                                "Safe Pan-India Transport Dispatches",
                                "Custom Family & Corporate Gift Hampers"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values / Pillars */}
            <section className="py-20 bg-[#0E1524] border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-amber-400 text-xs font-black uppercase tracking-widest block mb-2">Our Commitments</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white font-cinzel uppercase">
                            Why Customers Trust Vinayaga Crackers
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#131B2E] p-8 rounded-3xl border border-white/5 hover:border-amber-400/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                                <ShieldCheck size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-cinzel">Safety & Green Formulations</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Formulated in strict compliance with the Supreme Court directives and CSIR-NEERI guidelines. Tested for low particulate matter and safe sound limits.
                            </p>
                        </div>

                        <div className="bg-[#131B2E] p-8 rounded-3xl border border-white/5 hover:border-amber-400/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                                <Flame size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-cinzel">Direct Sivakasi Pricing</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                No distributors, no middlemen. You get authentic wholesale pricing directly from the manufacturing hub of Sivakasi with maximum savings for your family.
                            </p>
                        </div>

                        <div className="bg-[#131B2E] p-8 rounded-3xl border border-white/5 hover:border-amber-400/30 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                                <HeartHandshake size={26} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-cinzel">Trusted Pan-India Delivery</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Heavy-duty moisture-proof cartons with specialized transport courier networks ensure your Diwali orders reach safely and well ahead of the festival.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact / Order CTA */}
            <section className="py-20 container mx-auto px-6 text-center">
                <div className="bg-gradient-to-r from-rose-950 via-[#131B2E] to-amber-950 p-12 md:p-16 rounded-3xl border border-amber-400/30 max-w-4xl mx-auto">
                    <Sparkles size={36} className="mx-auto text-amber-400 mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-cinzel mb-4">
                        Pre-Book Your Diwali Crackers With Vinayaga Sivakasi
                    </h2>
                    <p className="text-slate-300 text-base mb-6 max-w-xl mx-auto">
                        Get the best rates, early bird pre-booking discounts, and guaranteed timely delivery before stocks run out.
                    </p>
                    <div className="mb-8 inline-flex items-center gap-2 text-xs text-amber-300 bg-black/40 border border-amber-400/30 px-4 py-2 rounded-xl mx-auto">
                        <MapPin size={15} className="text-amber-400 shrink-0" />
                        <span>Visit Store: Shop No : 3/6136, Om Sakthi Nagar, Perapatti, Sivakasi - 626189</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://wa.me/918940921075?text=Hi%20Vinayaga%20Crackers%20Sivakasi,%20I%20would%20like%20to%20get%20more%20details%20about%20ordering%20crackers."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl inline-flex items-center gap-2"
                        >
                            <PhoneCall size={16} /> WhatsApp: +91 89409 21075
                        </a>
                        <Link
                            to="/#products"
                            className="btn bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl"
                        >
                            Explore Cracker Catalog
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
