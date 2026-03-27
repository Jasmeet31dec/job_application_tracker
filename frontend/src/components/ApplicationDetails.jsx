import { API_BASE_URL } from '../config.js';
import {
    Building2, Briefcase, MapPin, Globe,
    Link as LinkIcon, FileText, X,
    CheckCircle2, ExternalLink, FileDown, Eye
} from 'lucide-react';

const ApplicationDetails = ({ application, onClose }) => {
    if (!application) return null;

    // Helper to format the status colors
    const getStatusStyle = (status) => {
        const styles = {
            'Applied': 'bg-blue-50 text-blue-700 border-blue-100',
            'Interviewing': 'bg-amber-50 text-amber-700 border-amber-100',
            'Offer': 'bg-emerald-50 text-emerald-700 border-emerald-100',
            'Rejected': 'bg-rose-50 text-rose-700 border-rose-100',
            'Saved': 'bg-slate-50 text-slate-700 border-slate-100'
        };
        return styles[status] || 'bg-slate-50 text-slate-700 border-slate-100';
    };

    const handleViewResume = () => {
        // Construct full URL (Change localhost:5000 to your production URL if needed)
        const fullUrl = `${API_BASE_URL}${application.resumeUrl}`;
        window.open(fullUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center font-black text-xl">
                            {application.company.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight uppercase leading-none">
                                {application.company}
                            </h2>
                            <p className="text-indigo-400 text-xs font-bold mt-1 tracking-widest uppercase">
                                {application.position}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="bg-slate-800 p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                    
                    {/* Primary Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <InfoBlock icon={MapPin} label="Location" value={application.jobLocation || 'Not Specified'} />
                        <InfoBlock icon={Briefcase} label="Job Type" value={application.jobType} />
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 size={12} /> Status
                            </label>
                            <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(application.status)}`}>
                                {application.status}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                        <InfoBlock icon={Globe} label="Source" value={application.source || 'Direct'} />
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <LinkIcon size={12} /> Job Link
                            </label>
                            {application.applicationLink ? (
                                <a 
                                    href={application.applicationLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline decoration-2"
                                >
                                    View Posting <ExternalLink size={14} />
                                </a>
                            ) : <p className="text-sm font-medium text-slate-400">No link provided</p>}
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className="space-y-3 pt-6 border-t border-slate-50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileText size={12} /> Attached Resume
                        </label>
                        {application.resumeUrl ? (
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <FileText className="text-indigo-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">resume.pdf</p>
                                        <p className="text-[10px] text-slate-400 font-medium tracking-tight">PDF Document</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={handleViewResume}
                                        className="p-2 bg-white hover:bg-slate-900 hover:text-white rounded-xl shadow-sm border border-slate-100 transition-all flex items-center gap-2 text-xs font-bold"
                                    >
                                        <Eye size={14} /> View
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm font-medium text-slate-400 italic">No resume uploaded for this application</p>
                        )}
                    </div>

                    {/* Notes Section */}
                    {application.notes && (
                        <div className="space-y-3 pt-6 border-t border-slate-50">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <FileText size={12} /> Notes
                            </label>
                            <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                                "{application.notes}"
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Reusable Atomic Component for Info Labels
const InfoBlock = ({ icon: Icon, label, value }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Icon size={12} /> {label}
        </label>
        <p className="font-bold text-slate-700 text-sm">{value}</p>
    </div>
);

export default ApplicationDetails;