import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Check, UploadCloud, FolderOpen, Save, Globe
} from 'lucide-react';
import {
    collection, addDoc, updateDoc, doc,
    serverTimestamp, getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { categories as staticCategories } from '../data/products';

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
                    <div className="relative h-56 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group/prev">
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
    imageUrl: '',
    color: '#16a34a',
    isFeatured: true,
    order: 0
};

const AdminCategoryFormPage = () => {
    const navigate = useNavigate();
    const { docId } = useParams();
    const isEditing = !!docId;

    // ─── Security Check ───
    useEffect(() => {
        const isAuth = sessionStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin');
        }
    }, [navigate]);

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [loadingData, setLoadingData] = useState(isEditing);

    useEffect(() => {
        if (!isEditing) return;
        const loadCategory = async () => {
            try {
                setLoadingData(true);
                // First try Firestore by Doc ID
                const docRef = doc(db, 'categories', docId);
                const snap = await getDoc(docRef);
                
                let data = null;

                if (snap.exists()) {
                    data = snap.data();
                } else {
                    // Try looking in static data (where docId might be the slug)
                    const staticCat = staticCategories.find(c => c.slug === docId || c.id === docId);
                    if (staticCat) {
                        data = staticCat;
                    }
                }

                if (data) {
                    setForm({
                        title: data.title || '',
                        description: data.description || '',
                        imageUrl: data.imageUrl || data.image || '',
                        color: data.color || '#16a34a',
                        isFeatured: data.isFeatured !== false,
                        order: typeof data.order === 'number' ? data.order : 0
                    });
                }
            } catch (err) {
                console.error("Error loading category:", err);
            } finally {
                setLoadingData(false);
            }
        };
        loadCategory();
    }, [docId, isEditing]);

    const handleSave = async () => {
        if (!form.title) return;
        setSaving(true);
        const safeOrder = Number(form.order);
        const payload = {
            title: form.title,
            slug: slugify(form.title),
            description: form.description || '',
            imageUrl: form.imageUrl || '',
            color: form.color || '#16a34a',
            isFeatured: !!form.isFeatured,
            order: isNaN(safeOrder) ? 0 : safeOrder,
            updatedAt: serverTimestamp()
        };
        try {
            if (isEditing) {
                await updateDoc(doc(db, 'categories', docId), payload);
            } else {
                await addDoc(collection(db, 'categories'), { ...payload, createdAt: serverTimestamp() });
            }
            navigate('/admin', { state: { tab: 'categories' } });
        } catch (e) {
            console.error(e);
            alert("Error saving category: " + e.message);
        }
        setSaving(false);
    };

    const isValid = !!form.title;

    if (loadingData) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
            <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-20 font-inter">
            {/* Sticky Header */}
            <div className="bg-white border-b border-slate-100 sticky top-[72px] z-30 shadow-sm">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin', { state: { tab: 'categories' } })}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary transition-all"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Admin → Categories
                            </p>
                            <h1 className="text-lg font-black text-slate-900 tracking-tight">
                                {isEditing ? 'Edit Category' : 'New Category'}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin', { state: { tab: 'categories' } })}
                            className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-black text-slate-500 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || !isValid}
                            className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-white rounded-xl text-sm font-black hover:bg-secondary/90 transition-all disabled:opacity-50 shadow-lg shadow-secondary/20"
                        >
                            {saving
                                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : <Save size={16} />}
                            {isEditing ? 'Update Category' : 'Save Category'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Left — main fields */}
                    <div className="lg:col-span-2 space-y-6">
                        <SectionCard title="Category Info" icon={FolderOpen}>
                            <Field label="Category Name *">
                                <TextInput
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="e.g. Sparklers, Sky Shots, Flower Pots"
                                />
                                {form.title && (
                                    <p className="text-[10px] text-slate-400 mt-1 font-mono">slug: /{slugify(form.title)}</p>
                                )}
                            </Field>

                            <Field label="Description">
                                <TextArea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Brief description of this category..."
                                />
                            </Field>
                        </SectionCard>

                        {/* Image */}
                        <SectionCard title="Category Banner Image" icon={Globe}>
                            <ImageUploader
                                label="Banner Image"
                                value={form.imageUrl}
                                onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                            />
                        </SectionCard>
                    </div>

                    {/* Right — sidebar */}
                    <div className="space-y-6">
                        <SectionCard title="Display Settings">
                            {/* Display Order */}
                            <Field label="Display Order" hint="Lower numbers appear first in Navbar and Products Grid">
                                <TextInput
                                    type="number"
                                    value={form.order}
                                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                                    placeholder="e.g. 1, 2, 10"
                                />
                            </Field>

                            {/* Featured Toggle */}
                            <div className="flex items-center gap-3 py-1">
                                <button
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, isFeatured: !f.isFeatured }))}
                                    className={`w-11 h-6 rounded-full transition-all flex-shrink-0 ${form.isFeatured ? 'bg-secondary' : 'bg-slate-200'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm mx-0.5 transform transition-transform ${form.isFeatured ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                                <label className="text-sm font-black text-slate-600">Feature in Navbar &amp; Footer</label>
                            </div>
                        </SectionCard>

                        {/* Preview card */}
                        {form.title && (
                            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Preview</p>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-black bg-secondary shadow-md shadow-secondary/20"
                                    >
                                        {form.title.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900">{form.title}</p>
                                        <p className="text-[10px] font-mono text-slate-400">/{slugify(form.title)}</p>
                                        {form.isFeatured && (
                                            <span className="text-[8px] font-black bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-amber-200 mt-1 inline-block">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save button */}
                        <button
                            onClick={handleSave}
                            disabled={saving || !isValid}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-secondary to-green-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
                        >
                            {saving
                                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : <Save size={18} />}
                            {isEditing ? 'Update Category' : 'Save Category'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminCategoryFormPage;
