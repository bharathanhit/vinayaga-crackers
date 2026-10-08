import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, Users, Sparkles, ChevronDown, Phone, Mail, MessageCircle, Flame, ShieldCheck } from 'lucide-react';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';

const Contact = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderType: 'Family Celebration Pack',
        destination: '',
        product: 'Diwali Festive Gift Boxes',
        budget: '₹3,000 – ₹10,000 (Standard Family Pack)'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionType, setActionType] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = [...staticCategories];

            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) merged[idx] = { ...merged[idx], ...fc };
                else merged.push(fc);
            });

            merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setCategories(merged);

            if (merged.length > 0 && !formData.product) {
                setFormData(prev => ({ ...prev, product: merged[0].title }));
            }
        }, () => {
            setCategories(staticCategories);
        });
        return () => unsubscribe();
    }, []);

    const handleAction = async (type) => {
        if (!formData.name || !formData.destination || !formData.phone) {
            alert("Please provide your name, phone number, and city / delivery location to continue.");
            return;
        }

        setIsSubmitting(true);
        setActionType(type);

        try {
            await addDoc(collection(db, 'inquiries'), {
                ...formData,
                contactMethod: type,
                createdAt: serverTimestamp(),
                status: 'new'
            });

            const subject = `Diwali Cracker Order [${formData.product}] from ${formData.name}`;
            const body = `🎆 *Diwali Cracker Order - Vinayaga Crackers Sivakasi* 🎆\n\n` +
                `👤 *Name:* ${formData.name}\n` +
                `📱 *Phone:* ${formData.phone}\n` +
                `📧 *Email:* ${formData.email || 'N/A'}\n` +
                `📍 *Delivery City / Town:* ${formData.destination}\n` +
                `🛍️ *Requirement:* ${formData.product}\n` +
                `📦 *Order Type:* ${formData.orderType}\n` +
                `💰 *Estimated Budget:* ${formData.budget}\n\n` +
                `_Sent via Vinayaga Crackers Website_`;

            if (type === 'whatsapp') {
                window.open(`https://wa.me/919655889426?text=${encodeURIComponent(body)}`, '_blank');
            } else if (type === 'email') {
                window.location.href = `mailto:vinayagacrackerssivakasi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            } else if (type === 'call') {
                window.location.href = `tel:+919655889426`;
            }
        } catch (error) {
            console.error("Order Inquiry Error:", error);
            alert("Please contact us directly on WhatsApp or Call at +91 96558 89426.");
        } finally {
            setIsSubmitting(false);
            setActionType(null);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-28 bg-[#090D16] text-white flex items-center justify-center relative overflow-hidden">
            <div className="container px-4 relative z-10 max-w-5xl mx-auto">
                <div className="bg-[#111827] rounded-[2.5rem] overflow-hidden shadow-2xl border border-amber-500/20 flex flex-col lg:flex-row relative">

                    {/* Left Column: Visual */}
                    <div className="lg:w-[42%] relative overflow-hidden hidden lg:flex flex-col justify-between p-10 bg-black">
                        <img
                            src={heroFireworksImg}
                            alt="Diwali Fireworks"
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/80 text-white text-[10px] font-black uppercase tracking-widest mb-4">
                                <Sparkles size={12} className="text-amber-300" />
                                Direct Sivakasi Factory
                            </div>
                            <h3 className="text-3xl font-black font-cinzel text-white leading-tight uppercase">
                                Pre-Book Your Diwali Crackers Now
                            </h3>
                        </div>

                        <div className="relative z-10 space-y-3 bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-amber-500/20">
                            <p className="text-xs text-amber-300 font-bold flex items-center gap-2">
                                <Flame size={14} className="text-rose-500" /> Up to 70% Off Factory Rates
                            </p>
                            <p className="text-xs text-slate-300 flex items-center gap-2">
                                <ShieldCheck size={14} className="text-emerald-400" /> 100% Certified Green Crackers
                            </p>
                            <p className="text-xs text-slate-300">
                                🚚 Safe parcel transport across India
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Precise Order Form */}
                    <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex justify-start mb-4">
                                <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-500/10 border border-amber-400/30 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-widest">
                                    <Sparkles size={12} />
                                    Diwali 2026 Booking
                                </div>
                            </div>

                            <h3 className="text-2xl sm:text-4xl font-black text-white mb-2 font-cinzel">
                                Quick Order & Quote
                            </h3>
                            <p className="text-slate-400 font-medium mb-8 text-sm">
                                Submit your details for instant WhatsApp booking or callback from our Sivakasi office.
                            </p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Ex: Ramesh Kumar"
                                            className="w-full bg-[#1A2333] border border-white/10 py-3 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone / WhatsApp Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-[#1A2333] border border-white/10 py-3 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery City / Town *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.destination}
                                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                            placeholder="Ex: Chennai, Bangalore, Madurai"
                                            className="w-full bg-[#1A2333] border border-white/10 py-3 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Type</label>
                                        <select
                                            value={formData.orderType}
                                            onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                                            className="w-full bg-[#1A2333] border border-white/10 py-3 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400 transition-all"
                                        >
                                            <option>Family Celebration Pack</option>
                                            <option>Wholesale / Reseller (Retail Store)</option>
                                            <option>Apartment Society / Corporate Bulk</option>
                                            <option>Wedding / Event Pyrotechnics</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preferred Category</label>
                                        <select
                                            value={formData.product}
                                            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                            className="w-full bg-[#1A2333] border border-white/10 py-3 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400 transition-all"
                                        >
                                            {categories.map((cat, idx) => (
                                                <option key={idx} value={cat.title}>{cat.title}</option>
                                            ))}
                                            {categories.length === 0 && <option>Diwali Festive Gift Boxes</option>}
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Budget</label>
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full bg-[#1A2333] border border-white/10 py-3 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400 transition-all"
                                        >
                                            <option>Under ₹3,000</option>
                                            <option>₹3,000 – ₹10,000 (Standard Family Pack)</option>
                                            <option>₹10,000 – ₹25,000 (VIP Celebration)</option>
                                            <option>₹25,000+ (Bulk / Wholesale Order)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Order Action Buttons */}
                                <div className="pt-4 space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleAction('whatsapp')}
                                            disabled={isSubmitting}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30"
                                        >
                                            <MessageCircle size={16} /> WhatsApp
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAction('call')}
                                            disabled={isSubmitting}
                                            className="bg-rose-700 hover:bg-rose-800 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                                        >
                                            <Phone size={16} /> Call Us
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAction('email')}
                                            disabled={isSubmitting}
                                            className="bg-[#1F2937] hover:bg-[#374151] border border-white/10 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Mail size={16} /> Email Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
