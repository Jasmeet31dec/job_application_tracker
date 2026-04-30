import React from 'react';
import { CheckCircle2, Zap, ShieldCheck, Target, TrendingUp } from 'lucide-react';

const WhyTrackly = () => {
    const benefits = [
        {
            title: "The Spreadsheet Killer",
            desc: "Stop wrestling with messy cells and broken links. Trackly is built specifically for the job hunt workflow.",
            icon: <Zap className="text-amber-500" size={24} />
        },
        {
            title: "Recruiter-Friendly Speed",
            desc: "Get a call from an unknown number? Pull up your application details in 2 seconds and sound like you've been waiting for them.",
            icon: <Target className="text-indigo-600" size={24} />
        },
        {
            title: "Mental Clarity",
            desc: "Reduce the anxiety of the search. When everything is organized, you can focus on interview prep instead of data entry.",
            icon: <ShieldCheck className="text-emerald-500" size={24} />
        }
    ];

    return (
        <section className="py-24 bg-slate-50 overflow-hidden" id="why">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Text Content */}
                    <div>
                        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4">
                            The Trackly Advantage
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                            Built for those who are serious about <span className="underline decoration-indigo-500/30">landing the offer.</span>
                        </h3>

                        <div className="space-y-8">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-5 group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h4>
                                        <p className="text-slate-600 leading-relaxed">
                                            {benefit.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Visual Comparison Card */}
                    <div className="relative">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-indigo-500 rounded-3xl rotate-3 scale-105 opacity-10"></div>

                        <div className="relative bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <TrendingUp className="text-indigo-600" size={20} />
                                </div>
                                <span className="font-bold text-slate-900 text-lg uppercase tracking-tight">The Result</span>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm font-bold text-slate-500">Search Efficiency</span>
                                        <span className="text-indigo-600 font-black">85% Higher</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-600 h-full w-[85%] rounded-full"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-indigo-600 p-6 rounded-2xl text-white">
                                        <div className="text-3xl font-black mb-1">2x</div>
                                        <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Faster Follow-ups</div>
                                    </div>
                                    <div className="bg-slate-900 p-6 rounded-2xl text-white">
                                        <div className="text-3xl font-black mb-1">0</div>
                                        <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Missed Deadlines</div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <p className="text-slate-500 italic text-sm text-center">
                                        "Trackly turned my chaotic search into a structured pipeline. I landed 3 offers in 4 weeks."
                                    </p>
                                    <p className="text-slate-900 font-bold text-xs text-center mt-2">— Sarah K., Software Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyTrackly;