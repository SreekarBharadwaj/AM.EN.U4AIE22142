const express = require('express');
const router = express.Router();
const { fetchPriceHistory } = require('../services/apiClient');
const { calculateAverage } = require('../services/statsUtils');

router.get('/stocks/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;

    if (aggregation !== 'average') {
        return res.status(400).json({ error: 'Only average aggregation supported' });
    }

    try {
        const priceHistory = await fetchPriceHistory(ticker, minutes);
        const avgPrice = calculateAverage(priceHistory);

        res.json({
            averageStockPrice: avgPrice,
            priceHistory
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

module.exports = router;
