import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Could not fetch user data');
        }

        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  //1. loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
        Error loading users: {error}
      </div>
    );
  }

  // 3. Main UI
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800">Community Members</h2>
        <p className="text-sm text-gray-500 mt-1">Total registered users: {users.length}</p>
      </div>

      <div className="divide-y divide-gray-100">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id || user.email}
              className="flex items-center px-6 py-4 hover:bg-indigo-50/30 transition duration-150"
            >
              {/* Profile Icon */}
              <div className="flex-shrink-0 h-11 w-11 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User Details */}
              <div className="ml-4">
                <h3 className="text-sm font-bold text-gray-900">{user.name}</h3>
                <p className="text-xs text-gray-500 font-mono italic">{user.email}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-400">
            No users found in the system.
          </div>
        )}
      </div>
    </div>
  );
};





export default Dashboard;
