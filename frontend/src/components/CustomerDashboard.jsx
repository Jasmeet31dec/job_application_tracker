import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Target, PieChart, Clock, 
  TrendingUp, CheckCircle2, XCircle, 
  ChevronRight, ArrowUpRight, Ghost
} from 'lucide-react';

const CustomerDashboard = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/applications/my-applications", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json();
        setApps(result.data || []);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  // Derived Analytics Logic
  const stats = {
    total: apps.length,
    interviews: apps.filter(a => a.status === 'Interviewing').length,
    offers: apps.filter(a => a.status === 'Offer').length,
    ghosted: apps.filter(a => a.status === 'Ghosted').length,
    rejected: apps.filter(a => a.status === 'Rejected').length,
  };

  const responseRate = stats.total > 0 
    ? Math.round(((stats.total - (stats.ghosted + stats.rejected)) / stats.total) * 100) 
    : 0;

  const cards = [
    { label: 'Total Applications', value: stats.total, icon: <Briefcase size={20} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Live Interviews', value: stats.interviews, icon: <Target size={20} />, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Offers Received', value: stats.offers, icon: <CheckCircle2 size={20} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Response Rate', value: `${responseRate}%`, icon: <TrendingUp size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  if (loading) return <div className="p-8 text-center font-bold text-slate-400 animate-pulse uppercase tracking-widest">Generating Insights...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Personalized Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Performance <span className="text-indigo-600">Hub</span>
          </h1>
          <p className="text-slate-500 font-medium italic">"You miss 100% of the shots you don't take." — Trackly Insights</p>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${card.bg} ${card.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
              <p className="text-3xl font-black text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Application Funnel Visualizer */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <PieChart size={20} className="text-indigo-600" /> Pipeline Breakdown
              </h3>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Applied', count: apps.filter(a => a.status === 'Applied').length, color: 'bg-blue-500' },
                { label: 'Interviewing', count: stats.interviews, color: 'bg-amber-500' },
                { label: 'Offer', count: stats.offers, color: 'bg-emerald-500' },
                { label: 'Ghosted', count: stats.ghosted, color: 'bg-slate-400' },
                { label: 'Rejected', count: stats.rejected, color: 'bg-rose-500' },
              ].map((item, idx) => {
                const percentage = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">{item.label}</span>
                      <span className="text-xs font-bold text-slate-500">{item.count} Jobs</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} transition-all duration-1000`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions / Tips */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-black uppercase tracking-tighter text-xl mb-2">Next Step?</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  You have <span className="text-indigo-400 font-bold">{stats.interviews} active interviews</span>. Review your notes before the Big Day.
                </p>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition shadow-lg shadow-indigo-500/20 active:scale-95">
                  Prepare Now <ArrowUpRight size={16} />
                </button>
              </div>
              <Ghost className="absolute -bottom-4 -right-4 text-white/5 rotate-12 group-hover:-rotate-12 transition-transform duration-700" size={140} />
            </div>

            {/* Recent High-Priority Jobs */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
              <h3 className="font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center justify-between">
                Recent <ChevronRight size={16} className="text-indigo-600"/>
              </h3>
              <div className="space-y-4">
                {apps.slice(0, 3).map((job, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                      {job.company?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900 truncate uppercase">{job.position}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{job.company}</p>
                    </div>
                    <div className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded tracking-tighter uppercase font-mono">
                      {job.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;