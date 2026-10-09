import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, BadgePercent, Headphones } from 'lucide-react';

const trustFeatures = [
    {
        icon: ShieldCheck,
        title: "பாதுகாப்பான பட்டாசுகள்",
        subtitle: "100% தரமான பசுமை பட்டாசுகள்",
        enTitle: "Safe Green Crackers",
        enSubtitle: "CSIR-NEERI Certified Quality",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
        icon: Truck,
        title: "அகில இந்திய டெலிவரி",
        subtitle: "இந்தியா முழுவதும் பார்சல் டெலிவரி",
        enTitle: "All India Delivery",
        enSubtitle: "Safe Parcel Dispatch Nationwide",
        color: "text-blue-700 bg-blue-50 border-blue-200"
    },
    {
        icon: BadgePercent,
        title: "சிறப்பு தள்ளுபடி",
        subtitle: "90% வரை தொழிற்சாலை நேரடி விலை",
        enTitle: "Special Festival Discount",
        enSubtitle: "Up to 90% Direct Wholesale",
        color: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
        icon: Headphones,
        title: "வாடிக்கையாளர் ஆதரவு",
        subtitle: "எப்போதும் உங்களுடன் • +91 89409 21075",
        enTitle: "Customer Support",
        enSubtitle: "Always With You 24/7",
        color: "text-purple-700 bg-purple-50 border-purple-200"
    }
];

const TrustBar = () => {
    return (
        <section className="bg-[#FAF9F6] border-y border-amber-200/80 py-5 shadow-sm relative z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
                    {trustFeatures.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex items-center gap-4 px-4 py-2 group hover:translate-x-1 lg:hover:translate-x-0 lg:hover:-translate-y-0.5 transition-all"
                            >
                                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center border shrink-0 shadow-sm group-hover:scale-110 transition-transform ${item.color}`}>
                                    <Icon size={26} strokeWidth={2.2} />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-slate-900 font-extrabold text-sm sm:text-base font-tamil tracking-wide leading-tight group-hover:text-amber-700 transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-slate-500 text-xs font-semibold font-tamil mt-0.5 leading-snug">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
