import React, { useState } from 'react';
import {
    Building2, Briefcase, MapPin, Globe,
    Link as LinkIcon, FileText, Send, X,
    PlusCircle, CheckCircle2
} from 'lucide-react';

const NewApplication = ({ onClose }) => {
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        jobLocation: '',
        jobType: 'Full-time', 
        status: 'Applied',
        source: '',
        applicationLink: '',
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    //job types list
    const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Remote"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/applications/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    , 'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                if (onClose) onClose();
            }
        } catch (error) {
            console.error('Error adding application:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase flex items-center gap-2">
                        <PlusCircle className="text-indigo-400" /> Add Application
                    </h2>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Building2 size={12} /> Company Name
                        </label>
                        <input
                            required
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. Google"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Briefcase size={12} /> Position
                        </label>
                        <input
                            required
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <MapPin size={12} /> Location
                        </label>
                        <input
                            name="jobLocation"
                            value={formData.jobLocation}
                            onChange={handleChange}
                            placeholder="e.g. Bangalore"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileText size={12} /> Job Type
                        </label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900 appearance-none cursor-pointer"
                        >
                            {jobTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 size={12} /> Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900 appearance-none cursor-pointer"
                        >
                            {["Saved", "Applied", "Interviewing", "Offer", "Rejected", "Ghosted"].map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Globe size={12} /> Application Source
                        </label>
                        <input
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            placeholder="e.g. LinkedIn"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <LinkIcon size={12} /> URL
                    </label>
                    <input
                        name="applicationLink"
                        value={formData.applicationLink}
                        onChange={handleChange}
                        type="url"
                        placeholder="Link to job post..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FileText size={12} /> Notes
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Add any specific details here..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-medium text-slate-900 resize-none"
                    />
                </div>

                <div className="pt-4 flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : <><Send size={18} /> Add to Board</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewApplication;