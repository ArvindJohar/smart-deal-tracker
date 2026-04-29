import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (user && user.token) {
            navigate('/deals');
        }
    }, [navigate]);
    const handleLogin = async () => {
        if (!email || !password) {
            return alert('Please enter email and password');
        }

        try {
            setLoading(true);

            const { data } = await API.post('/users/login', {
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(data));
            navigate('/deals');

        } catch (err) {
            alert(err.response?.data?.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <h2>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="auth-switch">
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p className="auth-switch">
                Don’t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;