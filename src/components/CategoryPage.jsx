import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Sparkles, Flame, Percent, ShieldCheck, Tag } from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts, categories as staticCategories } from '../data/products';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';

const ProductCard = ({ product, index, themeColor }) => {
    const navigate = useNavigate();
    const imgSrc = product.imageUrl || product.image;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            className="group relative bg-[#111827] border border-amber-500/20 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_70px_rgba(245,158,11,0.2)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
            onClick={() => navigate(`/product/${product.id || product.docId}`)}
        >
            {/* Top Image Box */}
            <div className="relative h-64 overflow-hidden bg-black/60">
                <motion.img
                    src={imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700"
                    whileHover={{ scale: 1.06 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/30" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-rose-600/90 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-wider shadow-md">
                        {product.badgeNote || '100% Green Cracker'}
                    </span>
                    {product.discount && (
                        <span className="px-2.5 py-0.5 bg-amber-500/90 backdrop-blur-md rounded-full text-[9px] font-black text-slate-950 uppercase tracking-wider flex items-center gap-1 shadow-md w-fit">
                            <Percent size={10} /> {product.discount}
                        </span>
                    )}
                </div>

                <div className="absolute bottom-3 right-4 z-20">
                    <div className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-xl border border-amber-400/40 text-right">
                        {product.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through mr-1.5">{product.originalPrice}</span>
                        )}
                        <span className="text-base font-black text-amber-400">{product.price || 'Wholesale Rate'}</span>
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-black text-white tracking-tight mb-2 group-hover:text-amber-400 transition-colors duration-300 font-cinzel line-clamp-1">
                        {product.title}
                    </h3>
                    
                    <p className="text-slate-400 mb-6 text-xs md:text-sm leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors font-medium">
                        {product.description}
                    </p>
                </div>

                <div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                                <ShieldCheck size={12} /> Green Certified
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                            Details <ChevronRight size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const CategoryPage = () => {
    const { slug } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

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
            document.title = `${category.title} | Vinayaga Crackers Sivakasi Wholesale`;
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

    if (!loading && !category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white bg-night pt-52">
                <h2 className="text-3xl font-black mb-4 font-cinzel">Category Not Found</h2>
                <Link to="/#products" className="text-amber-400 underline font-bold">← Back to All Crackers</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-night text-white">

            {/* Hero Banner */}
            <div className="relative min-h-[420px] md:min-h-[500px] overflow-hidden bg-gradient-to-br from-rose-950 via-night to-black">
                {category && (
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src={category.imageUrl || category.image}
                        alt={category.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-transparent z-0" />

                <div className="relative z-10 container mx-auto px-6 pt-40 pb-16">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-end gap-3 mb-8"
                    >
                        <Link 
                            to="/#" 
                            className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 text-[10px] font-black transition-all tracking-widest uppercase"
                        >
                            <ArrowLeft size={14} />
                            Home
                        </Link>
                        <Link 
                            to="/#products" 
                            className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 text-[10px] font-black transition-all tracking-widest uppercase"
                        >
                            All Categories
                        </Link>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-widest">
                            <Sparkles size={12} /> Direct Sivakasi Wholesale
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white mb-4 uppercase font-cinzel">
                            {category?.title}
                        </h1>
                        
                        <p className="text-slate-300 text-base md:text-xl font-normal leading-relaxed max-w-2xl">
                            {category?.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Products Grid */}
            <section className="py-16 md:py-24 bg-[#0B0F19] relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4 pb-6 border-b border-white/10">
                        <div>
                            <span className="text-amber-400 text-xs font-black uppercase tracking-widest">
                                {categoryProducts.length} Variety{categoryProducts.length !== 1 ? 'ies' : ''} Available
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
                                Choose Your Cracker Packs
                            </h2>
                        </div>

                        <a
                            href="https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi,%20I%20want%20to%20order%20crackers%20from%20this%20category."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                        >
                            <Sparkles size={14} /> Quick WhatsApp Order
                        </a>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="rounded-[2rem] bg-slate-800/50 animate-pulse h-96" />
                            ))}
                        </div>
                    ) : categoryProducts.length === 0 ? (
                        <div className="text-center py-24 rounded-3xl border border-white/10 bg-white/5">
                            <Flame size={36} className="mx-auto text-amber-500 mb-4" />
                            <p className="text-slate-300 text-lg font-bold">New Diwali stock being updated for this category.</p>
                            <p className="text-slate-500 text-sm mt-1">Contact us on WhatsApp for custom bulk orders.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryProducts.map((product, idx) => (
                                <ProductCard 
                                    key={product.id || product.docId} 
                                    index={idx} 
                                    product={product} 
                                    themeColor={category?.color}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
