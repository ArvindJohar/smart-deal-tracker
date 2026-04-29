import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
function Deals() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };
    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const { data } = await API.get('/deals');
                setDeals(data);
            } catch (err) {
                alert('Failed to fetch deals');
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className='container'>
            <div className="center-link">
                <Link to="/dashboard" className="btn secondary">
                    Go to Dashboard
                </Link>
            </div>
            <div className="header">
                <h2>Your Deals</h2>

                <div className="header-actions">
                    <Link to="/add" className="btn primary">
                        + Add Deal
                    </Link>

                    <button onClick={handleLogout} className="btn danger">
                        Logout
                    </button>
                </div>
            </div>

            {deals.length === 0 ? (
                <p className="empty">No deals found</p>
            ) : (
                deals.map((deal) => (
                    <div className="deal" key={deal._id}>
                        <h4>{deal.title}</h4>
                        <p>
                            ₹{deal.price}
                            <span className="discount">
                                {deal.discount ?? 0}% OFF
                            </span>
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Deals;