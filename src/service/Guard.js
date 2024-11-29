import React from "react";
import { Navigate, replace, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

export const protectedRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const adminRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAdmin() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

