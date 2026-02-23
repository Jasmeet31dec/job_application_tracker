import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Construction, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="max-w-xl w-full text-center">
                {/* Visual Icon */}
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
                    <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-100">
                        <Construction size={80} className="text-indigo-600 animate-bounce" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-2 rounded-full shadow-lg">
                        <AlertTriangle size={20} />
                    </div>
                </div>

                {/* Error Status */}
                <h1 className="text-[120px] font-black text-slate-900 leading-none tracking-tighter mb-4">
                    404<span className="text-indigo-600">.</span>
                </h1>
                
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest mb-4">
                    Lost in the system?
                </h2>
                
                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, 
                    or is temporarily unavailable. Let's get you back on track.
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                    
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                    >
                        <Home size={18} />
                        Return Home
                    </Link>
                </div>

                {/* Subtle Brand Footer */}
                <p className="mt-16 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    Trackly Terminal • System Status: Optimal
                </p>
            </div>
        </div>
    );
};

export default NotFound;