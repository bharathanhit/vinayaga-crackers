import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Check, Trash2, Plus, UploadCloud, ChevronDown, Package, Save
} from 'lucide-react';
import {
    collection, addDoc, updateDoc, deleteDoc, doc,
    onSnapshot, query, orderBy, serverTimestamp, getDoc
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

const Field = ({ label, children, hint }) => (
    <div>
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
        {children}
        {hint && <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-tight">{hint}</p>}
    </div>
);

const TextInput = ({ value, onChange, placeholder, ...rest }) => (
    <input value={value} onChange={onChange} placeholder={placeholder} {...rest}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-white" />
);

const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all resize-none bg-white" />
);

const ImageUploader = ({ value, onChange, label = "Image" }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsProcessing(true);
        try {
            const dataUrl = await resizeImage(file, 1200);
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
                    <div className="relative h-64 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group/prev">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover/prev:bg-black/40 transition-all" />
                        <div className="absolute top-4 right-4 bg-secondary text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                            <Check size={12} /> Live Preview
                        </div>
                        <button onClick={() => onChange({ target: { value: '' } })}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover/prev:opacity-100 translate-y-4 group-hover/prev:translate-y-0 transition-all">
                            Remove &amp; Replace
                        </button>
                    </div>
                )}
            </div>
        </Field>
    );
};

const SectionCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            {Icon && <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary"><Icon size={18} /></div>}
            <h3 className="font-black text-slate-900 text-base uppercase tracking-tight">{title}</h3>
        </div>
        <div className="space-y-5">{children}</div>
    </div>
);

const emptyForm = {
    title: '',
    description: '',
    longDescription: '',
    category: '',
    categorySlug: '',
    imageUrl: '',
    isGreenCracker: true,
    status: 'In Stock / Ready to Dispatch',
    badgeNote: '100% Green Cracker',
    price: '',
    specifications: [{ label: '', value: '' }],
    types: [''],
    minimumOrder: '',
    benefits: [''],
    varieties: [],
    paragraphs: [{ heading: '', body: '' }],
    order: 0
};

