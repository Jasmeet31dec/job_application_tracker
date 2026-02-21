import React, { useEffect, useState } from 'react';
import { 
  Mail, Briefcase, ChevronLeft, Calendar, 
  ShieldCheck, Eye, MapPin, Building2, 
  Users, Loader2, Clock 
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const UserDetails = () => {
  const { userId } = useParams();
  const { userApplications, fetchUserApplications, fetchUserById } = useApp();
  const [currentUser, setCurrentUser] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsDataLoading(true);
      try {
        await Promise.all([
          fetchUserApplications(userId),
          (async () => {
            const data = await fetchUserById(userId);
            setCurrentUser(data?.user || data); 
          })()
        ]);
      } catch (err) {
        console.error("Error loading user details:", err);
      } finally {
        setIsDataLoading(false);
      }
    };
    if (userId) loadData();
  }, [userId, fetchUserApplications, fetchUserById]);

  if (isDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Retrieving Secure Profile...</p>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      
      {/* 1. Header Navigation */}
      <div className="mb-10">
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Admin Terminal
        </Link>
      </div>

      {/* 2. Main Profile Hero Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden relative mb-12">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.04] text-indigo-600 pointer-events-none">
          <Users size={160} />
        </div>

        <div className="p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
          
          {/* Identity Section */}
          <div className="flex items-center gap-8">
            <div className="h-24 w-24 flex-shrink-0 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl flex items-center justify-center text-4xl font-black shadow-xl shadow-indigo-100 ring-8 ring-indigo-50">
              {currentUser.name?.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {currentUser.name}
                </h2>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                  Active
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-slate-500">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Mail size={16} className="text-indigo-400" /> {currentUser.email}
                </div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  REF: {currentUser._id?.slice(-8)}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Column */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="bg-slate-50 border border-slate-100 px-8 py-6 rounded-3xl text-center flex-1 lg:min-w-[160px]">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">Total Applications</p>
              <p className="text-4xl font-black text-indigo-600 leading-none">{userApplications?.length || 0}</p>
            </div>
            <div className="bg-slate-900 px-8 py-6 rounded-3xl text-center flex-1 lg:min-w-[160px]">
              <p className="text-[10px] text-slate-300/60 uppercase font-black tracking-[0.2em] mb-2">Security Tier</p>
              <div className="flex items-center justify-center gap-2 text-white font-bold">
                <ShieldCheck size={18} className="text-indigo-400" />
                <span className="capitalize">{currentUser.role || 'User'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section Title */}
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Briefcase size={24} className="text-indigo-600" />
            Applied Jobs History
          </h3>
          <p className="text-slate-500 font-medium mt-1">Detailed log of all platform submissions for this user account.</p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying</p>
          <p className="text-sm font-bold text-slate-900">{userApplications?.length || 0} Entries</p>
        </div>
      </div>

      {/* 4. Application Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {userApplications?.length > 0 ? (
          userApplications.map((app) => (
            <div key={app._id} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 group hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
              
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-50 group-hover:bg-indigo-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 transition-colors">
                  <Building2 size={28} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {app.jobTitle}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-slate-500 font-bold text-sm">{app.companyName}</span>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <Clock size={14} /> 
                      Applied on {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  app.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {app.status || 'Under Review'}
                </div>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                  <Eye size={16} /> View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center">
            <div className="bg-white p-6 rounded-full shadow-sm mb-6">
              <Briefcase size={48} className="text-slate-200" />
            </div>
            <p className="text-slate-500 font-bold text-lg mb-1">No applications found</p>
            <p className="text-slate-400 text-sm max-w-[250px] mx-auto">This user hasn't submitted any job applications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;