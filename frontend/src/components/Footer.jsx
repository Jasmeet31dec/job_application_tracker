import React from 'react';
import { Github, Twitter, Linkedin, Globe, Mail } from 'lucide-react';

const Footer = () => {
    const sections = [
        {
            title: "Product",
            links: ["Job Board", "Analytics", "Chrome Extension", "Pricing"]
        },
        {
            title: "Resources",
            links: ["Documentation", "Career Blog", "Interview Prep", "Community"]
        },
        {
            title: "Company",
            links: ["About Us", "Contact", "Privacy Policy", "Terms of Service"]
        }
    ];

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <div className="text-2xl font-black text-white tracking-tighter mb-4 italic">
                            TRACKLY<span className="text-indigo-500">.</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs mb-6">
                            The intelligent operating system for your career. Track applications, 
                            analyze your funnel, and land your dream role.
                        </p>
                        <div className="flex gap-4">
                            <button className="hover:text-indigo-400 transition-colors"><Twitter size={20} /></button>
                            <button className="hover:text-indigo-400 transition-colors"><Github size={20} /></button>
                            <button className="hover:text-indigo-400 transition-colors"><Linkedin size={20} /></button>
                        </div>
                    </div>

                    {/* Link Sections */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest">
                        © 2024 Trackly Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <Globe size={14} /> English (US)
                        </span>
                        <span className="flex items-center gap-2 cursor-pointer hover:text-white">
                            <Mail size={14} /> Support
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;