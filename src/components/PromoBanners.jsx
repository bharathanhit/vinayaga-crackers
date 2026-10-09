import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, ArrowRight, Sparkles, Flame } from 'lucide-react';
import flowerPotsImg from '../assets/crackers/flower-pots.jpg';

const PromoBanners = () => {
    return (
        <section className="py-12 bg-[#F9F7F2] border-b border-amber-200/60">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ── Banner 1: Festival Special Offer (Golden / Orange with Diyas) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#EA580C] via-[#F59E0B] to-[#FBBF24] p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                        {/* Festive ray bursts effect in background */}
                        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                        {/* Left: Diya image / glowing visual */}
                        <div className="relative shrink-0 flex items-center justify-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/20 p-2 flex items-center justify-center shadow-inner overflow-hidden">
                                <img
                                    src={flowerPotsImg}
                                    alt="Diwali Celebration Crackers"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shadow">
                                <Flame size={16} className="fill-amber-500 text-amber-500" />
                            </span>
                        </div>

                        {/* Center / Content */}
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-tamil leading-tight tracking-tight">
                                திருநாள் சிறப்பு சலுகை!
                            </h3>
                            <p className="text-slate-900 font-bold text-sm sm:text-base font-tamil mt-1">
                                ₹2000 மேல் வாங்கினால்
                            </p>

                            {/* Red Free Delivery Badge */}
                            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DC2626] text-white text-xs sm:text-sm font-black font-tamil shadow-md hover:scale-105 transition-transform cursor-pointer">
                                <Truck size={18} />
                                <span>இலவச டெலிவரி பார்சல் உதவி!</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Banner 2: Celebrate with Fireworks (Deep Purple Celebration Night) ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2E1065] via-[#3B0764] to-[#4C1D95] p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                        {/* Background celebration atmosphere */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent" />

                        {/* Content */}
                        <div className="flex-1 text-center sm:text-left z-10">
                            <h3 className="text-xl sm:text-2xl font-black text-white font-tamil leading-tight">
                                ஒவ்வொரு நிமிடமும் <br />
                                <span className="text-amber-300">ஒரு நினைவாக!</span>
                            </h3>
                            <p className="text-purple-200 text-xs sm:text-sm font-semibold tracking-wide uppercase mt-1">
                                Celebrate with Fireworks
                            </p>

                            {/* Buy Now Yellow Pill Button */}
                            <Link
                                to="/buy"
                                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 text-xs font-black font-tamil uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                            >
                                <span>வாங்க இப்போதே</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Right: Splashed Discount Badge */}
                        <div className="shrink-0 relative z-10 flex flex-col items-center justify-center">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 text-slate-950 p-2 flex flex-col items-center justify-center shadow-xl rotate-6 hover:rotate-0 transition-transform border-2 border-white">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-none">FLAT</span>
                                <span className="text-2xl sm:text-3xl font-black leading-none my-0.5 font-cinzel">90%</span>
                                <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 leading-none">OFF</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PromoBanners;
