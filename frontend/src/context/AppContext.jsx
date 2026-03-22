import { API_BASE_URL} from '../config';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { dummyJobs } from '../data/dummyJobs';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  const API_BASE_URL1 = `${API_BASE_URL}/api`;

  // 1. UPDATED: Memoized API Helper
  const apiRequest = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    
    // FETCH THE TOKEN FRESH ON EVERY REQUEST
    const currentToken = localStorage.getItem("token");

    const headers = {
      'Authorization': `Bearer ${currentToken}`,
      ...options.headers,
    };

    // IMPORTANT: Only set Content-Type to JSON if we aren't sending a File/FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(`${API_BASE_URL1}${endpoint}`, {
        ...options,
        headers,
      });

      // Handle unauthorized if token expires
      if (response.status === 401) {
        localStorage.clear(); 
        window.location.href = "/login";
      }

      const result = await response.json();
      return result.data ? result.data : result;
    } catch (err) {
      console.error("API Request Error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // Removed [token] dependency

  // 2. Memoized Actions
  const fetchExternalJobs = useCallback(async (params = "") => {
    const data = await apiRequest(`/jobs/external?${params}`);
    if (data) { setJobs(data); }
    else { setJobs(dummyJobs); }
  }, [apiRequest]);

  const fetchJobDetails = useCallback(async (id) => {
    return await apiRequest(`/jobs/external/${id}`);
  }, [apiRequest]);

  const trackApplication = useCallback(async (jobData) => {
    const payload = {
      position: jobData.position,
      company: jobData.company,
      jobLocation: jobData.jobLocation,
      jobId: jobData.id,
      jobType: jobData.jobType,
      status: jobData.status,
      applicationLink: jobData.applicationLink,
      resume:jobData.resume,
      notes: jobData.notes || `${status} via Trackly on ${new Date().toLocaleDateString()}`
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
    setApplications(prev => prev.map(app =>
      app._id === id ? { ...app, status: newStatus } : app
    ));

    try {
      await apiRequest(`/applications/my-applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      fetchMyApplications();
    }
  }, [apiRequest, fetchMyApplications]);

  const deleteApplication = useCallback(async (id) => {
    const success = await apiRequest(`/applications/my-applications/${id}`, {
      method: 'DELETE'
    });
    if (success !== null) {
      setApplications(prev => prev.filter(app => app._id !== id));
    }
  }, [apiRequest]);

  const fetchUserDetails = useCallback(async () => {
    const data = await apiRequest("/users", {
      method: 'GET'
    });
    if (data) {
      setUsers(data);
    }
  }, [apiRequest]);

  const fetchUserById = useCallback(async (id) => {
    const data = await apiRequest(`/users/${id}`, {
      method: 'GET'
    });
    // Safely access data.user
    return data?.user || data;
  }, [apiRequest]);

  const fetchUserApplications = useCallback(async (userId) => {
    try {
      const data = await apiRequest(`/admin/user-applications/${userId}`);
      if (data) {
        setUserApplications(data);
      }
    } catch (error) {
      console.error("Error fetching user applications:", error);
    }
  }, [apiRequest]);

  const deleteUserAction = useCallback(async (userId) => {
    try {
      const data = await apiRequest(`/delete/${userId}`, {
        method: 'DELETE'
      });

      if (data && data.success) {
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Delete Error:", error.message);
      return false;
    }
  }, [apiRequest]);

  // 3. Memoized Context Value
  const value = useMemo(() => ({
    jobs,
    users,
    applications,
    loading,
    error,
    selectedUser,
    setSelectedUser,
    userApplications,
    fetchUserApplications,
    fetchExternalJobs,
    fetchJobDetails,
    trackApplication,
    fetchMyApplications,
    updateApplicationStatus,
    deleteApplication,
    fetchUserDetails,
    fetchUserById,
    deleteUserAction
  }), [
    jobs, users, applications, loading, error, selectedUser, userApplications,
    fetchUserApplications, fetchExternalJobs, fetchJobDetails, trackApplication,
    fetchMyApplications, updateApplicationStatus, deleteApplication, fetchUserDetails,
    fetchUserById, deleteUserAction
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);