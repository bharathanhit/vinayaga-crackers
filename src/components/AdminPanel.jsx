import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import {
    Lock, Eye, EyeOff, LogOut, ShieldCheck, Package, Users, Globe,
    Activity, AlertCircle, Bell, Calendar, BarChart3,
    Plus, Trash2, Edit2, X, Check, FolderOpen, ChevronDown, ChevronUp, Link, Mail,
    MessageSquare, Facebook, Twitter, Instagram, Linkedin, Youtube,
    Truck, Search, Settings, Award, Zap, FileImage, UploadCloud,
    MessageCircle, Phone, Clock, GripVertical, RotateCcw, CheckCircle2, Tag, Percent,
    Printer, FileText, Download
} from 'lucide-react';
import {
    collection, addDoc, updateDoc, deleteDoc, doc, setDoc, getDocs, where,
    onSnapshot, query, orderBy, serverTimestamp, writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories, products as staticProducts } from '../data/products';
// ─── Environment Credentials ─────────────────────────────────────────
const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'saran raj';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'vinayaga572';

const slugify = (str) => str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
const resizeImage = (file, maxWidth = 800) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // High compression to save Firestore space
            };
        };
    });
};

// ─── Login Screen ──────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        // Use a subtle delay to prevent brute-forcing
        setTimeout(() => {
            const enteredUser = username.trim();
            const enteredPass = password.trim();
            const targetUser = (ADMIN_USER || '').trim();
            const targetPass = (ADMIN_PASS || '').trim();

            if (enteredUser === targetUser && enteredPass === targetPass) {
                sessionStorage.setItem('adminAuth', 'true');
                onLogin();
            } else {
                setError('Invalid credentials. Access denied.');
                setPassword('');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#091e33]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[80px] animate-pulse delay-700" />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 w-full max-w-[440px] m-5 shadow-2xl"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center text-white shadow-lg shadow-secondary/30">
                        <ShieldCheck size={32} />
                    </div>
                </div>
                <h1 className="text-center text-white text-3xl font-black mb-2 tracking-tight">Admin Access</h1>
                <p className="text-center text-white/50 text-sm font-medium mb-10">Enter your credentials to access the management dashboard</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">Username</label>
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 focus-within:border-secondary transition-all">
                            <Users size={18} className="text-white/30 shrink-0" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter admin username"
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium py-4 px-4 placeholder:text-white/20"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] ml-1">Password</label>
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-5 focus-within:border-secondary transition-all">
                            <Lock size={18} className="text-white/30 shrink-0" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium py-4 px-4 placeholder:text-white/20"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/30 hover:text-white transition-colors">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-xs font-semibold">
                                <AlertCircle size={16} /><span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button type="submit" disabled={isLoading || !password || !username}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-secondary to-green-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50">
                        {isLoading
                            ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : <><Lock size={18} /><span>Unlock Dashboard</span></>}
                    </button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-8 text-white/20 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={12} />Protected by Vinayaga Crackers Security
                </div>
            </motion.div>
        </div>
    );
};

// ─── Form Modal Shell ──────────────────────────────────────────────
const Modal = ({ title, onClose, onSave, saving, valid, children }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">{title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={22} /></button>
            </div>
            <div className="space-y-5">{children}</div>
            <div className="flex gap-3 mt-8">
                <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-all">
                    Cancel
                </button>
                <button onClick={onSave} disabled={saving || !valid}
                    className="flex-1 py-3 bg-secondary text-white rounded-xl text-sm font-black hover:bg-secondary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={16} />}
                    Save
                </button>
            </div>
        </motion.div>
    </motion.div>
);

// ─── Shared Field Components ───────────────────────────────────────
const Field = ({ label, children }) => (
    <div>
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
        {children}
    </div>
);

const TextInput = ({ value, onChange, placeholder, ...rest }) => (
    <input value={value} onChange={onChange} placeholder={placeholder} {...rest}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary transition-all" />
);

const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-secondary transition-all resize-none" />
);

const ImageUploader = ({ value, onChange, label = "Image" }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsProcessing(true);
        try {
            const dataUrl = await resizeImage(file, 1200); // Higher quality for main images
            onChange({ target: { value: dataUrl } });
        } catch (err) {
            console.error(err);
            alert("Failed to process image");
        }
        setIsProcessing(false);
    };

    return (
        <Field label={label}>
            <div className="space-y-4">
                <div className="relative group overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-8 transition-all hover:border-secondary hover:bg-white text-center cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleFile}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-secondary group-hover:scale-110 transition-all border border-slate-100">
                            {isProcessing ? <div className="w-6 h-6 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" /> : <UploadCloud size={30} />}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Upload from Device</p>
                            <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Optimized for high-speed delivery</p>
                        </div>
                    </div>
                </div>

                {value && (
                    <div className="relative h-56 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group/prev">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover/prev:bg-black/40 transition-all" />
                        <div className="absolute top-4 right-4 bg-secondary text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                             <Check size={12} /> Live Preview
                        </div>
                        <button onClick={() => onChange({ target: { value: '' } })} 
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover/prev:opacity-100 translate-y-4 group-hover/prev:translate-y-0 transition-all">
                            Remove & Replace
                        </button>
                    </div>
                )}
            </div>
        </Field>
    );
};

const CategoryItem = ({ cat, openEdit, handleDelete }) => {
    const controls = useDragControls();
    return (
        <Reorder.Item 
            value={cat} 
            dragListener={false} 
            dragControls={controls}
            whileDrag={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-default relative z-0"
        >
            <div className="flex items-center gap-3">
                <div 
                    onPointerDown={(e) => controls.start(e)}
                    className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 cursor-grab active:cursor-grabbing hover:bg-secondary/10 hover:text-secondary transition-all"
                >
                    <GripVertical size={20} />
                </div>
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    {(cat.imageUrl || cat.image) && <img src={cat.imageUrl || cat.image} alt={cat.title} className="w-full h-full object-cover" />}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-black text-slate-900 truncate">{cat.title}</h4>
                    {cat.isStatic && <span className="text-[8px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-slate-200">Static</span>}
                    {cat.isFirestore && <span className="text-[8px] font-black bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-secondary/20">Live</span>}
                    {cat.isFeatured && <span className="text-[8px] font-black bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-amber-200">Featured</span>}
                </div>
                <p className="text-xs text-slate-400 truncate font-medium">{cat.description}</p>
                <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[10px] font-mono text-slate-400">/{cat.slug}</span>
                </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(cat)} className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary transition-all">
                    <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(cat)} className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all">
                    <Trash2 size={15} />
                </button>
            </div>
        </Reorder.Item>
    );
};

