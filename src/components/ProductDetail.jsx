import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    Layers,
    Sparkles,
    Flame,
    AlertTriangle,
    PhoneCall,
    BoxSelect
} from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { products as staticProducts } from '../data/products';
import GlobalInquiryButtons from './GlobalInquiryButtons';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const staticProd = staticProducts.find(p => p.id === id) || staticProducts.find(p => p.title.toLowerCase() === id.toLowerCase());
                const q = query(collection(db, 'products'), where('id', '==', id));
                const snap = await getDocs(q);
                
                let actualSnap = snap;
                if (actualSnap.empty && staticProd) {
                    const qTitle = query(collection(db, 'products'), where('title', '==', staticProd.title));
                    actualSnap = await getDocs(qTitle);
                }

                if (!actualSnap.empty) {
                    const firestoreProd = { ...actualSnap.docs[0].data(), docId: actualSnap.docs[0].id };
                    let finalProd = { ...staticProd, ...firestoreProd };
                    setProduct(finalProd);
                } else if (staticProd) {
                    setProduct(staticProd);
                } else {
                    navigate('/#products');
                }
            } catch (err) {
                console.error("Firestore lookup failed:", err);
                const staticProd = staticProducts.find(p => p.id === id);
                if (staticProd) setProduct(staticProd);
                else navigate('/#products');
            }
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchProduct();
    }, [id, navigate]);

    useEffect(() => {
        if (product) {
            document.title = `${product.title} | Vinayaga Crackers Sivakasi`;
        }
    }, [product]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-night text-amber-400">
            <div className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
        </div>
    );
    if (!product) return null;

    const whatsappMessage = encodeURIComponent(
        `Hi Vinayaga Crackers Sivakasi, I want to order "${product.title}" (${product.price || ''}). Please confirm stock availability and dispatch process.`
    );

    return (
        <div id="product-detail" className="min-h-screen bg-[#080C14] text-white">
            <div className="container px-6 pt-40 pb-24 max-w-7xl mx-auto">
                {/* Back Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between gap-3 mb-10 pb-4 border-b border-white/10"
                >
                    <Link
                        to="/#"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-xs font-bold transition-all uppercase tracking-wider"
                    >
                        <ArrowLeft size={16} /> Home
                    </Link>
                    <Link
                        to={product?.categorySlug ? `/category/${product.categorySlug}` : "/#products"}
                        className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-bold transition-all uppercase tracking-wider"
                    >
                        {product?.category || 'Crackers Catalog'} <ArrowRight size={14} />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    {/* Left Column: Product Image */}
                    <div className="lg:col-span-6 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-amber-500/20 aspect-square"
                        >
                            <img
                                src={product.imageUrl || product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            
                            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                                <span className="px-4 py-1.5 bg-rose-600/95 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-wider shadow-lg">
                                    {product.badgeNote || '100% Green Cracker'}
                                </span>
                                {product.discount && (
                                    <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow-lg">
                                        {product.discount}
                                    </span>
                                )}
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-black">Wholesale Price</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-amber-400 font-cinzel">{product.price || 'Direct Rate'}</span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                                        )}
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[10px] font-bold rounded-lg uppercase">
                                    In Stock
                                </span>
                            </div>
                        </motion.div>

                        {/* Safety Guidelines Card */}
                        <div className="bg-[#111827] border border-amber-500/20 rounded-3xl p-6">
                            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <AlertTriangle size={18} className="text-amber-400" />
                                Cracker Safety Instructions
                            </h3>
                            <ul className="space-y-2 text-xs text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-400 font-bold">•</span>
                                    <span>Always light crackers outdoors in an open space, away from flammable materials.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-400 font-bold">•</span>
                                    <span>Use an incense stick (agarbatti) or sparkler to ignite from arm's length.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-400 font-bold">•</span>
                                    <span>Keep a bucket of water and sand nearby for emergency disposal.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-400 font-bold">•</span>
                                    <span>Children should always burst crackers under strict adult supervision.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Title, Specs & Order */}
                    <div className="lg:col-span-6 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-950/60 border border-rose-500/40 rounded-full text-rose-300 text-[10px] font-black uppercase tracking-widest mb-4">
                                <Sparkles size={12} className="text-amber-400" />
                                <span>Direct From Sivakasi • {product.category}</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight leading-tight uppercase font-cinzel">
                                {product.title}
                            </h1>

                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-6">
                                {product.longDescription || product.description}
                            </p>

                            {/* Quick Order Buttons */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                <a
                                    href={`https://wa.me/919655889426?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl px-8 py-4 text-xs font-black tracking-widest uppercase flex items-center gap-2 flex-1 justify-center rounded-2xl"
                                >
                                    <PhoneCall size={16} /> Order on WhatsApp
                                </a>
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('openInquiryPopup'))}
                                    className="btn bg-gradient-to-r from-rose-600 to-amber-600 text-white px-8 py-4 text-xs font-black tracking-widest uppercase flex-1 justify-center rounded-2xl shadow-xl hover:from-rose-700 hover:to-amber-700"
                                >
                                    Enquire / Add to List
                                </button>
                            </div>
                        </div>

                        {/* Specifications Table */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 sm:p-8">
                                <h3 className="text-base font-black mb-6 tracking-wide flex items-center gap-2 text-amber-400 uppercase font-cinzel">
                                    <Flame size={18} />
                                    Cracker Specifications
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.specifications.map((spec, i) => (
                                        <div key={i} className="bg-black/40 border border-white/5 rounded-xl p-3.5 flex flex-col justify-between">
                                            <span className="text-[10px] font-black text-amber-400/80 uppercase tracking-wider">{spec.label}</span>
                                            <span className="text-sm font-bold text-white mt-1">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {product.types && product.types.length > 0 && (
                                    <div className="mt-6 pt-5 border-t border-white/10">
                                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                            <Layers size={13} /> Available Pack Variants
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.types.map((type, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-black/60 border border-amber-400/30 text-slate-200 text-xs font-bold uppercase rounded-lg">
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.minimumOrder && (
                                    <div className="mt-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-2xl flex items-center gap-3">
                                        <BoxSelect size={20} className="text-amber-400 shrink-0" />
                                        <div>
                                            <span className="text-[9px] font-black text-amber-300 uppercase tracking-widest block">Minimum Order Requirement</span>
                                            <span className="text-sm font-black text-white">{product.minimumOrder}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Varieties Section */}
                        {product.varieties && product.varieties.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-white uppercase font-cinzel">Featured Varieties</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.varieties.map((v, idx) => (
                                        <div key={idx} className="bg-[#111827] border border-white/10 rounded-2xl p-5 hover:border-amber-400/40 transition-colors">
                                            <h4 className="text-base font-bold text-amber-400 mb-1">{v.title}</h4>
                                            <p className="text-xs text-slate-300">{v.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Order CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-rose-950 via-[#111827] to-amber-950 rounded-3xl p-10 md:p-14 border border-amber-400/30 text-center relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Sparkles size={32} className="mx-auto text-amber-400 mb-3" />
                        <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight uppercase font-cinzel">
                            Order Your Diwali Crackers Today
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base mb-8">
                            Vinayaga Crackers Sivakasi offers direct factory wholesale discounts, authentic green crackers, and safe insured parcel dispatch to all towns and cities across India.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href={`https://wa.me/919655889426?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl inline-flex items-center gap-2"
                            >
                                <PhoneCall size={16} /> WhatsApp: +91 96558 89426
                            </a>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('openInquiryPopup'))}
                                className="btn bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl"
                            >
                                Get Complete Price List
                            </button>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default ProductDetail;
