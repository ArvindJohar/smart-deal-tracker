import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [topDeals, setTopDeals] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [analyticsRes, topDealsRes] = await Promise.all([
                    API.get('/deals/analytics'),
                    API.get('/deals/top')
                ]);

                setAnalytics(analyticsRes.data);
                setTopDeals(topDealsRes.data);

            } catch (err) {
                console.log("FULL ERROR:", err);
                console.log("RESPONSE:", err.response);
                console.log("DATA:", err.response?.data);
                alert(err.response?.data?.message || 'Failed to load dashboard');
            }
        };

        fetchData();
    }, []);

    if (!analytics) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="top-bar">
                <button onClick={() => navigate(-1)} className="btn secondary">
                    ← Back
                </button>
            </div>
            <h2>Dashboard</h2>

            {/* Analytics */}
            <div className="analytics">
                <div className="card">
                    <p>Total Deals</p>
                    <h3>{analytics.totalDeals}</h3>
                </div>

                <div className="card">
                    <p>Total Savings</p>
                    <h3>₹{analytics.totalSavings}</h3>
                </div>

                <div className="card">
                    <p>Avg Discount</p>
                    <h3>{analytics.avgDiscount}%</h3>
                </div>
            </div>

            {/* Top Deals */}
            <h3 style={{ marginTop: '20px' }}>Top Deals</h3>

            {topDeals.length === 0 ? (
                <p>No top deals</p>
            ) : (
                topDeals.map((deal) => (
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

export default Dashboard;