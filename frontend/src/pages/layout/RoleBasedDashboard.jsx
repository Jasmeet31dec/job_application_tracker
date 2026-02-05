import React from 'react';
import { jwtDecode } from 'jwt-decode'; // Essential import
import AdminDashboard from '../../components/AdminDashboard';
import CustomerDashboard from '../../components/CustomerDashboard';

const RoleBasedDashboard = () => {
    const token = localStorage.getItem("token");
    let decoded = null;

    if (token) {
        try {
            decoded = jwtDecode(token);
        } catch (err) {
            console.error("Invalid token session:", err);
            // Optionally: localStorage.removeItem("token");
        }
    }

    // Protection logic: If no token exists, don't attempt to render roles
    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">Session Expired</h2>
                <p className="text-slate-500 mt-2">Please log in to access your tracking board.</p>
            </div>
        );
    }

    return (
        <>
            {decoded?.role === "admin" ? (
                /* Admin View: User Management Console */
                <AdminDashboard />
            ) : (
                /* Customer View: Job Application Board */
                <CustomerDashboard />
            )}
        </>
    );
};

export default RoleBasedDashboard;