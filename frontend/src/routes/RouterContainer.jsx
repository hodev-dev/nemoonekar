import React from 'react'
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import Scafold from '../components/layouts/Scafold';
import { BrowserRouter as Router } from "react-router-dom";
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error404 from './Error404';

const RouterContainer = () => {
    return (
        <Router >
            <Routes>
                <Route errorElement={<Error404 />} path="/login" element={
                    <ProtectLogin>
                        <Login />
                    </ProtectLogin>
                } />
                <Route errorElement={<Error404 />} path="/register" element={
                    <ProtectLogin>
                        <Register />
                    </ProtectLogin>
                } />
                <Route
                    path="/"
                    errorElement={<Error404 />}
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route errorElement={<Error404 />} path="*" element={<Error404 />} />
            </Routes>
        </Router>
    )
}
function RequireAuth({ children }) {
    const { isLoggedin } = useSelector((state) => state.auth);
    let location = useLocation();
    if (!isLoggedin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

function ProtectLogin({ children }) {
    const { isLoggedin } = useSelector((state) => state.auth);
    let location = useLocation();
    if (isLoggedin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}


export default RouterContainer