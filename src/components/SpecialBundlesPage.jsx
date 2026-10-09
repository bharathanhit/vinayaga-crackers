import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Flame, CheckCircle2, ShoppingBag, PhoneCall,
    Printer, Share2, MapPin, Zap, Search, ArrowRight,
    Award, ShieldCheck, Truck, Star, ArrowLeft, Download, Filter, Eye, Maximize2, X
} from 'lucide-react';
import { bundlePacks } from '../data/specialBundleData';
import { Link } from 'react-router-dom';

const SpecialBundlesPage = () => {
    const [selectedPackId, setSelectedPackId] = useState('bundle-family-60');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const activePack = useMemo(() => {
        return bundlePacks.find(p => p.id === selectedPackId) || bundlePacks[0];
    }, [selectedPackId]);

    useEffect(() => {
        document.title = `${activePack.titleTa} (${activePack.itemCount} Items) | Vinayaga Supreme Crackers Sivakasi`;
        window.scrollTo(0, 0);
    }, [activePack]);

    // Categories list for active pack
    const categoriesList = useMemo(() => {
        const cats = new Set(activePack.items.map(i => i.category));
        return ['all', ...Array.from(cats)];
    }, [activePack]);

    // Filtered items
    const filteredItems = useMemo(() => {
        return activePack.items.filter(item => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q ||
                item.nameEn.toLowerCase().includes(q) ||
                item.nameTa.includes(q) ||
                String(item.sno) === q;
            return matchesCategory && matchesSearch;
        });
    }, [activePack, selectedCategory, searchQuery]);

    // Split items into 3 columns like the poster
    const columns = useMemo(() => {
        const items = filteredItems;
        if (selectedCategory !== 'all' || searchQuery.trim()) {
            // When filtering, return single list
            return [items];
        }
        if (activePack.id === 'bundle-family-60') {
            return [
                items.slice(0, 20),
                items.slice(20, 40),
                items.slice(40, 60)
            ];
        } else {
            return [
                items.slice(0, 23),
                items.slice(23, 46),
                items.slice(46, 70)
            ];
        }
    }, [filteredItems, selectedCategory, searchQuery, activePack]);

    const handleWhatsAppOrder = (pack) => {
        const msg = encodeURIComponent(
            `வணக்கம் Vinayaga Supreme Crackers Sivakasi!\n\n` +
            `நான் உங்கள் சிறப்பு தீபாவளி காம்போ பேக் முழுமையாக ஆர்டர் செய்ய விரும்புகிறேன்:\n\n` +
            `📦 *தொகுப்பு:* ${pack.titleTa} (${pack.titleEn})\n` +
            `🔥 *பொருட்கள் எண்ணிக்கை:* ${pack.itemCount} Items\n` +
            `💰 *சிறப்பு விலை:* ₹${pack.dealPrice.toLocaleString('en-IN')} (MRP: ₹${pack.worthPrice.toLocaleString('en-IN')})\n` +
            `🎁 *சேமிப்பு:* ₹${pack.savings.toLocaleString('en-IN')} (${pack.discountPercent})\n\n` +
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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 sm:pt-24 pb-16 font-sans">

            {/* ── Top Breadcrumbs Bar ── */}
            <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Link to="/" className="hover:text-amber-600 transition-colors">முகப்பு (Home)</Link>
                        <span>/</span>
                        <span className="text-slate-900 font-bold">ஸ்பெஷல் பண்டில் பேக் (Special Bundle Packs)</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/buy"
                            className="text-amber-700 font-bold hover:underline flex items-center gap-1"
                        >
                            <ShoppingBag size={14} />
                            <span>விலைப்பட்டியல் (Price List)</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Page Hero with AI Hamper Image in Front ── */}
            <section className="bg-gradient-to-b from-white via-amber-50/30 to-slate-50 border-b border-slate-200 py-10 sm:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        {/* Left: Hamper Image Front Visual (100% Full Photo, No Cropping) */}
                        <div className="lg:col-span-5 flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative group max-w-lg lg:max-w-xl w-full"
                            >
                                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700 -z-10" />

                                <div className="rounded-3xl overflow-hidden border-4 border-amber-400 bg-[#0B0F19] shadow-2xl flex flex-col">
                                    {/* Top info strip */}
                                    <div className="bg-gradient-to-r from-[#800000] via-rose-950 to-[#800000] px-4 py-2 flex items-center justify-between border-b border-amber-400/30 text-white">
                                        <div className="flex items-center gap-1.5 text-xs font-black">
                                            <Flame size={14} className="text-amber-300 animate-bounce" />
                                            <span>{activePack.discountPercent} Direct Discount</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-black text-amber-300 bg-black/40 px-2.5 py-1 rounded-lg border border-amber-400/30">
                                            <Sparkles size={13} className="text-amber-400" />
                                            <span>{activePack.itemCount} Items Combo</span>
                                        </div>
                                    </div>

                                    {/* Image Display - 100% Full Uncropped */}
                                    <div
                                        onClick={() => setIsZoomOpen(true)}
                                        className="relative p-2 sm:p-3 flex items-center justify-center cursor-zoom-in bg-black/70 group/zoom"
                                        title="Click to view full photo in HD"
                                    >
                                        <img
                                            src={activePack.frontImage || activePack.photo}
                                            alt={activePack.titleEn}
                                            className="w-full h-auto max-h-[460px] object-contain rounded-xl transition-transform duration-300 group-hover/zoom:scale-[1.01]"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-3 right-3 bg-black/85 hover:bg-black text-amber-300 border border-amber-300/60 text-[11px] font-black px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 backdrop-blur-md transition-all group-hover/zoom:scale-105"
                                        >
                                            <Maximize2 size={13} />
                                            <span>பெரிதாக்கு (Zoom HD)</span>
                                        </button>
                                    </div>

                                    {/* Bottom strip */}
                                    <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-xs border-t border-amber-400/20">
                                        <span className="text-amber-300 font-bold">🪔 நேரடி பட்டாசு காட்சி (Original Store Photo)</span>
                                        <span className="text-white/60 text-[10px]">100% Sivakasi Factory</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Hamper Details & Key Value */}
                        <div className="lg:col-span-7 space-y-5">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase">
                                <Sparkles size={14} className="text-amber-600" />
                                <span>சிவகாயி நேரடி தொழிற்சாலை பட்டாசு தொகுப்பு 2026</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-slate-950 leading-tight">
                                {activePack.titleEn}
                            </h1>
                            <p className="text-lg sm:text-xl font-tamil font-bold text-amber-800">
                                {activePack.titleTa}
                            </p>
                            <p className="text-slate-600 text-sm sm:text-base font-tamil leading-relaxed">
                                {activePack.description}
                            </p>

                            {/* Price Highlight Banner */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border-2 border-amber-300 shadow-sm flex items-baseline gap-4 flex-wrap">
                                <div>
                                    <span className="text-xs font-bold text-slate-500 uppercase block">சிறப்பு சலுகை விலை (Offer Price)</span>
                                    <span className="text-4xl sm:text-5xl font-black text-red-600 font-cinzel">
                                        ₹{activePack.dealPrice.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="text-slate-400 font-bold">
                                    <span className="text-xs block">அசல் மதிப்பு (MRP)</span>
                                    <span className="text-xl sm:text-2xl line-through">
                                        ₹{activePack.worthPrice.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs uppercase shadow">
                                    Save ₹{activePack.savings.toLocaleString('en-IN')} ({activePack.discountPercent})
                                </span>
                            </div>

                            {/* Quick Ordering Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <button
                                    onClick={() => handleWhatsAppOrder(activePack)}
                                    className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                                >
                                    <PhoneCall size={16} />
                                    <span>WhatsApp-ல் உடனே முன்பதிவு செய்</span>
                                </button>
                                <Link
                                    to="/buy"
                                    onClick={() => handleAddToCart(activePack)}
                                    className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                                >
                                    <ShoppingBag size={16} />
                                    <span>கார்ட்டில் சேர் (Add to Cart)</span>
                                </Link>
                                <button
                                    onClick={handlePrint}
                                    className="px-4 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                                    title="பட்டியலை அச்சிடுக"
                                >
                                    <Printer size={15} />
                                    <span>அச்சு (Print)</span>
                                </button>
                            </div>

                            {/* Address pill */}
                            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-center gap-2 shadow-sm">
                                <MapPin size={16} className="text-amber-600 shrink-0" />
                                <span>
                                    <strong>கடை முகவரி:</strong> Shop No : 3/6136, Om Sakthi Nagar, Perapatti, Sivakasi – 626189 (தொடர்புக்கு: +91 89409 21075)
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Main Interactive Price List Section ── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">

                {/* ── Switcher Tabs between 60 Items & 70 Items ── */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-slate-200 shadow-md max-w-lg w-full">
                        {bundlePacks.map((pack) => {
                            const isSelected = selectedPackId === pack.id;
                            return (
                                <button
                                    key={pack.id}
                                    onClick={() => {
                                        setSelectedPackId(pack.id);
                                        setSelectedCategory('all');
                                        setSearchQuery('');
                                    }}
                                    className={`relative flex-1 py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold transition-all duration-300 z-10 ${
                                        isSelected ? 'text-white font-black' : 'text-slate-700 hover:text-slate-950'
                                    }`}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="pageActiveTab"
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

                {/* ── Filter & Search Toolbar ── */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1 min-w-[240px]">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="பட்டாசு பெயர் அல்லது எண் மூலம் தேடுக (Search item)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-bold">
                                {filteredItems.length} / {activePack.itemCount} பொருட்கள்
                            </span>
                            {(selectedCategory !== 'all' || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSearchQuery('');
                                    }}
                                    className="text-xs text-rose-600 hover:underline font-bold"
                                >
                                    அழி (Reset)
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                        {categoriesList.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-bold ${
                                    selectedCategory === cat
                                        ? 'bg-[#800000] text-amber-300 shadow-sm'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {cat === 'all' ? 'அனைத்து வகைகள் (All)' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Authentic CSS Poster Card Inside ── */}
                <motion.div
                    key={activePack.id + selectedCategory + searchQuery}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-[2rem] p-4 sm:p-6 lg:p-8 shadow-2xl border-4 ${
                        activePack.id === 'bundle-vip-70'
                            ? 'bg-gradient-to-b from-[#2E0854] via-[#3B0764] to-[#1E0538] border-amber-400 text-white'
                            : 'bg-gradient-to-b from-[#022B69] via-[#034085] to-[#011C47] border-amber-400 text-white'
                    }`}
                >
                    {/* Poster Top Banner */}
                    <div className="rounded-2xl border-2 border-amber-300/60 p-4 sm:p-6 mb-5 bg-gradient-to-r from-black/40 via-transparent to-black/40 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-rose-600 to-amber-300 p-1 shadow-lg shrink-0">
                                    <div className="w-full h-full rounded-full bg-[#800000] flex flex-col items-center justify-center text-center p-1">
                                        <Flame size={18} className="text-amber-300" />
                                        <span className="text-[9px] font-black text-white font-cinzel">Vinayaga</span>
                                        <span className="text-[8px] font-black text-amber-300">Supreme</span>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <h2 className="text-xl sm:text-3xl font-black font-cinzel text-white">
                                        {activePack.id === 'bundle-vip-70' ? 'VIP SPECIAL FAMILY PACK' : 'FAMILY PACK'}
                                    </h2>
                                    <p className="text-xs sm:text-sm font-tamil text-amber-200 font-bold">
                                        {activePack.titleTa}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center px-5 py-2 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-black shadow-md border-2 border-amber-200">
                                <span className="text-3xl sm:text-4xl font-black font-cinzel block leading-none">
                                    {activePack.itemCount} Items
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-950 block mt-0.5">
                                    முழு பட்டாசு தொகுப்பு
                                </span>
                            </div>

                            <div className="bg-white/95 text-slate-950 px-5 py-3 rounded-2xl shadow-xl border-2 border-amber-300 text-center md:text-right">
                                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                                    Worth <span className="line-through text-red-600 font-black">₹{activePack.worthPrice.toLocaleString('en-IN')}</span>
                                </span>
                                <span className="text-3xl font-black text-red-600 font-cinzel leading-none block my-0.5">
                                    ₹{activePack.dealPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] font-black text-slate-900 uppercase block bg-amber-400 px-2 py-0.5 rounded-full">
                                    ONLY • {activePack.discountPercent}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-amber-400/40 flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 px-6 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black text-xs tracking-wide uppercase">
                                <Sparkles size={13} className="text-rose-700" />
                                Direct Factory Outlet — Sivakasi
                                <Sparkles size={13} className="text-rose-700" />
                            </span>
                        </div>
                    </div>

                    {/* Table Columns (Pure CSS) */}
                    <div className="bg-[#FFFDF7] text-slate-900 rounded-2xl p-2 sm:p-4 shadow-xl border-2 border-amber-300 overflow-hidden">
                        <div className={`grid gap-3 sm:gap-4 ${
                            columns.length === 1 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {columns.map((columnItems, colIdx) => (
                                <div
                                    key={colIdx}
                                    className="rounded-xl overflow-hidden border border-amber-200/90 shadow-sm bg-white flex flex-col"
                                >
                                    <div className="bg-[#800000] text-white px-3 py-2 grid grid-cols-12 gap-1 text-[11px] sm:text-xs font-black uppercase tracking-wider items-center border-b-2 border-amber-400">
                                        <span className="col-span-2 text-center text-amber-300">S.No</span>
                                        <span className="col-span-7 text-left pl-1">Items (பட்டாசு)</span>
                                        <span className="col-span-3 text-right text-amber-300">Qty</span>
                                    </div>

                                    <div className="divide-y divide-slate-200 text-xs flex-1">
                                        {columnItems.map((item, rowIdx) => (
                                            <div
                                                key={item.sno}
                                                className={`grid grid-cols-12 gap-1 px-3 py-1.5 items-center transition-colors hover:bg-amber-100/60 ${
                                                    rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#FAF6EC]'
                                                }`}
                                            >
                                                <span className="col-span-2 text-center font-black text-slate-900 text-xs">
                                                    {item.sno}
                                                </span>
                                                <div className="col-span-7 min-w-0 pl-1">
                                                    <p className="font-bold text-slate-900 text-[11px] sm:text-xs truncate">
                                                        {item.nameEn}
                                                    </p>
                                                    <p className="text-[10px] text-amber-800 font-tamil truncate">
                                                        {item.nameTa}
                                                    </p>
                                                </div>
                                                <span className="col-span-3 text-right font-black text-red-700 text-[11px] sm:text-xs truncate">
                                                    {item.qty}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Address Footer */}
                    <div className="mt-5 rounded-2xl bg-[#800000] border-2 border-amber-300 text-white p-3 sm:p-4 text-center">
                        <p className="text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                            <MapPin size={16} className="text-amber-300" />
                            <span>கடை முகவரி: No - 3/6136, Om Sakthi Nagar, Parapatti, Sivakasi, 626189</span>
                        </p>
                        <p className="text-[11px] text-amber-200 mt-1">
                            🚚 இந்தியா முழுவதும் டெலிவரி • 100% பசுமை பட்டாசுகள் • வாட்ஸ்அப்: +91 89409 21075
                        </p>
                    </div>
                </motion.div>

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
                                    src={activePack.frontImage || activePack.photo}
                                    alt={activePack.titleEn}
                                    className="w-full h-auto max-h-[80vh] object-contain mx-auto block rounded-xl"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default SpecialBundlesPage;
