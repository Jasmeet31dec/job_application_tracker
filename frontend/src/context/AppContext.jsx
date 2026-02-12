import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  // 1. Memoized API Helper
  const apiRequest = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      });
      const result = await response.json();
      return result.data;
    } catch (err) {
      console.error("API Request Error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // 2. Memoized Actions
  const fetchExternalJobs = useCallback(async (params = "") => {
    const data = await apiRequest(`/jobs/external?${params}`);
    if (data) setJobs(data);
  }, [apiRequest]);

  const fetchJobDetails = useCallback(async (id) => {
    return await apiRequest(`/jobs/external/${id}`);
  }, [apiRequest]);

  const trackApplication = useCallback(async (jobData, status) => {
    const payload = {
      position: jobData.title,
      company: jobData.company,
      jobLocation: jobData.location,
      jobType: jobData.type,
      status: status,
      applicationLink: jobData.applyLink,
      notes: `${status} via Trackly on ${new Date().toLocaleDateString()}`
    };
    return await apiRequest("/applications/create", {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }, [apiRequest]);

  const fetchMyApplications = useCallback(async () => {
    const data = await apiRequest("/applications/my-applications");
    if (data) setApplications(data);
  }, [apiRequest]);

  const updateApplicationStatus = useCallback(async (id, newStatus) => {
    // We use functional update setApplications(prev => ...) 
    // to avoid adding 'applications' as a dependency to this useCallback
    let originalApps;
    setApplications(prev => {
      originalApps = prev;
      return prev.map(app => app._id === id ? { ...app, status: newStatus } : app);
    });

    const data = await apiRequest(`/applications/my-applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus })
    });

    if (!data) setApplications(originalApps); 
  }, [apiRequest]);

  const deleteApplication = useCallback(async (id) => {
    const success = await apiRequest(`/applications/my-applications/${id}`, {
      method: 'DELETE'
    });
    if (success !== null) {
      setApplications(prev => prev.filter(app => app._id !== id));
    }
  }, [apiRequest]);

  // 3. Memoized Context Value
  // This ensures the object provided to the app only changes when data actually changes
  const value = useMemo(() => ({
    jobs,
    applications,
    loading,
    error,
    fetchExternalJobs,
    fetchJobDetails,
    trackApplication,
    fetchMyApplications,
    updateApplicationStatus,
    deleteApplication
  }), [
    jobs, applications, loading, error, 
    fetchExternalJobs, fetchJobDetails, trackApplication, 
    fetchMyApplications, updateApplicationStatus, deleteApplication
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);