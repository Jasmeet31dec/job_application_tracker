import React from 'react';
import { Target, Users, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const values = [
    {
      icon: <Target className="text-indigo-600" size={24} />,
      title: "Our Mission",
      desc: "To empower job seekers by turning the chaotic process of job hunting into a streamlined, data-driven journey."
    },
    {
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
      title: "Data Integrity",
      desc: "We believe your career data is private. Trackly is built with a 'security-first' mindset to keep your applications safe."
    },
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: "Efficiency",
      desc: "Automation over manual entry. We aim to save you hours of spreadsheet management every single week."
    },
    {
      icon: <Users className="text-rose-500" size={24} />,
      title: "Community",
      desc: "Built by developers, for developers. We understand the hurdles of the modern tech hiring landscape."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              We make <span className="text-indigo-400">hunting</span> feel like <span className="text-indigo-400">winning.</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed mb-8">
              Trackly was born out of a simple frustration: spreadsheets are great for calculations, but terrible for careers. We built a platform that thinks like a recruiter but works for the candidate.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="aspect-square bg-indigo-100 rounded-[3rem] overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-80"
                />
             </div>
             <div className="absolute -bottom-6 -right-6 bg-indigo-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                <p className="text-white font-black text-4xl italic">10k+</p>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Applications Tracked</p>
             </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6">The Trackly Story</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                    Started in a small dorm room in 2023, Trackly began as a simple internal tool to help a group of friends manage their internship applications. We quickly realized that the "black hole" of job applications was a universal problem.
                </p>
                <p>
                    Today, Trackly is used by thousands of professionals globally to organize their search, analyze their interview performance, and ultimately land their dream roles in record time.
                </p>
            </div>
            
            <Link to="/signup" className="mt-10 inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-colors group">
                Join the Movement
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;