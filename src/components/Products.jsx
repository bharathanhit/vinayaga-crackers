import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Flame, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';

const CategoryCard = ({ title, titleTa, descTa, description, image, imageUrl, slug, color, index }) => {
    const imgSrc = imageUrl || image;
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="group relative"
        >
            <Link to={`/category/${slug}`} className="block no-underline">
                <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#161b26] to-[#0d121d] shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_70px_rgba(234,88,12,0.25)] transition-all duration-500 border border-amber-500/15 group-hover:border-amber-400/40">
                    <div className="relative h-52 md:h-60 overflow-hidden">
                        <motion.img
                            src={imgSrc}
                            alt={titleTa || title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-700"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-black/40 to-transparent" />
                        
                        {/* Discount / Category Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-amber-200 border border-amber-400/30 backdrop-blur-md bg-black/60 flex items-center gap-1 shadow-md font-tamil">
                            <Percent size={11} className="text-amber-400" />
                            <span>90% வரை தள்ளுபடி • Up to 90% Off</span>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white border border-white/20 backdrop-blur-md bg-rose-600/80 shadow-md font-tamil"
                        >
                            பார்வையிட • Explore
                        </motion.div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="text-xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors duration-300 font-tamil leading-snug">
                                    {titleTa || title}
                                </h3>
                                <p className="text-amber-300/90 text-[11px] font-bold uppercase tracking-wider mb-2 font-cinzel">
                                    {title}
                                </p>
                                <p className="text-slate-300 text-xs leading-relaxed font-medium line-clamp-2 group-hover:text-slate-200 transition-colors font-tamil">
                                    {descTa || description}
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.15, x: 3 }}
                                className="shrink-0 w-9 h-9 rounded-xl bg-amber-500/10 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-amber-500 flex items-center justify-center text-amber-400 group-hover:text-white transition-all duration-300 border border-amber-500/20 mt-1 shadow-sm"
                            >
                                <ArrowRight size={15} />
                            </motion.div>
                        </div>

                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10 font-tamil">
                            <span className="text-[10px] font-bold text-amber-400/90 tracking-wide flex items-center gap-1">
                                <Flame size={12} className="text-rose-500" /> 100% பசுமை பட்டாசு
                            </span>
                            <span className="text-[10px] font-black text-white/70 group-hover:text-amber-300 transition-colors">
                                சிவகாசி நேரடி விற்பனை →
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Products = () => {
    const [categories, setCategories] = useState(staticCategories);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        const unsub = onSnapshot(q, (snap) => {
            if (!snap.empty) {
                const firestoreCats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                const merged = [...staticCategories];
                firestoreCats.forEach(fc => {
                    const idx = merged.findIndex(s => s.slug === fc.slug);
                    if (idx !== -1) {
                        merged[idx] = { ...merged[idx], ...fc };
                    } else {
                        merged.push(fc);
                    }
                });
                setCategories(merged);
            }
            setLoading(false);
        }, () => setLoading(false));
        return unsub;
    }, []);

    return (
        <section id="products" className="py-20 md:py-28 bg-[#0B0F19] relative overflow-hidden text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[130px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8 px-4">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/60 border border-rose-500/30 mb-5 shadow-sm"
                        >
                            <Sparkles size={14} className="text-amber-400" />
                            <span className="text-[10px] font-black text-amber-300 uppercase tracking-[0.3em] font-tamil">
                                தீபாவளி 2026 சிறப்பு வகைகள் • Diwali 2026 Collection
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-5xl md:text-6xl text-white font-black leading-[1.08] tracking-tight font-cinzel"
                        >
                            <span className="font-tamil text-2xl sm:text-3xl block text-amber-400 mb-2 font-black">
                                எங்கள் பட்டாசு வகைகள்
                            </span>
                            Celebrate with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400">
                                Sivakasi's Finest Fireworks.
                            </span>
                        </motion.h2>
                    </div>
                </div>

                {/* ── Category Grid heading ── */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 mt-4 gap-8 px-4">
                    <div>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal mb-2 font-tamil">
                            சுழலும் தரைச் சக்கரங்கள், வண்ண மழை பொழியும் பூச்சட்டிகள், அதிரடி ஒற்றை வெடிகள் மற்றும் சாட்டை வகைகள் — 100% அரசு உரிமம் பெற்ற பசுமை பட்டாசுகளை தேர்ந்தெடுங்கள்.
                        </p>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                            Explore our full line of Sivakasi factory-direct licensed green crackers with exclusive festival discounts.
                        </p>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full" />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="rounded-[2rem] bg-slate-800/50 animate-pulse h-80" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {categories.map((cat, idx) => (
                            <CategoryCard key={cat.id || cat.slug} index={idx} {...cat} />
                        ))}
                    </div>
                )}

                {/* Advertising Purpose Disclaimer */}
                <div className="mt-10 text-center px-4">
                    <p className="text-[11px] sm:text-xs text-slate-400 font-tamil font-medium">
                        * புகைப்படங்கள் விளம்பர நோக்கத்திற்காக மட்டுமே • Images shown are for advertising / representation purpose only.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Products;
