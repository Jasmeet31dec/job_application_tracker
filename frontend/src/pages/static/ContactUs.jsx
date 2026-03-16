import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Github, Twitter, Linkedin } from 'lucide-react';

const ContactUs = () => {
    const [status, setStatus] = useState('idle'); // idle, sending, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Message Received!</h2>
                    <p className="text-slate-500 mb-8 font-medium">Our team usually responds within 24 hours. Keep an eye on your inbox.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all"
                    >
                        Send another message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fafafa] min-h-screen">
            {/* Header */}
            <section className="bg-slate-950 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Let's <span className="text-indigo-400">Connect.</span></h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Have questions about Trackly? Want to partner with us? Or just want to say hi? We're all ears.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 -mt-12 pb-24">
                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Contact Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-8">Contact Information</h3>
                            
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email us</p>
                                        <p className="text-slate-900 font-bold">support@trackly.io</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Live Chat</p>
                                        <p className="text-slate-900 font-bold">Mon-Fri, 9am - 6pm IST</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Headquarters</p>
                                        <p className="text-slate-900 font-bold">Bangalore, India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-slate-100">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Follow our journey</p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Twitter size={18} /></a>
                                    <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Github size={18} /></a>
                                    <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Linkedin size={18} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="John Doe"
                                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                                        <input 
                                            required
                                            type="email" 
                                            placeholder="john@example.com"
                                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                                    <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Business Partnership</option>
                                        <option>Feature Request</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">How can we help?</label>
                                    <textarea 
                                        required
                                        rows="5"
                                        placeholder="Tell us a bit about what you're looking for..."
                                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    disabled={status === 'sending'}
                                    className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ContactUs;