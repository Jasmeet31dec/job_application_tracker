import React, { useState, useEffect } from 'react';
import {
    Building2, MapPin, Briefcase, ExternalLink,
    Plus, Loader2, ClipboardList, Ghost, CheckCircle2, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyApplications = () => {
    const token = localStorage.getItem("token");
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // statuses 
    const columns = [
        { id: 'Saved', title: 'Saved', color: 'bg-indigo-400' },
        { id: 'Applied', title: 'Applied', color: 'bg-blue-500' },
        { id: 'Interviewing', title: 'Interviewing', color: 'bg-amber-500' },
        { id: 'Offer', title: 'Offer', color: 'bg-emerald-500' },
        { id: 'Rejected', title: 'Rejected', color: 'bg-rose-500' },
        { id: 'Ghosted', title: 'Ghosted', color: 'bg-slate-400' },
    ];
    console.log(applications);
    useEffect(() => {
        const fetchApps = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/api/applications/my-applications", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch applications');
                const result = await response.json();
                setApplications(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
        
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                <p className="text-slate-500 font-medium">Loading your career board...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Trackly <span className="text-indigo-600">Board</span></h1>
                    <p className="text-slate-500 font-medium">Currently tracking {applications.length} opportunities</p>
                </div>
                <Link to='/applications/create' className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-xl active:scale-95">
                    <Plus size={20} /> Add New Job
                </Link>
            </div>

            {/* Kanban Board - Added overflow-x-auto for 6 columns */}
            <div className="max-w-[1600px] mx-auto overflow-x-auto pb-8">
                <div className="flex gap-6 min-w-[1400px]">
                    {columns.map((col) => (
                        <div key={col.id} className="flex-1 min-w-[280px] flex flex-col gap-4">
                            {/* Column Title */}
                            <div className="flex items-center justify-between px-3 py-1">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                                    <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">{col.title}</h2>
                                </div>
                                <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                                    {applications.filter(a => a.status === col.id).length}
                                </span>
                            </div>

                            {/* Card Container */}
                            <div className="bg-slate-200/50 p-2.5 rounded-2xl min-h-[600px] space-y-4 border-2 border-dashed border-slate-200/60">
                                {applications.filter(app => app.status === col.id).map((app) => (
                                    <div
                                        key={app._id}
                                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                                    >
                                        {/* Position & Action */}
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                                {app.position}
                                            </h3>
                                            {app.applicationLink && (
                                                <a href={app.applicationLink} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-indigo-600 transition">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>

                                        {/* Company Name */}
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                                            <Building2 size={12} />
                                            {app.company}
                                        </div>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <div className="flex items-center gap-1 bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                                <MapPin size={10} /> {app.jobLocation}
                                            </div>
                                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${app.jobType === 'Full-time' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                <Briefcase size={10} /> {app.jobType}
                                            </div>
                                        </div>

                                        {/* Conditional Status Icons inside card */}
                                        {app.status === 'Ghosted' && (
                                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold mb-3 italic">
                                                <Ghost size={12} /> No response received
                                            </div>
                                        )}

                                        {/* Notes Section */}
                                        {app.notes && (
                                            <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 mt-2">
                                                <p className="text-[11px] text-slate-500 leading-relaxed italic line-clamp-2">
                                                    <ClipboardList size={10} className="inline mr-1 opacity-70" />
                                                    {app.notes}
                                                </p>
                                            </div>
                                        )}

                                        {/* Source Footer */}
                                        <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                Source: {app.source || 'Direct'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;