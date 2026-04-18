import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Globe, Mail, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 relative">
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Brand & Social Section - Now centered for a simpler look */}
                <div className="flex flex-col items-center text-center mb-12">
                    <Link to="/" className="text-3xl font-black text-white tracking-tighter mb-4 italic flex items-center gap-1">
                        TRACKLY<span className="text-indigo-500">.</span>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-sm mb-8 text-slate-500">
                        The intelligent operating system for your career. Track applications, 
                        analyze your funnel, and land your dream role.
                    </p>
                    
                    <div className="flex gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 rounded-xl hover:text-indigo-400 hover:bg-slate-800 transition-all border border-slate-800">
                            <Twitter size={20} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 rounded-xl hover:text-indigo-400 hover:bg-slate-800 transition-all border border-slate-800">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 rounded-xl hover:text-indigo-400 hover:bg-slate-800 transition-all border border-slate-800">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                            © {new Date().getFullYear()} Trackly Inc.
                        </p>
                        <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest">
                            <button className="flex items-center gap-2 hover:text-white transition-colors group">
                                <Globe size={14} className="text-indigo-500 group-hover:rotate-12 transition-transform" /> English (US)
                            </button>
                            <a href="mailto:support@trackly.com" className="flex items-center gap-2 hover:text-white transition-colors group">
                                <Mail size={14} className="text-indigo-500 group-hover:scale-110 transition-transform" /> Support
                            </a>
                        </div>
                    </div>

                    {/* Scroll to top button */}
                    <button 
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all"
                    >
                        Back to top
                        <ArrowUpCircle size={18} className="group-hover:-translate-y-1 transition-transform text-indigo-500" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;