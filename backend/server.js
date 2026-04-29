const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
dotenv.config();

const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
const dealRoutes = require('./routes/dealRoutes');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api/deals', dealRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});