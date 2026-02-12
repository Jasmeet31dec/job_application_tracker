import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, MapPin, Briefcase, Clock, 
    DollarSign, ExternalLink, Bookmark, Building2,
    CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchJobDetails, trackApplication } = useApp();
    
    const [job, setJob] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    // FIXED: Now fetchJobDetails is a stable reference from Context
    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setLocalLoading(true);
            const data = await fetchJobDetails(id);
            if (isMounted && data) {
                setJob(data);
                setLocalLoading(false);
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, [id, fetchJobDetails]); 

    const handleSaveJob = async () => {
        if (isSaved) return;
        const success = await trackApplication(job, 'Saved');
        if (success) {
            setIsSaved(true);
            alert("Job Saved Successfullly!");
        }
    };

    const handleApplyNow = async () => {
        const success = await trackApplication(job, 'Applied');
        if (success) {
            window.open(job.applyLink, '_blank');
        }
    };

    if (localLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!job) return <div className="p-20 text-center font-black text-slate-400 uppercase tracking-widest">Job Not Found</div>;

    return (
        <div className="bg-[#fbfcff] min-h-screen pb-20">
            {/* Nav Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                        <ChevronLeft size={16} /> Back
                    </button>
                    <div className="flex items-center gap-4">
                        <button onClick={handleSaveJob} disabled={isSaved} className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isSaved ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "border-slate-200 text-slate-900 hover:bg-slate-50"}`}>
                            {isSaved ? <CheckCircle2 size={16} /> : <Bookmark size={16} />} {isSaved ? "Saved" : "Save Job"}
                        </button>
                        <button onClick={handleApplyNow} className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                            Apply Now <ExternalLink size={16} className="inline ml-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Implementation */}
            <div className="max-w-5xl mx-auto px-6 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl uppercase">
                                {job.company.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 mb-1">{job.title}</h1>
                                <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                    <Building2 size={14}/> {job.company} • <MapPin size={14}/> {job.location}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-6 border-b pb-4">Job Description</h3>
                            <div className="text-slate-600 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: job.fullDescription }} />
                        </div>
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-32">
                            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6">Quick Facts</h4>
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={16}/></div>
                                    <div><p className="text-[10px] uppercase font-bold opacity-40">Salary</p><p className="font-bold">{job.salary || "Competitive"}</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg"><Briefcase size={16}/></div>
                                    <div><p className="text-[10px] uppercase font-bold opacity-40">Type</p><p className="font-bold text-indigo-400 uppercase">{job.type}</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg"><Clock size={16}/></div>
                                    <div><p className="text-[10px] uppercase font-bold opacity-40">Posted</p><p className="font-bold">{job.postedAt || "Recently"}</p></div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;