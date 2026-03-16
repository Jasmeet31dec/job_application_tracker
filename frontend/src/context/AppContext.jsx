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
      return result.data ? result.data : result;
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
    if (data){setJobs(data);}
    else{ setJobs(dummyJobs);}
  }, [apiRequest]);

  const fetchJobDetails = useCallback(async (id) => {
    return await apiRequest(`/jobs/external/${id}`);
  }, [apiRequest]);

  const trackApplication = useCallback(async (jobData, status) => {
    const payload = {
      position: jobData.title,
      company: jobData.company,
      jobLocation: jobData.location,
      jobId: jobData.id,
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
    // 1. Update UI Instantly (Optimistic)
    setApplications(prev => prev.map(app =>
      app._id === id ? { ...app, status: newStatus } : app
    ));

    // 2. Perform API call in background
    try {
      await apiRequest(`/applications/my-applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      // Rollback on error if necessary
      fetchMyApplications();
    }
  }, [apiRequest]);

  const deleteApplication = useCallback(async (id) => {
    const success = await apiRequest(`/applications/my-applications/${id}`, {
      method: 'DELETE'
    });
    if (success !== null) {
      setApplications(prev => prev.filter(app => app._id !== id));
    }
  }, [apiRequest]);

  //fetch user details
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
    return data.user;
    
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

const deleteUserAction = async (userId) => {
    try {
      // 1. Call Backend
      const data = await apiRequest(`/delete/${userId}`, {
      method: 'DELETE'
    });

      if (data.success) {
        // 2. Update Frontend State (Remove user from local array)
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
        alert(data.message? data.message : "User deleted successfully");
        return true;
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Failed to delete user");
      return false;
    }
  };

  // 3. Memoized Context Value
  // This ensures the object provided to the app only changes when data actually changes
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
    jobs, users, applications, loading, error,
    fetchExternalJobs, fetchJobDetails, trackApplication,
    fetchMyApplications, updateApplicationStatus, deleteApplication, fetchUserDetails,fetchUserById,
    deleteUserAction
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);