import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, Sparkles, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const FloatingEnquiry = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 250);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');

    const handleAction = async (type) => {
        if (!clientName || !clientPhone) {
            alert("Please provide your name and WhatsApp number.");
            return;
        }

        const companyPhone = "+919655889426";
        const companyEmail = "vinayagacrackerssivakasi@gmail.com";

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'inquiries'), {
                name: clientName,
                phone: clientPhone,
                email: 'N/A',
                product: "Diwali Crackers Quick Booking",
                industry: "Quick Connect Widget",
                destination: "Direct Sivakasi Order",
                contactMethod: type,
                createdAt: serverTimestamp(),
                status: 'new'
            });

            const waBody = `🎆 *Diwali Crackers Inquiry - Vinayaga Crackers Sivakasi* 🎆\n\n` +
                `👤 *Name:* ${clientName}\n` +
                `📱 *Phone:* ${clientPhone}\n` +
                `🎯 *Purpose:* Requesting Diwali 2026 Price List & Order Booking\n\n` +
                `Please send me your price list and catalog on WhatsApp.`;

            if (type === 'whatsapp') {
                window.open(`https://wa.me/${companyPhone.replace(/\D/g, '')}?text=${encodeURIComponent(waBody)}`, '_blank');
            } else if (type === 'call') {
                window.location.href = `tel:${companyPhone}`;
            }
        } catch (error) {
            console.error("Inquiry Error:", error);
            window.open(`https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi`, '_blank');
        } finally {
            setIsSubmitting(false);
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        className="bg-[#111827] border border-amber-400/30 rounded-3xl p-6 shadow-2xl w-80 text-white relative"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={16} className="text-amber-400" />
                            <h4 className="text-sm font-black font-cinzel uppercase text-white">Diwali Quick Order</h4>
                        </div>
                        <p className="text-xs text-slate-300 mb-4">
                            Get Sivakasi factory rates directly on WhatsApp.
                        </p>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={clientName}
                                onChange={e => setClientName(e.target.value)}
                                className="w-full bg-[#1A2333] border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-white outline-none focus:border-amber-400"
                            />
                            <input
                                type="tel"
                                placeholder="WhatsApp Number"
                                value={clientPhone}
                                onChange={e => setClientPhone(e.target.value)}
                                className="w-full bg-[#1A2333] border border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-white outline-none focus:border-amber-400"
                            />

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() => handleAction('whatsapp')}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-white"
                                >
                                    <MessageCircle size={14} /> WhatsApp
                                </button>
                                <button
                                    onClick={() => handleAction('call')}
                                    disabled={isSubmitting}
                                    className="bg-rose-600 hover:bg-rose-700 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all text-white"
                                    title="Call Us"
                                >
                                    <Phone size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white/20 relative"
                aria-label="Diwali Enquiry"
            >
                <MessageCircle size={26} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
            </motion.button>
        </div>
    );
};

export default FloatingEnquiry;
