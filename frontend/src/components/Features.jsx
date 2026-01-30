import React from 'react';
import {
    Trello,
    BarChart3,
    BellRing,
    FileText,
    Chrome,
    Users2,
    Sparkles
} from 'lucide-react';

const Features = () => {
    const featureList = [
        {
            title: "Visual Kanban Pipeline",
            description: "Drag and drop your way to a new job. Move applications from 'Applied' to 'Offer' with our intuitive visual board.",
            icon: <Trello className="w-6 h-6" />,
            tag: "Tracking"
        },
        {
            title: "Advanced Analytics",
            description: "Visualize your success rate. Beautiful charts show you exactly where in the funnel you're losing momentum.",
            icon: <BarChart3 className="w-6 h-6" />,
            tag: "Insights"
        },
        {
            title: "Smart Follow-up Alerts",
            description: "Never let a recruiter wait. Automated reminders tell you exactly when to send that follow-up email.",
            icon: <BellRing className="w-6 h-6" />,
            tag: "Reminders"
        },
        {
            title: "Resume Versioning",
            description: "Keep track of which resume version you sent to which company to ensure your interview prep is spot-on.",
            icon: <FileText className="w-6 h-6" />,
            tag: "Organization"
        },
        {
            title: "Browser Extension",
            description: "Save jobs directly from LinkedIn, Indeed, or Glassdoor with a single click. No more manual entry.",
            icon: <Chrome className="w-6 h-6" />,
            tag: "Automation"
        },
        {
            title: "Recruiter Directory",
            description: "Store contact details for every recruiter and hiring manager you've interacted with in one central hub.",
            icon: <Users2 className="w-6 h-6" />,
            tag: "Networking"
        }
    ];

    return (
        <section className="py-24 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4">
                        <Sparkles size={14} className="fill-indigo-600" />
                        <span className="text-xs font-bold uppercase tracking-wider">Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Stop managing spreadsheets. <br />
                        <span className="text-indigo-600">Start managing offers.</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Everything you need to streamline your search, organized in a way that helps you focus on what matters: the interview.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                {feature.icon}
                            </div>

                            <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-200 text-slate-500 mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                {feature.tag}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-900 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition-colors"></div>
                    <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                        Ready to organize your job search?
                    </h3>
                    <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-indigo-50 transition relative z-10 shadow-xl">
                        Join Trackly Today
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Features;