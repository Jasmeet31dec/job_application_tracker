import React, { useEffect } from 'react';
import {
    Building2, MapPin, Briefcase, ExternalLink,
    Plus, Loader2, ClipboardList, Ghost, Trash2,
    Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // Import your hook

const MyApplications = () => {
    // Pull global state and actions from Context
    const { 
        applications, 
        loading, 
        fetchMyApplications, 
        updateApplicationStatus, 
        deleteApplication 
    } = useApp();

    const columns = [
        { id: 'Applied', title: 'Applied', color: 'bg-blue-500' },
        { id: 'Interviewing', title: 'Interviewing', color: 'bg-amber-500' },
        { id: 'Offer', title: 'Offer', color: 'bg-emerald-500' },
        { id: 'Rejected', title: 'Rejected', color: 'bg-rose-500' },
        { id: 'Ghosted', title: 'Ghosted', color: 'bg-slate-400' },
    ];

    useEffect(() => {
        fetchMyApplications();
    }, [fetchMyApplications]);

    // --- Drag and Drop Logic ---
    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("applicationId", id);
    };

    const onDragOver = (e) => {
        e.preventDefault(); 
    };

    const handleDrop = async (e, newStatus) => {
        const id = e.dataTransfer.getData("applicationId");
        await updateApplicationStatus(id, newStatus);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        await deleteApplication(id);
    };

    if (loading && applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                <p className="text-slate-500 font-medium">Loading your career board...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Trackly <span className="text-indigo-600">Board</span></h1>
                    <p className="text-slate-500 font-medium">Currently tracking {applications.length} opportunities</p>
                </div>
                <Link to='/applications/create' className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-xl active:scale-95">
                    <Plus size={20} /> Add New Job
                </Link>
            </div>

            <div className="max-w-[1600px] mx-auto overflow-x-auto pb-8">
                <div className="flex gap-6 min-w-[1400px]">
                    {columns.map((col) => (
                        <div 
                            key={col.id} 
                            className="flex-1 min-w-[280px] flex flex-col gap-4"
                            onDragOver={onDragOver}
                            onDrop={(e) => handleDrop(e, col.id)}
                        >
                            <div className="flex items-center justify-between px-3 py-1">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                                    <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">{col.title}</h2>
                                </div>
                                <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                                    {applications.filter(a => a.status === col.id).length}
                                </span>
                            </div>

                            <div className="bg-slate-200/50 p-2.5 rounded-2xl min-h-[600px] space-y-4 border-2 border-dashed border-slate-200/60 transition-colors hover:bg-slate-200/80">
                                {applications.filter(app => app.status === col.id).map((app) => (
                                    <div
                                        key={app._id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, app._id)}
                                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 group cursor-grab active:cursor-grabbing"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                                {app.position}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                {app.applicationLink && (
                                                    <a href={app.applicationLink} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-indigo-600 transition">
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(app._id)}
                                                    className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                <Building2 size={12} />
                                                {app.company}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                <Calendar size={11} className="text-slate-300"/>
                                                {new Date(app.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <div className="flex items-center gap-1 bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                                <MapPin size={10} /> {app.jobLocation}
                                            </div>
                                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${app.jobType === 'Full-time' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                <Briefcase size={10} /> {app.jobType}
                                            </div>
                                        </div>

                                        {app.status === 'Ghosted' && (
                                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold mb-3 italic">
                                                <Ghost size={12} /> No response received
                                            </div>
                                        )}

                                        {app.notes && (
                                            <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 mt-2">
                                                <p className="text-[11px] text-slate-500 leading-relaxed italic line-clamp-2">
                                                    <ClipboardList size={10} className="inline mr-1 opacity-70" />
                                                    {app.notes}
                                                </p>
                                            </div>
                                        )}
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