// Encode product data into a URL-safe string for passing via state
const AdminProductFormPage = () => {
    const navigate = useNavigate();
    const { docId } = useParams(); // present when editing
    const isEditing = !!docId;

    // ─── Security Check ───
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

    // Load categories
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

    // Load existing product when editing
    useEffect(() => {
        if (!isEditing) return;
        const loadProduct = async () => {
            try {
                setLoadingData(true);
                // First try Firestore by Doc ID
                const docRef = doc(db, 'products', docId);
                const snap = await getDoc(docRef);
                
                let data = null;
                let actualDocId = docId;

                if (snap.exists()) {
                    data = snap.data();
                } else {
                    // Try searching by the 'id' field (slug)
                    const q = query(collection(db, 'products'), where('id', '==', docId));
                    const qSnap = await getDocs(q);
                    if (!qSnap.empty) {
                        data = qSnap.docs[0].data();
                        actualDocId = qSnap.docs[0].id;
                    }
                }

                // If still not found in Firestore, look in static data
                if (!data) {
                    const staticProd = staticProducts.find(p => p.id === docId || p.title.toLowerCase() === docId.toLowerCase());
                    if (staticProd) {
                        data = staticProd;
                    }
                }

                if (data) {
                    setForm({
                        title: data.title || '',
                        description: data.description || '',
                        longDescription: data.longDescription || '',
                        category: data.category || '',
                        categorySlug: data.categorySlug || '',
                        imageUrl: data.imageUrl || data.image || '',
                        isGreenCracker: data.isGreenCracker !== undefined ? !!data.isGreenCracker : true,
                        price: data.price || '',
                        status: data.status || 'In Stock / Ready to Dispatch',
                        badgeNote: data.badgeNote || '100% Green Cracker',
                        specifications: data.specifications?.length ? data.specifications : [{ label: '', value: '' }],
                        types: data.types?.length ? data.types : [''],
                        minimumOrder: data.minimumOrder || '',
                        benefits: data.benefits?.length ? data.benefits : [''],
                        varieties: (data.varieties || []).map(v => ({ title: v.title, desc: v.desc || '', imageUrl: v.img || v.imageUrl || '' })),
                        paragraphs: data.paragraphs?.length ? data.paragraphs : [{ heading: '', body: '' }],
                        order: typeof data.order === 'number' ? data.order : 0
                    });
                    
                    // If we found it via slug or it was static, we should update the URL to use the real docId if possible 
                    // or just keep it as is. The handleSave will correctly update/add based on isEditing.
                }
            } catch (err) {
                console.error("Error loading product:", err);
            } finally {
                setLoadingData(false);
            }
        };
        loadProduct();
    }, [docId, isEditing]);

    const handleSave = async () => {
        if (!form.title || !form.categorySlug) return;
        setSaving(true);
        const safeOrder = Number(form.order);
        const payload = {
            title: form.title,
            id: slugify(form.title),
            description: form.description || '',
            longDescription: form.longDescription || '',
            category: form.category || 'Uncategorized',
            categorySlug: form.categorySlug || '',
            isGreenCracker: !!form.isGreenCracker,
            price: form.price || '',
            imageUrl: form.imageUrl || '',
            status: form.status || 'In Stock / Ready to Dispatch',
            badgeNote: form.badgeNote || '100% Green Cracker',
            specifications: (form.specifications || []).filter(s => s.label && s.value),
            types: (form.types || []).filter(t => t && t.trim()),
            minimumOrder: form.minimumOrder || '',
            benefits: (form.benefits || []).filter(b => b && b.trim()),
            varieties: (form.varieties || []).filter(v => v.title).map(v => ({
                title: v.title,
                desc: v.desc || '',
                img: v.imageUrl || ''
            })),
            paragraphs: (form.paragraphs || []).filter(p => p.heading || p.body),
            order: isNaN(safeOrder) ? 0 : safeOrder,
            updatedAt: serverTimestamp()
        };
        try {
            if (isEditing) {
                await updateDoc(doc(db, 'products', docId), payload);
            } else {
                await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() });
            }
            navigate('/admin', { state: { tab: 'products' } });
        } catch (e) {
            console.error(e);
            alert("Error saving: " + e.message);
        }
        setSaving(false);
    };

    const isValid = !!(form.title && form.categorySlug);

    if (loadingData) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
            <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-20 font-inter">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 sticky top-[72px] z-30 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin', { state: { tab: 'products' } })}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary transition-all">
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Admin → Products
                            </p>
                            <h1 className="text-lg font-black text-slate-900 tracking-tight">
                                {isEditing ? 'Edit Product' : 'New Product'}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/admin', { state: { tab: 'products' } })}
                            className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-black text-slate-500 hover:bg-slate-50 transition-all">
                            Cancel
                        </button>
                        <button onClick={handleSave} disabled={saving || !isValid}
                            className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-white rounded-xl text-sm font-black hover:bg-secondary/90 transition-all disabled:opacity-50 shadow-lg shadow-secondary/20">
                            {saving
                                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : <Save size={16} />}
                            {isEditing ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Left Column — Main Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Basic Info */}
                        <SectionCard title="Basic Information" icon={Package}>
                            <Field label="Product Name *">
                                <TextInput
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="e.g. Turmeric Powder"
                                />
                                {form.title && <p className="text-[10px] text-slate-400 mt-1 font-mono">id: {slugify(form.title)}</p>}
                            </Field>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                <Field label="Display Price / Amount" hint="Optional. e.g. $500 / Tonne">
                                    <TextInput value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                                </Field>
                                <Field label="Category *">
                                    <div className="relative">
                                        <select
                                            value={form.categorySlug}
                                            onChange={e => {
                                                const cat = categories.find(c => c.slug === e.target.value);
                                                if (cat) setForm(f => ({ ...f, category: cat.title, categorySlug: cat.slug }));
                                            }}
                                            className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-bold outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-white cursor-pointer"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </Field>
                            </div>

                            <Field label="Short Description">
                                <TextArea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Brief product description for the grid..."
                                />
                            </Field>

                            <Field label="Long Description (Detail Page)">
                                <TextArea
                                    value={form.longDescription}
                                    onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))}
                                    placeholder="Detailed story for the product page..."
                                    rows={5}
                                />
                            </Field>
                        </SectionCard>

                        {/* Specifications */}
                        <SectionCard title="Technical Specifications">
                            <div className="space-y-3">
                                {form.specifications.map((spec, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <input
                                            value={spec.label}
                                            onChange={e => {
                                                const ns = [...form.specifications];
                                                ns[idx] = { ...ns[idx], label: e.target.value };
                                                setForm(f => ({ ...f, specifications: ns }));
                                            }}
                                            placeholder="Label (e.g. Moisture)"
                                            className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none focus:border-secondary transition-all"
                                        />
                                        <textarea
                                            value={spec.value}
                                            onChange={e => {
                                                const ns = [...form.specifications];
                                                ns[idx] = { ...ns[idx], value: e.target.value };
                                                setForm(f => ({ ...f, specifications: ns }));
                                            }}
                                            placeholder="Value (e.g. 12% Max)"
                                            rows={1}
                                            className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:border-secondary transition-all min-h-[40px] leading-tight pt-3"
                                        />
                                        <button
                                            onClick={() => {
                                                const ns = form.specifications.filter((_, i) => i !== idx);
                                                setForm(f => ({ ...f, specifications: ns.length ? ns : [{ label: '', value: '' }] }));
                                            }}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setForm(f => ({ ...f, specifications: [...f.specifications, { label: '', value: '' }] }))}
                                    className="flex items-center gap-1.5 text-[11px] font-black text-secondary uppercase tracking-widest hover:gap-2 transition-all"
                                >
                                    <Plus size={14} /> Add Specification
                                </button>
                            </div>
                        </SectionCard>

                        {/* Types / Variants */}
                        <SectionCard title="Available Types / Variants">
                            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 mb-2">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight italic">
                                    📦 e.g. Frozen, Fresh, Chilled, Boneless, Bone-In, Salted, Natural
                                </p>
                            </div>
                            <div className="space-y-3">
                                {form.types.map((type, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <input
                                            value={type}
                                            onChange={e => {
                                                const nt = [...form.types];
                                                nt[idx] = e.target.value;
                                                setForm(f => ({ ...f, types: nt }));
                                            }}
                                            placeholder="e.g. Frozen Boneless"
                                            className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none focus:border-secondary transition-all"
                                        />
                                        <button
                                            onClick={() => {
                                                const nt = form.types.filter((_, i) => i !== idx);
                                                setForm(f => ({ ...f, types: nt.length ? nt : [''] }));
                                            }}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setForm(f => ({ ...f, types: [...f.types, ''] }))}
                                    className="flex items-center gap-1.5 text-[11px] font-black text-secondary uppercase tracking-widest hover:gap-2 transition-all"
                                >
                                    <Plus size={14} /> Add Type
                                </button>
                            </div>
                        </SectionCard>

                        {/* Benefits */}
                        <SectionCard title="Product Highlights / Benefits">
                            <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 mb-2">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight italic">
                                    ℹ️ Key selling points that appear in the product highlights section.
                                </p>
                            </div>
                            <div className="space-y-3">
                                {form.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <input
                                            value={benefit}
                                            onChange={e => {
                                                const nb = [...form.benefits];
                                                nb[idx] = e.target.value;
                                                setForm(f => ({ ...f, benefits: nb }));
                                            }}
                                            placeholder="e.g. 100% Organic"
                                            className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none focus:border-secondary transition-all"
                                        />
                                        <button
                                            onClick={() => {
                                                const nb = form.benefits.filter((_, i) => i !== idx);
                                                setForm(f => ({ ...f, benefits: nb.length ? nb : [''] }));
                                            }}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-red-100 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setForm(f => ({ ...f, benefits: [...f.benefits, ''] }))}
                                    className="flex items-center gap-1.5 text-[11px] font-black text-secondary uppercase tracking-widest hover:gap-2 transition-all"
                                >
                                    <Plus size={14} /> Add Benefit
                                </button>
                            </div>
                        </SectionCard>

                        {/* Product Detail Paragraphs */}
                        <SectionCard title="Product Detail Paragraphs">
                            <div className="bg-amber-50 px-4 py-3 rounded-xl border border-amber-100 mb-4">
                                <p className="text-[9px] font-bold text-amber-600 uppercase tracking-tight">
                                    📝 Add custom content sections with a heading and paragraph — displayed on the product detail page below the specifications.
                                </p>
                            </div>
                            <div className="space-y-5">
                                {(form.paragraphs || []).map((para, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section {idx + 1}</span>
                                            <button
                                                onClick={() => {
                                                    const np = form.paragraphs.filter((_, i) => i !== idx);
                                                    setForm(f => ({ ...f, paragraphs: np.length ? np : [{ heading: '', body: '' }] }));
                                                }}
                                                className="w-8 h-8 flex items-center justify-center rounded-xl border border-red-100 text-red-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                        <input
                                            value={para.heading}
                                            onChange={e => {
                                                const np = [...form.paragraphs];
                                                np[idx] = { ...np[idx], heading: e.target.value };
                                                setForm(f => ({ ...f, paragraphs: np }));
                                            }}
                                            placeholder="Section Heading (e.g. Why Choose Indian Pepper?)"
                                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-black outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-white"
                                        />
                                        <textarea
                                            value={para.body}
                                            onChange={e => {
                                                const np = [...form.paragraphs];
                                                np[idx] = { ...np[idx], body: e.target.value };
                                                setForm(f => ({ ...f, paragraphs: np }));
                                            }}
                                            placeholder="Write the paragraph content here..."
                                            rows={4}
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all resize-none bg-white"
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={() => setForm(f => ({ ...f, paragraphs: [...(f.paragraphs || []), { heading: '', body: '' }] }))}
                                    className="flex items-center gap-1.5 text-[11px] font-black text-secondary uppercase tracking-widest hover:gap-2 transition-all"
                                >
                                    <Plus size={14} /> Add Paragraph Section
                                </button>
                            </div>
                        </SectionCard>
                    </div>

                    {/* Right Column — Sidebar */}
                    <div className="space-y-6">

                        {/* Status & Display */}
                        <SectionCard title="Display Settings">
                            <Field label="Availability Status">
                                <TextInput
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                    placeholder="e.g. In Stock / Ready to Dispatch"
                                />
                            </Field>
                            <Field label="Display Badge">
                                <TextInput
                                    value={form.badgeNote}
                                    onChange={e => setForm(f => ({ ...f, badgeNote: e.target.value }))}
                                    placeholder="e.g. 100% Green Cracker, Best Seller"
                                />
                            </Field>
                            <Field label="Display Order" hint="Lower numbers appear first. Use negative to pin to top.">
                                <TextInput
                                    type="number"
                                    value={form.order}
                                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                                    placeholder="e.g. -10, 0, 10"
                                />
                            </Field>
                            <Field label="Minimum Order Quantity" hint="Displayed on the product detail page">
                                <TextInput
                                    value={form.minimumOrder}
                                    onChange={e => setForm(f => ({ ...f, minimumOrder: e.target.value }))}
                                    placeholder="e.g. 1 Box, 5 Boxes, 1 Pack"
                                />
                            </Field>

                            {/* Green Cracker Toggle */}
                            <div className="flex items-center gap-3 py-1">
                                <button
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, isGreenCracker: !f.isGreenCracker }))}
                                    className={`w-11 h-6 rounded-full transition-all flex-shrink-0 ${form.isGreenCracker ? 'bg-secondary' : 'bg-slate-200'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm mx-0.5 transform transition-transform ${form.isGreenCracker ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                                <label className="text-sm font-black text-slate-600">CSIR-NEERI Green Cracker Certified</label>
                            </div>
                        </SectionCard>

                        {/* Image Upload */}
                        <SectionCard title="Product Image">
                            <ImageUploader
                                label="Main Product Hero Image"
                                value={form.imageUrl}
                                onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                            />
                        </SectionCard>

                        {/* Save Button (sticky-like at bottom of sidebar) */}
                        <button
                            onClick={handleSave}
                            disabled={saving || !isValid}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-secondary to-green-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
                        >
                            {saving
                                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : <Save size={18} />}
                            {isEditing ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminProductFormPage;
