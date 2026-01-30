import React from 'react';
import { MoreVertical, Calendar, Building2, MapPin, Plus } from 'lucide-react';

const KanbanBoard = () => {
    // Sample Data - In a real app, this would come from your state/API
    const columns = [
        { title: 'Applied', color: 'bg-blue-500', count: 3 },
        { title: 'Interviewing', color: 'bg-amber-500', count: 2 },
        { title: 'Offer', color: 'bg-emerald-500', count: 1 },
        { title: 'Rejected', color: 'bg-slate-400', count: 5 },
    ];

    const applications = [
        { id: 1, company: 'Google', role: 'Frontend Engineer', location: 'Remote', date: '2 days ago', status: 'Applied' },
        { id: 2, company: 'Stripe', role: 'Full Stack Dev', location: 'New York', date: '5 days ago', status: 'Interviewing' },
        { id: 3, company: 'Airbnb', role: 'Product Designer', location: 'San Francisco', date: '1 week ago', status: 'Offer' },
    ];

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Application Pipeline</h1>
                    <p className="text-slate-500 text-sm">Visualize your progress across {applications.length} active jobs.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                    <Plus size={18} /> New Application
                </button>
            </div>

            {/* Board Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map((column) => (
                    <div key={column.title} className="flex flex-col h-full">
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-4 px-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
                                <h3 className="font-bold text-slate-700">{column.title}</h3>
                                <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                                    {applications.filter(app => app.status === column.title).length}
                                </span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        {/* Column Body / Cards */}
                        <div className="bg-slate-100/50 p-3 rounded-2xl border-2 border-dashed border-slate-200 flex-1 min-h-[500px]">
                            {applications
                                .filter((app) => app.status === column.title)
                                .map((app) => (
                                    <div
                                        key={app.id}
                                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-3 hover:shadow-md hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing group"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                                                    <Building2 className="text-slate-400" size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-xs tracking-wider">
                                                        {app.company}
                                                    </h4>
                                                    <p className="text-sm font-medium text-slate-600 leading-none mt-1">{app.role}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <MapPin size={14} />
                                                <span>{app.location}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <Calendar size={12} />
                                                    {app.date}
                                                </div>
                                                <div className="flex -space-x-2">
                                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-100 text-indigo-600 text-[10px] flex items-center justify-center font-bold">
                                                        JD
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;