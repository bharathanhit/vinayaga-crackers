import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Flame, CheckCircle2, ShoppingBag, PhoneCall,
    Share2, MapPin, Zap, ArrowRight, Award, ShieldCheck, Truck,
    Eye, Gift, Star, Maximize2, X, ZoomIn
} from 'lucide-react';
import { bundlePacks } from '../data/specialBundleData';
import { Link } from 'react-router-dom';

const SpecialBundleShowcase = () => {
    const [selectedPackId, setSelectedPackId] = useState('bundle-family-60');
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const activePack = bundlePacks.find(p => p.id === selectedPackId) || bundlePacks[0];

    const handleWhatsAppOrder = (pack) => {
        const msg = encodeURIComponent(
            `வணக்கம் Vinayaga Supreme Crackers Sivakasi!\n\n` +
            `நான் உங்கள் சிறப்பு தீபாவளி காம்போ பேக் ஆர்டர் செய்ய விரும்புகிறேன்:\n\n` +
            `📦 *தொகுப்பு:* ${pack.titleTa} (${pack.titleEn})\n` +
            `🔥 *பொருட்கள் எண்ணிக்கை:* ${pack.itemCount} Items\n` +
            `💰 *சிறப்பு விலை:* ₹${pack.dealPrice.toLocaleString('en-IN')} (MRP: ₹${pack.worthPrice.toLocaleString('en-IN')})\n` +
            `🎁 *தள்ளுபடி:* ${pack.discountPercent} சேமிப்பு!\n\n` +
            `🏬 *கடை முகவரி:* Shop No : 3/6136, Om Sakthi Nagar, Perapatti, Sivakasi – 626189\n\n` +
            `தயவுசெய்து முன்பதிவு மற்றும் டெலிவரி விவரங்களை அனுப்பவும்.`
        );
        window.open(`https://wa.me/918940921075?text=${msg}`, '_blank');
    };

    const handleAddToCart = (pack) => {
        try {
            const current = parseInt(localStorage.getItem('vinayaga_cart_count') || '0', 10);
            localStorage.setItem('vinayaga_cart_count', String(current + 1));
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (e) {}
    };

    return (
        <section id="special-bundles" className="relative py-14 sm:py-20 bg-white text-slate-900 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* ── Section Title (On Clean White Background) ── */}
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-300 text-rose-700 text-xs sm:text-sm font-black uppercase tracking-wider mb-3 shadow-sm"
                    >
                        <Sparkles size={16} className="text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                        <span>💥 தீபாவளி ஸ்பெஷல் மெகா சேமிப்பு காம்போ பேக் 2026 💥</span>
                        <Sparkles size={16} className="text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-4xl lg:text-5xl font-black font-cinzel text-slate-950 leading-tight mb-2"
                    >
                        VINAYAGA SUPREME BUNDLE PACKS
                    </motion.h2>

                    <p className="text-slate-600 text-xs sm:text-base font-tamil font-medium">
                        முழு குடும்பத்திற்கும் தேவையான அனைத்து பட்டாசுகளும் ஒரே பிரம்மாண்ட பெட்டியில்! நேரடி சிவகாசி தொழிற்சாலை தள்ளுபடி விலை!
                    </p>
                </div>

                {/* ── Interactive Switcher (60 Items vs 70 Items) ── */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border-2 border-slate-200 shadow-sm max-w-md w-full">
                        {bundlePacks.map((pack) => {
                            const isSelected = selectedPackId === pack.id;
                            return (
                                <button
                                    key={pack.id}
                                    onClick={() => setSelectedPackId(pack.id)}
                                    className={`relative flex-1 py-3 px-3 rounded-xl text-center text-xs sm:text-sm font-bold transition-all duration-300 z-10 ${
                                        isSelected ? 'text-white font-black' : 'text-slate-700 hover:text-slate-950'
                                    }`}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="activeHomeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-xl shadow-md -z-10"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <div className="flex flex-col items-center">
                                        <span className="leading-tight">{pack.itemCount} Items {pack.id === 'bundle-vip-70' ? 'VIP Special' : 'Family Pack'}</span>
                                        <span className={`text-[11px] font-black ${isSelected ? 'text-amber-300' : 'text-red-600'}`}>
                                            ₹{pack.dealPrice.toLocaleString('en-IN')} Only
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Spotlight Pack Card (Rich Royal Festive Inside, White Background Outside) ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePack.id}
                        initial={{ opacity: 0, scale: 0.98, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -15 }}
                        transition={{ duration: 0.35 }}
                        className={`rounded-[2.5rem] p-4 sm:p-8 lg:p-10 shadow-2xl border-4 overflow-hidden relative ${
                            activePack.id === 'bundle-vip-70'
                                ? 'bg-gradient-to-b from-[#250644] via-[#36085C] to-[#1A0430] border-amber-400 text-white shadow-purple-950/30'
                                : 'bg-gradient-to-b from-[#022B69] via-[#034085] to-[#011C47] border-amber-400 text-white shadow-blue-950/30'
                        }`}
                    >
                        {/* Festive Ribbon Header */}
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white py-2 px-4 text-center text-xs sm:text-sm font-black tracking-wide flex items-center justify-center gap-2 shadow-md">
                            <Flame size={16} className="text-amber-200 animate-bounce" />
                            <span>{activePack.badge} • {activePack.badgeTa}</span>
                            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase">
                                {activePack.discountPercent}
                            </span>
                        </div>

                        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                            {/* ── Left: Crackers Pack Image in Front (100% Fully Visible, No Cropping) ── */}
                            <div className="lg:col-span-6 space-y-4">
                                <div className="relative group rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-[#090D18]">
                                    {/* Top info strip - Does not obscure photo */}
                                    <div className="bg-gradient-to-r from-[#800000] via-rose-950 to-[#800000] px-4 py-2 flex items-center justify-between border-b border-amber-400/30 text-white">
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black">
                                            <Flame size={15} className="text-amber-300 animate-bounce" />
                                            <span>{activePack.discountPercent} Direct Factory Discount</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-black text-amber-300 bg-black/40 px-2.5 py-1 rounded-lg border border-amber-400/30">
                                            <Sparkles size={13} className="text-amber-400" />
                                            <span>{activePack.itemCount} Items Combo</span>
                                        </div>
                                    </div>

                                    {/* Image Display Area - 100% Full Uncropped View */}
                                    <div 
                                        onClick={() => setIsZoomOpen(true)}
                                        className="relative p-2 sm:p-3 flex items-center justify-center cursor-zoom-in bg-black/60 group/zoom"
                                        title="Click to view full photo in HD"
                                    >
                                        <img
                                            src={activePack.photo || activePack.frontImage}
                                            alt={activePack.titleEn}
                                            className="w-full h-auto max-h-[500px] object-contain rounded-xl transition-transform duration-300 group-hover/zoom:scale-[1.01]"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-4 right-4 bg-black/85 hover:bg-black text-amber-300 border border-amber-300/60 text-[11px] font-black px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 backdrop-blur-md transition-all group-hover/zoom:scale-105"
                                        >
                                            <Maximize2 size={13} />
                                            <span>பெரிதாக்கு (Zoom HD)</span>
                                        </button>
                                    </div>

                                    {/* Bottom strip */}
                                    <div className="bg-slate-900/95 px-4 py-2.5 flex items-center justify-between gap-2 border-t border-amber-400/30 text-xs">
                                        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                                            <span>🪔 நேரடி பட்டாசு காட்சி (100% Original Store Photo)</span>
                                        </div>
                                        <Link
                                            to="/special-bundles"
                                            className="px-3.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md transition-colors"
                                        >
                                            <Eye size={13} />
                                            <span>முழு பட்டியல்</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Factory Guarantee Badges */}
                                <div className="grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs">
                                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-1">
                                        <Truck size={17} className="text-emerald-400" />
                                        <span className="font-bold text-white">இந்தியா முழுவதும் டெலிவரி</span>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-1">
                                        <ShieldCheck size={17} className="text-amber-400" />
                                        <span className="font-bold text-white">100% பசுமை பட்டாசு</span>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col items-center justify-center gap-1">
                                        <Gift size={17} className="text-rose-400" />
                                        <span className="font-bold text-white">{activePack.itemCount} ரகங்கள் பாக்ஸ்</span>
                                    </div>
                                </div>
                            </div>

                            {/* ── Right: Pricing, Highlights & Big Link to Separate Page ── */}
                            <div className="lg:col-span-6 space-y-5">
                                <div>
                                    <div className="inline-block px-3 py-1 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase mb-2">
                                        சிவகாசி நேரடி விற்பனையகம் • Direct Sivakasi Factory Rate
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-cinzel text-white leading-tight">
                                        {activePack.titleEn}
                                    </h3>
                                    <p className="text-amber-300 font-tamil font-bold text-base sm:text-lg mt-1">
                                        {activePack.titleTa}
                                    </p>
                                    <p className="text-slate-200 text-xs sm:text-sm font-tamil mt-2 leading-relaxed">
                                        {activePack.description}
                                    </p>
                                </div>

                                {/* Price Box */}
                                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-400/20 via-rose-500/20 to-amber-400/10 border-2 border-amber-300/60 relative overflow-hidden">
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span className="text-3xl sm:text-5xl font-black text-amber-300 font-cinzel">
                                            ₹{activePack.dealPrice.toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-base sm:text-xl text-slate-300 line-through font-bold">
                                            ₹{activePack.worthPrice.toLocaleString('en-IN')}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-xs uppercase shadow-md animate-pulse">
                                            Save ₹{activePack.savings.toLocaleString('en-IN')} ({activePack.discountPercent})
                                        </span>
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-amber-200 font-tamil mt-2 flex items-center gap-1.5 font-bold">
                                        <Zap size={14} className="text-amber-400" />
                                        <span>மதிப்பு ₹{activePack.worthPrice.toLocaleString('en-IN')} கொண்ட பட்டாசுகள் வெறும் ₹{activePack.dealPrice.toLocaleString('en-IN')}-க்கு மட்டுமே!</span>
                                    </p>
                                </div>

                                {/* Key Highlights */}
                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                                        தொகுப்பில் உள்ள முக்கிய ரகங்கள் (Key Inclusions):
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                        {activePack.highlights.map((h, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-slate-100">
                                                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                                                <span className="font-semibold">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── BIG CTA: Link to Separate Full Page (No Table on Home) ── */}
                                <div className="pt-2 space-y-3">
                                    <Link
                                        to="/special-bundles"
                                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black font-tamil text-sm sm:text-base shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                                    >
                                        <Eye size={19} className="text-slate-950" />
                                        <span>முழு {activePack.itemCount} ரகங்கள் பட்டியல் பார்க்க (View Full List on Dedicated Page)</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleWhatsAppOrder(activePack)}
                                            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black font-tamil text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105"
                                        >
                                            <PhoneCall size={16} />
                                            <span>WhatsApp-ல் முன்பதிவு</span>
                                        </button>

                                        <Link
                                            to="/buy"
                                            onClick={() => handleAddToCart(activePack)}
                                            className="w-full py-3.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black font-tamil text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/30 transition-all hover:scale-105"
                                        >
                                            <ShoppingBag size={16} className="text-amber-300" />
                                            <span>கார்ட்டில் சேர் (Add to Cart)</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Address reminder */}
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-[11px] flex items-center gap-2">
                                    <MapPin size={15} className="text-amber-400 shrink-0" />
                                    <span>
                                        <strong className="text-white">நேரடி கடை:</strong> Shop No : 3/6136, Om Sakthi Nagar, Perapatti, Sivakasi – 626189
                                    </span>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ── Side-by-side Mini Cards with Direct Links to Dedicated Page ── */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bundlePacks.map((pack) => (
                        <div
                            key={pack.id}
                            className={`p-6 rounded-3xl bg-slate-50 border-2 transition-all ${
                                selectedPackId === pack.id
                                    ? 'border-blue-600 shadow-xl'
                                    : 'border-slate-200 hover:border-slate-300 shadow-md'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-300 bg-white shrink-0 shadow-md">
                                    <img
                                        src={pack.frontImage || pack.photo}
                                        alt={pack.titleEn}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                                        {pack.itemCount} Items Combo
                                    </span>
                                    <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-cinzel truncate">
                                        {pack.titleEn}
                                    </h4>
                                    <p className="text-xs text-amber-700 font-tamil font-bold">{pack.titleTa}</p>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-2xl font-black text-red-600">₹{pack.dealPrice.toLocaleString('en-IN')}</span>
                                        <span className="text-xs text-slate-400 line-through">₹{pack.worthPrice.toLocaleString('en-IN')}</span>
                                        <span className="text-[11px] font-black text-emerald-700">({pack.discountPercent})</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-slate-600 font-tamil mt-3 line-clamp-2">
                                {pack.description}
                            </p>

                            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                                <Link
                                    to="/special-bundles"
                                    onClick={() => setSelectedPackId(pack.id)}
                                    className="text-xs font-black text-blue-700 hover:text-blue-900 flex items-center gap-1 group"
                                >
                                    <span>முழு {pack.itemCount} ரகங்கள் பட்டியல் பார்க்க</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <button
                                    onClick={() => handleWhatsAppOrder(pack)}
                                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                                >
                                    <PhoneCall size={13} />
                                    <span>ஆர்டர்</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* ── Full-Screen HD Lightbox Modal ── */}
            <AnimatePresence>
                {isZoomOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomOpen(false)}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out"
                    >
                        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
                            <span className="text-white/60 text-xs hidden sm:inline">Click anywhere to close</span>
                            <button
                                onClick={() => setIsZoomOpen(false)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="text-center mb-3">
                            <h3 className="text-amber-300 font-cinzel text-lg sm:text-xl font-bold">
                                {activePack.titleTa}
                            </h3>
                            <p className="text-xs text-white/70">
                                {activePack.itemCount} Items Complete Set • ₹{activePack.dealPrice.toLocaleString('en-IN')} Only
                            </p>
                        </div>

                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-6xl max-h-[85vh] overflow-auto rounded-2xl border-2 border-amber-400 shadow-2xl bg-black p-1 cursor-default"
                        >
                            <img
                                src={activePack.photo || activePack.frontImage}
                                alt={activePack.titleEn}
                                className="w-full h-auto max-h-[80vh] object-contain mx-auto block rounded-xl"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SpecialBundleShowcase;
