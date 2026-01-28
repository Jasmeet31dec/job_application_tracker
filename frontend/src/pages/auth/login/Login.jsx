import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Briefcase, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Attempt:", formData);
    try {
      const response = await fetch("http://localhost:5000/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      })
      const result = await response.json();
      localStorage.setItem("token",result.token);
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    } finally {
      setFormData({
        email: '',
        password: '',
      })
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
            <Briefcase className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Log in to manage your applications.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                name="email"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="name@company.com"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              onChange={handleChange}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-600">              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-lg shadow-blue-100"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or sign in with</span>          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition font-medium text-slate-700">
            <Github size={18} /> GitHub
          </button>
          <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition font-medium text-slate-700">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </div>

        <p className="text-center text-sm text-slate-600 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
