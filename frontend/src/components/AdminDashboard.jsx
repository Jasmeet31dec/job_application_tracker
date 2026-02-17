import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, Search, Trash2, 
  ShieldCheck, Mail, Calendar, Activity, 
  Loader2, Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {
  // Use global state and actions from Context
  const { fetchUserDetails, users, loading } = useApp();
  
  const [searchTerm, setSearchTerm] = useState("");

  // Trigger fetch on mount
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // DERIVED STATE: Filter users based on search
  const filteredUsers = searchTerm === ""
  ? users
  : users.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );


  console.log(users);

  const stats = [
    { label: 'Total Users', value: users.length, icon: <Users size={20} />, color: 'bg-indigo-600' },
    { label: 'Admin Roles', value: users.filter(u => u.role === 'admin').length, icon: <Shield size={20} />, color: 'bg-slate-900' },
    { label: 'System Load', value: 'Optimal', icon: <Activity size={20} />, color: 'bg-emerald-500' },
  ];

  // Use the global loading state
  if (loading && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Loading Admin Terminal...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Admin <span className="text-indigo-600">Console</span>
            </h1>
            <p className="text-slate-500 font-medium">Platform oversight and user permissions.</p>
          </div>
          
          <div className="flex gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 min-w-[180px]">
                <div className={`${stat.color} p-2.5 rounded-xl text-white shadow-lg shadow-gray-200`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email or status..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition flex items-center gap-2">
            <Filter size={16} /> Advanced Access
          </button>
        </div>

        {/* Improved Responsive Table */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]">Identity</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]">Tier</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]">Joined</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-center">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                          {user.name?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-2 ${
                        user.role === 'admin' 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        {user.role === 'admin' ? <Shield size={12} /> : <Users size={12} />}
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        Verified
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                         <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Promote/Demote">
                          <ShieldCheck size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Account">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center font-bold text-slate-400 uppercase tracking-widest text-xs">
                      No users found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;