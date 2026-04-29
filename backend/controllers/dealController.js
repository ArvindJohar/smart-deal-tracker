const Deal = require('../models/Deal');

// Add deal
const createDeal = async (req, res) => {
    try {
        console.log(req.body);
        const { title, price, originalPrice, platform, link } = req.body;
        if (price > originalPrice) {
            return res.status(400).json({ message: 'Price cannot be greater than original price' });
        }
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        const deal = await Deal.create({
            user: req.user._id,
            title,
            price,
            originalPrice,
            discount,
            platform,
            link
        });

        res.status(201).json(deal);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all deals for logged-in user
const getDeals = async (req, res) => {
    try {
        let query = { user: req.user._id };

        // filter by platform
        if (req.query.platform) {
            query.platform = req.query.platform;
        }

        // filter by max price
        if (req.query.maxPrice) {
            query.price = { $lte: Number(req.query.maxPrice) };
        }

        const deals = await Deal.find(query);

        res.json(deals);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        if (deal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Get updated values (fallback to old ones if not provided)
        const price = req.body.price ?? deal.price;
        const originalPrice = req.body.originalPrice ?? deal.originalPrice;

        // Validate
        if (price > originalPrice) {
            return res.status(400).json({ message: 'Price cannot be greater than original price' });
        }

        // Recalculate discount
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

        // Update fields
        deal.title = req.body.title ?? deal.title;
        deal.price = price;
        deal.originalPrice = originalPrice;
        deal.discount = discount;
        deal.platform = req.body.platform ?? deal.platform;
        deal.link = req.body.link ?? deal.link;

        const updatedDeal = await deal.save();

        res.json(updatedDeal);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        if (deal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await deal.deleteOne();

        res.json({ message: 'Deal removed' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnalytics = async (req, res) => {
    try {
        const deals = await Deal.find({ user: req.user._id });

        if (deals.length === 0) {
            return res.json({
                totalDeals: 0,
                totalSavings: 0,
                avgDiscount: 0,
                bestDeal: null
            });
        }

        let totalSavings = 0;
        let totalDiscount = 0;
        let bestDeal = deals[0];

        deals.forEach(deal => {
            const savings = deal.originalPrice - deal.price;
            totalSavings += savings;
            totalDiscount += deal.discount;

            if (deal.discount > bestDeal.discount) {
                bestDeal = deal;
            }
        });

        const avgDiscount = Math.round(totalDiscount / deals.length);

        res.json({
            totalDeals: deals.length,
            totalSavings,
            avgDiscount,
            bestDeal
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTopDeals = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 5;

        const deals = await Deal.find({ user: req.user._id })
            .sort({ discount: -1 })
            .limit(limit);
        res.json(deals);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { createDeal, getDeals, updateDeal, deleteDeal, getAnalytics, getTopDeals };