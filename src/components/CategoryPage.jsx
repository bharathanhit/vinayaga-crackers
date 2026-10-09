import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, Sparkles, Flame, Percent, ShieldCheck, Tag, ShoppingCart, PhoneCall, Minus, Plus, X } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts, categories as staticCategories } from '../data/products';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';

const ProductCard = ({ product, index, qty, onUpdateQty, onQuickOrder }) => {
    const imgSrc = product.imageUrl || product.image;
    const priceNum = parseInt(String(product.price || '0').replace(/\D/g, '')) || 0;
    const mrpNum = parseInt(String(product.originalPrice || '0').replace(/\D/g, '')) || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`group relative bg-[#111827] border rounded-[2rem] overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between ${
                qty > 0 ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.25)] ring-2 ring-amber-400/40' : 'border-amber-500/20 hover:border-amber-400/50'
            }`}
        >
            {/* Top Image Box */}
            <div className="relative h-60 sm:h-64 overflow-hidden bg-black/60">
                <img
                    src={imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/40" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    {product.sno && (
                        <span className="px-2.5 py-0.5 bg-black/80 border border-amber-400/50 rounded-lg text-[10px] font-black text-amber-300 w-fit">
                            S.No: #{product.sno}
                        </span>
                    )}
                    {product.discount && (
                        <span className="px-2.5 py-0.5 bg-rose-600 rounded-full text-[9px] font-black text-white uppercase tracking-wider flex items-center gap-1 shadow-md w-fit">
                            <Percent size={10} /> {product.discount}
                        </span>
                    )}
                </div>

                {/* Price Display */}
                <div className="absolute bottom-3 right-3 z-20">
                    <div className="px-3.5 py-1.5 bg-black/85 backdrop-blur-md rounded-2xl border border-amber-400/50 text-right shadow-lg">
                        {product.originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through mr-2 font-semibold">{product.originalPrice}</span>
                        )}
                        <span className="text-lg font-black text-amber-300">{product.price || 'Wholesale Rate'}</span>
                        <span className="text-[10px] text-slate-400 block -mt-1 font-bold">{product.per || '1 Unit'}</span>
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-1 font-tamil group-hover:text-amber-300 transition-colors line-clamp-1">
                        {product.nameTa || product.title}
                    </h3>
                    <p className="text-amber-400/90 text-xs font-bold uppercase tracking-wider mb-2 font-cinzel line-clamp-1">
                        {product.nameEn || product.title}
                    </p>
                    
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 font-tamil">
                        {product.description}
                    </p>
                </div>

                {/* Quantity Controls & Add to Cart */}
                <div className="mt-5 pt-4 border-t border-white/10">
                    {qty > 0 ? (
                        <div className="flex items-center justify-between gap-2 bg-[#090D18] p-1.5 rounded-2xl border border-amber-400/60 shadow-inner">
                            <button
                                onClick={() => onUpdateQty(product.id, qty - 1)}
                                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-rose-600 text-white font-black flex items-center justify-center transition-colors active:scale-95"
                                title="Decrease quantity"
                            >
                                <Minus size={15} />
                            </button>
                            
                            <div className="text-center px-2">
                                <span className="text-base font-black text-amber-300 block leading-none">{qty}</span>
                                <span className="text-[9px] text-slate-400 font-bold">
                                    = ₹{(priceNum * qty).toLocaleString('en-IN')}
                                </span>
                            </div>

                            <button
                                onClick={() => onUpdateQty(product.id, qty + 1)}
                                className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center justify-center transition-colors active:scale-95 shadow"
                                title="Increase quantity"
                            >
                                <Plus size={15} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onUpdateQty(product.id, 1)}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black font-tamil text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                <ShoppingCart size={15} />
                                <span>ஆர்டர் செய்க (Add)</span>
                            </button>
                            <button
                                onClick={() => onQuickOrder(product)}
                                className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 transition-colors"
                                title="Direct WhatsApp Order"
                            >
                                <PhoneCall size={15} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const CategoryPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        city: '',
        address: ''
    });

    // Resolve category info
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'categories'), (snap) => {
            const staticCat = staticCategories.find(c => c.slug === slug);
            if (!snap.empty) {
                const firestoreCat = snap.docs.map(d => ({ id: d.id, ...d.data() })).find(c => c.slug === slug);
                if (firestoreCat) setCategory({ ...staticCat, ...firestoreCat });
                else setCategory(staticCat || null);
            } else setCategory(staticCat || null);
            setLoading(false);
        }, () => {
            setCategory(staticCategories.find(c => c.slug === slug) || null);
            setLoading(false);
        });
        return unsub;
    }, [slug]);

    useEffect(() => {
        if (category) {
            document.title = `${category.titleTa || category.title} | Vinayaga Supreme Crackers Sivakasi`;
        }
    }, [category]);

    // Fetch products
    useEffect(() => {
        const q = query(
            collection(db, 'products'),
            where('categorySlug', '==', slug)
        );
        const unsub = onSnapshot(q, (snap) => {
            const filteredStatic = staticProducts.filter(p => p.categorySlug === slug);
            let merged = [...filteredStatic];
            if (!snap.empty) {
                const firestoreProducts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                firestoreProducts.forEach(fp => {
                    const idx = merged.findIndex(p => p.title === fp.title);
                    if (idx !== -1) {
                        merged[idx] = { ...merged[idx], ...fp };
                    } else {
                        merged.push(fp);
                    }
                });
            }
            merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setCategoryProducts(merged);
            setLoading(false);
        }, () => {
            setCategoryProducts(staticProducts.filter(p => p.categorySlug === slug));
            setLoading(false);
        });
        return unsub;
    }, [slug]);

    // Handle Quantity updates
    const updateQty = (id, newQty) => {
        const val = Math.max(0, parseInt(newQty) || 0);
        setQuantities(prev => {
            const next = { ...prev };
            if (val === 0) delete next[id];
            else next[id] = val;
            return next;
        });
    };

    // Quick single product enquiry
    const handleQuickOrder = (product) => {
        const msg = encodeURIComponent(
            `வணக்கம் Vinayaga Supreme Crackers Sivakasi, நான் "${product.nameTa || product.title} (${product.nameEn || product.title}) - ${product.price}" பற்றி விபரம் பெற & ஆர்டர் செய்ய விரும்புகிறேன்.`
        );
        window.open(`https://wa.me/918940921075?text=${msg}`, '_blank');
    };

    // Cart calculations
    const cartSummary = useMemo(() => {
        let totalItems = 0;
        let totalUnits = 0;
        let totalMrp = 0;
        let totalDiscounted = 0;
        const selectedItems = [];

        categoryProducts.forEach(product => {
            const qty = quantities[product.id] || 0;
            if (qty > 0) {
                const priceNum = parseInt(String(product.price || '0').replace(/\D/g, '')) || 0;
                const mrpNum = parseInt(String(product.originalPrice || '0').replace(/\D/g, '')) || priceNum;
                totalItems += 1;
                totalUnits += qty;
                totalMrp += mrpNum * qty;
                totalDiscounted += priceNum * qty;
                selectedItems.push({
                    ...product,
                    qty,
                    priceNum,
                    mrpNum,
                    subtotal: priceNum * qty,
                    mrpSubtotal: mrpNum * qty
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
    }, [quantities, categoryProducts]);

    // Submit WhatsApp Enquiry / Order
    const handleSendWhatsAppOrder = (e) => {
        if (e) e.preventDefault();
        if (cartSummary.totalItems === 0) {
            alert("தயவுசெய்து குறைந்தது ஒரு பட்டாசையாவது தேர்வு செய்யவும். (Please add at least one cracker).");
            return;
        }
        if (!customer.name.trim() || !customer.phone.trim()) {
            alert("தயவுசெய்து உங்கள் பெயர் மற்றும் வாட்ஸ்அப் எண்ணை உள்ளிடவும். (Please enter your name & phone number).");
            return;
        }

        let orderItemsText = "";
        cartSummary.selectedItems.forEach((item, idx) => {
            orderItemsText += `${idx + 1}. *${item.nameTa || item.title}* (${item.nameEn || item.title}) [S.No: ${item.sno || 'N/A'}]\n` +
                              `   ↳ ${item.qty} ${item.per || 'Pkt'} x ₹${item.priceNum} = *₹${item.subtotal.toLocaleString('en-IN')}*\n`;
        });

        const waText =
`🎆 *VINAYAGA SUPREME CRACKERS SIVAKASI* 🎆
*பட்டாசு கொள்முதல் & இருப்பு விபரம் கோரிக்கை (Enquiry)*
----------------------------------------
👤 *வாடிக்கையாளர்:* ${customer.name.trim()}
📱 *தொலைபேசி:* ${customer.phone.trim()}
📍 *ஊர் / முகவரி:* ${customer.city.trim() || 'N/A'} ${customer.address.trim() ? `, ${customer.address.trim()}` : ''}
📂 *பிரிவு:* ${category?.titleTa || category?.title || 'Diwali Crackers'}
----------------------------------------
📋 *தேர்ந்தெடுக்கப்பட்ட பட்டாசுகள் (${cartSummary.totalItems} வகைகள், ${cartSummary.totalUnits} எண்ணிக்கை):*
${orderItemsText}
----------------------------------------
🏷️ *அசல் MRP மதிப்பு:* ₹${cartSummary.totalMrp.toLocaleString('en-IN')}
💰 *தள்ளுபடி நிகர தொகை:* ₹${cartSummary.totalDiscounted.toLocaleString('en-IN')}
🎉 *நீங்கள் சேமிக்கும் தொகை:* ₹${cartSummary.totalSavings.toLocaleString('en-IN')} (${cartSummary.savingsPercent}% சேமிப்பு)
----------------------------------------
வணக்கம் Vinayaga Supreme Crackers, மேற்கண்ட பட்டாசுகளுக்கான இருப்பு மற்றும் டெலிவரி விபரங்களை அனுப்பவும். நன்றி!`;

        const waUrl = `https://wa.me/918940921075?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');
        setShowCheckoutModal(false);
    };

    if (!loading && !category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white bg-night pt-52">
                <h2 className="text-3xl font-black mb-4 font-cinzel">Category Not Found</h2>
                <Link to="/#products" className="text-amber-400 underline font-bold">← Back to All Crackers</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#070A14] text-white pb-32">

            {/* Hero Banner */}
            <div className="relative min-h-[320px] md:min-h-[460px] overflow-hidden bg-gradient-to-br from-[#1E0B0B] via-[#070A14] to-black">
                {category && (
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.35 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src={category.imageUrl || category.image}
                        alt={category.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/70 to-transparent z-0" />

                <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-36 pb-8 sm:pb-12">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between flex-wrap gap-2.5 mb-5 sm:mb-6"
                    >
                        <Link 
                            to="/#" 
                            className="inline-flex items-center gap-1.5 text-white bg-white/10 hover:bg-amber-500 hover:text-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl backdrop-blur-md border border-white/10 text-xs font-bold transition-all"
                        >
                            <ArrowLeft size={14} />
                            முகப்பு (Home)
                        </Link>
                        
                        <div className="flex items-center gap-2">
                            <Link 
                                to="/buy" 
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
                            >
                                <Sparkles size={14} /> முழு விலைப்பட்டியல் (Price List)
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-rose-600/30 border border-rose-500/50 text-rose-200 text-[10px] sm:text-[11px] font-black uppercase tracking-wider font-tamil shadow-lg">
                            <Sparkles size={13} className="text-amber-400" /> 90% வரை நேரடி தள்ளுபடி • Up to 90% OFF Direct Sivakasi Wholesale
                        </div>
                        
                        <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white mb-1.5 sm:mb-2 font-tamil">
                            {category?.titleTa || category?.title}
                        </h1>
                        <p className="text-amber-400 text-xs sm:text-base font-bold uppercase tracking-wider font-cinzel mb-2 sm:mb-3">
                            {category?.title}
                        </p>
                        
                        <p className="text-slate-300 text-xs sm:text-base font-normal leading-relaxed max-w-2xl font-tamil">
                            {category?.descTa || category?.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Products Grid */}
            <section className="py-8 md:py-16 bg-[#070A14] relative">
                <div className="container mx-auto px-3 sm:px-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 border-b border-white/10">
                        <div>
                            <span className="text-amber-400 text-xs font-black uppercase tracking-widest font-tamil">
                                {categoryProducts.length} பட்டாசு வகைகள் உள்ளன
                            </span>
                            <h2 className="text-lg sm:text-2xl font-black text-white font-tamil mt-0.5">
                                தேவையான எண்ணிக்கையை தேர்வு செய்யவும்
                            </h2>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                            {cartSummary.totalItems > 0 && (
                                <button
                                    onClick={() => setShowCheckoutModal(true)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                                >
                                    <ShoppingCart size={14} />
                                    <span>ஆர்டர் படிவம் ({cartSummary.totalItems})</span>
                                </button>
                            )}
                            <a
                                href="https://wa.me/918940921075?text=வணக்கம்%20Vinayaga%20Supreme%20Crackers%20Sivakasi,%20பட்டாசு%20ஆர்டர்%20செய்ய%20விரும்புகிறேன்."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow transition-all"
                            >
                                <PhoneCall size={13} /> WhatsApp
                            </a>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="rounded-[2rem] bg-slate-800/50 animate-pulse h-80" />
                            ))}
                        </div>
                    ) : categoryProducts.length === 0 ? (
                        <div className="text-center py-20 rounded-3xl border border-white/10 bg-white/5">
                            <Flame size={36} className="mx-auto text-amber-500 mb-4" />
                            <p className="text-slate-300 text-base sm:text-lg font-bold font-tamil">இப்பிரிவிற்கான பட்டாசுகள் புதுப்பிக்கப்பட்டு வருகின்றன.</p>
                            <p className="text-slate-500 text-xs sm:text-sm mt-1">வாட்ஸ்அப் மூலம் உடனடியாக தொடர்பு கொள்ளவும்.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {categoryProducts.map((product, idx) => (
                                <ProductCard 
                                    key={product.id || product.docId} 
                                    index={idx} 
                                    product={product} 
                                    qty={quantities[product.id] || 0}
                                    onUpdateQty={updateQty}
                                    onQuickOrder={handleQuickOrder}
                                />
                            ))}
                        </div>
                    )}

                    {/* Advertising Purpose Disclaimer */}
                    <div className="mt-8 sm:mt-10 text-center px-2">
                        <p className="text-[11px] sm:text-xs text-slate-400 font-tamil font-medium">
                            * புகைப்படங்கள் விளம்பர நோக்கத்திற்காக மட்டுமே • Images shown are for advertising / representation purpose only. Actual packaging may vary.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Sticky Bottom Cart & Enquiry Bar ── */}
            <AnimatePresence>
                {cartSummary.totalItems > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-40 bg-[#090D18]/95 backdrop-blur-xl border-t-2 border-amber-400 px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.7)]"
                    >
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
                            {/* Summary Totals */}
                            <div className="flex items-center gap-3 text-left w-full sm:w-auto justify-between sm:justify-start">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow">
                                    <ShoppingCart size={18} />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[11px] sm:text-xs text-slate-300 font-tamil font-bold truncate">
                                            {cartSummary.totalItems} வகைகள் ({cartSummary.totalUnits} எண்ணிக்கை)
                                        </span>
                                        <span className="text-base sm:text-lg font-black text-amber-300">
                                            ₹{cartSummary.totalDiscounted.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-emerald-400 font-bold block">
                                        சேமிப்பு: ₹{cartSummary.totalSavings.toLocaleString('en-IN')} ({cartSummary.savingsPercent}% OFF)
                                    </span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setQuantities({})}
                                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-rose-900/60 text-slate-300 hover:text-white text-[11px] sm:text-xs font-bold font-tamil transition-colors shrink-0"
                                >
                                    அழி (Clear)
                                </button>
                                
                                <button
                                    onClick={() => setShowCheckoutModal(true)}
                                    className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black font-tamil text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    <span>ஆர்டர் விபரம் சமர்ப்பிக்க</span>
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Direct Order Enquiry Modal ── */}
            <AnimatePresence>
                {showCheckoutModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0F172A] border-2 border-amber-400 rounded-3xl p-5 sm:p-8 max-w-lg w-full text-white shadow-2xl relative overflow-y-auto max-h-[90vh] my-4"
                        >
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                                <div>
                                    <h3 className="text-xl font-black font-tamil text-amber-300">
                                        நேரடி பட்டாசு கொள்முதல் படிவம்
                                    </h3>
                                    <p className="text-xs text-slate-400">Direct Sivakasi WhatsApp Order Enquiry</p>
                                </div>
                                <button
                                    onClick={() => setShowCheckoutModal(false)}
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Order Quick Overview */}
                            <div className="bg-[#1E293B] p-4 rounded-2xl mb-5 border border-white/10 text-xs">
                                <div className="flex justify-between font-bold mb-1">
                                    <span className="text-slate-300">தேர்ந்தெடுத்த பட்டாசுகள்:</span>
                                    <span className="text-white">{cartSummary.totalItems} வகைகள் ({cartSummary.totalUnits} எண்ணிக்கை)</span>
                                </div>
                                <div className="flex justify-between font-bold mb-1">
                                    <span className="text-slate-300">மொத்த மதிப்பு:</span>
                                    <span className="text-amber-300 text-sm font-black">₹{cartSummary.totalDiscounted.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-emerald-400 font-bold">
                                    <span>மொத்த சேமிப்பு:</span>
                                    <span>₹{cartSummary.totalSavings.toLocaleString('en-IN')} ({cartSummary.savingsPercent}% OFF)</span>
                                </div>
                            </div>

                            {/* Customer Details Form */}
                            <form onSubmit={handleSendWhatsAppOrder} className="space-y-3.5">
                                <div>
                                    <label className="block text-xs font-bold font-tamil text-slate-300 mb-1">
                                        உங்கள் பெயர் (Full Name) *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="எ.கா: செந்தில் குமார்"
                                        value={customer.name}
                                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                        className="w-full bg-[#1E293B] border border-white/20 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold font-tamil text-slate-300 mb-1">
                                        வாட்ஸ்அப் எண் (WhatsApp Phone) *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="எ.கா: 9876543210"
                                        value={customer.phone}
                                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                        className="w-full bg-[#1E293B] border border-white/20 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold font-tamil text-slate-300 mb-1">
                                        ஊர் / மாவட்டம் (City / District)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="எ.கா: சென்னை, மதுரை, கோவை"
                                        value={customer.city}
                                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                                        className="w-full bg-[#1E293B] border border-white/20 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold font-tamil text-slate-300 mb-1">
                                        முகவரி / குறிப்பு (Delivery Address / Notes)
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="லாரி பார்சல் சர்வீஸ் அல்லது கதவு எண்..."
                                        value={customer.address}
                                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                        className="w-full bg-[#1E293B] border border-white/20 focus:border-amber-400 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black font-tamil text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4"
                                >
                                    <PhoneCall size={18} />
                                    <span>வாட்ஸ்அப் மூலம் ஆர்டரை சமர்ப்பிக்க (Send via WhatsApp)</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryPage;
