import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AlreadyLoggedInRoute({children}) {

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
        return <Navigate to="/admin" ></Navigate>;
    }
    return children;
}
