import React from 'react';
import { useRouteError, Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCcw, Home, ShieldAlert } from 'lucide-react';

const GlobalError = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    // Log the error for developers
    console.error("App Crash Error:", error);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-12 text-center">
                        {/* Icon Header */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-50 rounded-3xl mb-8">
                            <ShieldAlert size={40} className="text-rose-500" />
                        </div>

                        <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                            Critical System Error
                        </h1>
                        
                        <p className="text-slate-500 font-medium mb-8 leading-relaxed max-w-md mx-auto">
                            The application encountered an unexpected issue while rendering this page. 
                            Don't worry, your data is safe.
                        </p>

                        {/* Error Details Board */}
                        <div className="bg-slate-900 rounded-2xl p-6 mb-10 text-left overflow-hidden relative">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle size={14} className="text-amber-400" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Error Log Item:</span>
                            </div>
                            <code className="text-rose-300 text-sm font-mono break-all leading-tight block">
                                {error?.message || error?.statusText || "Internal Application Syntax Error"}
                            </code>
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <AlertTriangle size={80} className="text-white" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => window.location.reload()}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                            >
                                <RefreshCcw size={18} />
                                Reload Application
                            </button>
                            
                            <Link 
                                to="/" 
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
                            >
                                <Home size={18} />
                                Return Home
                            </Link>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Diagnostic ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalError;