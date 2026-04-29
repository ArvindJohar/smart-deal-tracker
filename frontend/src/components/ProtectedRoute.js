import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.token) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;