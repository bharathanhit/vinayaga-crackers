import { motion } from 'framer-motion';
import { Quote, Star, Sparkles } from 'lucide-react';

const TestimonialCard = ({ quote, name, location, role, image, index }) => (
    <div
        className="group relative px-7 py-8 rounded-3xl bg-[#111827] border border-amber-500/20 shadow-xl hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full w-full text-white"
    >
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                ))}
            </div>
            <Quote size={24} className="text-amber-500/30" />
        </div>

        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed italic mb-6">
            "{quote}"
        </p>

        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/40 bg-black shrink-0">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
                <h4 className="font-bold text-white text-sm font-cinzel">{name}</h4>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">{role} • {location}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const testimonials = [
        {
            quote: "We ordered 45 Deluxe Family Gift Hampers for our apartment society in Bangalore. Every single item burst with brilliant colors and zero duds. We saved over 65% compared to local retail!",
            name: "Rajesh S.",
            location: "Bangalore",
            role: "Apartment Secretary",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
            quote: "The 60 Shots Grand Finale Aerial Cake was the absolute highlight of our Diwali night. Sky filled with cascading golden willows. Highly impressed with Sivakasi factory direct quality.",
            name: "Priya Venkatesh",
            location: "Chennai",
            role: "Family Customer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
            quote: "I have been buying wholesale cracker consignments from Vinayaga Crackers for my seasonal retail counter in Coimbatore for 4 years. Timely LR transport delivery and guaranteed profit margins.",
            name: "Karthik Murugan",
            location: "Coimbatore",
            role: "Retail Stall Owner",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
        },
        {
            quote: "Being eco-conscious, we specifically wanted authentic CSIR-NEERI Green Crackers with low smoke for our kids. The sparklers and anars were super safe and long-lasting.",
            name: "Sneha Sharma",
            location: "Hyderabad",
            role: "Verified Buyer",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
        }
    ];

    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-20 bg-[#070A12] text-white relative overflow-hidden">
            <div className="container relative z-10 mx-auto px-6 mb-12 text-center max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    <Sparkles size={12} className="text-amber-400" />
                    Customer Experiences
                </div>
                <h2 className="text-3xl sm:text-5xl font-black font-cinzel uppercase mb-4">
                    Trusted By Thousands Of Families
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                    Read genuine feedback from families and wholesale buyers who celebrate Diwali with Vinayaga Crackers Sivakasi.
                </p>
            </div>

            <div className="relative w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <motion.div
                    className="flex gap-6 px-4 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                >
                    {duplicatedTestimonials.map((testimonial, idx) => (
                        <div key={idx} className="w-[320px] sm:w-[400px] shrink-0">
                            <TestimonialCard index={idx} {...testimonial} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
