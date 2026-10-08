import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ChevronDown, Sparkles, RotateCw, Flame, Rocket, Zap, Gift, Package, PhoneCall } from 'lucide-react';
import { NavHashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/crackers/logo.jpg';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';

const iconMap = {
    'sparklers': Sparkles,
    'ground-chakkars': RotateCw,
    'flower-pots': Flame,
    'sky-shots': Rocket,
    'sound-crackers': Zap,
    'rockets-missiles': Rocket,
    'kids-novelties': Gift,
    'diwali-gift-boxes': Package,
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

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Gift Boxes', href: '/category/diwali-gift-boxes' },
        { name: 'Wholesale & Price List', href: '/services' },
        { name: 'Safety & Licences', href: '/certificates' },
        { name: 'Delivery & Payment', href: '/payment-terms' },
        { name: 'About Sivakasi', href: '/about' },
        { name: 'FAQ', href: '/faq' },
    ];

    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

    const isLight = isScrolled || location.pathname !== '/';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isLight ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-500/20 py-2.5' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'}`}>
            {/* Slim festive gold progress bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 origin-left"
                style={{ scaleX: scrollProgress / 100, width: '100%' }}
            />

            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

                {/* ── Brand: Vinayaga Crackers Sivakasi ── */}
                <NavHashLink smooth to="/#" className="flex items-center gap-3 shrink-0 group">
                    <div className="relative">
                        <img 
                            src={logoImg} 
                            alt="Vinayaga Crackers"
                            className="h-11 lg:h-13 w-11 lg:w-13 rounded-full object-cover border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform" 
                        />
                        <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600"></span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-base lg:text-xl font-black tracking-tight leading-none uppercase font-cinzel ${isLight ? 'text-rose-900 group-hover:text-rose-700' : 'text-white group-hover:text-amber-300'} transition-colors`}>
                            Vinayaga Crackers
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] font-black tracking-widest uppercase px-1.5 py-0.2 bg-amber-500/20 text-amber-600 rounded">
                                Sivakasi Direct
                            </span>
                            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest hidden sm:inline">
                                • 100% Green Crackers
                            </span>
                        </div>
                    </div>
                </NavHashLink>

                {/* ── Desktop links ── */}
                <div className="hidden lg:flex items-center gap-6">
                    <NavHashLink
                        smooth to="/#"
                        className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors duration-300 hover:text-amber-500 ${isLight ? 'text-slate-700' : 'text-white/90'}`}
                    >
                        Home
                    </NavHashLink>

                    {/* Desktop Products Dropdown */}
                    <div
                        className="relative group py-3"
                        onMouseEnter={() => setIsProductDropdownOpen(true)}
                        onMouseLeave={() => setIsProductDropdownOpen(false)}
                    >
                        <button className={`flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest transition-colors duration-300 group-hover:text-amber-500 ${isLight ? 'text-slate-700' : 'text-white/90'}`}>
                            <span>All Crackers</span>
                            <ChevronDown size={13} className={`transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProductDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full -left-10 w-[290px] bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden p-2 z-50"
                                >
                                    <div className="px-3 py-2 bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl mb-1 border border-amber-100/60">
                                        <p className="text-[10px] font-black text-rose-900 uppercase tracking-wider">Sivakasi Cracker Catalog</p>
                                        <p className="text-[9px] text-slate-500">Factory wholesale discounts applied</p>
                                    </div>
                                    <div className="max-h-[380px] overflow-y-auto space-y-1">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                to={`/category/${cat.slug}`}
                                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/70 group/item transition-all"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-rose-100/80 flex items-center justify-center text-rose-700 group-hover/item:bg-rose-600 group-hover/item:text-white transition-all shadow-sm">
                                                    <cat.icon size={15} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-bold text-slate-900 group-hover/item:text-rose-700 transition-colors leading-tight">{cat.name}</p>
                                                    <p className="text-[9px] text-slate-400 truncate">{cat.desc}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {navLinks.slice(1).map(link => (
                        <NavHashLink
                            key={link.name}
                            smooth to={link.href}
                            className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors duration-300 hover:text-amber-500 ${isLight ? 'text-slate-700' : 'text-white/90'}`}
                        >
                            {link.name}
                        </NavHashLink>
                    ))}
                </div>

                {/* ── Desktop CTA: Quick Quote & WhatsApp ── */}
                <div className="hidden lg:flex items-center gap-3">
                    <a
                        href="https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi,%20I%20want%20to%20place%20an%20order%20for%20Diwali%20crackers."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all hover:scale-105"
                    >
                        <PhoneCall size={12} /> WhatsApp Order
                    </a>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('openInquiryPopup'))}
                        className="text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:from-rose-700 hover:to-amber-700 shadow-lg hover:shadow-rose-600/30 hover:scale-105"
                    >
                        Diwali Price List
                    </button>
                    <Link to="/admin" title="Admin Panel"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLight ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' : 'text-white/30 hover:text-white'}`}>
                        <ShieldCheck size={16} />
                    </Link>
                </div>

                {/* ── Mobile hamburger ── */}
                <button
                    onClick={() => setIsMenuOpen(v => !v)}
                    className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all ${isLight ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
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
                        className="lg:hidden absolute top-full left-3 right-3 mt-2 bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden max-h-[85vh] flex flex-col z-50"
                    >
                        <div className="py-2 overflow-y-auto flex-1">
                            <NavHashLink
                                smooth to="/#"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-all"
                            >
                                Home
                            </NavHashLink>

                            {/* Mobile Products Accordion */}
                            <div className="border-b border-slate-100">
                                <button
                                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                    className="w-full flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-amber-50/50 transition-all"
                                >
                                    <span className={isMobileProductsOpen ? 'text-rose-600' : ''}>Explore Crackers Catalog</span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isMobileProductsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-amber-50/30"
                                        >
                                            {categories.map(cat => (
                                                <Link
                                                    key={cat.slug}
                                                    to={`/category/${cat.slug}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 px-8 py-2.5 text-[11px] font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                                >
                                                    <cat.icon size={13} className="text-amber-500" />
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {navLinks.slice(1).map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <NavHashLink
                                        smooth to={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                    >
                                        {link.name}
                                    </NavHashLink>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA footer */}
                        <div className="px-4 py-3 bg-gradient-to-r from-rose-50 to-amber-50 border-t border-amber-200/60 flex items-center gap-2">
                            <a
                                href="https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi,%20I%20want%20to%20place%20an%20order%20for%20Diwali%20crackers."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-emerald-600 text-white text-center text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5"
                            >
                                <PhoneCall size={12} /> WhatsApp
                            </a>
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    window.dispatchEvent(new CustomEvent('openInquiryPopup'));
                                }}
                                className="flex-1 bg-rose-600 text-white text-center text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl hover:bg-rose-700 transition-all"
                            >
                                Price List
                            </button>
                            <Link
                                to="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-rose-600 shadow-sm border border-slate-200 transition-all"
                                title="Admin"
                            >
                                <ShieldCheck size={16} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
