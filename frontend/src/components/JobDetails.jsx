import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, MapPin, Briefcase, Clock, 
    DollarSign, ExternalLink, Bookmark, Building2,
    Globe, Users, CheckCircle2 // Added CheckCircle for feedback
} from 'lucide-react';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // Tracking if saved in current session

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/jobs/external/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            setJob(result.data);
        } catch (err) {
            console.error("Error fetching job details:", err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logic to create a new application entry in your DB
     */
    const trackJobSelection = async (status, notePrefix) => {
        try {
            setActionLoading(true);
            const today = new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const response = await fetch("http://localhost:5000/api/applications/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    position: job.title,
                    company: job.company,
                    jobLocation: job.location,
                    jobType: job.type,
                    status: status, 
                    jobId:id,
                    applicationLink: job.applyLink,
                    notes: `${notePrefix} from Trackly Board on ${today}`
                })
            });

            if (!response.ok) throw new Error("Failed to update board");
            return true;
        } catch (err) {
            console.error("Tracking error:", err);
            alert("Error: Could not update your job board.");
            return false;
        } finally {
            setActionLoading(false);
        }
    };

    const handleApplyNow = async () => {
        const success = await trackJobSelection('Applied', 'Applied directly');
        if (success) {
            window.open(job.applyLink, '_blank', 'noopener,noreferrer');
        }
    };

    // Updated handleSaveJob Logic
    const handleSaveJob = async () => {
        if (isSaved) return; // Prevent double saving
        
        const success = await trackJobSelection('Saved', 'Saved for later');
        if (success) {
            setIsSaved(true);
            alert("Success! This job has been added to your Saved column.");
            
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!job) return <div className="p-20 text-center font-bold font-mono">JOB_NOT_FOUND</div>;

    return (
        <div className="bg-[#fbfcff] min-h-screen pb-20">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        <ChevronLeft size={16} /> Back to Board
                    </button>
                    
                    <div className="flex items-center gap-4">
                        {/* ENHANCED SAVE BUTTON */}
                        <button 
                            onClick={handleSaveJob}
                            disabled={actionLoading || isSaved}
                            className={`flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-70 ${
                                isSaved 
                                ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                                : "hover:bg-slate-50 border-slate-200 text-slate-900"
                            }`}
                        >
                            {isSaved ? <CheckCircle2 size={16} /> : <Bookmark size={16} />}
                            {actionLoading ? "Saving..." : isSaved ? "Saved" : "Save Job"}
                        </button>
                        
                        <button 
                            onClick={handleApplyNow}
                            disabled={actionLoading}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {actionLoading ? "Processing..." : "Apply Now"} <ExternalLink size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl uppercase">
                                    {job.company.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">{job.title}</h1>
                                    <div className="flex items-center gap-4 text-sm font-bold text-indigo-600 uppercase tracking-wider">
                                        <span className="flex items-center gap-1.5"><Building2 size={16}/> {job.company}</span>
                                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"/>
                                        <span className="text-slate-400 flex items-center gap-1.5"><MapPin size={16}/> {job.location}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-100 pb-4">
                                Role Description
                            </h3>
                            <div className="prose prose-slate max-w-none">
                                <div 
                                    className="text-slate-600 leading-relaxed space-y-4"
                                    dangerouslySetInnerHTML={{ __html: job.fullDescription }} 
                                />
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-6 font-mono">Job Meta</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-white/10 rounded-lg"><DollarSign size={18}/></div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold opacity-50">Salary</p>
                                        <p className="text-sm font-black tracking-wide font-mono">{job.salary || "Competitive"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-white/10 rounded-lg"><Briefcase size={18}/></div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold opacity-50">Contract</p>
                                        <p className="text-sm font-black tracking-wide text-indigo-400 uppercase">{job.type}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;