import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingCart, ArrowRight, Star } from 'lucide-react';
import flowerPotsImg from '../assets/crackers/flower-pots.jpg';
import groundChakkarsImg from '../assets/crackers/ground-chakkars.jpg';
import sparklersImg from '../assets/crackers/sparklers.jpg';
import lakshmiImg from '../assets/crackers/lakshmi.jpg';
import anarSpecialImg from '../assets/crackers/anar-special.jpg';
import chakkarSpecialImg from '../assets/crackers/chakkar-special.jpg';
import twinklingStarImg from '../assets/crackers/twinkling-star.jpg';

const featuredItems = [
    {
        id: 'p-23',
        discount: '90% OFF',
        image: anarSpecialImg,
        enTitle: 'Flower Pots Special',
        taTitle: 'பூச்சட்டி ஸ்பெஷல்',
        featureTa: 'அழகான வண்ண தங்க மழை • 1 Box',
        originalPrice: '₹350',
        price: '₹35',
        saveAmount: 'Save ₹315 (90% OFF)',
        slug: 'flower-pots'
    },
    {
        id: 'p-11',
        discount: '90% OFF',
        image: chakkarSpecialImg,
        enTitle: 'Chakkar Special',
        taTitle: 'சக்கரம் ஸ்பெஷல்',
        featureTa: 'நீண்ட நேரம் சுழலும் • 1 Box',
        originalPrice: '₹300',
        price: '₹30',
        saveAmount: 'Save ₹270 (90% OFF)',
        slug: 'ground-chakkars'
    },
    {
        id: 'p-3',
        discount: '90% OFF',
        image: lakshmiImg,
        enTitle: '4" Deluxe Lakshmi',
        taTitle: '4" டீலக்ஸ் லட்சுமி',
        featureTa: 'அதிரடி சத்தம் • 1 Pkt',
        originalPrice: '₹100',
        price: '₹10',
        saveAmount: 'Save ₹90 (90% OFF)',
        slug: 'one-sound-crackers'
    },
    {
        id: 'p-26',
        discount: '90% OFF',
        image: flowerPotsImg,
        enTitle: 'Multi Tricolour Fountain',
        taTitle: 'மல்டி டிரைகலர் பவுண்டைன்',
        featureTa: 'மும்வண்ண பவுண்டைன் • 1 Box',
        originalPrice: '₹1,250',
        price: '₹125',
        saveAmount: 'Save ₹1,125 (90% OFF)',
        slug: 'flower-pots'
    },
    {
        id: 'p-29',
        discount: '90% OFF',
        image: twinklingStarImg,
        enTitle: '4" Twinkling Star',
        taTitle: '4" சாட்டை',
        featureTa: 'மின்னும் நட்சத்திர ஒளி • 1 Box',
        originalPrice: '₹350',
        price: '₹35',
        saveAmount: 'Save ₹315 (90% OFF)',
        slug: 'twinkling-star'
    }
];

const FeaturedCrackers = () => {
    const handleOrder = (item) => {
        const msg = encodeURIComponent(
            `வணக்கம் Vinayaga Crackers Sivakasi, நான் "${item.taTitle} (${item.enTitle}) - ${item.price}" வாங்க விரும்புகிறேன். இருப்பு விபரம் தெரிவிக்கவும்.`
        );
        window.open(`https://wa.me/918940921075?text=${msg}`, '_blank');
    };

    return (
        <section className="py-16 bg-[#FDFBF7] border-b border-amber-100">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Header matching reference */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        {/* Sunburst icon */}
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                            <Sparkles size={26} className="animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-tamil tracking-tight">
                                சிறப்பு தேர்வு பட்டாசுகள்
                            </h2>
                            <p className="text-slate-500 text-xs sm:text-sm font-semibold font-tamil mt-0.5">
                                இந்த மாதத்தின் பிரபலமானவை • Trending Diwali Specials
                            </p>
                        </div>
                    </div>

                    <a
                        href="#products"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold font-tamil text-slate-700 hover:text-amber-600 transition-colors group"
                    >
                        <span>அனைத்து பொருட்களும்</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* 5-Column Grid matching reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {featuredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Card Top: Image + Discount badge */}
                            <div>
                                <div className="relative h-48 bg-slate-50 overflow-hidden p-3 flex items-center justify-center">
                                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#DC2626] text-white shadow-md">
                                        {item.discount}
                                    </span>
                                    <img
                                        src={item.image}
                                        alt={item.enTitle}
                                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Body Content */}
                                <div className="p-4">
                                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors leading-tight line-clamp-1">
                                        {item.enTitle}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-600 font-tamil mt-1 leading-snug line-clamp-1">
                                        {item.taTitle}
                                    </p>

                                    {/* Feature highlight line with star */}
                                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-700 font-tamil mt-2 bg-amber-50/80 px-2 py-1 rounded-md border border-amber-100">
                                        <Star size={12} className="fill-amber-500 text-amber-500 shrink-0" />
                                        <span className="truncate">{item.featureTa}</span>
                                    </div>

                                    {/* Pricing Row */}
                                    <div className="flex items-baseline gap-2 mt-3">
                                        <span className="text-xs text-slate-400 line-through">
                                            {item.originalPrice}
                                        </span>
                                        <span className="text-lg font-black text-[#DC2626]">
                                            {item.price}
                                        </span>
                                    </div>

                                    {/* Green Save Pill */}
                                    <div className="mt-1">
                                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                            {item.saveAmount}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer: Dark Navy Cart Button */}
                            <div className="p-4 pt-0">
                                <button
                                    onClick={() => handleOrder(item)}
                                    className="w-full py-2.5 px-4 bg-[#0A192F] hover:bg-[#071324] active:scale-95 text-white rounded-xl text-xs font-bold font-tamil flex items-center justify-center gap-2 transition-all shadow hover:shadow-md cursor-pointer"
                                >
                                    <ShoppingCart size={14} />
                                    <span>வாங்க</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Advertising Purpose Disclaimer */}
                <div className="mt-8 text-center">
                    <p className="text-[11px] sm:text-xs text-slate-500 font-tamil font-medium">
                        * புகைப்படங்கள் விளம்பர நோக்கத்திற்காக மட்டுமே • Images shown are for advertising / representation purpose only.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCrackers;
