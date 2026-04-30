import { API_BASE_URL } from '../config';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { dummyJobs } from '../data/dummyJobs';
import toast from 'react-hot-toast';


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

  // 1. Logic to refresh the token from backend
  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL1}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const handleAuthFailure = () => {
    toast((t) => (
      <div className="flex flex-col gap-2 p-1">
        <p className="font-semibold text-sm">⚠️ Session Expired</p>
        <p className="text-xs">Would you like to extend your session?</p>
        <div className="flex gap-2 mt-2">
          {/* REFRESH OPTION */}
          <button 
            onClick={async () => {
              const success = await refreshToken();
              if (success) {
                toast.success("Session extended!", { id: t.id });
              } else {
                performLogout(t.id);
              }
            }}
            style={{ background: '#4f46e5', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}
          >
            Yes, Stay
          </button>
          
          {/* LOGOUT OPTION */}
          <button 
            onClick={() => performLogout(t.id)}
            style={{ background: '#ef4444', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}
          >
            No, Logout
          </button>
        </div>
      </div>
    ), { duration: Infinity, id: 'session-chance' });
  };

  const performLogout = (toastId) => {
    localStorage.removeItem('token');
    setApplications([]);
    toast.error("Logged out.", { id: toastId });
    setTimeout(() => { window.location.href = '/login'; }, 2000);
  };
  
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
      if (response.status === 401 || response.status === 403) {
        handleAuthFailure();    // central cleanup function
        return;
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