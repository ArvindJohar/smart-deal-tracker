import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function AddDeal() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [platform, setPlatform] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!title || !price || !originalPrice || !platform) {
            return alert('Please fill all required fields');
        }

        try {
            setLoading(true);

            await API.post('/deals', {
                title,
                price: Number(price),
                originalPrice: Number(originalPrice),
                platform,
                link
            });

            alert('Deal added');

            navigate('/deals'); // redirect back

        } catch (err) {
            alert(err.response?.data?.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <button onClick={() => navigate(-1)} className="btn secondary">
                    ← Back
                </button>
            </div>
            <h2>Add Deal</h2>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                placeholder="Original Price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
            />

            <input
                placeholder="Platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            />

            <input
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Adding...' : 'Add Deal'}
            </button>
        </div>
    );
}

export default AddDeal;