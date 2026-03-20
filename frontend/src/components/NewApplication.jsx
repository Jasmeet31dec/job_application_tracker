import React, { useState } from 'react';
import {
    Building2, Briefcase, MapPin, Search,
    Link as LinkIcon, FileText, Send, 
    CheckCircle2, Upload, ChevronLeft,
    Clock, Info, FileCheck, Globe
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const NewApplication = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: '',
        position: '',
        jobLocation: '',
        jobType: 'Full-time',
        status: 'Applied',
        source: '', 
        applicationLink: '',
        notes: '',
    });

    const [resume, setResume] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            submissionData.append(key, value);
        });

        if (resume) {
            submissionData.append('resume', resume);
        }

        try {
            const response = await fetch('http://localhost:5000/api/applications/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: submissionData,
            });

            if (response.ok) {
                navigate("/applications");
            } else {
                const err = await response.json();
                alert(err.message || "Failed to save application");
            }
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* 1. Header & Back Navigation */}
                <div className="flex items-center gap-5 mb-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-3.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-500 hover:text-indigo-600 shadow-sm"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                            <Link to="/applications" className="hover:text-indigo-600">Trackers</Link>
                            <span className="opacity-30">/</span>
                            <span className="text-indigo-600 font-bold">New Entry</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create <span className="text-indigo-600">Application</span></h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Side: Detail Forms (8 Columns) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 md:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl"><Info size={18} /></div>
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Job Information</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <FormInput label="Company Name" name="company" icon={<Building2 size={12}/>} value={formData.company} onChange={handleChange} placeholder="e.g. Amazon" required />
                                <FormInput label="Role / Position" name="position" icon={<Briefcase size={12}/>} value={formData.position} onChange={handleChange} placeholder="e.g. Backend Dev" required />
                                <FormInput label="Job Location" name="jobLocation" icon={<MapPin size={12}/>} value={formData.jobLocation} onChange={handleChange} placeholder="e.g. Remote" />
                                
                                {/* ✅ APPLICATION SOURCE IS A TEXT INPUT */}
                                <FormInput 
                                    label="Application Source" 
                                    name="source" 
                                    icon={<Globe size={12}/>} 
                                    value={formData.source} 
                                    onChange={handleChange} 
                                    placeholder="e.g. LinkedIn" 
                                    required 
                                />

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                                        <Clock size={12} /> Employment Type
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Full-time", "Part-time", "Internship", "Contract"].map(type => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData(prev => ({...prev, jobType: type}))}
                                                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all border ${
                                                    formData.jobType === type 
                                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                                                    : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-200'
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 md:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl"><LinkIcon size={18} /></div>
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Links & Notes</h3>
                            </div>
                            <div className="space-y-6">
                                <FormInput label="Job Post URL" name="applicationLink" icon={<Search size={12}/>} value={formData.applicationLink} onChange={handleChange} placeholder="https://..." />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Personal Notes</label>
                                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" className="w-full px-6 py-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/30 outline-none focus:ring-4 focus:ring-indigo-500/5 transition resize-none placeholder:text-slate-300" placeholder="Specific requirements or referral details..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Status & Resume Upload (4 Columns) */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Status Pickers */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-slate-500 text-center">Current Phase</h3>
                            <div className="space-y-3">
                                {["Applied", "Interviewing", "Offer", "Rejected", "Ghosted"].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setFormData(prev => ({...prev, status: s}))}
                                        className={`w-full flex items-center justify-between p-4 px-6 rounded-2xl border transition-all ${
                                            formData.status === s 
                                            ? 'bg-indigo-600 border-indigo-400 shadow-lg' 
                                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="text-sm font-bold">{s}</span>
                                        {formData.status === s && <CheckCircle2 size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ✅ RESUME UPLOAD NOW LOCATED ON THE RIGHT BELOW STATUS */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 text-center px-1">Attachments</h3>
                            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-[2rem] hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group text-center">
                                <div className="p-4 bg-slate-50 group-hover:bg-white rounded-[1.25rem] mb-4 transition-all">
                                    {resume ? <FileCheck className="text-green-600" size={24} /> : <Upload className="text-slate-300 group-hover:text-indigo-500" size={24} />}
                                </div>
                                <span className="text-xs font-bold text-slate-600 max-w-[120px] truncate">
                                    {resume ? resume.name : "Upload Resume (PDF)"}
                                </span>
                                <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} className="hidden" />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Syncing...' : <><Send size={18} /> Save Tracker</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Helper Input Component
const FormInput = ({ label, icon, ...props }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
            {icon} {label}
        </label>
        <input {...props} className="w-full px-6 py-4 rounded-[1.25rem] border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition font-medium text-slate-700 bg-white placeholder:text-slate-300" />
    </div>
);

export default NewApplication;