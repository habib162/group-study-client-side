import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) =>{
    const {currentUser,loading} = UseAuth();
    const location = useLocation();

 

    if (loading) {
        return (
                <div className="flex justify-center py-20">
                        <span className="loading loading-spinner text-success"></span>
                    </div>
        )
    }
    if (currentUser) {
        return children
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>

}

export default PrivateRoute;