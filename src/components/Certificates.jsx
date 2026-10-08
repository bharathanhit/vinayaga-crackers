import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, ArrowLeft, Flame, Sparkles, CheckCircle2, FileText, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

import GST_P1 from '../assets/GST/gst_p1.png';
import GST_P2 from '../assets/GST/gst_p2.png';
import MSME_P1 from '../assets/MSME/msme_p1.png';
import MSME_P2 from '../assets/MSME/msme_p2.png';

const CRACKER_LICENSES = [
    {
        id: 'peso-license',
        name: 'PESO Manufacturing & Storage License',
        authority: 'Petroleum and Explosives Safety Organisation, Govt. of India',
        description: 'Certified explosive handling, warehouse compliance, and safety-verified fireworks manufacturing under the Indian Explosives Act.',
        badge: 'Statutory License',
        color: '#dc2626',
        gradient: 'from-rose-600 to-red-800',
        images: []
    },
    {
        id: 'neeri-green-crackers',
        name: 'CSIR-NEERI Green Cracker Certification',
        authority: 'Council of Scientific & Industrial Research - NEERI',
        description: 'Official emission authorization for SWAS, STAR, and SAFAL formulations guaranteeing 30-35% lower particulate emissions with zero barium.',
        badge: 'Green Certified',
        color: '#059669',
        gradient: 'from-emerald-600 to-green-800',
        images: []
    },
    {
        id: 'gst-registration',
        name: 'GST Tax Compliance Registration',
        authority: 'Ministry of Finance, Government of India',
        description: 'Authorized tax filing and wholesale merchant billing registration for commercial inter-state cracker supplies.',
        badge: 'Tax Compliant',
        color: '#f59e0b',
        gradient: 'from-amber-500 to-amber-700',
        images: [GST_P1, GST_P2]
    },
    {
        id: 'msme-udyam',
        name: 'MSME Government Registration',
        authority: 'Ministry of Micro, Small and Medium Enterprises',
        description: 'Official enterprise recognition under Government of India promoting Sivakasi traditional pyrotechnic craft and industry.',
        badge: 'Govt Recognized',
        color: '#7c3aed',
        gradient: 'from-purple-600 to-indigo-800',
        images: [MSME_P1, MSME_P2]
    },
    {
        id: 'tnmfa-association',
        name: 'Sivakasi Fireworks Association Membership',
        authority: 'Tamil Nadu Fireworks & Amorces Manufacturers Association',
        description: 'Registered member dedicated to standard quality control, worker welfare, and child-labor-free industrial operations.',
        badge: 'Industry Member',
        color: '#0284c7',
        gradient: 'from-sky-600 to-blue-800',
        images: []
    }
];

const Certificates = () => {
    useEffect(() => {
        document.title = "Safety & Legal Licences | Vinayaga Crackers Sivakasi";
    }, []);

    return (
        <div className="min-h-screen bg-[#080C14] text-white">
            {/* Hero */}
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
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <ShieldCheck size={14} className="text-emerald-400" />
                            100% Legal & Govt. Verified Compliance
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black text-white font-cinzel uppercase mb-6 leading-tight">
                            Safety, PESO & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400">
                                Green Cracker Licences
                            </span>
                        </h1>

                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                            Every cracker manufactured and sold by Vinayaga Crackers Sivakasi adheres strictly to Petroleum and Explosives Safety Organisation (PESO) protocols and CSIR-NEERI green emission norms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Licences Grid */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {CRACKER_LICENSES.map((lic, index) => (
                        <motion.div
                            key={lic.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.6 }}
                            className="bg-[#111827] rounded-3xl p-8 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between hover:shadow-2xl hover:shadow-rose-950/40"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lic.gradient} flex items-center justify-center text-white shadow-lg`}>
                                        <Award size={28} />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                                        {lic.badge}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 font-cinzel leading-snug">
                                    {lic.name}
                                </h3>

                                <p className="text-xs text-amber-400 font-bold mb-4 uppercase tracking-wider">
                                    {lic.authority}
                                </p>

                                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                                    {lic.description}
                                </p>
                            </div>

                            {lic.images && lic.images.length > 0 ? (
                                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                                    {lic.images.map((img, i) => (
                                        <div key={i} className="w-16 h-20 rounded-xl overflow-hidden border border-white/20 bg-black">
                                            <img src={img} alt={lic.name} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <span className="text-[10px] font-bold text-slate-400">Attached Government Certificate Copy</span>
                                </div>
                            ) : (
                                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                                    <CheckCircle2 size={16} /> Verified Active License
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Statutory Disclaimer */}
                <div className="mt-16 bg-[#131B2E] border border-amber-500/20 rounded-3xl p-8 max-w-4xl mx-auto text-center">
                    <ShieldCheck size={32} className="mx-auto text-emerald-400 mb-3" />
                    <h3 className="text-xl font-bold text-white uppercase font-cinzel mb-2">PESO & Supreme Court Compliance</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                        In accordance with the orders of the Supreme Court of India and PESO, Vinayaga Crackers exclusively manufactures and distributes CSIR-NEERI approved Green Fireworks. All products carry standard green cracker logos and official QR authentication codes.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Certificates;
