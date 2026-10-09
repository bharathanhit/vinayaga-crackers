import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ChevronDown, Sparkles, RotateCw, Flame, Zap, PhoneCall, User, ShoppingBag } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/crackers/logo.jpg';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';

const iconMap = {
    'one-sound-crackers': Zap,
    'sound-crackers': Zap,
    'ground-chakkars': RotateCw,
    'flower-pots': Flame,
    'twinkling-star': Sparkles,
    'sparklers': Sparkles,
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMenuOpen(false); }, [location]);

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            
            const merged = staticCategories.map(c => ({
                ...c,
                name: c.title,
                desc: c.description,
                icon: iconMap[c.slug] || Sparkles,
                isFeatured: true,
                isStatic: true
            }));

            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) {
                    merged[idx] = { 
                        ...merged[idx], 
                        ...fc, 
                        name: fc.title, 
                        desc: fc.description,
                        icon: iconMap[fc.slug] || Sparkles,
                        isStatic: false 
                    };
                } else {
                    merged.push({
                        ...fc,
                        name: fc.title,
                        desc: fc.description,
                        icon: iconMap[fc.slug] || Sparkles,
                        isStatic: false
                    });
                }
            });

            const sorted = merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setCategories(sorted);
        }, () => {
            setCategories(staticCategories.map(c => ({
                ...c,
                name: c.title,
                desc: c.description,
                icon: iconMap[c.slug] || Sparkles,
                isFeatured: true,
                isStatic: true
            })));
        });
        return () => unsubscribe();
    }, []);

    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

    const isLight = isScrolled || location.pathname !== '/';

    const handleSearchClick = () => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isLight ? 'bg-[#090D18]/95 backdrop-blur-md shadow-2xl border-b border-amber-500/20 py-2.5' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent py-3.5'}`}>
            {/* Slim festive gold progress bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 origin-left"
                style={{ scaleX: scrollProgress / 100, width: '100%' }}
            />

            <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3">

                {/* ── Brand: Vinayaga Crackers Sivakasi (with fireworks star icon) ── */}
                <HashLink smooth to="/#" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
                    <div className="relative shrink-0">
                        <img 
                            src={logoImg} 
                            alt="Vinayaga Supreme Crackers"
                            className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 rounded-full object-cover border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform shrink-0" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] sm:text-sm lg:text-base font-black tracking-tight leading-tight uppercase font-cinzel text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                            Vinayaga <span className="text-amber-400">Supreme</span>
                        </span>
                        <span className="text-[10px] sm:text-xs lg:text-sm font-black tracking-tight leading-tight uppercase font-cinzel text-amber-300 group-hover:text-amber-400 transition-colors whitespace-nowrap">
                            Crackers
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[8px] sm:text-[9px] font-black tracking-wider font-tamil text-amber-400 whitespace-nowrap">
                                சிவகாசி பட்டாசுகள்
                            </span>
                            <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest hidden sm:inline shrink-0">
                                • Green
                            </span>
                        </div>
                    </div>
                </HashLink>

                {/* ── Desktop Links with Tamil Words matching reference ── */}
                <div className="hidden lg:flex items-center gap-2 xl:gap-4">
                    
                    {/* முகப்பு (Home - Highlighted Yellow/Gold Pill button as in reference) */}
                    <HashLink
                        smooth to="/#"
                        className="px-4 py-1.5 rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-bold font-tamil text-xs shadow-md transition-all hover:scale-105"
                    >
                        முகப்பு
                    </HashLink>

                    {/* பட்டாசுகள் (Crackers) */}
                    <HashLink
                        smooth to="/#products"
                        className="px-3 py-1.5 text-xs font-bold font-tamil text-slate-200 hover:text-amber-300 transition-colors"
                    >
                        பட்டாசுகள்
                    </HashLink>

                    {/* வகைகள் (Categories dropdown) */}
                    <div
                        className="relative group py-2"
                        onMouseEnter={() => setIsProductDropdownOpen(true)}
                        onMouseLeave={() => setIsProductDropdownOpen(false)}
                    >
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold font-tamil text-slate-200 hover:text-amber-300 transition-colors cursor-pointer">
                            <span>வகைகள்</span>
                            <ChevronDown size={13} className={`transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProductDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full -left-10 w-[300px] bg-[#0E1526] rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden p-2 z-50 text-white"
                                >
                                    <div className="px-3 py-2 bg-amber-500/10 rounded-xl mb-1 border border-amber-500/20">
                                        <p className="text-[11px] font-bold font-tamil text-amber-300">சிவகாசி பட்டாசு வகைகள்</p>
                                        <p className="text-[9px] text-slate-400">Direct Factory Wholesale Discount</p>
                                    </div>
                                    <div className="max-h-[380px] overflow-y-auto space-y-1">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                to={`/category/${cat.slug}`}
                                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 group/item transition-all"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover/item:bg-amber-500 group-hover/item:text-slate-950 transition-all shadow-sm">
                                                    <cat.icon size={15} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-bold text-white group-hover/item:text-amber-300 transition-colors leading-tight">{cat.name}</p>
                                                    <p className="text-[9px] text-slate-400 truncate">{cat.desc}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* குறிப்புகள் (Tips & Safety) */}
                    <HashLink
                        smooth to="/certificates"
                        className="px-3 py-1.5 text-xs font-bold font-tamil text-slate-200 hover:text-amber-300 transition-colors"
                    >
                        குறிப்புகள்
                    </HashLink>

                    {/* எங்களை பற்றி (About Us) */}
                    <HashLink
                        smooth to="/about"
                        className="px-3 py-1.5 text-xs font-bold font-tamil text-slate-200 hover:text-amber-300 transition-colors"
                    >
                        எங்களை பற்றி
                    </HashLink>

                    {/* வாங்க / விலைப்பட்டியல் (Buy / Price List) */}
                    <Link
                        to="/buy"
                        className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold font-tamil text-xs shadow-md transition-all flex items-center gap-1.5 hover:scale-105"
                    >
                        <Flame size={13} className="text-amber-300" />
                        <span>வாங்க / விலைப்பட்டியல்</span>
                    </Link>

                    {/* தொடர்பு கொள்ள (Contact Us) */}
                    <HashLink
                        smooth to="/#contact"
                        className="px-3 py-1.5 text-xs font-bold font-tamil text-slate-200 hover:text-amber-300 transition-colors"
                    >
                        தொடர்பு கொள்ள
                    </HashLink>
                </div>

                {/* ── Right Actions: User Icon, Cart Counter (matching reference) ── */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* User Admin Icon */}
                    <Link
                        to="/admin"
                        title="Admin Login"
                        className="p-1.5 rounded-full text-slate-300 hover:text-amber-300 transition-colors"
                    >
                        <User size={19} />
                    </Link>

                    {/* Cart / Order Bag with Counter Badge */}
                    <Link
                        to="/buy"
                        title="ஆர்டர் பட்டியல் / Order Cart"
                        className="relative p-1.5 rounded-full text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-black flex items-center justify-center shadow">
                            29
                        </span>
                    </Link>
                </div>

                {/* ── Mobile hamburger ── */}
                <button
                    onClick={() => setIsMenuOpen(v => !v)}
                    className="lg:hidden shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl transition-all text-white bg-white/10 hover:bg-white/20 border border-white/10 shadow-sm ml-1"
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={isMenuOpen ? 'x' : 'm'}
                            initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -4 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="lg:hidden absolute top-full left-3 right-3 mt-2 bg-[#0E1526] text-white rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden max-h-[85vh] flex flex-col z-50"
                    >
                        <div className="py-2 overflow-y-auto flex-1">
                            <HashLink
                                smooth to="/#"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-xs font-bold font-tamil text-amber-300 hover:bg-white/5 transition-all"
                            >
                                <span>முகப்பு (Home)</span>
                                <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded-full font-bold">Active</span>
                            </HashLink>

                            <HashLink
                                smooth to="/#products"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-xs font-bold font-tamil text-slate-200 hover:bg-white/5 transition-all"
                            >
                                பட்டாசுகள் (All Crackers)
                            </HashLink>

                            {/* Mobile Products Accordion */}
                            <div className="border-b border-white/10">
                                <button
                                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                    className="w-full flex items-center justify-between px-5 py-3 text-xs font-bold font-tamil text-slate-200 hover:bg-white/5 transition-all"
                                >
                                    <span className={isMobileProductsOpen ? 'text-amber-300' : ''}>வகைகள் (Categories)</span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isMobileProductsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-black/40"
                                        >
                                            {categories.map(cat => (
                                                <Link
                                                    key={cat.slug}
                                                    to={`/category/${cat.slug}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 px-8 py-2.5 text-xs font-medium text-slate-300 hover:text-amber-300 hover:bg-white/5 transition-all"
                                                >
                                                    <cat.icon size={13} className="text-amber-400" />
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                to="/buy"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-xs font-bold font-tamil text-amber-300 bg-rose-950/40 hover:bg-rose-900/40 border-y border-rose-500/20 transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    <Flame size={14} className="text-amber-400" />
                                    வாங்க / விலைப்பட்டியல் (Buy / Price List)
                                </span>
                                <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-black">90% OFF</span>
                            </Link>

                            <HashLink
                                smooth to="/certificates"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-xs font-bold font-tamil text-slate-200 hover:bg-white/5 transition-all"
                            >
                                குறிப்புகள் (Safety & Licenses)
                            </HashLink>

                            <HashLink
                                smooth to="/about"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-xs font-bold font-tamil text-slate-200 hover:bg-white/5 transition-all"
                            >
                                எங்களை பற்றி (About Us)
                            </HashLink>

                            <HashLink
                                smooth to="/#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-xs font-bold font-tamil text-slate-200 hover:bg-white/5 transition-all"
                            >
                                தொடர்பு கொள்ள (Contact Us)
                            </HashLink>
                        </div>

                        {/* CTA footer */}
                        <div className="px-4 pt-2 pb-1 bg-black/40 text-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/80 text-white text-[10px] font-black uppercase tracking-wide">
                                🚚 All India Delivery • இந்தியா முழுவதும் டெலிவரி
                            </span>
                        </div>
                        <div className="px-4 py-3 bg-black/60 border-t border-white/10 flex items-center gap-2">
                            <a
                                href="https://wa.me/918940921075?text=வணக்கம்%20Vinayaga%20Crackers%20Sivakasi,%20பட்டாசு%20ஆர்டர்%20விவரங்களை%20அனுப்பவும்."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-emerald-600 text-white text-center text-xs font-bold font-tamil py-2.5 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5"
                            >
                                <PhoneCall size={13} /> WhatsApp
                            </a>
                            <Link
                                to="/buy"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex-1 bg-amber-500 text-slate-950 text-center text-xs font-bold font-tamil py-2.5 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-1"
                            >
                                விலைப்பட்டியல்
                            </Link>
                            <Link
                                to="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-slate-300 hover:text-white transition-all"
                                title="Admin"
                            >
                                <ShieldCheck size={18} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
