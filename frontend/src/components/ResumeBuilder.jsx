import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Wrench, 
  Download, Plus, Trash2, Eye, Layout, Loader2 
} from 'lucide-react';
import axios from 'axios';

const ResumeBuilder = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    personal: { name: '', email: '', phone: '', location: '' },
    education: [{ degree: '', school: '', year: '' }],
    experience: [{ role: '', company: '', duration: '', description: '' }],
    skills: ''
  });

  // --- Handlers ---
  const handlePersonalChange = (e) => {
    setFormData({ ...formData, personal: { ...formData.personal, [e.target.name]: e.target.value } });
  };

  const handleDynamicChange = (index, field, value, type) => {
    const updated = [...formData[type]];
    updated[index][field] = value;
    setFormData({ ...formData, [type]: updated });
  };

  const addItem = (type) => {
    const newItem = type === 'education' 
      ? { degree: '', school: '', year: '' } 
      : { role: '', company: '', duration: '', description: '' };
    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  const removeItem = (index, type) => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updated });
  };

  const downloadResume = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== "")
      };
      
      const response = await axios.post('http://localhost:5000/api/resume/build', payload, { 
        responseType: 'blob' 
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.personal.name || 'Resume'}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* LEFT: INPUTS */}
      <div className="w-full lg:w-1/2 p-6 lg:p-10 lg:overflow-y-auto lg:h-screen border-r border-slate-200 bg-white">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">AI <span className="text-indigo-600">Resume</span> Builder</h1>
          <p className="text-slate-500 font-medium">Enter your details and let AI handle the formatting.</p>
        </header>

        <div className="space-y-8">
          {/* Section: Personal */}
          <Section label="Personal Details" icon={<User size={18}/>}>
            <div className="grid grid-cols-2 gap-4">
              <Input name="name" placeholder="Full Name" value={formData.personal.name} onChange={handlePersonalChange} />
              <Input name="email" placeholder="Email Address" value={formData.personal.email} onChange={handlePersonalChange} />
              <Input name="phone" placeholder="Phone Number" value={formData.personal.phone} onChange={handlePersonalChange} />
              <Input name="location" placeholder="Location (City, State)" value={formData.personal.location} onChange={handlePersonalChange} />
            </div>
          </Section>

          {/* Section: Experience */}
          <Section label="Work Experience" icon={<Briefcase size={18}/>} onAdd={() => addItem('experience')}>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl mb-4 relative group">
                <button onClick={() => removeItem(idx, 'experience')} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition"><Trash2 size={16}/></button>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <Input placeholder="Role" value={exp.role} onChange={(e) => handleDynamicChange(idx, 'role', e.target.value, 'experience')} />
                  <Input placeholder="Company" value={exp.company} onChange={(e) => handleDynamicChange(idx, 'company', e.target.value, 'experience')} />
                  <Input placeholder="Duration (e.g. 2021 - Present)" value={exp.duration} onChange={(e) => handleDynamicChange(idx, 'duration', e.target.value, 'experience')} className="col-span-2" />
                </div>
                <textarea 
                  placeholder="Describe your responsibilities..."
                  className="w-full p-4 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  rows="3"
                  value={exp.description}
                  onChange={(e) => handleDynamicChange(idx, 'description', e.target.value, 'experience')}
                />
              </div>
            ))}
          </Section>

          {/* Section: Education */}
          <Section label="Education" icon={<GraduationCap size={18}/>} onAdd={() => addItem('education')}>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl mb-4 relative">
                 <button onClick={() => removeItem(idx, 'education')} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition"><Trash2 size={16}/></button>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Degree" value={edu.degree} onChange={(e) => handleDynamicChange(idx, 'degree', e.target.value, 'education')} />
                  <Input placeholder="School/Uni" value={edu.school} onChange={(e) => handleDynamicChange(idx, 'school', e.target.value, 'education')} />
                  <Input placeholder="Year of Graduation" value={edu.year} onChange={(e) => handleDynamicChange(idx, 'year', e.target.value, 'education')} className="col-span-2" />
                </div>
              </div>
            ))}
          </Section>

          {/* Section: Skills */}
          <Section label="Skills" icon={<Wrench size={18}/>}>
            <textarea 
              placeholder="e.g. JavaScript, React, Project Management, SEO (Comma separated)"
              className="w-full p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-sm focus:border-indigo-500 outline-none"
              rows="3"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
          </Section>

          <button 
            onClick={downloadResume}
            disabled={loading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
            {loading ? "Optimizing & Generating..." : "Download Professional Resume"}
          </button>
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <div className="lg:w-1/2 bg-slate-100 p-8 flex justify-center lg:overflow-y-auto lg:h-screen">
        <div className="w-full max-w-[600px] h-fit bg-white shadow-2xl p-10 min-h-[842px] relative origin-top scale-90 lg:scale-100">
           <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2">
             <Eye size={12}/> Live Preview
           </div>
           
           <h2 className="text-3xl font-bold text-slate-900 mb-1">{formData.personal.name || 'Your Full Name'}</h2>
           <p className="text-slate-500 text-sm mb-8">{formData.personal.email} {formData.personal.phone ? `| ${formData.personal.phone}` : ''} {formData.personal.location ? `| ${formData.personal.location}` : ''}</p>

           <div className="space-y-6">
              <div>
                <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-100 pb-1 mb-3">Experience</h3>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between font-bold text-sm text-slate-900">
                      <span>{exp.role || 'Role'}</span>
                      <span className="text-slate-400 text-xs uppercase">{exp.duration}</span>
                    </div>
                    <p className="text-xs text-slate-600">{exp.company || 'Company'}</p>
                    <p className="text-[11px] text-slate-500 mt-1 italic">{exp.description}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-100 pb-1 mb-3">Education</h3>
                {formData.education.map((edu, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between font-bold text-sm text-slate-900">
                      <span>{edu.degree || 'Degree'}</span>
                      <span className="text-slate-400 text-xs">{edu.year}</span>
                    </div>
                    <p className="text-xs text-slate-600">{edu.school || 'University Name'}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Small Helper Components ---
const Section = ({ icon, label, children, onAdd }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex items-center gap-2 text-slate-900 font-bold uppercase text-xs tracking-wider">
        <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">{icon}</span> {label}
      </div>
      {onAdd && (
        <button onClick={onAdd} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
          <Plus size={18}/>
        </button>
      )}
    </div>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input 
    className={`w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all ${className}`}
    {...props}
  />
);

export default ResumeBuilder;