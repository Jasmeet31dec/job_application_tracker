import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Briefcase, Clock,
  Bookmark, ArrowRight, Filter, Building2,
  Calendar, RotateCcw
} from 'lucide-react';

const JobBoard = () => {
  const token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    jobType: "All",
    postedWithin: "All",
    location: "All"
  });

  useEffect(() => {
    fetchJobs();
  }, [filters, searchTerm]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        search: searchTerm,
        type: filters.jobType,
        posted: filters.postedWithin,
        location: filters.location
      });

      // UPDATED ROUTE: Changed to /external
      const response = await fetch(`http://localhost:5000/api/jobs/external?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      setJobs(result.data || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({ jobType: "All", postedWithin: "All", location: "All" });
    setSearchTerm("");
  };

  return (
    <div className="bg-[#fbfcff] min-h-screen text-slate-800 antialiased font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-r border-slate-200 pr-6">Trackly <span className="text-indigo-600">Jobs</span></h2>
          </div>
          <div className="relative group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 w-80 transition-all"
            />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <Filter size={14} /> Filters
              </h3>
              <button onClick={resetFilters} className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1">
                <RotateCcw size={10} /> Reset
              </button>
            </div>

            <div className="mb-8">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Employment Type</label>
              <div className="space-y-3">
                {['All', 'Full-time', 'Contract', 'Remote'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="jobType"
                      checked={filters.jobType === type}
                      onChange={() => setFilters({ ...filters, jobType: type })}
                      className="w-4 h-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={`text-xs font-bold ${filters.jobType === type ? 'text-slate-900' : 'text-slate-500'}`}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Date Posted</label>
              <div className="space-y-3">
                {[
                  { label: 'Anytime', value: 'All' },
                  { label: 'Past 24 Hours', value: '24h' },
                  { label: 'Past 7 Days', value: '7d' }
                ].map((time) => (
                  <label key={time.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="postedWithin"
                      checked={filters.postedWithin === time.value}
                      onChange={() => setFilters({ ...filters, postedWithin: time.value })}
                      className="w-4 h-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={`text-xs font-bold ${filters.postedWithin === time.value ? 'text-slate-900' : 'text-slate-500'}`}>{time.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Job List */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">
              Live Opportunities // {jobs.length} Results
            </h3>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Crunching new roles...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:shadow-indigo-900/[0.03] hover:border-indigo-200 transition-all duration-300 group">
                  <div className="flex flex-col lg:flex-row gap-6 lg:items-center">

                    <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-xl shrink-0 group-hover:bg-indigo-600 transition-colors">
                      {job.company.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                        <h2 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {job.title}
                        </h2>
                        <p className="text-sm font-black text-slate-900 tabular-nums">{job.salary || "Competitive"}</p>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                        <span className="text-slate-900">{job.company}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-indigo-600">{job.type}</span>
                      </div>

                      <div className="bg-slate-50/50 border-l-2 border-indigo-600 px-4 py-2.5 mb-2">
                        <p className="text-[13px] font-medium text-slate-600 truncate leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center lg:flex-col justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 lg:pl-6 border-slate-100 gap-4">
                      {/* FIXED: Added text label next to clock */}
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase font-mono whitespace-nowrap">
                        <Clock size={12} /> {job.postedAt || 'Recently'}
                      </div>
                      <button className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-2">
                        Apply <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobBoard;