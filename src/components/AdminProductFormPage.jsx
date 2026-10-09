import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Check, UploadCloud, ChevronDown, Package, Save,
    Sparkles, X, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import {
    collection, setDoc, doc,
    onSnapshot, query, orderBy, where, serverTimestamp, getDoc, getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories, products as staticProducts } from '../data/products';

const slugify = (str) => str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const resizeImage = (file, maxWidth = 1200) => {
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
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
        };
    });
};

const Field = ({ label, children, hint, required }) => (
    <div>
        <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
            {label}
            {required && <span className="text-rose-500">*</span>}
        </label>
        {children}
        {hint && <p className="text-[10px] text-slate-400 mt-1 font-medium">{hint}</p>}
    </div>
);

const TextInput = ({ value, onChange, placeholder, ...rest }) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-white"
    />
);

const emptyForm = {
    sno: '',
    title: '',
    nameTa: '',
    category: '',
    categorySlug: '',
    price: '',
    originalPrice: '',
    per: '1 Box',
    description: '',
    imageUrl: '',
    isOutOfStock: false
};

const AdminProductFormPage = () => {
    const navigate = useNavigate();
    const { docId } = useParams();
    const isEditing = !!docId;

    // Security check
    useEffect(() => {
        const isAuth = sessionStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin');
        }
    }, [navigate]);

    const [form, setForm] = useState(emptyForm);
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);
    const [loadingData, setLoadingData] = useState(isEditing);
    const [isProcessingImg, setIsProcessingImg] = useState(false);

    // Load active categories
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, 'categories'), orderBy('order', 'asc')), (snap) => {
            const firestoreCats = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
            const merged = staticCategories.map(c => ({ ...c }));
            firestoreCats.forEach(fc => {
                const idx = merged.findIndex(s => s.slug === fc.slug);
                if (idx !== -1) merged[idx] = { ...merged[idx], ...fc };
                else merged.push(fc);
            });
            setCategories(merged);
        });
        return () => unsub();
    }, []);

    // Load existing product if editing
    useEffect(() => {
        if (!isEditing) return;
        const loadProduct = async () => {
            try {
                setLoadingData(true);
                const docRef = doc(db, 'products', docId);
                const snap = await getDoc(docRef);
                let data = null;

                if (snap.exists()) {
                    data = snap.data();
                } else {
                    const q = query(collection(db, 'products'), where('id', '==', docId));
                    const qSnap = await getDocs(q);
                    if (!qSnap.empty) {
                        data = qSnap.docs[0].data();
                    }
                }

                if (!data) {
                    const staticProd = staticProducts.find(p => p.id === docId || p.title.toLowerCase() === docId.toLowerCase());
                    if (staticProd) data = staticProd;
                }

                if (data) {
                    const isOut = data.isOutOfStock !== undefined ? !!data.isOutOfStock : data.status === 'Out of Stock';
                    setForm({
                        sno: data.sno !== undefined && data.sno !== null ? String(data.sno) : '',
                        title: data.title || data.nameEn || '',
                        nameTa: data.nameTa || '',
                        category: data.category || '',
                        categorySlug: data.categorySlug || '',
                        price: data.price ? String(data.price).replace(/[^\d.]/g, '') : (data.discountPrice ? String(data.discountPrice) : ''),
                        originalPrice: data.originalPrice ? String(data.originalPrice).replace(/[^\d.]/g, '') : '',
                        per: data.per || '1 Box',
                        description: data.description || '',
                        imageUrl: data.imageUrl || data.image || '',
                        isOutOfStock: isOut
                    });
                }
            } catch (err) {
                console.error("Error loading product:", err);
            } finally {
                setLoadingData(false);
            }
        };
        loadProduct();
    }, [docId, isEditing]);

    // Handle local image upload
    const handleFileImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsProcessingImg(true);
        try {
            const dataUrl = await resizeImage(file, 1000);
            setForm(f => ({ ...f, imageUrl: dataUrl }));
        } catch (err) {
            console.error("Failed to process image:", err);
            alert("Failed to process image. Please try another file.");
        } finally {
            setIsProcessingImg(false);
            e.target.value = '';
        }
    };

    // Save product
    const handleSave = async () => {
        if (!form.title.trim() || !form.categorySlug) {
            alert("Please enter a product name and select a category.");
            return;
        }
        setSaving(true);

        const cleanPrice = String(form.price || '').replace(/[^\d.]/g, '');
        const cleanMrp = String(form.originalPrice || '').replace(/[^\d.]/g, '');
        const priceNum = parseFloat(cleanPrice) || 0;
        const mrpNum = parseFloat(cleanMrp) || 0;
        const discountPct = mrpNum > 0 ? Math.round(((mrpNum - priceNum) / mrpNum) * 100) : 90;

        const isOut = !!form.isOutOfStock;
        const targetId = isEditing ? docId : (slugify(form.title) || `prod_${Date.now()}`);

        const payload = {
            id: targetId,
            sno: form.sno ? Number(form.sno) : null,
            title: form.title.trim(),
            nameEn: form.title.trim(),
            nameTa: form.nameTa.trim(),
            category: form.category || 'Uncategorized',
            categorySlug: form.categorySlug || '',
            price: cleanPrice ? `₹${cleanPrice}` : '',
            discountPrice: priceNum,
            originalPrice: cleanMrp ? `₹${cleanMrp}` : '',
            discount: `${discountPct}% OFF`,
            per: form.per.trim() || '1 Box',
            description: form.description.trim(),
            longDescription: form.description.trim(),
            imageUrl: form.imageUrl || '',
            image: form.imageUrl || '',
            isGreenCracker: true,
            isOutOfStock: isOut,
            status: isOut ? 'Out of Stock' : 'In Stock / Ready to Dispatch',
            badgeNote: '100% Green Cracker',
            isDeleted: false,
            order: form.sno ? Number(form.sno) : 0,
            updatedAt: serverTimestamp()
        };

        try {
            await setDoc(doc(db, 'products', targetId), {
                ...payload,
                ...(isEditing ? {} : { createdAt: serverTimestamp() })
            }, { merge: true });

            navigate('/admin', { state: { tab: 'products' } });
        } catch (e) {
            console.error("Error saving product:", e);
            alert("Error saving: " + e.message);
        } finally {
            setSaving(false);
        }
    };

    const isValid = !!(form.title.trim() && form.categorySlug);

    // Live savings calculations
    const priceNum = parseFloat(form.price) || 0;
    const mrpNum = parseFloat(form.originalPrice) || 0;
    const savings = mrpNum > priceNum ? mrpNum - priceNum : 0;
    const discountPct = mrpNum > 0 && priceNum > 0 ? Math.round(((mrpNum - priceNum) / mrpNum) * 100) : 0;

    if (loadingData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
                <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-20 font-inter">
            {/* Sticky Header Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin', { state: { tab: 'products' } })}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-secondary hover:border-secondary transition-all"
                            title="Back to Admin"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin → Products</p>
                            <h1 className="text-lg font-black text-slate-900 tracking-tight">
                                {isEditing ? 'Edit Cracker Product' : 'Add New Cracker'}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin', { state: { tab: 'products' } })}
                            className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || !isValid}
                            className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-secondary/90 transition-all disabled:opacity-50 shadow-md shadow-secondary/20 cursor-pointer"
                        >
                            {saving ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save size={16} />
                            )}
                            {isEditing ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                
                {/* 1. Essential Product Info */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <Package size={20} />
                        </div>
                        <div>
                            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Cracker Details / பட்டாசு விபரம்</h2>
                            <p className="text-xs text-slate-400 font-medium">Basic product identification and category</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="sm:col-span-1">
                            <Field label="S.No (வரிசை எண்)" hint="Number in price list (e.g. 191)">
                                <TextInput
                                    type="number"
                                    value={form.sno}
                                    onChange={e => setForm(f => ({ ...f, sno: e.target.value }))}
                                    placeholder="e.g. 191"
                                />
                            </Field>
                        </div>
                        <div className="sm:col-span-2">
                            <Field label="Category (பட்டாசு பிரிவு)" required hint="Select cracker category">
                                <div className="relative">
                                    <select
                                        value={form.categorySlug}
                                        onChange={e => {
                                            const cat = categories.find(c => c.slug === e.target.value);
                                            if (cat) {
                                                setForm(f => ({ ...f, category: cat.title, categorySlug: cat.slug }));
                                            } else {
                                                setForm(f => ({ ...f, category: '', categorySlug: '' }));
                                            }
                                        }}
                                        className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold text-slate-800 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-white cursor-pointer"
                                    >
                                        <option value="">-- Select Cracker Category --</option>
                                        {categories.map(c => (
                                            <option key={c.slug} value={c.slug}>
                                                {c.title}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </Field>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Product Name (English)" required hint="Official English name">
                            <TextInput
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="e.g. 2 3/4 Kuruvi Crackers"
                            />
                        </Field>

                        <Field label="Product Name in Tamil (தமிழ் பெயர்)" hint="Customer friendly Tamil name">
                            <TextInput
                                value={form.nameTa}
                                onChange={e => setForm(f => ({ ...f, nameTa: e.target.value }))}
                                placeholder="எ.கா. 2 3/4 குருவி வெடி"
                            />
                        </Field>
                    </div>

                    {/* Short Description */}
                    <Field label="Short Description / குறிப்பு (Optional)">
                        <textarea
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="Brief note about the product, sound, or effect..."
                            rows={2}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all resize-none bg-white"
                        />
                    </Field>
                </div>

                {/* 2. Pricing & Packing */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Price & Unit / விலை விபரம்</h2>
                                <p className="text-xs text-slate-400 font-medium">Direct factory rate and discount calculations</p>
                            </div>
                        </div>

                        {savings > 0 && (
                            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                                ✨ {discountPct}% OFF • Save ₹{savings.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <Field label="Offer / Wholesale Price (₹)" required hint="விற்பனை விலை (Customer pays this)">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                                <input
                                    type="number"
                                    value={form.price}
                                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                    placeholder="15"
                                    className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-black text-emerald-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-white"
                                />
                            </div>
                        </Field>

                        <Field label="Original MRP (₹)" hint="அசல் விலை (Printed box MRP)">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                                <input
                                    type="number"
                                    value={form.originalPrice}
                                    onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                                    placeholder="75"
                                    className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-bold text-slate-500 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-white"
                                />
                            </div>
                        </Field>

                        <Field label="Per Unit (அளவு)" hint="e.g. 1 Box, 1 Pkt, 1 Piece, 10 Pcs">
                            <TextInput
                                value={form.per}
                                onChange={e => setForm(f => ({ ...f, per: e.target.value }))}
                                placeholder="1 Box"
                            />
                        </Field>
                    </div>

                    {savings > 0 && (
                        <div className="sm:hidden p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 text-center">
                            ✨ {discountPct}% Discount • Customer saves ₹{savings.toLocaleString('en-IN')}
                        </div>
                    )}
                </div>

                {/* 3. Product Photo */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Product Photo / புகைப்படம்</h2>
                            <p className="text-xs text-slate-400 font-medium">Upload cracker box picture or enter image URL</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Device File Upload */}
                        <div className="relative border-2 border-dashed border-slate-200 hover:border-secondary rounded-2xl p-6 text-center transition-all bg-slate-50 hover:bg-slate-50/50 cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileImage}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                                    {isProcessingImg ? (
                                        <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <UploadCloud size={24} className="text-secondary" />
                                    )}
                                </div>
                                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                                    {isProcessingImg ? 'Compressing Image...' : 'Click to Upload Image from Device'}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                    JPG, PNG, WebP • Auto-compressed for fast loading
                                </span>
                            </div>
                        </div>

                        {/* Image URL fallback */}
                        <Field label="Or Paste Direct Image URL (விருப்பத்தேர்வு)">
                            <TextInput
                                value={form.imageUrl}
                                onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                                placeholder="https://example.com/cracker-photo.jpg"
                            />
                        </Field>

                        {/* Live Image Preview */}
                        {form.imageUrl && (
                            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100 group">
                                <img
                                    src={form.imageUrl}
                                    alt="Cracker Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, imageUrl: '' }))}
                                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                                    title="Remove photo"
                                >
                                    <X size={14} />
                                </button>
                                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                                    Photo Preview
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. Stock Availability Toggle */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                        Stock Availability / கையிருப்பு நிலை
                    </label>

                    <button
                        type="button"
                        onClick={() => setForm(f => ({ ...f, isOutOfStock: !f.isOutOfStock }))}
                        className={`w-full p-5 rounded-2xl border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer ${
                            form.isOutOfStock
                                ? 'bg-rose-50/80 border-rose-300 text-rose-900 hover:bg-rose-100'
                                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                        }`}
                    >
                        <div className="flex items-center gap-3.5">
                            <div className={`w-4 h-4 rounded-full shrink-0 ${form.isOutOfStock ? 'bg-rose-600 ring-4 ring-rose-200' : 'bg-emerald-600 ring-4 ring-emerald-200'}`} />
                            <div>
                                <div className="font-black text-sm uppercase tracking-wide">
                                    {form.isOutOfStock ? '⚠️ Out of Stock (கையிருப்பு இல்லை)' : '✓ In Stock (கையிருப்பில் உள்ளது)'}
                                </div>
                                <p className="text-xs text-slate-600 font-medium mt-0.5">
                                    {form.isOutOfStock
                                        ? 'Product is marked out of stock. Customers cannot add it to cart.'
                                        : 'Product is ready in factory and available for online orders.'}
                                </p>
                            </div>
                        </div>

                        <span className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white border border-slate-200 shadow-sm shrink-0">
                            {form.isOutOfStock ? 'Switch to In Stock' : 'Switch to Out of Stock'}
                        </span>
                    </button>
                </div>

                {/* Bottom Submit Action */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin', { state: { tab: 'products' } })}
                        className="px-6 py-3 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || !isValid}
                        className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-secondary to-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:from-secondary/95 hover:to-rose-700 transition-all disabled:opacity-50 shadow-lg shadow-secondary/25 cursor-pointer"
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Check size={16} />
                        )}
                        {isEditing ? 'Update Cracker Product' : 'Save Cracker Product'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AdminProductFormPage;
