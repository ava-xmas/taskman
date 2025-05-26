import { useAuth } from "./Provider";
import { useLocation, Outlet, Navigate } from "react-router-dom";

export const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    return (
        auth.token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}
