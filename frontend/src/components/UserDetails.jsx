import React from 'react';
import { 
  Mail, Briefcase, ChevronLeft, Calendar, 
  ShieldCheck, Eye, MapPin, Building2, 
  ExternalLink, Clock,Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDetails = ({ user, applications = [], onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right duration-500">
      
      {/* 1. Header with working Back Button */}
      <div className="mb-8">
        <Link 
          to="/dashboard" // Explicitly calling the function
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-bold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back
        </Link>
      </div>

      {/* 2. Enhanced User Profile Card */}
      <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-indigo-600 rotate-12">
            <Users size={120} />
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="h-20 w-20 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-[1.5rem] flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-200">
            {user.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h2>
            <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-indigo-200">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Mail size={16} className="text-indigo-400" /> {user.email}
                </div>
                <span className="text-slate-200">|</span>
                <span className="bg-slate-100 text-slate-600 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                   ID: {user._id?.slice(-6)}
                </span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-[1.5rem] flex gap-10 border border-slate-100 relative z-10 w-full md:w-auto justify-around">
            <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.1em] mb-1">Total Applications</p>
                <p className="text-3xl font-black text-indigo-600">{applications.length}</p>
            </div>
            <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.1em] mb-1">Platform Role</p>
                <p className="text-xl font-bold text-slate-700 flex items-center gap-1 justify-center">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    Customer
                </p>
            </div>
        </div>
      </div>

      {/* 3. Detailed Application History */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <Briefcase size={20} />
          </div>
          Submission History
        </h3>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{applications.length} Records Found</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app._id} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300">
              
              <div className="flex gap-5 items-start">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                    <Building2 size={24} className="text-slate-400 group-hover:text-indigo-500" />
                </div>
                <div>
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{app.jobTitle}</h4>
                    <p className="text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                        {app.companyName} 
                        <span className="text-slate-300 px-2">•</span> 
                        <span className="flex items-center gap-1 font-medium"><MapPin size={14}/> Full-Time</span>
                    </p>
                    
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <Clock size={14} /> 
                            Applied: {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                            'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                            {app.status || 'Pending Review'}
                        </div>
                    </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto mt-6 md:mt-0">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                    <Eye size={16} /> View Details
                </button>
                <div className="p-3 bg-slate-50 rounded-xl text-slate-300" title="Read Only Access">
                    <ShieldCheck size={20} />
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
                <Briefcase size={40} className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">No applications recorded for this user</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;