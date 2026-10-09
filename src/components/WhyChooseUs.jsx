import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Flame, Sparkles, Award, Percent } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.6 }}
        whileHover={{
            y: -10,
            transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="group relative p-8 rounded-3xl overflow-hidden transition-all duration-500 bg-[#111827] border border-amber-500/20 flex flex-col items-center text-center w-full hover:border-amber-400/50 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)]"
    >
        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-950 to-amber-950 border border-amber-500/30 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <Icon size={30} className="text-amber-400" />
        </div>

        <h3 className="text-xl font-bold mb-3 tracking-tight text-white group-hover:text-amber-300 transition-colors font-cinzel">
            {title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-300 group-hover:text-slate-200 transition-colors">
            {description}
        </p>
    </motion.div>
);

const WhyChooseUs = () => {
    const features = [
        {
            icon: Percent,
            title: "Direct Sivakasi Factory Rates",
            description: "Eliminate middleman margins and enjoy flat 90% discount compared to local market stalls."
        },
        {
            icon: ShieldCheck,
            title: "100% Green Crackers",
            description: "Manufactured using CSIR-NEERI approved formulations with 30-35% less smoke and zero toxic barium."
        },
        {
            icon: Flame,
            title: "Superior Visual & Sound Burst",
            description: "Top-tier pyrotechnic chemicals engineered for high-altitude bursts, brilliant colors, and clean reports."
        },
        {
            icon: Truck,
            title: "Safe Pan-India Parcel Transport",
            description: "Heavy moisture-proof double-corrugated cartons dispatched through licensed transport partners nationwide."
        },
        {
            icon: Award,
            title: "25+ Years Sivakasi Trust",
            description: "Decades of fireworks craftsmanship ensuring consistency, legal compliance, and customer delight."
        },
        {
            icon: Sparkles,
            title: "Diwali Gift Hamper Specials",
            description: "Customized assorted family packages, VIP boxes, and corporate celebration gift baskets ready to ship."
        }
    ];

    return (
        <section id="why-choose" className="py-20 md:py-28 bg-[#090D16] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center mb-16 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-amber-300 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                >
                    <Sparkles size={12} className="text-amber-400" />
                    <span className="font-tamil">வினாயகா உறுதிமொழி • The Vinayaga Promise</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase font-cinzel leading-tight"
                >
                    <span className="font-tamil text-2xl sm:text-3xl block text-slate-400 mb-2 normal-case">எஙகளை ஏன் தேர்ந்தெடுக்க வேண்டும்?</span>
                    Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400">Vinayaga Crackers</span>?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
                >
                    We bring the authentic spirit and pyrotechnic marvel of Sivakasi directly to your doorstep with guaranteed safety, licensed authenticity, and maximum value.
                </motion.p>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureItem key={idx} index={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
