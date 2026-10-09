import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, ShoppingCart, ArrowRight, CheckCircle2,
    Search, Trash2, Printer, PhoneCall, Download, ShieldCheck,
    Flame, RotateCw, X, Plus, Minus, FileText, ChevronRight, Share2, Eye
} from 'lucide-react';
import { priceListCategories, priceListProducts } from '../data/priceListProducts';

const MIN_ORDER_AMOUNT = 3000;

const BuyingSection = () => {
    useEffect(() => {
        document.title = "தீபாவளி பட்டாசு விலைப்பட்டியல் 2026 | Vinayaga Crackers Sivakasi Buying Section";
        window.scrollTo(0, 0);
    }, []);

    // State
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
    const [quantities, setQuantities] = useState({});
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    // Customer form for order
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        city: '',
        address: ''
    });

    // Handle Quantity change
    const updateQty = (id, newQty) => {
        const val = Math.max(0, parseInt(newQty) || 0);
        setQuantities(prev => {
            const next = { ...prev };
            if (val === 0) {
                delete next[id];
            } else {
                next[id] = val;
            }
            return next;
        });
    };

    const clearCart = () => {
        if (window.confirm("உங்கள் ஆர்டர் பட்டியலை அழிக்க வேண்டுமா? (Clear your order list?)")) {
            setQuantities({});
        }
    };

    // Filter products
    const filteredProducts = useMemo(() => {
        return priceListProducts.filter(item => {
            const matchesCat = selectedCategory === 'all' || item.categoryKey === selectedCategory;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q ||
                item.nameEn.toLowerCase().includes(q) ||
                item.nameTa.includes(q) ||
                String(item.sno) === q;
            return matchesCat && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Calculations
    const cartSummary = useMemo(() => {
        let totalItems = 0;
        let totalUnits = 0;
        let totalMrp = 0;
        let totalDiscounted = 0;
        const selectedItems = [];

        priceListProducts.forEach(product => {
            const qty = quantities[product.id] || 0;
            if (qty > 0) {
                totalItems += 1;
                totalUnits += qty;
                totalMrp += product.price * qty;
                totalDiscounted += product.discountPrice * qty;
                selectedItems.push({
                    ...product,
                    qty,
                    subtotal: product.discountPrice * qty,
                    mrpSubtotal: product.price * qty
                });
            }
        });

        const totalSavings = totalMrp - totalDiscounted;
        const savingsPercent = totalMrp > 0 ? Math.round((totalSavings / totalMrp) * 100) : 0;

        return {
            totalItems,
            totalUnits,
            totalMrp,
            totalDiscounted,
            totalSavings,
            savingsPercent,
            selectedItems
        };
    }, [quantities]);

    // WhatsApp Order Submission
    const handleSendWhatsAppOrder = (e) => {
        if (e) e.preventDefault();
        if (cartSummary.totalItems === 0) {
            alert("தயவுசெய்து குறைந்தது ஒரு பொருளையாவது தேர்வு செய்யவும். (Please add at least one item).");
            return;
        }
        if (!customer.name.trim() || !customer.phone.trim()) {
            alert("தயவுசெய்து உங்கள் பெயர் மற்றும் வாட்ஸ்அப் எண்ணை உள்ளிடவும். (Please enter your name and phone number).");
            return;
        }

        let orderItemsText = "";
        cartSummary.selectedItems.forEach((item, idx) => {
            orderItemsText += `${idx + 1}. *${item.nameTa}* (${item.nameEn}) [S.No: ${item.sno}]\n` +
                              `   ↳ ${item.qty} ${item.per} x ₹${item.discountPrice} = *₹${item.subtotal.toLocaleString('en-IN')}*\n`;
        });

        const waText =
`🎆 *VINAYAGA CRACKERS SIVAKASI* 🎆
*தீபாவளி பட்டாசு நேரடி கொள்முதல் பட்டியல்*
----------------------------------------
👤 *வாடிக்கையாளர்:* ${customer.name.trim()}
📱 *தொலைபேசி:* ${customer.phone.trim()}
📍 *ஊர் / முகவரி:* ${customer.city.trim() || 'N/A'} ${customer.address.trim() ? `, ${customer.address.trim()}` : ''}
----------------------------------------
📋 *தேர்ந்தெடுக்கப்பட்ட பட்டாசுகள் (${cartSummary.totalItems} பொருட்கள், ${cartSummary.totalUnits} எண்ணிக்கை):*
${orderItemsText}
----------------------------------------
🏷️ *அசல் MRP மதிப்பு:* ₹${cartSummary.totalMrp.toLocaleString('en-IN')}
💰 *90% தள்ளுபடி நிகர தொகை:* ₹${cartSummary.totalDiscounted.toLocaleString('en-IN')}
🎉 *நீங்கள் சேமிக்கும் தொகை:* ₹${cartSummary.totalSavings.toLocaleString('en-IN')} (${cartSummary.savingsPercent}% சேமிப்பு)
----------------------------------------
வணக்கம் Vinayaga Crackers, மேற்கண்ட ஆர்டருக்கான இருப்பு மற்றும் பார்சல் விபரங்களை உறுதி செய்து அனுப்பவும். நன்றி!`;

        const waUrl = `https://wa.me/918940921075?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
        setShowCheckoutModal(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-32">
            
            {/* ── Top Festive Banner ── */}
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 shadow-xl border-b-4 border-amber-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    
                    {/* Pink Pill Badge matching uploaded image */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#E11D48] to-[#BE123C] text-white text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg mb-4">
                        <Sparkles size={16} className="text-amber-300 animate-spin-slow" />
                        <span>PRICE LIST - 2026 • நேரடி சிவகாசி மொத்த விலை</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-cinzel tracking-tight text-white mb-3">
                        DIWALI BUYING SECTION
                    </h1>
                    <p className="text-amber-300 font-tamil text-xl sm:text-2xl font-bold mb-4">
                        பட்டாசுகளின் அதிகாரப்பூர்வ விலைப்பட்டியல் & கொள்முதல் படிவம்
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto font-medium font-tamil leading-relaxed">
                        தேவையான எண்ணிக்கையை (Requirement) உள்ளிட்டு உடனடியாக நேரடி சிவகாசி வாட்ஸ்அப் ஆர்டர் செய்யுங்கள். 90% வரை நேரடி தள்ளுபடி!
                    </p>

                    {/* Quick Highlights */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-bold text-slate-200">
                        <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                            <CheckCircle2 size={15} className="text-emerald-400" /> 90% நேரடி தொழிற்சாலை தள்ளுபடி
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                            <ShieldCheck size={15} className="text-amber-400" /> 100% பசுமை பட்டாசுகள் (Green Crackers)
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                            <Sparkles size={15} className="text-rose-400" /> அனைத்து தமிழ்நாடு & இந்தியா பார்சல் டெலிவரி
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Main Content Container ── */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
                
                {/* ── Controls Bar: Category Tabs, Search, View Mode ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 mb-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        
                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold font-tamil transition-all flex items-center gap-2 cursor-pointer ${
                                    selectedCategory === 'all'
                                        ? 'bg-[#0F172A] text-white shadow-md'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                            >
                                <span>அனைத்து பிரிவுகளும் (All)</span>
                                <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-white/20">
                                    {priceListProducts.length}
                                </span>
                            </button>

                            {priceListCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-bold font-tamil transition-all flex items-center gap-2 cursor-pointer ${
                                        selectedCategory === cat.id
                                            ? 'bg-[#E11D48] text-white shadow-md'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    }`}
                                >
                                    <span>{cat.titleTa}</span>
                                    <span className="text-[10px] opacity-80 hidden sm:inline">({cat.titleEn})</span>
                                    <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-white/20">
                                        {cat.itemCount}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Search and View Mode */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="பட்டாசு பெயர் / எண் தேடுங்கள்..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-xs font-tamil rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-slate-50 focus:bg-white"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* View Switcher */}
                            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-tamil transition-all cursor-pointer ${
                                        viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                                    }`}
                                    title="விலைப்பட்டியல் படிவம் (Table View)"
                                >
                                    படிவம்
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-tamil transition-all cursor-pointer ${
                                        viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                                    }`}
                                    title="கார்டுகள் (Cards Grid View)"
                                >
                                    கார்டுகள்
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Product List / Table Display ── */}
                {viewMode === 'table' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                        {/* Mobile Swipe Hint */}
                        <div className="md:hidden flex items-center justify-between px-3.5 py-2 bg-amber-50 border-b border-amber-200 text-[11px] font-tamil text-amber-900 font-semibold">
                            <span>👉 இடது/வலதுபுறம் நகர்த்தவும் (Swipe to view full table)</span>
                            <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded">90% OFF</span>
                        </div>
                        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
                            <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-[760px]">
                                <thead>
                                    <tr className="bg-[#F1F5F9] text-slate-800 text-[11px] sm:text-xs font-black uppercase tracking-wider border-b-2 border-slate-300">
                                        <th className="py-4 px-4 text-center w-16">S.No</th>
                                        <th className="py-4 px-4">PRODUCT NAME<br /><span className="text-[11px] font-tamil font-bold text-rose-600">பட்டாசுகளின் பெயர்</span></th>
                                        <th className="py-4 px-4 text-center w-24">PRICE<br /><span className="text-[10px] text-slate-500 font-normal">MRP (₹)</span></th>
                                        <th className="py-4 px-4 text-center w-28 bg-rose-50 text-rose-700">90% Discount Price<br /><span className="text-[10px] font-normal">தள்ளுபடி விலை (₹)</span></th>
                                        <th className="py-4 px-4 text-center w-20">PER</th>
                                        <th className="py-4 px-4 text-center w-36 bg-amber-50/50">Requirement<br /><span className="text-[11px] font-tamil font-bold text-amber-700">எண்ணிக்கை</span></th>
                                        <th className="py-4 px-4 text-center w-28">Amount<br /><span className="text-[10px] text-slate-500 font-normal">தொகை (₹)</span></th>
                                        <th className="py-4 px-4 text-center w-20">Photo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-sm">
                                    {priceListCategories.map(category => {
                                        const catItems = filteredProducts.filter(p => p.categoryKey === category.id);
                                        if (catItems.length === 0) return null;

                                        return (
                                            <React.Fragment key={category.id}>
                                                {/* Category Subheader Pill Row matching reference photo */}
                                                <tr className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-white shadow-inner">
                                                    <td colSpan={8} className="py-3 px-6">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Flame size={18} className="text-amber-300" />
                                                                <span className="font-black text-sm sm:text-base tracking-wide uppercase">
                                                                    {category.titleEn} - <span className="font-tamil">{category.titleTa}</span>
                                                                </span>
                                                            </div>
                                                            <span className="text-[11px] bg-black/20 px-3 py-1 rounded-full font-bold">
                                                                {catItems.length} பொருட்கள்
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Category Product Rows */}
                                                {catItems.map((product) => {
                                                    const qty = quantities[product.id] || 0;
                                                    const amount = qty * product.discountPrice;

                                                    return (
                                                        <tr
                                                            key={product.id}
                                                            className={`transition-colors hover:bg-slate-50 ${qty > 0 ? 'bg-amber-50/30' : ''}`}
                                                        >
                                                            {/* S.No */}
                                                            <td className="py-3.5 px-4 text-center font-black text-base text-slate-800">
                                                                {product.sno}
                                                            </td>

                                                            {/* Product Names */}
                                                            <td className="py-3.5 px-4">
                                                                <div className="font-bold text-slate-900 text-sm sm:text-base">
                                                                    {product.nameEn}
                                                                </div>
                                                                <div className="text-xs sm:text-sm font-bold font-tamil text-rose-600 mt-0.5">
                                                                    {product.nameTa}
                                                                </div>
                                                            </td>

                                                            {/* Original MRP */}
                                                            <td className="py-3.5 px-4 text-center text-slate-400 font-bold line-through">
                                                                ₹{product.price}
                                                            </td>

                                                            {/* 90% Discount Price */}
                                                            <td className="py-3.5 px-4 text-center bg-rose-50/70 font-black text-rose-700 text-base">
                                                                ₹{product.discountPrice}
                                                            </td>

                                                            {/* Per */}
                                                            <td className="py-3.5 px-4 text-center text-xs font-bold text-slate-600">
                                                                {product.per}
                                                            </td>

                                                            {/* Requirement (Quantity field with stepper) */}
                                                            <td className="py-3.5 px-4 bg-amber-50/30">
                                                                <div className="flex items-center justify-center gap-1.5">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => updateQty(product.id, qty - 1)}
                                                                        disabled={qty === 0}
                                                                        className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 font-bold transition-all cursor-pointer"
                                                                    >
                                                                        <Minus size={13} />
                                                                    </button>

                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        value={qty === 0 ? '' : qty}
                                                                        placeholder="0"
                                                                        onChange={e => updateQty(product.id, e.target.value)}
                                                                        className="w-14 text-center py-1 rounded-lg border-2 border-slate-300 focus:border-rose-500 focus:outline-none font-black text-slate-900 text-sm bg-white"
                                                                    />

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => updateQty(product.id, qty + 1)}
                                                                        className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center font-bold transition-all cursor-pointer shadow-sm"
                                                                    >
                                                                        <Plus size={13} />
                                                                    </button>
                                                                </div>
                                                            </td>

                                                            {/* Amount */}
                                                            <td className="py-3.5 px-4 text-center font-black text-slate-900 text-base">
                                                                {amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : '-'}
                                                            </td>

                                                            {/* Photo Preview */}
                                                            <td className="py-3.5 px-4 text-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setPreviewPhoto(product)}
                                                                    className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 hover:border-rose-500 mx-auto block group transition-all cursor-pointer"
                                                                    title="படத்தை பெரிதாக்குக (View Photo)"
                                                                >
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.nameEn}
                                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    /* ── Grid View: Cards Layout ── */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                        {filteredProducts.map(product => {
                            const qty = quantities[product.id] || 0;
                            const amount = qty * product.discountPrice;

                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Image Header with S.No & Discount Badge */}
                                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#DC2626] text-white shadow-md z-10">
                                                90% OFF
                                            </span>
                                            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-900/80 text-white backdrop-blur-md z-10">
                                                #{product.sno}
                                            </span>
                                            <img
                                                src={product.image}
                                                alt={product.nameEn}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                                                {product.categoryTa}
                                            </span>
                                            <h3 className="font-black text-slate-900 text-sm mt-1.5 leading-tight">
                                                {product.nameEn}
                                            </h3>
                                            <p className="text-xs font-bold text-slate-600 font-tamil mt-0.5">
                                                {product.nameTa}
                                            </p>

                                            {/* Price Tag */}
                                            <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-slate-100">
                                                <span className="text-xs text-slate-400 line-through">
                                                    ₹{product.price}
                                                </span>
                                                <span className="text-xl font-black text-rose-600">
                                                    ₹{product.discountPrice}
                                                </span>
                                                <span className="text-[11px] font-bold text-slate-500 ml-auto">
                                                    / {product.per}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Stepper */}
                                    <div className="p-4 pt-0">
                                        <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                            <span className="text-[11px] font-bold font-tamil text-slate-700">
                                                தேவை (Qty):
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => updateQty(product.id, qty - 1)}
                                                    disabled={qty === 0}
                                                    className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-30 text-slate-800 font-bold flex items-center justify-center cursor-pointer"
                                                >
                                                    <Minus size={13} />
                                                </button>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={qty === 0 ? '' : qty}
                                                    placeholder="0"
                                                    onChange={e => updateQty(product.id, e.target.value)}
                                                    className="w-12 text-center py-1 rounded-md border border-slate-300 font-black text-sm bg-white"
                                                />
                                                <button
                                                    onClick={() => updateQty(product.id, qty + 1)}
                                                    className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center justify-center cursor-pointer"
                                                >
                                                    <Plus size={13} />
                                                </button>
                                            </div>
                                        </div>
                                        {amount > 0 && (
                                            <div className="mt-2 text-right text-xs font-black text-emerald-700">
                                                தொகை: ₹{amount.toLocaleString('en-IN')}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Advertising Purpose Disclaimer */}
                <div className="mt-8 mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                    <p className="text-xs text-amber-900 font-tamil font-semibold">
                        ⚠️ <span className="font-bold">முக்கிய குறிப்பு:</span> இணையதளத்தில் உள்ள படங்கள் அனைத்தும் விளம்பர மற்றும் மாதிரி நோக்கத்திற்காக மட்டுமே. அசல் பெட்டியின் கவர் வடிவமைப்பு மற்றும் பிராண்ட் இருப்புக்கு ஏற்ப மாறுபடலாம்.
                    </p>
                    <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                        * Note: Images shown are for advertising / representation purposes only. Actual brand packaging may vary.
                    </p>
                </div>
            </div>

            {/* ── Sticky Order Summary Footer Bar ── */}
            <AnimatePresence>
                {cartSummary.totalItems > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A] text-white shadow-2xl border-t-2 border-amber-500 p-3 sm:py-3.5 sm:px-4"
                    >
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
                            
                            {/* Stats */}
                            <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-8 flex-wrap">
                                <div>
                                    <div className="text-[10px] text-slate-400 font-tamil uppercase">
                                        தேர்ந்தெடுத்தவை
                                    </div>
                                    <div className="text-sm sm:text-lg font-black text-amber-300">
                                        {cartSummary.totalItems} வகைகள் ({cartSummary.totalUnits} எண்)
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <div className="text-[10px] text-slate-400 font-tamil uppercase">
                                        அசல் மதிப்பு (MRP)
                                    </div>
                                    <div className="text-sm font-bold text-slate-400 line-through">
                                        ₹{cartSummary.totalMrp.toLocaleString('en-IN')}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-[10px] text-emerald-400 font-tamil uppercase font-bold">
                                        தள்ளுபடி நிகர தொகை
                                    </div>
                                    <div className="text-lg sm:text-2xl font-black text-white">
                                        ₹{cartSummary.totalDiscounted.toLocaleString('en-IN')}
                                    </div>
                                </div>

                                <div className="hidden lg:block">
                                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                                        சேமிப்பு: ₹{cartSummary.totalSavings.toLocaleString('en-IN')} (90% OFF)
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={clearCart}
                                    title="அனைத்தையும் நீக்கு (Clear)"
                                    className="p-2.5 sm:p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <button
                                    onClick={() => window.print()}
                                    title="பிரிண்ட் செய்க (Print Estimate)"
                                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all hidden sm:block cursor-pointer shrink-0"
                                >
                                    <Printer size={16} />
                                </button>

                                <button
                                    onClick={() => setShowCheckoutModal(true)}
                                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#F59E0B] hover:brightness-110 active:scale-95 text-white font-black text-xs sm:text-sm font-tamil uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                                >
                                    <ShoppingCart size={15} />
                                    <span>ஆர்டர் செய்க (Submit Order)</span>
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Photo Preview Lightbox Modal ── */}
            <AnimatePresence>
                {previewPhoto && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setPreviewPhoto(null)}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center z-10"
                            >
                                <X size={18} />
                            </button>
                            <div className="h-64 bg-slate-100 overflow-hidden">
                                <img
                                    src={previewPhoto.image}
                                    alt={previewPhoto.nameEn}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <div className="text-xs font-bold text-rose-600">{previewPhoto.categoryTa}</div>
                                <h3 className="text-lg font-black text-slate-900 mt-1">{previewPhoto.nameEn}</h3>
                                <p className="text-sm font-bold font-tamil text-slate-600">{previewPhoto.nameTa}</p>
                                <div className="flex items-baseline gap-2 mt-4 pt-3 border-t border-slate-200">
                                    <span className="text-sm text-slate-400 line-through">₹{previewPhoto.price}</span>
                                    <span className="text-2xl font-black text-rose-600">₹{previewPhoto.discountPrice}</span>
                                    <span className="text-xs text-slate-500 font-bold ml-auto">/ {previewPhoto.per}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── WhatsApp Checkout / Booking Modal ── */}
            <AnimatePresence>
                {showCheckoutModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh] my-4"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-6 relative">
                                <button
                                    onClick={() => setShowCheckoutModal(false)}
                                    className="absolute top-5 right-5 text-slate-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-tamil mb-1">
                                    <Sparkles size={14} /> நேரடி வாட்ஸ்அப் பட்டாசு ஆர்டர்
                                </div>
                                <h2 className="text-2xl font-black font-cinzel text-white">
                                    CONFIRM DIWALI ORDER
                                </h2>
                                <p className="text-xs text-slate-300 font-tamil mt-1">
                                    விவரங்களை பூர்த்தி செய்து உடனடியாக ஆர்டர் அனுப்புங்கள்
                                </p>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSendWhatsAppOrder} className="p-6 space-y-5">
                                
                                {/* Order Overview Pill */}
                                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold font-tamil text-slate-700">
                                            மொத்த பொருட்கள்: <span className="text-rose-600 font-black">{cartSummary.totalItems}</span> ({cartSummary.totalUnits} எண்ணிக்கை)
                                        </div>
                                        <div className="text-xs text-slate-500 line-through">
                                            MRP: ₹{cartSummary.totalMrp.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-slate-500 font-tamil font-bold uppercase">செலுத்த வேண்டியது</div>
                                        <div className="text-2xl font-black text-rose-600">
                                            ₹{cartSummary.totalDiscounted.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-3.5">
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 font-tamil mb-1">
                                            உங்கள் பெயர் (Full Name) *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="எ.கா: சுந்தர் / Sundar"
                                            value={customer.name}
                                            onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none text-sm font-bold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-slate-700 font-tamil mb-1">
                                            வாட்ஸ்அப் எண் (WhatsApp Number) *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="எ.கா: 9876543210"
                                            value={customer.phone}
                                            onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none text-sm font-bold"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-black text-slate-700 font-tamil mb-1">
                                                ஊர் / மாவட்டம் (City / District) *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="எ.கா: சென்னை / மதுரை"
                                                value={customer.city}
                                                onChange={e => setCustomer({ ...customer, city: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none text-sm font-bold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-slate-700 font-tamil mb-1">
                                                முழு முகவரி (Full Address)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="தெரு / பின் கோடு"
                                                value={customer.address}
                                                onChange={e => setCustomer({ ...customer, address: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none text-sm font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit to WhatsApp */}
                                <div className="pt-3">
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm font-tamil uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
                                    >
                                        <PhoneCall size={18} />
                                        <span>வாட்ஸ்அப்பில் ஆர்டரை அனுப்புக (Send via WhatsApp)</span>
                                    </button>
                                    <p className="text-center text-[11px] text-slate-500 font-tamil mt-2">
                                        ஆர்டரை அனுப்பியதும் எங்கள் விற்பனை குழுவினர் உடனே உங்களை தொடர்புகொள்வார்கள்.
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BuyingSection;
