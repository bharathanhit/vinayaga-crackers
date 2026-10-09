import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = "Privacy Policy | Vinayaga Crackers Sivakasi";
    }, []);

    return (
        <div className="pt-44 pb-24 bg-[#080C14] min-h-screen text-white">
            <div className="container max-w-4xl px-6 mx-auto">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end mb-8">
                    <Link
                        to="/#"
                        className="inline-flex items-center gap-2 text-slate-300 bg-white/10 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border border-white/10"
                    >
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                </motion.div>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 mb-6 border border-amber-400/30 text-[10px] font-black uppercase tracking-widest">
                        <Lock size={14} className="text-amber-400" />
                        Customer Data Protection
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-white font-cinzel mb-4 uppercase">
                        Privacy <span className="text-amber-400">Policy</span>
                    </h1>
                    <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
                        At Vinayaga Crackers Sivakasi, we respect your privacy and safeguard all contact, order, and dispatch information provided by our customers.
                    </p>
                </div>

                <div className="space-y-8 bg-[#111827] p-8 md:p-12 rounded-3xl border border-white/10">
                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">1. Information We Collect</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            We collect basic order details including your Name, Phone / WhatsApp number, Delivery Town/City, and cracker order requirements strictly to process, pack, and ship your consignment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">2. Use of Information</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Your contact details are exclusively utilized to send price lists, quotation estimates, dispatch Lorry Receipts (LR copy), and communicate regarding parcel status. We never sell, rent, or trade your data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">3. Safe Storage & Security</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Customer orders and inquiry submissions are encrypted and secured via Firebase cloud databases. Access is limited strictly to authorized Vinayaga Crackers dispatch coordinators in Sivakasi.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">4. Contacting Us</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            If you have questions regarding our privacy practices or wish to update your details, please reach out directly at <strong>vinayagacrackerssivakasi@gmail.com</strong> or via WhatsApp at <strong>+91 89409 21075</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
