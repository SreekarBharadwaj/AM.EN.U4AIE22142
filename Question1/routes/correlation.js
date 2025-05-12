const express = require('express');
const router = express.Router();
const { fetchPriceHistory } = require('../services/apiClient');
const { calculateAverage, calculateCorrelation } = require('../services/statsUtils');

router.get('/stockcorrelation', async (req, res) => {
    const { minutes, ticker: tickers } = req.query;

    if (!Array.isArray(tickers) || tickers.length !== 2) {
        return res.status(400).json({ error: 'Exactly two tickers required' });
    }

    try {
        const [history1, history2] = await Promise.all([
            fetchPriceHistory(tickers[0], minutes),
            fetchPriceHistory(tickers[1], minutes)
        ]);

        const prices1 = history1.map(p => p.price);
        const prices2 = history2.map(p => p.price);
        const correlation = calculateCorrelation(prices1, prices2);

        const avg1 = calculateAverage(history1);
        const avg2 = calculateAverage(history2);

        res.json({
            correlation,
            stocks: {
                [tickers[0]]: {
                    averagePrice: avg1,
                    priceHistory: history1
                },
                [tickers[1]]: {
                    averagePrice: avg2,
                    priceHistory: history2
                }
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error calculating correlation' });
    }
});

module.exports = router;
