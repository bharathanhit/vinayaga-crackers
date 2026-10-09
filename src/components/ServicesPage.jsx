import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Package, Truck, ShieldCheck, Zap,
    CheckCircle2, ArrowRight, Phone, Sparkles, Flame,
    MessageCircle, ArrowLeft, Percent, Gift, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';

const crackerServices = [
    {
        icon: Percent,
        title: "Wholesale Supplies for Retailers",
        desc: "Direct Sivakasi factory supply for seasonal cracker stall owners, shops, and wholesale distributors. Huge profit margins and guaranteed original brand packaging.",
        features: ["Flat 90% Factory Discount", "Official PESO Invoices & Billing", "Early Pre-Booking Allocation", "Direct Lorry Parcel Transport"],
        badge: "Highest Savings"
    },
    {
        icon: Gift,
        title: "Corporate & Society Gift Hampers",
        desc: "Customized Diwali gift hampers for IT companies, manufacturing firms, apartment associations, and gated communities with customized greeting cards.",
        features: ["Custom Assortment from ₹999", "Company Branding & Ribbon Pack", "Bulk Society Deliveries", "Zero Burst Hazard Formulations"],
        badge: "Corporate Favorite"
    },
    {
        icon: Flame,
        title: "Wedding & Festival Pyrotechnics",
        desc: "Spectacular aerial fireworks and stage cold pyro displays for grand wedding receptions, temple festivals, sports inaugurations, and new year bashes.",
        features: ["Low-Smoke Cold Pyro Fountains", "Grand 120-Shot Finale Cakes", "Certified Pyrotechnic Setup", "Synchronized Sky Sequences"],
        badge: "Event Special"
    },
    {
        icon: Truck,
        title: "Pan-India Secure Parcel Shipping",
        desc: "Specialized explosive-licensed parcel transport networks delivering directly to parcel booking offices across Tamil Nadu, Karnataka, Andhra, Telangana, Maharashtra & beyond.",
        features: ["Moisture-Proof Double Cartons", "Real-Time LR Consignment Tracking", "Transit Insurance Included", "Prompt Dispatch Before Diwali"],
        badge: "Pan-India"
    }
];

const ServicesPage = () => {
    useEffect(() => {
        document.title = "Wholesale & Cracker Services | Vinayaga Crackers Sivakasi";
    }, []);

    const [inquiryForm, setInquiryForm] = useState({
        name: '',
        phone: '',
        city: '',
        serviceType: 'Wholesale Cracker Supply',
        notes: ''
    });

    const handleQuickOrder = (e) => {
        e.preventDefault();
        const msg = encodeURIComponent(
            `Hi Vinayaga Crackers Sivakasi, I am interested in: "${inquiryForm.serviceType}".\n` +
            `Name: ${inquiryForm.name}\n` +
            `Phone: ${inquiryForm.phone}\n` +
            `City: ${inquiryForm.city}\n` +
            `Notes: ${inquiryForm.notes || 'None'}`
        );
        window.open(`https://wa.me/918940921075?text=${msg}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#080C14] text-white">
            {/* Hero Banner */}
            <section className="relative pt-44 pb-20 bg-gradient-to-b from-rose-950/40 via-night to-[#080C14] border-b border-amber-500/20">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end mb-8">
                        <Link
                            to="/#"
                            className="inline-flex items-center gap-2 text-slate-300 bg-white/10 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border border-white/10"
                        >
                            <ArrowLeft size={14} /> Back to Home
                        </Link>
                    </motion.div>

                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <Sparkles size={14} className="text-amber-400" />
                            Direct Sivakasi Factory Services
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black text-white font-cinzel uppercase mb-6 leading-tight">
                            Wholesale & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400">
                                Cracker Booking Services
                            </span>
                        </h1>

                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            Whether you need wholesale supplies for your retail store, corporate Diwali hampers, or festival pyrotechnics — Vinayaga Crackers delivers unmatched Sivakasi quality and unbeatable savings.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {crackerServices.map((svc, index) => (
                        <motion.div
                            key={svc.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="bg-[#111827] rounded-3xl p-8 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between hover:shadow-2xl hover:shadow-rose-950/30"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-400/30">
                                        <svc.icon size={28} />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-rose-600/80 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                                        {svc.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-3 font-cinzel">
                                    {svc.title}
                                </h3>

                                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                                    {svc.desc}
                                </p>

                                <div className="space-y-2.5 mb-8">
                                    {svc.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                                            <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/918940921075?text=${encodeURIComponent(`Hi Vinayaga Crackers Sivakasi, I want details regarding: ${svc.title}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
                            >
                                <MessageCircle size={15} /> Enquire on WhatsApp
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Wholesale Booking Contact Form */}
                <div className="mt-20 max-w-4xl mx-auto bg-[#131B2E] rounded-3xl p-8 md:p-12 border border-amber-500/20">
                    <div className="text-center mb-8">
                        <Sparkles size={28} className="mx-auto text-amber-400 mb-2" />
                        <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-white uppercase">
                            Direct Wholesale Inquiry & Price List
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Get our latest 2026 Diwali wholesale price list PDF sent directly to your WhatsApp.
                        </p>
                    </div>

                    <form onSubmit={handleQuickOrder} className="space-y-4 max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                required
                                placeholder="Your Name"
                                value={inquiryForm.name}
                                onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                                className="w-full bg-[#1A2333] border border-white/10 py-3.5 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400"
                            />
                            <input
                                type="tel"
                                required
                                placeholder="WhatsApp Number"
                                value={inquiryForm.phone}
                                onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                                className="w-full bg-[#1A2333] border border-white/10 py-3.5 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                required
                                placeholder="City / Delivery Location"
                                value={inquiryForm.city}
                                onChange={e => setInquiryForm({ ...inquiryForm, city: e.target.value })}
                                className="w-full bg-[#1A2333] border border-white/10 py-3.5 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400"
                            />
                            <select
                                value={inquiryForm.serviceType}
                                onChange={e => setInquiryForm({ ...inquiryForm, serviceType: e.target.value })}
                                className="w-full bg-[#1A2333] border border-white/10 py-3.5 px-4 rounded-xl text-sm font-bold text-white outline-none focus:border-amber-400"
                            >
                                <option>Wholesale Cracker Supply</option>
                                <option>Corporate Gift Hampers</option>
                                <option>Wedding / Event Fireworks</option>
                                <option>Family Diwali Pack Booking</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <Download size={16} /> Request Instant WhatsApp Price List
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
