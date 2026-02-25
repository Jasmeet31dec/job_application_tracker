import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    category: "Interview Prep",
    title: "Mastering the STAR Method for Behavioral Interviews",
    excerpt: "Learn how to structure your answers to showcase your skills and impact effectively...",
    author: "Sarah Chen",
    date: "Oct 24, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    category: "Resume Tips",
    title: "How to Beat the Applicant Tracking System (ATS)",
    excerpt: "Discover the keywords and formatting secrets that get your resume past the bots and to the recruiter...",
    author: "Marcus Thorne",
    date: "Oct 20, 2023",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    category: "Remote Work",
    title: "The Ultimate Guide to Remote Job Hunting in 2024",
    excerpt: "Where to find the best global opportunities and how to stand out in a worldwide talent pool...",
    author: "Elena Rodriguez",
    date: "Oct 15, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800"
  }
];

const CareerBlog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Interview Prep", "Resume Tips", "Remote Work", "Mental Health"];

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* Blog Header */}
      <header className="bg-white border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <BookOpen size={14} />
                Knowledge Base
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Career <span className="text-indigo-600">Insights</span>
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Expert advice on landing your dream role, navigating office politics, and mastering your craft.
              </p>
            </div>
            
            {/* Simple Search bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                ? "bg-slate-900 text-white shadow-lg" 
                : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (Hero Style) */}
        <div className="mb-16 group cursor-pointer">
            <div className="grid lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 border border-slate-100">
                <div className="h-80 lg:h-auto overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1200" 
                        alt="Featured post" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-indigo-600 font-black text-xs uppercase tracking-widest mb-4 block">Editor's Choice</span>
                    <h2 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors">Why 2024 is the Year of the Generalist Engineer</h2>
                    <p className="text-slate-500 leading-relaxed mb-8">Specialization used to be the gold standard. But with the rise of AI agents, being able to walk across the whole stack is becoming your ultimate competitive advantage...</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                            <Calendar size={16} /> Oct 28, 2023
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                            <Clock size={16} /> 12 min read
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        {post.category}
                    </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${post.author}&background=6366f1&color=fff`} alt={post.author} />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{post.author}</span>
                </div>
                <button className="flex items-center gap-1 text-xs font-black text-indigo-600 uppercase tracking-widest group-hover:gap-2 transition-all">
                    Read Article <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-slate-950 py-20 px-6 mt-20 rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Don't miss the next <span className="text-indigo-400 underline decoration-indigo-400/30 underline-offset-8">big break.</span></h2>
            <p className="text-slate-400 mb-10 text-lg">Weekly career strategies delivered straight to your inbox. No spam, ever.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
                    Subscribe
                </button>
            </form>
        </div>
      </section>
    </div>
  );
};

export default CareerBlog;