import React, { useState, useEffect, useMemo } from 'react';
import { 
  Briefcase, MapPin, Calendar, Trash2, 
  ChevronLeft, Search 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // Import your custom hook

const SavedJobs = () => {
  const navigate = useNavigate();
  
  // Use global state and actions from AppContext
  const { applications, loading, fetchMyApplications, deleteApplication } = useApp();
  
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all applications via context on mount
  useEffect(() => {
    fetchMyApplications();
  }, [fetchMyApplications]);

  /**
   * Logic: Filter the global 'applications' list for only those with 'Saved' status,
   * then apply your search term filtering.
   */
  const filteredJobs = useMemo(() => {
    return applications
      .filter(job => job.status?.toLowerCase() === 'saved')
      .filter(job => 
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [applications, searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this job from your board?")) return;
    await deleteApplication(id); // Using the centralized delete logic
  };

  const handleJobDetails = (id) => {
    navigate(`/jobs/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'saved': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'interview': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-[#fbfcff] min-h-screen pb-20 font-sans text-slate-800">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/jobs')}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 pr-6 border-r border-slate-200">
              Your <span className="text-indigo-600">Board</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search your jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64 transition-all"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tracked Opportunities</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Currently Managing {filteredJobs.length} Positions
            </p>
          </div>
        </div>

        {loading && applications.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gathering your data...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-32 bg-white border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="text-slate-300" size={32} />
            </div>
            <h3 className="text-lg font-black text-slate-900">Your board is empty</h3>
            <p className="text-sm font-medium text-slate-400 mb-6">Start exploring jobs to save them here.</p>
            <button 
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
            >
              Explore Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-900/[0.03] hover:border-indigo-200 transition-all group relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-[10px] font-black uppercase tracking-widest border-l border-b ${getStatusColor(job.status)}`}>
                  {job.status}
                </div>

                <div className="flex items-start gap-4 mb-6 pt-2">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-600 text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {job.company.charAt(0)}
                  </div>
                  <div className="pr-12">
                    <h3 className="font-black text-slate-900 text-base leading-tight group-hover:text-indigo-600 transition-colors truncate">
                      {job.position}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{job.company}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <MapPin size={14} className="text-slate-300" /> {job.jobLocation}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                    <Calendar size={14} className="text-slate-300" /> Saved on: {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {job.notes && (
                  <div className="bg-slate-50 rounded-xl p-3 mb-6 border border-slate-100">
                    <p className="text-[11px] font-medium text-slate-600 line-clamp-2 italic">
                      "{job.notes}"
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => handleDelete(job._id)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Remove Application"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
                        onClick={() => handleJobDetails(job.jobId)}
                        title='View job details'
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;