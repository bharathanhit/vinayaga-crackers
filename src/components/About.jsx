import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Award, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import flowerPotsImg from '../assets/crackers/flower-pots.jpg';
import sparklersImg from '../assets/crackers/sparklers.jpg';
import groundChakkarsImg from '../assets/crackers/ground-chakkars.jpg';

const About = () => {
    return (
        <section id="about" className="py-20 md:py-28 overflow-hidden bg-white text-slate-900">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Visual Imagery Grid */}
                <div className="relative order-2 lg:order-1">
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4 md:space-y-6 pt-10">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.04 }}
                                    src={sparklersImg}
                                    className="rounded-3xl shadow-xl border-4 border-amber-100 object-cover aspect-[4/5] w-full"
                                    alt="Diwali Sparklers"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.04 }}
                                    src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-3xl shadow-xl border-4 border-amber-100 object-cover aspect-square w-full"
                                    alt="Diwali Celebration Diyas"
                                />
                            </motion.div>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: -40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.04 }}
                                    src={flowerPotsImg}
                                    className="rounded-3xl shadow-xl border-4 border-amber-100 object-cover aspect-square w-full"
                                    alt="Flower Pots Anar"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <motion.img
                                    whileHover={{ scale: 1.04 }}
                                    src={groundChakkarsImg}
                                    className="rounded-3xl shadow-xl border-4 border-amber-100 object-cover aspect-[4/5] w-full"
                                    alt="Ground Chakkars"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="absolute -top-10 -left-10 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl -z-10" />
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 border border-rose-200 rounded-full text-rose-700 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Sparkles size={12} className="text-amber-500" />
                        Our Sivakasi Heritage
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 font-black mb-6 leading-[1.08] tracking-tight font-cinzel">
                        Illuminating Indian Celebrations <br />
                        <span className="text-rose-700 italic">With Trust & Joy.</span>
                    </h2>

                    <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed font-normal">
                        Based in the heart of Sivakasi, Tamil Nadu — the pyrotechnic capital of India — <strong>Vinayaga Crackers</strong> is committed to delivering authentic, safe, and breathtaking fireworks straight from our manufacturing units to your homes and businesses.
                    </p>

                    <div className="space-y-3.5 mb-8">
                        {[
                            "100% CSIR-NEERI Certified Green Crackers (Low Smoke & Safe)",
                            "Direct Sivakasi Factory Rates — Save Up to 70% off Retail",
                            "Strict PESO Compliance & Zero Child Labor Guarantee",
                            "Moisture-Proof Packaging & Pan-India Safe Transport Delivery"
                        ].map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                key={idx}
                                className="flex items-center gap-3 text-slate-800"
                            >
                                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                                    <CheckCircle2 size={13} className="text-rose-600" />
                                </div>
                                <span className="font-bold text-xs sm:text-sm tracking-tight">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-6 bg-amber-50/50 rounded-2xl border border-amber-200/60 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-white rounded-xl shadow-sm border border-amber-200 flex items-center justify-center text-rose-700">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <p className="font-black text-xs text-slate-900 uppercase">PESO Licensed</p>
                                <p className="text-[10px] text-slate-500">Government Certified</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-white rounded-xl shadow-sm border border-amber-200 flex items-center justify-center text-amber-600">
                                <Award size={22} />
                            </div>
                            <div>
                                <p className="font-black text-xs text-slate-900 uppercase">25+ Years</p>
                                <p className="text-[10px] text-slate-500">Sivakasi Legacy</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Link to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-all group">
                            Read Our Full Story
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
