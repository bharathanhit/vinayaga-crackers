import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Truck, Clock, CheckCircle2, ArrowLeft, QrCode, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const PaymentTerms = () => {
    useEffect(() => {
        document.title = "Payment & Delivery Terms | Vinayaga Crackers Sivakasi";
    }, []);

    const paymentMethods = [
        {
            title: "UPI / Google Pay / PhonePe / QR Code",
            desc: "Instant payment verification via UPI QR code or mobile number. Fast, safe, and standard for retail & family gift box bookings.",
            icon: QrCode
        },
        {
            title: "Direct Bank Transfer (NEFT / RTGS / IMPS)",
            desc: "Official current account bank transfer with GST invoice. Best suited for wholesale orders, bulk retailers, and society bookings.",
            icon: CreditCard
        },
        {
            title: "Pre-Booking Advance (50% + 50%)",
            desc: "Pay 50% advance to lock in early bird factory wholesale rates and stock reservation. Balance 50% paid upon LR transport dispatch copy.",
            icon: ShieldCheck
        },
        {
            title: "Licensed Transport LR Delivery",
            desc: "Parcels are transported via approved hazardous cargo lorries. Collect your consignment from the local town transport hub using LR bill.",
            icon: Truck
        }
    ];

    return (
        <div className="pt-44 pb-24 bg-[#080C14] min-h-screen text-white">
            <div className="container max-w-5xl px-6 mx-auto">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end mb-8">
                    <Link
                        to="/#"
                        className="inline-flex items-center gap-2 text-slate-300 bg-white/10 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border border-white/10"
                    >
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                </motion.div>

                {/* Hero Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 mb-6 border border-amber-400/30 text-[10px] font-black uppercase tracking-widest">
                        <CreditCard size={14} className="text-amber-400" />
                        Safe & Transparent Transactions
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-white font-cinzel mb-4 uppercase leading-none">
                        Payment & <span className="text-amber-400">Delivery Terms</span>
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                        Clear, hassle-free ordering policies designed for smooth Diwali celebrations and reliable delivery from Sivakasi.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-16">
                    {paymentMethods.map((method, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="bg-[#111827] p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-8 hover:border-amber-400/40 transition-all group shadow-xl"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                                <method.icon size={28} />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-xl font-bold text-white mb-2 font-cinzel uppercase">{method.title}</h2>
                                <p className="text-slate-300 text-sm leading-relaxed">{method.desc}</p>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider shrink-0">
                                <CheckCircle2 size={16} /> Verified Safe
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Important Notes */}
                <div className="bg-[#131B2E] p-8 md:p-12 rounded-3xl border border-amber-500/20 text-white">
                    <h3 className="text-2xl font-black mb-6 uppercase font-cinzel text-amber-400">
                        Dispatch & Delivery Guidelines
                    </h3>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <Clock size={22} className="text-amber-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">
                                    Dispatch Timelines
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Orders placed during the pre-booking period are packed and dispatched in sequence. Consignments typically take 2-4 business days for South India and 4-7 business days for North/West India via road transport.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Truck size={22} className="text-amber-400 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">
                                    Parcel Office Pickup
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Due to fireworks safety rules, consignments are delivered to the designated licensed parcel office / booking godown in your nearest city/town. Customers collect the parcel upon presenting the LR receipt sent by us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentTerms;
