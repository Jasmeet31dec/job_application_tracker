import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Briefcase, 
  Clock, Bookmark, ArrowRight,
  Filter, Building2
} from 'lucide-react';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = [
      { 
        id: 1, 
        title: "Lead Software Architect", 
        company: "Prisma", 
        location: "Remote", 
        salary: "$160k - $190k", 
        type: "Full-time", 
        posted: "4h",
        preview: "Lead the design of next-gen database ORM systems and high-performance engines using TypeScript and Rust." 
      },
      { 
        id: 2, 
        title: "Senior Product Designer", 
        company: "Linear", 
        location: "Hybrid", 
        salary: "$140k - $170k", 
        type: "Full-time", 
        posted: "12h",
        preview: "Direct the visual evolution of the world's fastest project management tool for elite engineering teams."
      },
      { 
        id: 3, 
        title: "Frontend Engineer (React)", 
        company: "Railway", 
        location: "Remote", 
        salary: "$120k - $150k", 
        type: "Full-time", 
        posted: "1d",
        preview: "Architect real-time deployment visualization dashboards handling millions of container logs daily."
      }
    ];
    setTimeout(() => { setJobs(data); setLoading(false); }, 500);
  }, []);

  return (
    <div className="bg-[#fbfcff] min-h-screen text-slate-800 antialiased font-sans">
      
      {/* Refined Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-r border-slate-200 pr-6">JobBoard</h2>
            <div className="hidden md:flex items-center gap-4">
               <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Explore Roles</span>
               <span className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer transition">Saved Jobs</span>
            </div>
          </div>
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search technology..." className="bg-slate-50 border border-slate-200 rounded-md py-1.5 pl-9 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64" />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">Verified Listings // {jobs.length} Found</h3>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase bg-white border border-slate-200 px-4 py-2 rounded-md hover:bg-slate-50 transition">
              <Filter size={12}/> Filter Results
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-300 font-black tracking-widest animate-pulse">LOADING_DATA</div>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:shadow-indigo-900/[0.02] hover:border-indigo-200 transition-all duration-300 cursor-default group">
                <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
                  
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-xl shrink-0">
                    {job.company.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Role Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                      <h2 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                        {job.title}
                      </h2>
                      <p className="text-sm font-black text-slate-900 tabular-nums">{job.salary}</p>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                      <span className="text-slate-900">{job.company}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"/>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"/>
                      <span className="text-indigo-600">{job.type}</span>
                    </div>

                    {/* STRICT ONE-LINER (This is the fix) */}
                    <div className="bg-slate-50/50 border-l-2 border-indigo-600 px-4 py-2.5 mb-2">
                      <p className="text-[13px] font-medium text-slate-600 truncate leading-relaxed">
                        {job.preview}
                      </p>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center lg:flex-col justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 lg:pl-6 border-slate-100 gap-4">
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase font-mono">
                      <Clock size={12}/> {job.posted}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 text-slate-300 hover:text-indigo-600 border border-slate-100 rounded-lg hover:border-indigo-100 transition-all">
                        <Bookmark size={18}/>
                      </button>
                      <button className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-2">
                        View <ArrowRight size={14}/>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}

          <div className="mt-10 py-8 border-t border-slate-100 text-center">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[.4em]">End of feed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;