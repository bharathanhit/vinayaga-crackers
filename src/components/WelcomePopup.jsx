import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageCircle, Phone, MapPin, Flame, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import heroFireworksImg from '../assets/crackers/hero-fireworks.jpg';

const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        interest: 'Diwali Family Gift Boxes'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Only open if not dismissed in this session
            const dismissed = sessionStorage.getItem('diwali_popup_dismissed');
            if (!dismissed) {
                setIsOpen(true);
            }
        }, 1200);

        const handleManualOpen = () => {
            setIsSubmitted(false);
            setIsOpen(true);
        };

        window.addEventListener('openInquiryPopup', handleManualOpen);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('openInquiryPopup', handleManualOpen);
        };
    }, []);

    const handleClose = () => {
        sessionStorage.setItem('diwali_popup_dismissed', 'true');
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.city) {
            alert("Please fill in your Name, Phone Number, and City.");
            return;
        }

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'inquiries'), {
                name: formData.name,
                phone: formData.phone,
                destination: formData.city,
                product: formData.interest,
                industry: "Welcome Pre-Booking Popup",
                contactMethod: 'whatsapp',
                createdAt: serverTimestamp(),
                status: 'new'
            });

            setIsSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
            }, 2500);

            const waBody = `🎆 *Diwali 2026 Price List Request - Vinayaga Crackers Sivakasi* 🎆\n\n` +
                `👤 *Name:* ${formData.name}\n` +
                `📱 *Phone:* ${formData.phone}\n` +
                `📍 *Delivery City:* ${formData.city}\n` +
                `🛍️ *Category Interest:* ${formData.interest}\n\n` +
                `Please send me your Diwali wholesale price list PDF.`;
            
            window.open(`https://wa.me/919655889426?text=${encodeURIComponent(waBody)}`, '_blank');
        } catch (error) {
            console.error("Popup Error:", error);
            window.open(`https://wa.me/919655889426?text=Hi%20Vinayaga%20Crackers%20Sivakasi`, '_blank');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md bg-black/75 overflow-y-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-[#111827] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full text-white relative"
                    >
                        {/* Top banner visual */}
                        <div className="relative h-36 overflow-hidden bg-black">
                            <img
                                src={heroFireworksImg}
                                alt="Diwali Fireworks"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/40" />
                            
                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition-colors z-20"
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>

                            <div className="absolute bottom-3 left-6 z-10">
                                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-widest rounded-full shadow-md">
                                    Diwali 2026 Pre-Booking Offer
                                </span>
                            </div>
                        </div>

                        {/* Content & Form */}
                        <div className="p-6 sm:p-8">
                            <h3 className="text-2xl font-black font-cinzel text-white uppercase mb-2">
                                Get Up To 70% Off Factory Rates!
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 mb-6">
                                Download our official <strong>Vinayaga Crackers Sivakasi</strong> wholesale price list PDF directly on your WhatsApp.
                            </p>

                            {isSubmitted ? (
                                <div className="py-8 text-center text-emerald-400 space-y-2">
                                    <CheckCircle2 size={42} className="mx-auto" />
                                    <h4 className="text-lg font-bold text-white">Opening WhatsApp...</h4>
                                    <p className="text-xs text-slate-300">Your price list request is being dispatched.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    <div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Full Name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[#1A2333] border border-white/10 px-4 py-3 rounded-xl text-xs sm:text-sm text-white outline-none focus:border-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="WhatsApp Number"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-[#1A2333] border border-white/10 px-4 py-3 rounded-xl text-xs sm:text-sm text-white outline-none focus:border-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Delivery City / Town"
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full bg-[#1A2333] border border-white/10 px-4 py-3 rounded-xl text-xs sm:text-sm text-white outline-none focus:border-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <select
                                            value={formData.interest}
                                            onChange={e => setFormData({ ...formData, interest: e.target.value })}
                                            className="w-full bg-[#1A2333] border border-white/10 px-4 py-3 rounded-xl text-xs sm:text-sm text-white outline-none focus:border-amber-400"
                                        >
                                            <option>Diwali Family Gift Boxes</option>
                                            <option>Wholesale Cracker Store Supply</option>
                                            <option>Sparklers & Flower Pots Pack</option>
                                            <option>Aerial Sky Shot Cakes</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 bg-gradient-to-r from-rose-600 via-amber-500 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
                                    >
                                        <MessageCircle size={16} /> Get WhatsApp Price List
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomePopup;
