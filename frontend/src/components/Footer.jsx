import React from 'react';
import { Link } from 'react-router-dom'; // Added for internal routing
import { Github, Twitter, Linkedin, Globe, Mail, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
    // 1. Defined structured data with actual paths
    const sections = [
        {
            title: "Product",
            links: [
                { name: "Job Board", path: "/jobs" },
                { name: "Analytics", path: "/dashboard" },
                { name: "Chrome Extension", path: "https://chrome.google.com", isExternal: true },
                { name: "Pricing", path: "/pricing" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Documentation", path: "/docs" },
                { name: "Career Blog", path: "/blog" },
                { name: "Interview Prep", path: "/prep" },
                { name: "Community", path: "https://discord.com", isExternal: true }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" }
            ]
        }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 relative">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <Link to="/" className="text-2xl font-black text-white tracking-tighter mb-4 italic flex items-center gap-1">
                            TRACKLY<span className="text-indigo-500">.</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs mb-6 mt-4">
                            The intelligent operating system for your career. Track applications, 
                            analyze your funnel, and land your dream role.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 rounded-lg hover:text-indigo-400 hover:bg-slate-800 transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 rounded-lg hover:text-indigo-400 hover:bg-slate-800 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 rounded-lg hover:text-indigo-400 hover:bg-slate-800 transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Dynamic Link Sections */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-7">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        {link.isExternal ? (
                                            <a 
                                                href={link.path} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block"
                                            >
                                                {link.name}
                                            </a>
                                        ) : (
                                            <Link 
                                                to={link.path} 
                                                className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            © {new Date().getFullYear()} Trackly Inc.
                        </p>
                        <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
                            <button className="flex items-center gap-2 hover:text-white transition-colors">
                                <Globe size={14} className="text-indigo-500" /> English (US)
                            </button>
                            <a href="mailto:support@trackly.com" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail size={14} className="text-indigo-500" /> Support
                            </a>
                        </div>
                    </div>

                    {/* Scroll to top button */}
                    <button 
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all underline decoration-indigo-500/50 underline-offset-4"
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