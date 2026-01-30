import React from 'react';
import { Layout, Target, PieChart, Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* --- Hero Section --- */}
      <header className="px-8 pt-16 pb-24 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-indigo-700 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Now with AI Resume Matcher</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
          Land your dream job, <br />
          <span className="text-indigo-600">without the chaos.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Trackly is the central hub for your job search. Organize applications, set reminders, and gain insights to get hired faster.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition flex items-center justify-center gap-2">
            Start Tracking Free <ArrowRight size={20} />
          </button>
          <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
            View Demo
          </button>
        </div>
      </header>

      {/* --- Features Section --- */}
      <section id="features" className="px-8 py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to stay ahead</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition group">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Track Applications</h3>
              <p className="text-slate-600 leading-relaxed">
                Move applications through a visual Kanban board. Know exactly where you stand with every company at a glance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition group">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition">
                <PieChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Visual Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Identify why you're getting stuck. See conversion rates from applications to interviews with beautiful charts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition group">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition">
                <Bell size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Reminders</h3>
              <p className="text-slate-600 leading-relaxed">
                Never miss a follow-up. Get automated alerts for interviews and deadlines to stay professional and responsive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Choose Trackly Section --- */}
      <section id="why" className="px-8 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 leading-tight">Why top candidates <br /> use Trackly?</h2>
            <ul className="space-y-6">
              {[
                { title: "Stay organized", desc: "No more messy spreadsheets or lost emails." },
                { title: "Recruiter-friendly speed", desc: "Respond to requests instantly with all your data in one place." },
                { title: "Data-driven search", desc: "Stop guessing and start optimizing your job hunt targets." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-indigo-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-600 rounded-3xl aspect-square md:aspect-video flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Simple Mockup Placeholder */}
            <div className="w-4/5 h-4/5 bg-white/10 rounded-xl border border-white/20 p-6">
              <div className="w-1/2 h-4 bg-white/20 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-white/20 rounded-lg"></div>
                <div className="h-32 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
