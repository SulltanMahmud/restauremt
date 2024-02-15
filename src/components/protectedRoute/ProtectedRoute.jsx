import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (!token && !user) {
        console.log("triggered")
        return <Navigate to="/"  replace></Navigate>;
    }
    return children;
}
