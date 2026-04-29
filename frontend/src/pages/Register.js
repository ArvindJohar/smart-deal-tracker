import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            return alert('Please fill all fields');
        }

        try {
            const { data } = await API.post('/users/register', {
                name,
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(data));
            navigate('/deals');

        } catch (err) {
            console.log("ERROR:", err);
            console.log("RESPONSE:", err.response);
            console.log("DATA:", err.response?.data);
            alert(err.response?.data?.message || 'Error');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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

            <button onClick={handleRegister}>Register</button>

            <p className="auth-switch">
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default Register;