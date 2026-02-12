import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  // Reusable Fetch Helper
  const apiRequest = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
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
      if (!response.ok) throw new Error(result.message || "Something went wrong");
      return result.data;
    } catch (err) {
      setError(err.message);
      console.error(`API Error [${endpoint}]:`, err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Actions
  const actions = {
    // 1. Fetch External Jobs (for JobBoard)
    fetchExternalJobs: async (params = "") => {
      const data = await apiRequest(`/jobs/external?${params}`);
      if (data) setJobs(data);
    },

    // 2. Fetch Single Job Details
    fetchJobDetails: async (id) => {
      return await apiRequest(`/jobs/external/${id}`);
    },

    // 3. Update/Create Application (Applied or Saved)
    trackApplication: async (jobData, status) => {
      const payload = {
        position: jobData.title,
        company: jobData.company,
        jobLocation: jobData.location,
        jobType: jobData.type,
        status: status, // "Applied" or "Saved"
        applicationLink: jobData.applyLink,
        notes: `${status} via Trackly on ${new Date().toLocaleDateString()}`
      };
      return await apiRequest("/applications", {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    },

    // 4. Get My Applications (for Dashboard/SavedJobs)
    fetchMyApplications: async () => {
      const data = await apiRequest("/applications/my-applications");
      if (data) setApplications(data);
    }
  };

  return (
    <AppContext.Provider value={{ jobs, applications, loading, error, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);