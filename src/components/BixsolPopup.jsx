import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, MessageSquare, Send, User, Phone } from "lucide-react";

const BixsolPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        websiteType: "Business Website",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `*New Website Inquiry from Vinayaga Crackers*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Website Type:* ${formData.websiteType}%0A*Message:* ${formData.message}`;
        const whatsappUrl = `https://wa.me/917339310823?text=${text}`;
        window.open(whatsappUrl, "_blank");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden overflow-y-auto max-h-[92vh] max-w-md w-full relative border border-blue-100"
                    >
                        {/* Header with Gradient */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 sm:p-6 text-white relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-6 py-1.5 px-4 bg-white/20 hover:bg-white/40 rounded-full transition-all flex items-center gap-2 group border border-white/20 text-[10px] font-black uppercase tracking-widest"
                            >
                                <X size={14} className="group-hover:rotate-90 transition-transform" />
                                CLOSE
                            </button>
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl">
                                    <Globe size={22} className="sm:hidden text-white" />
                                    <Globe size={28} className="hidden sm:block text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold leading-tight">Need a Website?</h2>
                                    <motion.a
                                        href="https://bixsolution.site"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        animate={{
                                            boxShadow: ["0px 0px 0px rgba(255,255,255,0.4)", "0px 0px 20px rgba(255,255,255,0.8)", "0px 0px 0px rgba(255,255,255,0.4)"],
                                            scale: [1, 1.05, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="text-[10px] bg-white text-blue-700 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-all flex items-center gap-2 font-black mt-2 uppercase tracking-widest w-fit shadow-xl border-2 border-white/50"
                                    >
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Globe size={12} className="text-blue-600" />
                                        </motion.span>
                                        Visit bixsolution.site
                                        <Send size={10} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </motion.a>
                                </div>
                            </div>
                            <p className="text-blue-100 text-xs sm:text-sm mt-1 sm:mt-2">
                                Get a premium, high-performance website build by BIXSOL.
                            </p>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 bg-white">
                            <div className="space-y-3 sm:space-y-4">
                                {/* Name Field */}
                                <div className="relative">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block ml-1">
                                        Your Name
                                    </label>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <User size={18} className="text-gray-400 mr-2" />
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            className="bg-transparent border-none outline-none w-full text-gray-800 placeholder:text-gray-400"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Phone Field */}
                                <div className="relative">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block ml-1">
                                        Phone Number
                                    </label>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <Phone size={18} className="text-gray-400 mr-2" />
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            className="bg-transparent border-none outline-none w-full text-gray-800 placeholder:text-gray-400"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Website Type Dropdown */}
                                <div className="relative">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block ml-1">
                                        Website Type
                                    </label>
                                    <select
                                        name="websiteType"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800 appearance-none cursor-pointer"
                                        onChange={handleChange}
                                    >
                                        <option>Business Website</option>
                                        <option>E-commerce Store</option>
                                        <option>Portfolio / Portfolio</option>
                                        <option>Educational Platform</option>
                                        <option>Other / Custom</option>
                                    </select>
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block ml-1">
                                        Tell us your vision
                                    </label>
                                    <div className="flex bg-gray-50 border border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <MessageSquare size={16} className="text-gray-400 mr-2 mt-1" />
                                        <textarea
                                            name="message"
                                            rows="2"
                                            placeholder="Briefly describe your project..."
                                            className="bg-transparent border-none outline-none w-full text-gray-800 placeholder:text-gray-400 resize-none text-sm"
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transform transition-all active:scale-95 group text-sm sm:text-base"
                            >
                                Submit on WhatsApp
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>

                        <div className="bg-gray-50 px-4 sm:px-6 py-2.5 sm:py-4 border-t border-gray-100">
                            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
                                Premium Solutions By Bixsol
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BixsolPopup;
