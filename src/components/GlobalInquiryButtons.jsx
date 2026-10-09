import { useState } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const GlobalInquiryButtons = ({ productTitle = "Diwali Crackers Order", className = "", context = "Product Detail Page", isDark = false }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeAction, setActiveAction] = useState(null);
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');

    const handleAction = async (type) => {
        if (!clientName || !clientPhone) {
            alert("Please provide your name and WhatsApp number.");
            return;
        }

        setIsSubmitting(true);
        setActiveAction(type);

        const inquiryData = {
            name: clientName,
            phone: clientPhone,
            email: 'N/A',
            product: productTitle,
            industry: `Cracker Inquiry (${context})`,
            destination: "Sivakasi Direct Booking",
            contactMethod: type,
            createdAt: serverTimestamp(),
            status: 'new'
        };

        try {
            await addDoc(collection(db, 'inquiries'), inquiryData);

            const waBody = `🎆 *Diwali Cracker Inquiry - Vinayaga Crackers Sivakasi* 🎆\n\n` +
                `👤 *Name:* ${clientName}\n` +
                `📱 *Phone:* ${clientPhone}\n` +
                `🛍️ *Product:* ${productTitle}\n\n` +
                `Please send wholesale quotation and availability details.`;

            const subject = `Diwali Cracker Inquiry for ${productTitle}`;

            if (type === 'whatsapp') {
                window.open(`https://wa.me/918940921075?text=${encodeURIComponent(waBody)}`, '_blank');
            } else if (type === 'email') {
                window.location.href = `mailto:vinayagacrackerssivakasi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(waBody)}`;
            } else if (type === 'call') {
                window.location.href = `tel:+918940921075`;
            }
        } catch (error) {
            console.error("Quick Inquiry Error:", error);
            window.open(`https://wa.me/918940921075?text=Hi%20Vinayaga%20Crackers%20Sivakasi`, '_blank');
        } finally {
            setIsSubmitting(false);
            setActiveAction(null);
        }
    };

    const inputStyles = `w-full ${isDark ? 'bg-white/5 border-white/10 text-white focus:border-amber-400' : 'bg-[#1A2333] border-white/10 text-white focus:border-amber-400'} border py-3 px-4 rounded-xl text-xs font-bold transition-all outline-none`;

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={inputStyles}
                />
                <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className={inputStyles}
                />
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3`}>
                <button
                    onClick={() => handleAction('whatsapp')}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg disabled:opacity-50"
                >
                    {isSubmitting && activeAction === 'whatsapp' ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <MessageCircle size={16} />}
                    WhatsApp
                </button>
                <button
                    onClick={() => handleAction('call')}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg disabled:opacity-50"
                >
                    {isSubmitting && activeAction === 'call' ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Phone size={16} />}
                    Call Us
                </button>
                <button
                    onClick={() => handleAction('email')}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1F2937] hover:bg-[#374151] text-slate-200 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-white/10 disabled:opacity-50"
                >
                    {isSubmitting && activeAction === 'email' ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Mail size={16} />}
                    Email
                </button>
            </div>
        </div>
    );
};

export default GlobalInquiryButtons;
