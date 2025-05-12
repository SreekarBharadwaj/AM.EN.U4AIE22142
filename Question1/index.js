const express = require('express');
const app = express();
const averageRoute = require('./routes/average');
const correlationRoute = require('./routes/correlation');

app.use(express.json());
app.use('/', averageRoute);
app.use('/', correlationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