// ─── Inquiry Manager ───────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const styles = {
        new: 'bg-blue-50 text-blue-600 border-blue-100',
        read: 'bg-slate-50 text-slate-500 border-slate-100',
        completed: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    };
    return (
        <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${styles[status] || styles.new}`}>
            {status}
        </span>
    );
};

const ContactIcon = ({ method }) => {
    if (method === 'whatsapp') return <MessageCircle size={14} className="text-green-500" />;
    if (method === 'email') return <Mail size={14} className="text-blue-500" />;
    if (method === 'call') return <Phone size={14} className="text-orange-500" />;
    return <Globe size={14} className="text-slate-400" />;
};
// ─── Customer Invoice / Estimate Generator ────────────────────────
export const generateInvoiceHTML = (iq) => {
    const invoiceNo = `VC-EST-${new Date(iq.createdAt?.toDate?.() || Date.now()).getFullYear()}-${(iq.docId || '001').slice(-6).toUpperCase()}`;
    const invoiceDate = iq.createdAt?.toDate?.() 
        ? new Date(iq.createdAt.toDate()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const invoiceTime = iq.createdAt?.toDate?.()
        ? new Date(iq.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const items = (Array.isArray(iq.items) && iq.items.length > 0)
        ? iq.items
        : [{
            sno: 1,
            nameTa: iq.product || 'தீபாவளி பட்டாசு தொகுப்பு',
            nameEn: iq.product || 'Diwali Fireworks Estimate / Quotation',
            per: 'Order',
            qty: 1,
            mrp: iq.totalMrp || iq.budget || '-',
            discountPrice: iq.totalDiscounted || iq.budget || '-',
            subtotal: iq.totalDiscounted || iq.budget || '-'
        }];

    const totalMrp = iq.totalMrp ? Number(iq.totalMrp).toLocaleString('en-IN') : null;
    const totalDiscounted = iq.totalDiscounted 
        ? Number(iq.totalDiscounted).toLocaleString('en-IN') 
        : (iq.budget ? Number(iq.budget).toLocaleString('en-IN') : null);
    const totalSavings = iq.totalSavings ? Number(iq.totalSavings).toLocaleString('en-IN') : null;

    const itemsHtml = items.map((it, idx) => {
        const mrpVal = it.mrp ? (typeof it.mrp === 'number' ? `₹${it.mrp.toLocaleString('en-IN')}` : it.mrp) : '-';
        const rateVal = it.discountPrice ? (typeof it.discountPrice === 'number' ? `₹${it.discountPrice.toLocaleString('en-IN')}` : it.discountPrice) : '-';
        const subVal = it.subtotal ? (typeof it.subtotal === 'number' ? `₹${it.subtotal.toLocaleString('en-IN')}` : it.subtotal) : rateVal;

        return `
            <tr>
                <td style="text-align: center; font-weight: 600;">${it.sno || idx + 1}</td>
                <td>
                    <div style="font-weight: 700; color: #0f172a;">${it.nameTa || it.title || ''}</div>
                    <div style="font-size: 11px; color: #475569;">${it.nameEn || it.title || ''}</div>
                </td>
                <td style="text-align: center; font-weight: 500;">${it.per || 'Pkt'}</td>
                <td style="text-align: right; color: #64748b; text-decoration: line-through;">${mrpVal}</td>
                <td style="text-align: right; font-weight: 700; color: #0f172a;">${rateVal}</td>
                <td style="text-align: center; font-weight: 700;">${it.qty || 1}</td>
                <td style="text-align: right; font-weight: 800; color: #b91c1c;">${subVal}</td>
            </tr>
        `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Estimate_Invoice_${invoiceNo}</title>
    <style>
        * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #0f172a;
            background: #f1f5f9;
            margin: 0;
            padding: 20px;
        }
        .page-container {
            max-width: 820px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            padding: 32px;
            position: relative;
        }
        @media print {
            body { background: #fff; padding: 0; }
            .page-container { box-shadow: none; border-radius: 0; padding: 10mm 12mm; max-width: 100%; }
            .no-print { display: none !important; }
            @page { size: A4; margin: 10mm; }
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 3px double #e2e8f0;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        .brand-title {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: -0.5px;
            color: #b91c1c;
            text-transform: uppercase;
            margin: 0;
        }
        .brand-tamil {
            font-size: 15px;
            font-weight: 700;
            color: #d97706;
            margin: 2px 0 6px 0;
        }
        .brand-details {
            font-size: 11px;
            color: #475569;
            line-height: 1.5;
        }
        .invoice-badge {
            background: #0f172a;
            color: #fff;
            padding: 10px 18px;
            border-radius: 10px;
            text-align: right;
        }
        .invoice-badge h2 {
            margin: 0;
            font-size: 16px;
            font-weight: 900;
            letter-spacing: 0.5px;
            color: #f59e0b;
        }
        .meta-text {
            font-size: 11px;
            color: #94a3b8;
            margin-top: 4px;
        }
        .meta-text span {
            color: #fff;
            font-weight: 700;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 20px;
        }
        .info-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 16px;
        }
        .info-card-title {
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #b91c1c;
            margin-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
        }
        .info-row {
            font-size: 12px;
            line-height: 1.6;
            color: #1e293b;
        }
        .info-label {
            font-weight: 600;
            color: #64748b;
            display: inline-block;
            width: 105px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 20px;
        }
        th {
            background: #0f172a;
            color: #ffffff;
            font-weight: 800;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 8px 10px;
            border: 1px solid #0f172a;
        }
        td {
            padding: 7px 10px;
            border: 1px solid #e2e8f0;
            vertical-align: middle;
        }
        tr:nth-child(even) td {
            background: #f8fafc;
        }
        .totals-section {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
        }
        .totals-box {
            width: 320px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #f8fafc;
            overflow: hidden;
        }
        .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 14px;
            font-size: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .totals-row.grand-total {
            background: #b91c1c;
            color: #ffffff;
            font-weight: 900;
            font-size: 15px;
            border-bottom: none;
        }
        .notes-section {
            border-top: 1px solid #e2e8f0;
            padding-top: 14px;
            margin-bottom: 20px;
        }
        .notes-title {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #475569;
            margin-bottom: 6px;
        }
        .notes-list {
            font-size: 10px;
            color: #64748b;
            margin: 0;
            padding-left: 18px;
            line-height: 1.6;
        }
        .signature-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px dashed #cbd5e1;
        }
        .sig-block {
            text-align: center;
            width: 200px;
        }
        .sig-line {
            border-top: 1px solid #0f172a;
            margin-bottom: 6px;
        }
        .sig-text {
            font-size: 11px;
            font-weight: 700;
            color: #1e293b;
        }
        .controls-bar {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #1e293b;
            color: #fff;
            padding: 12px 20px;
            border-radius: 10px;
        }
        .btn-print {
            background: #e11d48;
            color: #fff;
            border: none;
            padding: 8px 20px;
            border-radius: 6px;
            font-weight: 800;
            font-size: 13px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .btn-print:hover { background: #be123c; }
        .btn-close {
            background: #334155;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
        }
        .btn-close:hover { background: #475569; }
    </style>
</head>
<body>
    <div class="no-print controls-bar">
        <div>
            <strong>Vinayaga Supreme Crackers — Official Invoice / Estimate Bill</strong>
            <div style="font-size: 11px; opacity: 0.8;">Click the print button below and select Destination: "Save as PDF".</div>
        </div>
        <div style="display: flex; gap: 10px;">
            <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
            <button class="btn-close" onclick="window.close()">✖ Close</button>
        </div>
    </div>

    <div class="page-container">
        <!-- Header -->
        <div class="header">
            <div>
                <h1 class="brand-title">Vinayaga Supreme Crackers</h1>
                <div class="brand-tamil">ஸ்ரீ விநாயகர் சுப்ரீம் பட்டாசு சிவகாசி</div>
                <div class="brand-details">
                    📍 <strong>Shop No :</strong> 3/6136, Om Sakthi Nagar, Perapatti, Sivakasi - 626189<br>
                    📞 <strong>Mobile / WhatsApp:</strong> +91 89409 21075<br>
                    ✉️ <strong>Email:</strong> vinayagacrackers@gmail.com | 🌐 <strong>Direct Sivakasi Factory Rates</strong>
                </div>
            </div>
            <div class="invoice-badge">
                <h2>ESTIMATE / INVOICE</h2>
                <div style="font-size: 10px; color: #fcd34d; font-weight: 700; margin-top: 2px;">விலை மதிப்பீட்டு ரசீது</div>
                <div class="meta-text">No: <span>${invoiceNo}</span></div>
                <div class="meta-text">Date: <span>${invoiceDate}</span></div>
                <div class="meta-text">Time: <span>${invoiceTime}</span></div>
            </div>
        </div>

        <!-- Info Grid -->
        <div class="info-grid">
            <div class="info-card">
                <div class="info-card-title">Customer / வாடிக்கையாளர் விபரம்</div>
                <div class="info-row"><span class="info-label">Name:</span> <strong>${iq.name || 'Valued Customer'}</strong></div>
                <div class="info-row"><span class="info-label">Mobile:</span> <strong>${iq.phone || 'N/A'}</strong></div>
                ${iq.email && iq.email !== 'N/A' ? `<div class="info-row"><span class="info-label">Email:</span> ${iq.email}</div>` : ''}
                <div class="info-row"><span class="info-label">Destination:</span> <strong>${iq.destination || iq.city || 'Tamil Nadu'}</strong></div>
                ${iq.address ? `<div class="info-row"><span class="info-label">Address:</span> ${iq.address}</div>` : ''}
            </div>
            <div class="info-card">
                <div class="info-card-title">Order & Dispatch / விபரம்</div>
                <div class="info-row"><span class="info-label">Order Source:</span> ${iq.source || iq.industry || 'Online Order Form'}</div>
                <div class="info-row"><span class="info-label">Transport Hub:</span> ${iq.logistics || 'Sivakasi Parcel Service (To Pay)'}</div>
                <div class="info-row"><span class="info-label">Payment Mode:</span> UPI / GPay / Net Banking</div>
                <div class="info-row"><span class="info-label">Order Status:</span> <strong style="color: #047857;">${iq.status === 'read' ? 'Confirmed / Processed' : 'New Order Enquiry'}</strong></div>
            </div>
        </div>

        <!-- Products Table -->
        <table>
            <thead>
                <tr>
                    <th style="width: 45px; text-align: center;">S.No</th>
                    <th>Cracker Name / பட்டாசு விபரம்</th>
                    <th style="width: 65px; text-align: center;">Unit</th>
                    <th style="width: 80px; text-align: right;">MRP (₹)</th>
                    <th style="width: 85px; text-align: right;">Rate (₹)</th>
                    <th style="width: 55px; text-align: center;">Qty</th>
                    <th style="width: 100px; text-align: right;">Amount (₹)</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>

        <!-- Totals -->
        <div class="totals-section">
            <div class="totals-box">
                <div class="totals-row">
                    <span style="font-weight: 600; color: #475569;">Total Items / வகைகள்:</span>
                    <strong>${items.length} Products (${iq.totalUnits || items.reduce((acc, it) => acc + (Number(it.qty) || 1), 0)} Units)</strong>
                </div>
                ${totalMrp ? `
                <div class="totals-row">
                    <span style="font-weight: 600; color: #475569;">Total MRP Value:</span>
                    <strong style="text-decoration: line-through; color: #64748b;">₹${totalMrp}</strong>
                </div>` : ''}
                ${totalSavings ? `
                <div class="totals-row">
                    <span style="font-weight: 600; color: #047857;">Festival Discount Savings:</span>
                    <strong style="color: #047857;">- ₹${totalSavings}</strong>
                </div>` : ''}
                <div class="totals-row grand-total">
                    <span>NET PAYABLE AMOUNT:</span>
                    <span>${totalDiscounted ? `₹${totalDiscounted}` : (iq.budget ? `₹${Number(iq.budget).toLocaleString('en-IN')}` : 'To Be Confirmed')}</span>
                </div>
            </div>
        </div>

        <!-- Notes / Safety -->
        <div class="notes-section">
            <div class="notes-title">Terms & Safety Guidelines / விதிமுறைகள்:</div>
            <ol class="notes-list">
                <li>All crackers manufactured in Sivakasi complying with PESO safety norms and guidelines.</li>
                <li>Freight / Parcel transport charges will be collected by the transport service at delivery point.</li>
                <li>Goods once booked and dispatched cannot be cancelled or returned.</li>
                <li>UPI / WhatsApp confirmation contact: <strong>+91 89409 21075</strong>.</li>
            </ol>
        </div>

        <!-- Signatures -->
        <div class="signature-section">
            <div class="sig-block">
                <div class="sig-line"></div>
                <div class="sig-text">Customer Signature</div>
            </div>
            <div style="font-size: 11px; font-weight: 800; color: #b91c1c; text-align: center;">
                ✨ WISHING YOU A SAFE & HAPPY DIWALI ✨<br>
                <span style="font-size: 9px; color: #64748b; font-weight: 500;">Thank you for your business!</span>
            </div>
            <div class="sig-block">
                <div class="sig-line"></div>
                <div class="sig-text">For Vinayaga Supreme Crackers</div>
                <div style="font-size: 9px; color: #64748b;">Authorized Signatory</div>
            </div>
        </div>
    </div>
</body>
</html>`;
};

