function calculateAverage(priceHistory) {
    if (!priceHistory || priceHistory.length === 0) return 0;
    const sum = priceHistory.reduce((acc, p) => acc + p.price, 0);
    return parseFloat((sum / priceHistory.length).toFixed(6));
}

function calculateCorrelation(X, Y) {
    const n = Math.min(X.length, Y.length);
    if (n === 0) return 0;

    X = X.slice(0, n);
    Y = Y.slice(0, n);

    const meanX = X.reduce((a, b) => a + b) / n;
    const meanY = Y.reduce((a, b) => a + b) / n;

    let numerator = 0, denomX = 0, denomY = 0;

    for (let i = 0; i < n; i++) {
        const dx = X[i] - meanX;
        const dy = Y[i] - meanY;
        numerator += dx * dy;
        denomX += dx * dx;
        denomY += dy * dy;
    }

    const denominator = Math.sqrt(denomX * denomY);
    if (denominator === 0) return 0;

    return parseFloat((numerator / denominator).toFixed(4));
}

module.exports = { calculateAverage, calculateCorrelation };
