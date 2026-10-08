import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const TermsAndConditions = () => {
    useEffect(() => {
        document.title = "Terms & Conditions | Vinayaga Crackers Sivakasi";
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
                        <FileText size={14} className="text-amber-400" />
                        Statutory Fireworks Guidelines
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-white font-cinzel mb-4 uppercase">
                        Terms & <span className="text-amber-400">Conditions</span>
                    </h1>
                    <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
                        These terms govern the ordering, delivery, and handling of green fireworks purchased from Vinayaga Crackers Sivakasi.
                    </p>
                </div>

                <div className="space-y-8 bg-[#111827] p-8 md:p-12 rounded-3xl border border-white/10">
                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">1. Age Requirement & Legal Selling</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            In strict compliance with the Indian Explosives Act, fireworks are sold strictly to adults aged 18 and above. We strictly prohibit sales to minors.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">2. Green Cracker Compliance</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Vinayaga Crackers only sells CSIR-NEERI certified Green Crackers compliant with PESO and Supreme Court directives. We do not manufacture or sell banned barium-based fireworks.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">3. Transport & Delivery Protocol</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Fireworks cannot be transported by regular passenger buses, trains, or postal couriers. Consignments are dispatched through certified road parcel transport. Customers must collect parcels from their city's designated transport booking godown with the provided LR receipt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold font-cinzel text-amber-400 mb-3 uppercase">4. Cancellation & Refund Policy</h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Given the seasonal and explosive nature of fireworks, orders cannot be cancelled once packed and handed over to the transport agency. Any in-transit damage or shortage must be reported upon parcel pickup with video evidence.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
