import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Phone, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
    {
        question: "Are your crackers 100% certified Green Crackers?",
        answer: "Yes, absolutely. All crackers manufactured by Vinayaga Crackers Sivakasi follow CSIR-NEERI (SWAS, STAR, SAFAL) formulations approved by the Supreme Court of India. They produce 30-35% lower emissions, emit no toxic barium nitrate, and carry authentic green cracker logos and QR codes on the packaging."
    },
    {
        question: "Why are your prices up to 70% cheaper than local city stalls?",
        answer: "Local city stalls pay high seasonal shop rents, trader commissions, and multiple distributor margins. By buying directly from Vinayaga Crackers in Sivakasi, you purchase straight from the factory source at wholesale rates, saving you substantial money."
    },
    {
        question: "How will my Diwali crackers be delivered safely to my town?",
        answer: "Under explosive safety regulations, crackers cannot be shipped via ordinary air or postal couriers. We partner with licensed hazardous cargo transport networks. Your consignment is securely packed in moisture-resistant cartons and dispatched to your city/town transport booking hub for easy pickup."
    },
    {
        question: "What is the minimum order value for ordering?",
        answer: "To make parcel transport cost-effective for you, our minimum order value is ₹2,500. You can mix and match any items — Sparklers, Flower Pots, Chakkars, Sky Shots, or choose one of our convenient Diwali Gift Boxes."
    },
    {
        question: "When is the ideal time to place a pre-booking order for Diwali?",
        answer: "We strongly recommend placing your pre-booking order between August and early October. Early birds enjoy the maximum factory discounts (up to 70-75% off), complete stock availability, and guaranteed delivery before Diwali without last-minute transport delays."
    },
    {
        question: "How do I track my order once dispatched from Sivakasi?",
        answer: "Once your parcel is booked on the transport lorry, our team will send the official Lorry Receipt (LR copy) containing the LR tracking number, lorry company name, and local town office phone number directly to your WhatsApp."
    },
    {
        question: "What safety precautions should we follow when bursting crackers?",
        answer: "Always light crackers outdoors in open areas. Use a long agarbatti (incense stick) or sparkler to ignite from arm's length. Always keep a bucket of water and sand nearby for emergency disposal. Never bend over fireworks when lighting, and ensure children are strictly supervised by adults."
    }
];

const FAQItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={`border border-white/10 rounded-2xl mb-4 overflow-hidden transition-all ${isOpen ? 'bg-[#131B2E] border-amber-400/30' : 'bg-[#111827] hover:border-white/20'}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 px-6 flex items-center justify-between text-left gap-4"
            >
                <div className="flex items-center gap-4">
                    <span className="text-amber-400 font-black text-sm font-cinzel">
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-slate-200'}`}>
                        {item.question}
                    </h3>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-amber-500 text-slate-950' : 'bg-white/10 text-slate-300'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-1 pl-14 text-sm text-slate-300 leading-relaxed font-normal border-t border-white/5">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    useEffect(() => {
        document.title = "Frequently Asked Questions | Vinayaga Crackers Sivakasi";
    }, []);

    return (
        <div className="min-h-screen bg-[#080C14] text-white">
            {/* Header Section */}
            <section className="pt-44 pb-20 bg-gradient-to-b from-rose-950/40 via-night to-[#080C14] border-b border-amber-500/20">
                <div className="container px-6 relative z-10 mx-auto max-w-4xl">
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end mb-8">
                        <Link
                            to="/#"
                            className="inline-flex items-center gap-2 text-slate-300 bg-white/10 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border border-white/10"
                        >
                            <ArrowLeft size={14} /> Back to Home
                        </Link>
                    </motion.div>

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <Sparkles size={14} className="text-amber-400" />
                            Help & Support Center
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-white font-cinzel uppercase mb-4 leading-tight">
                            Frequently Asked <span className="text-amber-400">Questions</span>
                        </h1>
                        <p className="text-slate-300 text-base max-w-xl mx-auto">
                            Everything you need to know about buying authentic Sivakasi Diwali crackers online, green certifications, and safe transport.
                        </p>
                    </div>
                </div>
            </section>

            {/* Questions List */}
            <section className="py-16 container px-6 mx-auto max-w-4xl">
                <div>
                    {faqData.map((item, idx) => (
                        <FAQItem key={idx} item={item} index={idx} />
                    ))}
                </div>

                {/* WhatsApp Support Box */}
                <div className="mt-14 bg-[#111827] rounded-3xl p-8 border border-amber-500/20 text-center">
                    <h3 className="text-xl font-bold font-cinzel text-white mb-2">Have a question that is not listed here?</h3>
                    <p className="text-slate-400 text-sm mb-6">Our Sivakasi customer team is available on WhatsApp to assist you directly.</p>
                    <a
                        href="https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi,%20I%20have%20a%20question%20regarding%20crackers."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl inline-flex items-center gap-2"
                    >
                        <MessageCircle size={16} /> Chat on WhatsApp (+91 96558 89426)
                    </a>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
