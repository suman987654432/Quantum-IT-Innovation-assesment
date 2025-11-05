
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');



    if (!token || !user) {
        console.log('ProtectedRoute - Redirecting to signin');
        return <Navigate to="/signin" replace />;
    }


    try {
        const userData = JSON.parse(user);
        console.log('ProtectedRoute - User data valid:', userData.email || userData.name);
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.log('ProtectedRoute - Invalid user data, redirecting to signin');
        return <Navigate to="/signin" replace />;
    }

    console.log('ProtectedRoute - User authenticated, rendering children');
    return children;
};

export default ProtectedRoute;
