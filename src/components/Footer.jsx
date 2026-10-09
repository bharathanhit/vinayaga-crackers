import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Mail, Phone, ShieldCheck, ShoppingBag, MessageSquare, Compass, HelpCircle, Sparkles, Flame, MapPin, Truck, Facebook, Instagram, Youtube } from 'lucide-react';
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
        { ta: 'முகப்பு', en: 'Home', href: '/#' },
        { ta: 'பட்டாசுகள்', en: 'Crackers Catalog', href: '/#products' },
        { ta: 'வகைகள்', en: 'All Categories', href: '/#products' },
        { ta: 'டெலிவரி & கட்டண முறைகள்', en: 'Delivery & Payment', href: '/payment-terms' },
        { ta: 'எங்களை பற்றி', en: 'About Us', href: '/about' },
        { ta: 'தொடர்பு கொள்ள', en: 'Contact Us', href: '/#contact' },
    ];

    return (
        <footer className="bg-[#050811] pt-20 pb-12 overflow-hidden relative text-white border-t border-amber-500/20">
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
                                    Vinayaga <span className="text-amber-400">Supreme Crackers</span>
                                </span>
                                <p className="text-xs font-bold font-tamil text-amber-300">
                                    சிவகாசி நேரடி தொழிற்சாலை பட்டாசுகள்
                                </p>
                            </div>
                        </div>

                        <p className="text-slate-300 font-normal leading-relaxed text-sm max-w-md font-tamil">
                            சிவகாசியிலிருந்து நேரடியாக 100% அரசு அங்கீகாரம் பெற்ற CSIR-NEERI பசுமை பட்டாசுகள், வண்ண பூந்தொட்டிகள், ஆகாய மல்டி ஷாட் வானவெடிகள் மற்றும் குடும்ப தீபாவளி கிப்ட் பாக்ஸ்கள் குறைந்த மொத்த விலையில்!
                        </p>

                        <div className="flex flex-col gap-2 text-xs text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/10 max-w-md">
                            <div className="flex items-start gap-2.5">
                                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-amber-300 font-tamil">கடை முகவரி (Shop Address):</p>
                                    <p className="text-slate-200">Shop No : 3/6136, Om Sakthi Nagar, Perapatti, Sivakasi – 626189</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                                <Truck size={14} className="text-blue-400 shrink-0" />
                                <span className="font-bold text-blue-300">🚚 All India Delivery — இந்தியா முழுவதும் பார்சல் டெலிவரி</span>
                            </div>
                            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                                <span className="font-tamil">PESO & மத்திய அரசு வெடிபொருள் பாதுகாப்பு சான்றிதழ் பெற்றது</span>
                            </div>
                        </div>

                        {/* Trust Tagline matching reference */}
                        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 w-fit">
                            <p className="text-xs font-bold font-tamil text-amber-300">
                                பாதுகாப்பு | தரம் | நம்பிக்கை — உங்கள் மகிழ்ச்சியே எங்கள் நோக்கம்
                            </p>
                        </div>

                        {/* Social Media Links (Temporarily disabled until official URLs are provided) */}
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-bold text-slate-400 font-tamil">சமூக இணைப்பு:</span>
                            <button
                                type="button"
                                onClick={() => alert("சமூக ஊடக பக்கங்கள் விரைவில் இணைக்கப்படும் (Social media links coming soon!)")}
                                title="Facebook (Coming Soon)"
                                className="w-9 h-9 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 cursor-pointer transition-all active:scale-95"
                            >
                                <Facebook size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => alert("சமூக ஊடக பக்கங்கள் விரைவில் இணைக்கப்படும் (Social media links coming soon!)")}
                                title="Instagram (Coming Soon)"
                                className="w-9 h-9 rounded-full bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 flex items-center justify-center text-pink-400 cursor-pointer transition-all active:scale-95"
                            >
                                <Instagram size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => alert("சமூக ஊடக பக்கங்கள் விரைவில் இணைக்கப்படும் (Social media links coming soon!)")}
                                title="YouTube (Coming Soon)"
                                className="w-9 h-9 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 flex items-center justify-center text-red-400 cursor-pointer transition-all active:scale-95"
                            >
                                <Youtube size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Quick Links with Tamil */}
                    <div className="lg:col-span-3 flex flex-col gap-5">
                        <h4 className="text-amber-400 text-sm font-black font-tamil tracking-wider flex items-center gap-2">
                            <Compass size={16} />
                            விரைவு இணைப்புகள்
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.ta}>
                                    <HashLink
                                        smooth
                                        to={link.href}
                                        className="text-slate-300 hover:text-amber-400 text-sm font-medium font-tamil transition-colors hover:translate-x-1 inline-block"
                                    >
                                        • {link.ta}
                                    </HashLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cracker Categories with Tamil */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                        <h4 className="text-amber-400 text-sm font-black font-tamil tracking-wider flex items-center gap-2">
                            <Flame size={16} />
                            பட்டாசு வகைகள்
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {allCategories.map((cat) => (
                                <Link
                                    key={cat.slug || cat.id}
                                    to={`/category/${cat.slug || cat.id}`}
                                    className="text-slate-300 hover:text-amber-400 text-xs font-medium font-tamil transition-colors py-1 truncate"
                                >
                                    • {cat.title}
                                </Link>
                            ))}
                        </div>

                        {/* Direct Order Contacts */}
                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                            <h5 className="text-xs font-bold font-tamil text-slate-300">எங்களை தொடர்பு கொள்ள:</h5>
                            <a
                                href="https://wa.me/918940921075?text=வணக்கம்%20Vinayaga%20Crackers%20Sivakasi,%20பட்டாசு%20வாங்க%20விரும்புகிறேன்."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold transition-all"
                            >
                                <Phone size={15} /> WhatsApp: +91 89409 21075
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

                {/* ── Advertising Purpose Disclaimer Banner ── */}
                <div className="py-4 px-6 rounded-2xl bg-black/40 border border-white/10 text-center my-6">
                    <p className="text-xs text-slate-400 font-tamil leading-relaxed">
                        <span className="text-amber-400 font-bold">விளம்பர நோக்க அறிவிப்பு (Advertising Disclaimer):</span> இணையதளத்தில் காட்சிப்படுத்தப்பட்டுள்ள புகைப்படங்கள் அனைத்தும் மாதிரி மற்றும் விளம்பர நோக்கத்திற்காக மட்டுமே. அசல் பட்டாசுகளின் கவர் பேக்கிங் வடிவமைப்பு மற்றும் பிராண்டுகள் இருப்பு மற்றும் அரசு விதிகளுக்கு ஏற்ப மாறுபடலாம். அனைத்து தயாரிப்புகளும் 100% பசுமை பட்டாசுகளாகும். 90% வரை நேரடி சிவகாசி தொழிற்சாலை தள்ளுபடி வழங்கப்படுகிறது.
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                        * All images shown on this website are for advertising and representative purposes only. Actual cracker packaging and brands may vary as per government norms & factory production. Flat up to 90% direct Sivakasi wholesale discount applicable.
                    </p>
                </div>

                {/* Bottom Bar matching reference */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-white/10 text-xs">
                    <p className="text-slate-400 font-tamil font-bold">
                        © {new Date().getFullYear()} Vinayaga Supreme Crackers Sivakasi. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
                    </p>

                    <div className="flex items-center gap-2 text-amber-300 font-tamil font-bold">
                        <Sparkles size={14} className="text-amber-400" />
                        <span>பட்டாசுகள் வாங்குங்கள்... மகிழ்ச்சியை பகிருங்கள்...</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
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
                        className="text-[11px] text-slate-400 hover:text-white uppercase font-bold tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10 cursor-pointer"
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
