import React, { useState } from 'react';
import {
    Building2, Briefcase, MapPin, Globe,
    Link as LinkIcon, FileText, Send, 
    PlusCircle, CheckCircle2, Upload, ChevronLeft,
    Clock, Info
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

    const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Remote"];

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
            }
        } catch (error) {
            console.error('Error adding application:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* 1. Integrated Header with Back Button */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-600"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                                <Link to="/applications" className="hover:text-indigo-600 transition">Applications</Link>
                                <span>/</span>
                                <span className="text-slate-900">New Entry</span>
                            </nav>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create <span className="text-indigo-600">Application</span></h1>
                        </div>
                    </div>
                </div>

                {/* 2. Main Form Layout (Non-Floating) */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Essential Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Info size={18} />
                                </div>
                                <h3 className="font-bold text-slate-800">Position Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput 
                                    label="Company Name" 
                                    icon={<Building2 size={14}/>}
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. Google"
                                    required
                                />
                                <FormInput 
                                    label="Role / Position" 
                                    icon={<Briefcase size={14}/>}
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    placeholder="e.g. Frontend Developer"
                                    required
                                />
                                <FormInput 
                                    label="Job Location" 
                                    icon={<MapPin size={14}/>}
                                    name="jobLocation"
                                    value={formData.jobLocation}
                                    onChange={handleChange}
                                    placeholder="e.g. Remote / London"
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={12} /> Job Type
                                    </label>
                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900 appearance-none cursor-pointer"
                                    >
                                        {jobTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                    <FileText size={18} />
                                </div>
                                <h3 className="font-bold text-slate-800">Additional Information</h3>
                            </div>
                            <div className="space-y-6">
                                <FormInput 
                                    label="Application Link" 
                                    icon={<LinkIcon size={14}/>}
                                    name="applicationLink"
                                    value={formData.applicationLink}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    type="url"
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <FileText size={12} /> Notes
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Add key highlights or requirements..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Status & Upload */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg shadow-slate-200">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-slate-400">Tracking Status</h3>
                            <div className="space-y-4">
                                {["Applied", "Interviewing", "Offer", "Rejected", "Ghosted"].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setFormData(prev => ({...prev, status: s}))}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                            formData.status === s 
                                            ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-900/50' 
                                            : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'
                                        }`}
                                    >
                                        <span className="text-sm font-bold">{s}</span>
                                        {formData.status === s && <CheckCircle2 size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-slate-400">File Assets</h3>
                            <label className="group flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer">
                                <div className="p-3 bg-slate-50 group-hover:bg-white rounded-xl mb-3 transition-colors">
                                    <Upload size={20} className="text-slate-400 group-hover:text-indigo-600" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 text-center">
                                    {resume ? resume.name : "Upload Resume (PDF)"}
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setResume(e.target.files[0])}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Syncing...' : <><Send size={16} /> Save Application</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Helper component for cleaner code
const FormInput = ({ label, icon, ...props }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            {icon} {label}
        </label>
        <input
            {...props}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900"
        />
    </div>
);

export default NewApplication;