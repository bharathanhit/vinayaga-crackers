import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { Mail, Phone, ShieldCheck, ShoppingBag, MessageSquare, Compass, HelpCircle, Sparkles, Flame, MapPin } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';
import logoImg from '../assets/crackers/logo.jpg';
import BixsolPopup from './BixsolPopup';

const Footer = () => {
    const [allCategories, setAllCategories] = useState(staticCategories);
    const [isBixsolOpen, setIsBixsolOpen] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        return onSnapshot(q, (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticCategories.map(c => ({ ...c, isFeatured: true }));
            
            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) merged[idx] = { ...merged[idx], ...fc };
                else merged.push(fc);
            });

            setAllCategories(merged);
        }, () => {
            setAllCategories(staticCategories);
        });
    }, []);

    const quickLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Diwali Gift Boxes', href: '/category/diwali-gift-boxes' },
        { name: 'Wholesale & Price List', href: '/services' },
        { name: 'Safety & PESO Licences', href: '/certificates' },
        { name: 'Delivery & Payment Terms', href: '/payment-terms' },
        { name: 'About Sivakasi Heritage', href: '/about' },
        { name: 'Frequently Asked Questions', href: '/faq' },
    ];

    return (
        <footer className="bg-[#070A12] pt-20 pb-12 overflow-hidden relative text-white border-t border-amber-500/20">
            {/* Top Amber Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 lg:gap-x-12 mb-16 pb-16 border-b border-white/10 items-start">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="flex items-center gap-3.5">
                            <img
                                src={logoImg}
                                alt="Vinayaga Crackers"
                                className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover shadow-lg"
                            />
                            <div>
                                <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-cinzel">
                                    Vinayaga <span className="text-amber-400">Crackers</span>
                                </span>
                                <p className="text-[10px] text-amber-300/80 uppercase font-black tracking-widest">
                                    Direct Sivakasi Factory Wholesale
                                </p>
                            </div>
                        </div>

                        <p className="text-slate-300 font-normal leading-relaxed text-sm max-w-md">
                            Direct from Sivakasi — the fireworks capital of India. We supply 100% CSIR-NEERI certified Green Crackers, Sparkling Flower Pots, Aerial Sky Shot Cakes, and Festive Family Gift Hampers at factory wholesale rates.
                        </p>

                        <div className="flex flex-col gap-2 text-xs text-slate-400 bg-white/5 p-4 rounded-2xl border border-white/10 max-w-md">
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                <span>Sivakasi Main Road, Virudhunagar District, Tamil Nadu – 626123, India</span>
                            </div>
                            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                                <span>Licensed under PESO & Government of India Regulations</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-3 flex flex-col gap-5">
                        <h4 className="text-amber-400 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 font-cinzel">
                            <Compass size={15} />
                            Quick Links
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <NavHashLink
                                        smooth
                                        to={link.href}
                                        className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </NavHashLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cracker Categories */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                        <h4 className="text-amber-400 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2 font-cinzel">
                            <Flame size={15} />
                            Diwali Categories
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {allCategories.map((cat) => (
                                <Link
                                    key={cat.slug || cat.id}
                                    to={`/category/${cat.slug || cat.id}`}
                                    className="text-slate-300 hover:text-amber-400 text-xs font-medium transition-colors py-1 truncate"
                                >
                                    • {cat.title}
                                </Link>
                            ))}
                        </div>

                        {/* Direct Order Contacts */}
                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                            <a
                                href="https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi,%20I%20want%20to%20order%20crackers."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold transition-all"
                            >
                                <Phone size={15} /> WhatsApp: +91 96558 89426
                            </a>
                            <a
                                href="mailto:vinayagacrackerssivakasi@gmail.com"
                                className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 text-xs font-medium transition-all"
                            >
                                <Mail size={15} /> vinayagacrackerssivakasi@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Statutory Safety Note */}
                <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-4 mb-10 text-center">
                    <p className="text-[11px] text-amber-200/90 leading-relaxed font-medium">
                        ⚠️ <strong>Statutory Notice:</strong> According to the Honorable Supreme Court & PESO guidelines, we only sell certified Green Crackers. Delivery is executed through licensed legal parcel transport. We strictly do not sell crackers to minors below 18 years of age.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-white/10">
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                        © {new Date().getFullYear()} VINAYAGA CRACKERS SIVAKASI • ALL RIGHTS RESERVED
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                        <Link to="/privacy" className="hover:text-amber-400">Privacy Policy</Link>
                        <span>•</span>
                        <Link to="/terms" className="hover:text-amber-400">Terms & Conditions</Link>
                        <span>•</span>
                        <Link to="/faq" className="hover:text-amber-400">FAQ</Link>
                    </div>

                    <motion.button
                        onClick={() => setIsBixsolOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[11px] text-slate-400 hover:text-white uppercase font-bold tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10 cursor-pointer"
                    >
                        Crafted by <span className="text-amber-400 italic">BIXSOL</span>
                    </motion.button>
                </div>
            </div>

            <BixsolPopup isOpen={isBixsolOpen} onClose={() => setIsBixsolOpen(false)} />
        </footer>
    );
};

export default Footer;
