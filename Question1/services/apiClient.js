const axios = require('axios');
const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

async function fetchPriceHistory(ticker, minutes) {
    const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = { fetchPriceHistory };