export const openInvoicePrintWindow = (iq) => {
    const html = generateInvoiceHTML(iq);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Pop-up was blocked. Please allow pop-ups for this page to download or print the invoice PDF.");
        return;
    }
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        try {
            printWindow.print();
        } catch (e) {
            console.error('Print window error:', e);
        }
    }, 450);
};

// ─── Modal Preview Component ──────────────────────────────────────
const InvoicePreviewModal = ({ iq, onClose, onPrint }) => {
    if (!iq) return null;

    const invoiceNo = `VC-EST-${new Date(iq.createdAt?.toDate?.() || Date.now()).getFullYear()}-${(iq.docId || '001').slice(-6).toUpperCase()}`;
    const invoiceDate = iq.createdAt?.toDate?.() 
        ? new Date(iq.createdAt.toDate()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const invoiceTime = iq.createdAt?.toDate?.()
        ? new Date(iq.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const items = (Array.isArray(iq.items) && iq.items.length > 0)
        ? iq.items
        : [{
            sno: 1,
            nameTa: iq.product || 'தீபாவளி பட்டாசு தொகுப்பு',
            nameEn: iq.product || 'Diwali Fireworks Estimate / Quotation',
            per: 'Order',
            qty: 1,
            mrp: iq.totalMrp || iq.budget || '-',
            discountPrice: iq.totalDiscounted || iq.budget || '-',
            subtotal: iq.totalDiscounted || iq.budget || '-'
        }];

    const totalMrp = iq.totalMrp ? Number(iq.totalMrp).toLocaleString('en-IN') : null;
    const totalDiscounted = iq.totalDiscounted 
        ? Number(iq.totalDiscounted).toLocaleString('en-IN') 
        : (iq.budget ? Number(iq.budget).toLocaleString('en-IN') : null);
    const totalSavings = iq.totalSavings ? Number(iq.totalSavings).toLocaleString('en-IN') : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden my-4">
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <FileText size={18} />
                        </div>
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-wider text-white">Invoice & Estimate Preview</h3>
                            <p className="text-[11px] text-slate-400">Estimate No: {invoiceNo}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onPrint(iq)}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                        >
                            <Printer size={15} /> Download PDF / Print
                        </button>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Printable Document Preview */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-slate-50 text-slate-800">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto space-y-6">
                        
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-dashed border-slate-200">
                            <div>
                                <h1 className="text-2xl font-black text-rose-700 uppercase tracking-tight">Vinayaga Supreme Crackers</h1>
                                <p className="text-sm font-bold text-amber-600">ஸ்ரீ விநாயகர் சுப்ரீம் பட்டாசு சிவகாசி</p>
                                <div className="text-xs text-slate-500 mt-2 space-y-0.5 leading-relaxed">
                                    <p>📍 Shop No : 3/6136, Om Sakthi Nagar, Perapatti, Sivakasi - 626189</p>
                                    <p>📞 Phone / WhatsApp: +91 89409 21075 | ✉️ vinayagacrackers@gmail.com</p>
                                    <p>🌐 Direct Sivakasi Factory Wholesale & Retail Rates</p>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white p-4 rounded-xl text-right sm:min-w-[200px]">
                                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">Estimate / Invoice</span>
                                <span className="text-[10px] text-slate-300 block mb-2">விலை மதிப்பீட்டு ரசீது</span>
                                <div className="text-xs text-slate-300">No: <span className="text-white font-bold">{invoiceNo}</span></div>
                                <div className="text-xs text-slate-300">Date: <span className="text-white font-bold">{invoiceDate}</span></div>
                                <div className="text-xs text-slate-300">Time: <span className="text-white font-bold">{invoiceTime}</span></div>
                            </div>
                        </div>

                        {/* Customer & Order Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                <h4 className="text-[10px] font-black text-rose-700 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
                                    Customer Details / வாடிக்கையாளர்
                                </h4>
                                <div className="text-xs space-y-1 text-slate-700">
                                    <p><span className="font-bold text-slate-500 w-24 inline-block">Name:</span> <strong className="text-slate-900">{iq.name || 'Valued Customer'}</strong></p>
                                    <p><span className="font-bold text-slate-500 w-24 inline-block">Mobile:</span> <strong>{iq.phone || 'N/A'}</strong></p>
                                    {iq.email && iq.email !== 'N/A' && <p><span className="font-bold text-slate-500 w-24 inline-block">Email:</span> {iq.email}</p>}
                                    <p><span className="font-bold text-slate-500 w-24 inline-block">Destination:</span> <strong>{iq.destination || iq.city || 'Tamil Nadu'}</strong></p>
                                    {iq.address && <p><span className="font-bold text-slate-500 w-24 inline-block">Address:</span> {iq.address}</p>}
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                <h4 className="text-[10px] font-black text-rose-700 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
                                    Dispatch & Order / விபரம்
                                </h4>
                                <div className="text-xs space-y-1 text-slate-700">
                                    <p><span className="font-bold text-slate-500 w-24 inline-block">Source:</span> {iq.source || iq.industry || 'Online Order Form'}</p>
                                    <p><span className="font-bold text-slate-500 w-24 inline-block">Transport:</span> {iq.logistics || 'Sivakasi Parcel Service (To Pay)'}</p>
                                    <p><span className="font-bold text-slate-500 w-24 inline-block">Payment:</span> UPI / GPay / Net Banking</p>
                                    <p><span className="font-bold text-slate-500 w-24 inline-block">Status:</span> <strong className="text-emerald-700">{iq.status === 'read' ? 'Confirmed / Processed' : 'New Order Enquiry'}</strong></p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                                        <th className="py-2.5 px-3 text-center w-12">S.No</th>
                                        <th className="py-2.5 px-3">Cracker Item / பட்டாசு விபரம்</th>
                                        <th className="py-2.5 px-3 text-center w-16">Unit</th>
                                        <th className="py-2.5 px-3 text-right w-20">MRP (₹)</th>
                                        <th className="py-2.5 px-3 text-right w-20">Rate (₹)</th>
                                        <th className="py-2.5 px-3 text-center w-14">Qty</th>
                                        <th className="py-2.5 px-3 text-right w-24">Amount (₹)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {items.map((it, idx) => {
                                        const mrpVal = it.mrp ? (typeof it.mrp === 'number' ? `₹${it.mrp.toLocaleString('en-IN')}` : it.mrp) : '-';
                                        const rateVal = it.discountPrice ? (typeof it.discountPrice === 'number' ? `₹${it.discountPrice.toLocaleString('en-IN')}` : it.discountPrice) : '-';
                                        const subVal = it.subtotal ? (typeof it.subtotal === 'number' ? `₹${it.subtotal.toLocaleString('en-IN')}` : it.subtotal) : rateVal;

                                        return (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                                                <td className="py-2 px-3 text-center font-bold text-slate-500">{it.sno || idx + 1}</td>
                                                <td className="py-2 px-3">
                                                    <div className="font-bold text-slate-900">{it.nameTa || it.title || ''}</div>
                                                    <div className="text-[11px] text-slate-500">{it.nameEn || it.title || ''}</div>
                                                </td>
                                                <td className="py-2 px-3 text-center text-slate-600 font-medium">{it.per || 'Pkt'}</td>
                                                <td className="py-2 px-3 text-right text-slate-400 line-through">{mrpVal}</td>
                                                <td className="py-2 px-3 text-right font-bold text-slate-900">{rateVal}</td>
                                                <td className="py-2 px-3 text-center font-black text-slate-800">{it.qty || 1}</td>
                                                <td className="py-2 px-3 text-right font-black text-rose-700">{subVal}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals Summary */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-80 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden text-xs">
                                <div className="flex justify-between p-2.5 border-b border-slate-200">
                                    <span className="text-slate-600 font-medium">Total Products / வகைகள்:</span>
                                    <strong className="text-slate-900">{items.length} Products ({iq.totalUnits || items.reduce((acc, it) => acc + (Number(it.qty) || 1), 0)} Units)</strong>
                                </div>
                                {totalMrp && (
                                    <div className="flex justify-between p-2.5 border-b border-slate-200">
                                        <span className="text-slate-600 font-medium">Total MRP Value:</span>
                                        <span className="text-slate-400 line-through">₹{totalMrp}</span>
                                    </div>
                                )}
                                {totalSavings && (
                                    <div className="flex justify-between p-2.5 border-b border-slate-200 text-emerald-700">
                                        <span className="font-medium">Festival Discount Savings:</span>
                                        <strong>- ₹{totalSavings}</strong>
                                    </div>
                                )}
                                <div className="flex justify-between p-3 bg-rose-700 text-white font-black text-sm">
                                    <span>NET PAYABLE:</span>
                                    <span>{totalDiscounted ? `₹${totalDiscounted}` : (iq.budget ? `₹${Number(iq.budget).toLocaleString('en-IN')}` : 'To Be Confirmed')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500 space-y-1">
                            <p className="font-bold uppercase tracking-wider text-slate-700">Terms & Safety Guidelines / விதிமுறைகள்:</p>
                            <p>1. All crackers manufactured in Sivakasi complying with PESO safety norms.</p>
                            <p>2. Freight / Parcel transport charges will be collected by the transport service at delivery point.</p>
                            <p>3. Goods once dispatched cannot be returned or cancelled.</p>
                        </div>

                        {/* Signatures */}
                        <div className="flex justify-between items-end pt-8 border-t border-dashed border-slate-200 text-xs">
                            <div className="text-center w-40">
                                <div className="border-t border-slate-800 pt-1 font-bold text-slate-800">Customer Signature</div>
                            </div>
                            <div className="text-center text-xs font-black text-rose-700">
                                ✨ SAFE & HAPPY DIWALI ✨
                            </div>
                            <div className="text-center w-48">
                                <div className="border-t border-slate-800 pt-1 font-bold text-slate-800">Vinayaga Supreme Crackers</div>
                                <div className="text-[10px] text-slate-500">Authorized Signatory</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const InquiryManager = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, read
    const [previewInvoiceIq, setPreviewInvoiceIq] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map(doc => ({
                docId: doc.id,
                ...doc.data()
            }));
            setInquiries(list);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const toggleStatus = async (docId, currentStatus) => {
        const newStatus = currentStatus === 'new' ? 'read' : 'new';
        await updateDoc(doc(db, 'inquiries', docId), { status: newStatus });
    };

    const handleDelete = async (docId) => {
        if (window.confirm('Delete this inquiry permanently?')) {
            await deleteDoc(doc(db, 'inquiries', docId));
        }
    };

    const filtered = filter === 'all' ? inquiries : inquiries.filter(iq => iq.status === filter);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100">
            <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading business leads...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Inquiry Dashboard</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 px-1">Manage customer orders & download invoice estimates</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                    {['all', 'new', 'read'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filtered.map((iq) => (
                    <div key={iq.docId} className={`bg-white border rounded-[2rem] p-8 transition-all group relative overflow-hidden ${iq.status === 'new' ? 'border-blue-100 shadow-[0_10px_30px_-5px_rgba(59,130,246,0.05)]' : 'border-slate-100 opacity-80'}`}>
                        {iq.status === 'new' && <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />}

                        <div className="absolute top-0 right-0 p-8 text-slate-50 font-black text-7xl pointer-events-none group-hover:text-slate-100/50 transition-colors">
                            {iq.createdAt?.toDate() ? new Date(iq.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                            <div className="space-y-6 flex-1">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${iq.status === 'new' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-2xl font-black text-primary tracking-tight">{iq.name}</h3>
                                            <StatusBadge status={iq.status} />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{iq.industry || 'Diwali Fireworks'}</span>
                                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                <ContactIcon method={iq.contactMethod} />
                                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{iq.contactMethod}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 pt-6 border-t border-slate-50">
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Product</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Package size={14} className="text-secondary" /> {iq.product}
                                        </p>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Contact Info</p>
                                        <div className="space-y-1">
                                            {iq.phone && (
                                                <a href={`tel:${iq.phone}`} className="text-sm font-bold text-slate-700 flex items-center gap-2 hover:text-secondary group/link">
                                                    <Phone size={12} className="text-secondary group-hover/link:animate-pulse" /> {iq.phone}
                                                </a>
                                            )}
                                            {iq.email && iq.email !== 'N/A' && (
                                                <a href={`mailto:${iq.email}`} className="text-[11px] font-bold text-slate-400 flex items-center gap-2 hover:text-secondary truncate">
                                                    <Mail size={12} className="shrink-0" /> {iq.email}
                                                </a>
                                            )}
                                            {(!iq.phone && (!iq.email || iq.email === 'N/A')) && <span className="text-xs text-slate-300 italic">No direct contact</span>}
                                        </div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Business / Source</p>
                                        <p className="text-sm font-bold text-slate-700 truncate" title={iq.industry}>
                                            {iq.company && iq.company !== 'N/A' ? iq.company : (iq.source || iq.industry || 'Direct')}
                                        </p>
                                        {iq.company && iq.company !== 'N/A' && iq.industry && (
                                            <p className="text-[9px] text-slate-400 font-medium truncate mt-0.5">{iq.industry}</p>
                                        )}
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Delivery Destination</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Globe size={14} className="text-blue-400" /> {iq.destination || iq.city || 'Tamil Nadu'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Parcel Transport</p>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Truck size={14} className="text-secondary" /> {iq.logistics || 'Standard Transport'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Date & Time</p>
                                        <p className="text-sm font-bold text-slate-700">
                                            {iq.createdAt?.toDate() ? new Date(iq.createdAt.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Pending'}
                                        </p>
                                        <p className="text-[10px] font-medium text-slate-400 font-mono mt-0.5">
                                            {iq.createdAt?.toDate() ? new Date(iq.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </p>
                                    </div>
                                </div>

                                {(iq.message || iq.note) && (
                                    <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-xs leading-relaxed">
                                        <div className="flex items-center gap-2 mb-2 not-italic">
                                            <MessageSquare size={12} className="text-slate-400" />
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Client Message / Note</span>
                                        </div>
                                        "{iq.message || iq.note}"
                                    </div>
                                )}

                                {/* Bottom Order Summary & Invoice Download Action Bar */}
                                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {iq.items?.length > 0 ? (
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                                    <Package size={13} /> {iq.items.length} Products ({iq.totalUnits || 0} Units)
                                                </span>
                                                {iq.totalDiscounted && (
                                                    <span className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black">
                                                        Net: ₹{Number(iq.totalDiscounted).toLocaleString('en-IN')}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                                Customer Product Enquiry
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setPreviewInvoiceIq(iq)}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                                        >
                                            <Eye size={14} /> Preview Invoice
                                        </button>
                                        <button
                                            onClick={() => openInvoicePrintWindow(iq)}
                                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                                        >
                                            <Printer size={14} /> Download PDF Invoice
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex lg:flex-col gap-3">
                                <button
                                    onClick={() => openInvoicePrintWindow(iq)}
                                    title="Download / Print Invoice PDF"
                                    className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                                >
                                    <Printer size={20} />
                                </button>
                                <button
                                    onClick={() => toggleStatus(iq.docId, iq.status)}
                                    title={iq.status === 'new' ? 'Mark as Read' : 'Mark as New'}
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border shadow-sm cursor-pointer ${iq.status === 'new' ? 'bg-secondary/10 border-secondary/20 text-secondary hover:bg-secondary hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
                                >
                                    {iq.status === 'new' ? <Check size={20} /> : <MessageSquare size={20} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(iq.docId)}
                                    className="w-12 h-12 rounded-2xl bg-white border border-red-100 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                            <Mail size={32} />
                        </div>
                        <div>
                            <p className="text-slate-400 font-black uppercase tracking-[0.2em]">No {filter !== 'all' ? filter : ''} inquiries found</p>
                            <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-1 italic">Waiting for new partnerships...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Invoice Preview Modal */}
            {previewInvoiceIq && (
                <InvoicePreviewModal
                    iq={previewInvoiceIq}
                    onClose={() => setPreviewInvoiceIq(null)}
                    onPrint={openInvoicePrintWindow}
                />
            )}
        </div>
    );
};

// ─── Appointment Manager ──────────────────────────────────────────
const AppointmentManager = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAppointments(snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Remove this appointment recording?')) {
            await deleteDoc(doc(db, 'appointments', id));
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100">
            <div className="w-10 h-10 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mr-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing schedules...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 mt-4">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">Scheduled Calls</h2>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 px-1">Global Discovery Call Bookings</p>
                </div>
                <div className="bg-primary px-5 py-2 rounded-xl flex items-center gap-3">
                    <Calendar size={14} className="text-secondary" />
                    <span className="text-white font-black text-xs uppercase tracking-widest">{appointments.length} Total Booked</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
                {appointments.map((app) => (
                    <div key={app.docId} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                            {/* Date Block */}
                            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-3xl bg-secondary/5 border-2 border-secondary/10 shrink-0">
                                <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Scheduled</span>
                                <div className="text-2xl font-black text-primary leading-none mt-1">{app.date.split(' ')[1].replace(',', '')}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.date.split(' ')[0]}</div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-2xl font-black text-primary truncate tracking-tight uppercase">{app.name}</h3>
                                    <div className="px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-1.5 shadow-sm">
                                        <Clock size={12} className="text-secondary" />
                                        <span className="text-[10px] font-black text-primary italic uppercase tracking-widest">{app.time}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/5 group-hover/item:text-primary transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Contact Email</p>
                                            <a href={`mailto:${app.email}`} className="text-sm font-bold text-slate-700 hover:text-secondary hover:underline underline-offset-4 decoration-2">{app.email}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-primary/5 group-hover/item:text-primary transition-colors">
                                            <MessageSquare size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Client Note / Requirements</p>
                                            <p className="text-sm font-bold text-slate-600 line-clamp-1 italic">"{app.note || 'No special requirements provided'}"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 shrink-0 self-center">
                                <button
                                    onClick={() => handleDelete(app.docId)}
                                    className="w-12 h-12 rounded-2xl bg-white border border-red-100 text-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all shadow-sm"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CategoryManager = () => {
    const navigate = useNavigate();
    const [reordering, setReordering] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
        return onSnapshot(q, (snap) => {
            if (reordering) return; // Don't snap-back while we are dragging
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticCategories.map(c => ({ ...c, isStatic: true, isFeatured: true }));

            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) {
                    merged[idx] = { ...merged[idx], ...fc, isStatic: false };
                } else {
                    merged.push(fc);
                }
            });
            merged.sort((a, b) => (a.order || 0) - (b.order || 0));
            setCategories(merged);
        });
    }, [reordering]);

    const handleDelete = async (cat) => {
        if (!cat.isFirestore) {
            alert("This category is defined in the source code. To modify it, edit and save it once to 'promote' it to the database.");
            return;
        }
        if (!window.confirm(`Delete "${cat.title}"?`)) return;
        await deleteDoc(doc(db, 'categories', cat.docId));
    };

    const handleReorder = (newOrder) => {
        setCategories(newOrder);
        setReordering(true);
    };

    // Buffered sequence sync for smoothness
    useEffect(() => {
        if (!categories.length || !reordering) return;
        const timeout = setTimeout(async () => {
            const batch = writeBatch(db);
            let changes = false;
            categories.forEach((cat, i) => {
                if (cat.order !== i) {
                    if (cat.isFirestore && cat.docId) {
                        batch.update(doc(db, 'categories', cat.docId), { 
                            order: i, 
                            updatedAt: serverTimestamp() 
                        });
                        changes = true;
                    } else {
                        // Thin promotion for static items
                        const newRef = doc(collection(db, 'categories'));
                        batch.set(newRef, {
                            title: cat.title,
                            slug: cat.slug,
                            order: i,
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp()
                        });
                        changes = true;
                    }
                }
            });
            if (changes) await batch.commit();
            setReordering(false);
        }, 1500);
        return () => clearTimeout(timeout);
    }, [categories]);

    const openEdit = (cat) => {
        const idToUse = cat.isFirestore ? cat.docId : cat.slug;
        navigate(`/admin/category/edit/${idToUse}`);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Categories</h2>
                    <div className="flex items-center gap-3">
                        <p className="text-slate-400 text-sm font-medium">{categories.length} categories in Firestore</p>
                        {reordering && (
                            <span className="flex items-center gap-1.5 text-[10px] font-black text-secondary uppercase animate-pulse">
                                <Activity size={12} /> Syncing sequence...
                            </span>
                        )}
                    </div>
                </div>
                <button onClick={() => navigate('/admin/category/new')}
                    className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20">
                    <Plus size={16} /> Add Category
                </button>
            </div>
            <Reorder.Group axis="y" values={categories} onReorder={handleReorder} className="space-y-4">
                {categories.map((cat) => (
                    <CategoryItem key={cat.docId || cat.slug} cat={cat} openEdit={openEdit} handleDelete={handleDelete} />
                ))}
            </Reorder.Group>
        </div>
    );
};

// ─── Quick Price Edit Modal ─────────────────────────────────────────
const QuickPriceModal = ({ prod, onClose, onSave }) => {
    const rawOffer = prod?.price ? String(prod.price).replace(/[^\d.]/g, '') : (prod?.discountPrice ? String(prod.discountPrice) : '');
    const rawMrp = prod?.originalPrice ? String(prod.originalPrice).replace(/[^\d.]/g, '') : '';
    const [price, setPrice] = useState(rawOffer);
    const [originalPrice, setOriginalPrice] = useState(rawMrp);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await onSave(prod, price, originalPrice);
        setSaving(false);
        onClose();
    };

    return (
        <Modal title="Quick Price Update" onClose={onClose} onSave={handleSave} saving={saving} valid={!!price}>
            <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200">
                        <img src={prod.imageUrl || prod.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-black text-slate-800 text-sm truncate">{prod.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{prod.category}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Discount / Offer Price (₹) *">
                        <TextInput
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="e.g. 15"
                            autoFocus
                        />
                    </Field>
                    <Field label="Original MRP (₹)">
                        <TextInput
                            type="number"
                            value={originalPrice}
                            onChange={e => setOriginalPrice(e.target.value)}
                            placeholder="e.g. 100"
                        />
                    </Field>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                    This price will instantly update across both the website product cards and the order price list table.
                </p>
            </div>
        </Modal>
    );
};

const ProductItem = ({ prod, openEdit, openPriceEdit, handleToggleStock, handleDelete, handleRestore, isTrashView }) => {
    const isOut = prod.isOutOfStock || prod.status === 'Out of Stock';

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all ${
            isOut ? 'border-amber-200 bg-amber-50/20' : 'border-slate-100'
        }`}>
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative border border-slate-100">
                    {(prod.imageUrl || prod.image) && (
                        <img src={prod.imageUrl || prod.image} alt={prod.title} className="w-full h-full object-cover" />
                    )}
                    {prod.sno && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-black text-amber-300">
                            #{prod.sno}
                        </span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-black text-slate-900 text-sm truncate">{prod.title}</h4>
                        {prod.isStatic && <span className="text-[8px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-slate-200">Preset</span>}
                        {prod.isFirestore && <span className="text-[8px] font-black bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-secondary/20">Live</span>}
                        {isOut ? (
                            <span className="text-[9px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                <AlertCircle size={10} /> Out of Stock
                            </span>
                        ) : (
                            <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                <Check size={10} /> In Stock
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/5 px-2 py-0.5 rounded-md">
                            {prod.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-black">
                            <span className="text-emerald-700 font-bold">
                                {prod.price ? (String(prod.price).startsWith('₹') ? prod.price : `₹${prod.price}`) : `₹${prod.discountPrice || 0}`}
                            </span>
                            {prod.originalPrice && (
                                <span className="text-slate-400 line-through text-[11px] font-semibold">
                                    {String(prod.originalPrice).startsWith('₹') ? prod.originalPrice : `₹${prod.originalPrice}`}
                                </span>
                            )}
                            <button
                                onClick={() => openPriceEdit(prod)}
                                className="text-[10px] font-black text-blue-600 hover:text-blue-800 hover:underline uppercase tracking-wider ml-1"
                                title="Quick Edit Price"
                            >
                                ✏ Edit Price
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {!isTrashView ? (
                    <>
                        <button
                            onClick={() => handleToggleStock(prod)}
                            className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                                isOut
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            }`}
                            title={isOut ? "Mark as In Stock" : "Mark as Out of Stock"}
                        >
                            {isOut ? <><Check size={13} /> Set In Stock</> : <><AlertCircle size={13} /> Set Out of Stock</>}
                        </button>
                        <button
                            onClick={() => openEdit(prod)}
                            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-secondary hover:border-secondary transition-all"
                            title="Edit Full Details"
                        >
                            <Edit2 size={15} />
                        </button>
                        <button
                            onClick={() => handleDelete(prod)}
                            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-300 transition-all"
                            title="Delete Product"
                        >
                            <Trash2 size={15} />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => handleRestore(prod)}
                        className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 text-xs font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5"
                    >
                        <RotateCcw size={13} /> Restore Product
                    </button>
                )}
            </div>
        </div>
    );
};

// ─── Product Manager ───────────────────────────────────────────────
const ProductManager = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterCat, setFilterCat] = useState('all');
    const [stockFilter, setStockFilter] = useState('all'); // 'all', 'in_stock', 'out_of_stock', 'trash'
    const [searchQuery, setSearchQuery] = useState('');
    const [priceModalProd, setPriceModalProd] = useState(null);

    useEffect(() => {
        const unsub1 = onSnapshot(collection(db, 'products'), (snap) => {
            const firestoreProds = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticProducts.map(p => ({ ...p, isStatic: true }));

            firestoreProds.forEach(fp => {
                const idx = merged.findIndex(p => {
                    const idMatch = p.id && fp.id && p.id === fp.id;
                    const docIdMatch = p.id && fp.docId && p.id === fp.docId;
                    const normalize = (s) => (s || '').toLowerCase().trim().replace(/\s+/g, ' ');
                    const titleMatch = normalize(p.title) === normalize(fp.title);
                    return idMatch || docIdMatch || titleMatch;
                });
                if (idx !== -1) {
                    merged[idx] = { ...merged[idx], ...fp, isStatic: false };
                } else {
                    merged.push(fp);
                }
            });
            merged.sort((a, b) => (Number(a.sno || a.order || 0)) - (Number(b.sno || b.order || 0)));
            setProducts(merged);
        });

        const unsub2 = onSnapshot(query(collection(db, 'categories'), orderBy('order', 'asc')), (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticCategories.map(c => ({ ...c, isStatic: true }));

            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) {
                    merged[idx] = { ...merged[idx], ...fc, isStatic: false };
                } else {
                    merged.push(fc);
                }
            });
            setCategories(merged);
        });

        return () => { unsub1(); unsub2(); };
    }, []);

    // ─── One-Click Stock Toggle ───
    const handleToggleStock = async (prod) => {
        const targetId = prod.docId || prod.id || slugify(prod.title || prod.nameEn);
        const isCurrentlyOut = prod.isOutOfStock || prod.status === 'Out of Stock';
        const newOutOfStock = !isCurrentlyOut;

        try {
            await setDoc(doc(db, 'products', targetId), {
                id: prod.id || targetId,
                title: prod.title || prod.nameEn || '',
                categorySlug: prod.categorySlug || '',
                isOutOfStock: newOutOfStock,
                status: newOutOfStock ? 'Out of Stock' : 'In Stock / Ready to Dispatch',
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error("Failed to update stock:", err);
            alert("Error updating stock status: " + err.message);
        }
    };

    // ─── Quick Price Save ───
    const handleSavePrice = async (prod, newOffer, newMrp) => {
        const targetId = prod.docId || prod.id || slugify(prod.title || prod.nameEn);
        const cleanOffer = String(newOffer).replace(/[^\d.]/g, '');
        const cleanMrp = String(newMrp).replace(/[^\d.]/g, '');
        const offerNum = parseFloat(cleanOffer) || 0;
        const mrpNum = parseFloat(cleanMrp) || 0;
        const discountPct = mrpNum > 0 ? Math.round(((mrpNum - offerNum) / mrpNum) * 100) : 90;

        try {
            await setDoc(doc(db, 'products', targetId), {
                id: prod.id || targetId,
                title: prod.title || prod.nameEn || '',
                categorySlug: prod.categorySlug || '',
                price: `₹${cleanOffer}`,
                discountPrice: offerNum,
                originalPrice: cleanMrp ? `₹${cleanMrp}` : prod.originalPrice || '',
                discount: `${discountPct}% OFF`,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error("Failed to update price:", err);
            alert("Error updating price: " + err.message);
        }
    };

    // ─── Remove / Delete Product (Works on all products) ───
    const handleDelete = async (prod) => {
        if (!window.confirm(`Delete "${prod.title || prod.nameEn}"? This will remove it from the store.`)) return;
        const targetId = prod.docId || prod.id || slugify(prod.title || prod.nameEn);

        try {
            await setDoc(doc(db, 'products', targetId), {
                id: prod.id || targetId,
                title: prod.title || prod.nameEn || '',
                categorySlug: prod.categorySlug || '',
                isDeleted: true,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Error deleting product: " + err.message);
        }
    };

    // ─── Restore Deleted Product ───
    const handleRestore = async (prod) => {
        const targetId = prod.docId || prod.id || slugify(prod.title || prod.nameEn);
        try {
            await setDoc(doc(db, 'products', targetId), {
                isDeleted: false,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error("Failed to restore product:", err);
            alert("Error restoring product: " + err.message);
        }
    };

    const openEdit = (prod) => {
        const idToUse = prod.docId || prod.id || slugify(prod.title || prod.nameEn);
        navigate(`/admin/product/edit/${idToUse}`);
    };

    // Filter computation
    const nonDeleted = products.filter(p => !p.isDeleted);
    const deletedList = products.filter(p => !!p.isDeleted);
    const inStockList = nonDeleted.filter(p => !p.isOutOfStock && p.status !== 'Out of Stock');
    const outOfStockList = nonDeleted.filter(p => !!p.isOutOfStock || p.status === 'Out of Stock');

    const filtered = products.filter(p => {
        // Stock / Trash filter
        if (stockFilter === 'trash') {
            if (!p.isDeleted) return false;
        } else {
            if (p.isDeleted) return false;
            if (stockFilter === 'in_stock' && (p.isOutOfStock || p.status === 'Out of Stock')) return false;
            if (stockFilter === 'out_of_stock' && !p.isOutOfStock && p.status !== 'Out of Stock') return false;
        }

        // Category filter
        if (filterCat !== 'all' && p.categorySlug !== filterCat) return false;

        // Search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            const matchTitle = (p.title || '').toLowerCase().includes(q);
            const matchEn = (p.nameEn || '').toLowerCase().includes(q);
            const matchTa = (p.nameTa || '').includes(q);
            const matchSno = String(p.sno || '').includes(q);
            if (!matchTitle && !matchEn && !matchTa && !matchSno) return false;
        }

        return true;
    });

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Product Inventory Management</h2>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
                        Add new crackers, update prices in 1-click, remove products & manage live stock
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/product/new')}
                    className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 w-fit"
                >
                    <Plus size={16} /> Add New Product
                </button>
            </div>

            {/* Quick Status Tabs (All, In Stock, Out of Stock, Trash) */}
            <div className="flex flex-wrap gap-2 pt-2 border-b border-slate-200 pb-4">
                <button
                    onClick={() => setStockFilter('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                        stockFilter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    All Products
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${stockFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {nonDeleted.length}
                    </span>
                </button>

                <button
                    onClick={() => setStockFilter('in_stock')}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                        stockFilter === 'in_stock' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
                    }`}
                >
                    <Check size={14} /> In Stock
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${stockFilter === 'in_stock' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                        {inStockList.length}
                    </span>
                </button>

                <button
                    onClick={() => setStockFilter('out_of_stock')}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                        stockFilter === 'out_of_stock' ? 'bg-rose-600 text-white shadow-md' : 'bg-white border border-slate-200 text-rose-700 hover:bg-rose-50'
                    }`}
                >
                    <AlertCircle size={14} /> Out of Stock List
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${stockFilter === 'out_of_stock' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'}`}>
                        {outOfStockList.length}
                    </span>
                </button>

                {deletedList.length > 0 && (
                    <button
                        onClick={() => setStockFilter('trash')}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                            stockFilter === 'trash' ? 'bg-amber-600 text-white shadow-md' : 'bg-white border border-slate-200 text-amber-700 hover:bg-amber-50'
                        }`}
                    >
                        <Trash2 size={14} /> Deleted / Trash
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${stockFilter === 'trash' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
                            {deletedList.length}
                        </span>
                    </button>
                )}
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by product name, S.No, Tamil name..."
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-secondary transition-all"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <X size={14} />
                        </button>
                    )}
                </div>

                <div className="relative w-full sm:w-auto min-w-[200px]">
                    <select
                        value={filterCat}
                        onChange={e => setFilterCat(e.target.value)}
                        className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-xs font-black text-slate-700 outline-none focus:border-secondary transition-all bg-white cursor-pointer"
                    >
                        <option value="all">All Categories ({categories.length})</option>
                        {categories.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Product List */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl">
                        <AlertCircle size={32} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-slate-500 font-bold text-sm">No products found matching your filter</p>
                        <p className="text-slate-400 text-xs mt-1">Try clearing your search or switching categories</p>
                    </div>
                ) : (
                    filtered.map((prod) => (
                        <ProductItem
                            key={prod.docId || prod.id}
                            prod={prod}
                            openEdit={openEdit}
                            openPriceEdit={p => setPriceModalProd(p)}
                            handleToggleStock={handleToggleStock}
                            handleDelete={handleDelete}
                            handleRestore={handleRestore}
                            isTrashView={stockFilter === 'trash'}
                        />
                    ))
                )}
            </div>

            {/* Quick Price Modal */}
            <AnimatePresence>
                {priceModalProd && (
                    <QuickPriceModal
                        prod={priceModalProd}
                        onClose={() => setPriceModalProd(null)}
                        onSave={handleSavePrice}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Dashboard Overview ────────────────────────────────────────────
const DashboardOverview = () => {
    const [catCount, setCatCount] = useState(0);
    const [prodCount, setProdCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);
    const [newInquiryCount, setNewInquiryCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const u1 = onSnapshot(collection(db, 'categories'), s => {
            const firestoreCount = s.docs.filter(d => !staticCategories.some(sc => sc.slug === d.data().slug)).length;
            setCatCount(staticCategories.length + firestoreCount);
        });
        const u2 = onSnapshot(query(collection(db, 'products'), orderBy('order', 'asc')), s => {
            const firestoreProds = s.docs.map(d => ({ docId: d.id, ...d.data(), isFirestore: true }));
            const merged = staticProducts.map(p => ({ ...p, isStatic: true }));

            firestoreProds.forEach(fp => {
                const idx = merged.findIndex(p => p.title === fp.title);
                if (idx !== -1) merged[idx] = { ...merged[idx], ...fp, isStatic: false };
                else merged.push(fp);
            });
            merged.sort((a, b) => {
                const getOrder = (p) => {
                    if (typeof p.order === 'number') return p.order;
                    if (p.title?.toLowerCase().includes('rice')) return -1000;
                    return 0;
                };
                return getOrder(a) - getOrder(b);
            });
            setAllProducts(merged);
            setProdCount(merged.length);
        });
        const u3 = onSnapshot(collection(db, 'inquiries'), s => {
            setInquiryCount(s.size);
            setNewInquiryCount(s.docs.filter(d => d.data().status === 'new').length);
        });
        const u4 = onSnapshot(collection(db, 'appointments'), s => setAppointmentCount(s.size));
        return () => { u1(); u2(); u3(); u4(); };
    }, []);

    const stats = [
        { icon: FolderOpen, label: 'Categories', value: catCount, color: 'purple' },
        { icon: Package, label: 'Products', value: prodCount, color: 'green' },
        { icon: Mail, label: 'Inquiries', value: inquiryCount, color: 'orange', sub: `${newInquiryCount} New` },
        { icon: Calendar, label: 'Scheduled', value: appointmentCount, color: 'emerald' },
    ];
    const colorMap = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600'
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorMap[s.color]}`}>
                            <s.icon size={20} />
                        </div>
                        <div className="flex items-baseline gap-2">
                            <div className="text-3xl font-black text-slate-900 tracking-tight">{s.value}</div>
                            {s.sub && <span className="text-[10px] font-black text-secondary uppercase animate-pulse shrink-0">{s.sub}</span>}
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Cracker Product Inventory</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Live tracking of all fireworks & cracker items</p>
                    </div>
                    <div className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full">
                        <span className="text-xs font-black text-primary uppercase tracking-widest">{allProducts.length} Items Total</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allProducts.map((prod, idx) => (
                        <motion.div
                            key={prod.docId || prod.id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group p-4 bg-white border border-slate-50 rounded-2xl hover:border-secondary/20 hover:shadow-lg hover:shadow-secondary/5 transition-all flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                                <img src={prod.imageUrl || prod.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-slate-800 text-xs truncate uppercase tracking-tight group-hover:text-secondary transition-colors">{prod.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[80px]">{prod.category}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                    {prod.isFirestore ? (
                                        <span className="text-[8px] font-black text-secondary uppercase tracking-widest px-1.5 py-0.5 bg-secondary/5 rounded-md">Live</span>
                                    ) : (
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest px-1.5 py-0.5 bg-slate-50 rounded-md">Static</span>
                                    )}
                                    {prod.price && (
                                        <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest px-1.5 py-0.5 bg-emerald-50 rounded-md">{prod.price}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                <h3 className="font-black text-slate-900 mb-2">Quick Guide</h3>
                <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-black mt-0.5 flex-shrink-0">1</span>Go to <strong className="text-slate-700">Categories</strong> tab → Add your product categories with an image URL and description.</li>
                    <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-black mt-0.5 flex-shrink-0">2</span>Go to <strong className="text-slate-700">Products</strong> tab → Add individual products, select their category, and paste an image URL.</li>
                    <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-black mt-0.5 flex-shrink-0">3</span>Changes appear <strong className="text-slate-700">instantly</strong> on the website — no refresh needed.</li>
                </ul>
            </div>
        </div>
    );
};

// ─── Main Dashboard Shell ──────────────────────────────────────────
const Dashboard = ({ onLogout }) => {
    const location = useLocation();
    const [tab, setTab] = useState(location.state?.activeTab || 'overview');
    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'categories', label: 'Categories', icon: FolderOpen },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'inquiries', label: 'Inquiries', icon: Mail },
        { id: 'appointments', label: 'Call Bookings', icon: Calendar },
    ];
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 md:py-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 tracking-tight">
                        <Activity size={28} className="text-secondary" /> Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                        <Calendar size={14} />
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary transition-all">
                        <Bell size={20} />
                    </button>
                    <button onClick={onLogout} className="flex items-center gap-2 px-5 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === t.id ? 'bg-white text-secondary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        <t.icon size={15} />{t.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {tab === 'overview' && <DashboardOverview />}
                    {tab === 'categories' && <CategoryManager />}
                    {tab === 'products' && <ProductManager />}
                    {tab === 'inquiries' && <InquiryManager />}
                    {tab === 'appointments' && <AppointmentManager />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// ─── Root ──────────────────────────────────────────────────────────
// ─── Root ──────────────────────────────────────────────────────────
const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    // ─── Inactivity Auto-Logout ───
    useEffect(() => {
        if (!isAuthenticated) return;

        let idleTimer;
        const IDLE_LIMIT = 15 * 60 * 1000; // 15 minutes

        const resetTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                handleLogout();
                alert("Session expired due to inactivity. Please log in again.");
            }, IDLE_LIMIT);
        };

        // Listen for activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(name => document.addEventListener(name, resetTimer));
        
        resetTimer(); // Start initial timer

        return () => {
            clearTimeout(idleTimer);
            events.forEach(name => document.removeEventListener(name, resetTimer));
        };
    }, [isAuthenticated]);

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-inter pt-20">
            {!isAuthenticated ? (
                <LoginScreen onLogin={() => setIsAuthenticated(true)} />
            ) : (
                <Dashboard onLogout={handleLogout} />
            )}
        </div>
    );
};

export default AdminPanel;







