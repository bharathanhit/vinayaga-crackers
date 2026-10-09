import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import lakshmiImg from '../assets/crackers/lakshmi.jpg';
import chakkarSpecialImg from '../assets/crackers/chakkar-special.jpg';
import anarSpecialImg from '../assets/crackers/anar-special.jpg';
import twinklingStarImg from '../assets/crackers/twinkling-star.jpg';

const categoriesTamil = [
    {
        id: 'one-sound-crackers',
        titleTa: 'ஒற்றை வெடிகள்',
        descTa: 'பாரம்பரிய அதிரடி சத்தம் (9 வகைகள்)',
        enTitle: 'One Sound Crackers',
        slug: 'one-sound-crackers',
        image: lakshmiImg
    },
    {
        id: 'ground-chakkars',
        titleTa: 'தரைச் சக்கரம்',
        descTa: 'சுழலும் வண்ண வட்டங்கள் (11 வகைகள்)',
        enTitle: 'Ground Chakkars',
        slug: 'ground-chakkars',
        image: chakkarSpecialImg
    },
    {
        id: 'flower-pots',
        titleTa: 'பூச்சட்டி வகைகள்',
        descTa: 'வண்ண மழை பொழியும் பொறி (7 வகைகள்)',
        enTitle: 'Flower Pots (Anar)',
        slug: 'flower-pots',
        image: anarSpecialImg
    },
    {
        id: 'twinkling-star',
        titleTa: 'சாட்டை வகைகள்',
        descTa: 'மின்னும் நட்சத்திர ஒளி (2 வகைகள்)',
        enTitle: 'Twinkling Star',
        slug: 'twinkling-star',
        image: twinklingStarImg
    }
];

const TamilCategoryGrid = () => {
    return (
        <section className="py-20 bg-[#041B16] text-white relative overflow-hidden border-b border-emerald-900/50">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header matching reference */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-emerald-800/40">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-sm shrink-0">
                            <Sparkles size={26} className="animate-spin-slow" />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white font-tamil tracking-tight">
                                எங்கள் பிரிவு
                            </h2>
                            <p className="text-emerald-200/80 text-xs sm:text-sm font-semibold font-tamil mt-0.5">
                                உங்கள் தேவைக்கு ஏற்ப தேர்வு செய்யுங்கள் • Shop By Category
                            </p>
                        </div>
                    </div>

                    <a
                        href="#products"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold font-tamil text-amber-300 hover:text-amber-200 transition-colors group"
                    >
                        <span>அனைத்து வகைகளும்</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* 4 Grid Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {categoriesTamil.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.07, duration: 0.5 }}
                        >
                            <Link
                                to={`/category/${cat.slug}`}
                                className="group block bg-[#082821] hover:bg-[#0C352C] border border-emerald-700/40 hover:border-amber-400/60 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-950/50 flex flex-col justify-between h-full"
                            >
                                {/* Thumbnail Image */}
                                <div className="relative h-32 sm:h-36 rounded-xl overflow-hidden bg-black/40 mb-3">
                                    <img
                                        src={cat.image}
                                        alt={cat.enTitle}
                                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </div>

                                {/* Text & Arrow */}
                                <div className="flex items-end justify-between gap-1 pt-1">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-extrabold text-xs sm:text-sm text-white font-tamil group-hover:text-amber-300 transition-colors leading-tight truncate">
                                            {cat.titleTa}
                                        </h3>
                                        <p className="text-[10px] text-emerald-300/70 font-tamil truncate mt-0.5">
                                            {cat.descTa}
                                        </p>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 text-white flex items-center justify-center shrink-0 transition-colors">
                                        <ArrowUpRight size={13} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Advertising Purpose Disclaimer */}
                <div className="mt-8 text-center">
                    <p className="text-[11px] text-emerald-300/60 font-tamil font-medium">
                        * புகைப்படங்கள் விளம்பர நோக்கத்திற்காக மட்டுமே • Images are for advertising / representation purpose only.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TamilCategoryGrid;
