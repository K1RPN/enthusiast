// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    const decodedToken = jwt_decode(token);

    if (!allowedRoles.includes(decodedToken.role)) {
        return <Navigate to="/" />;
    }

    return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
