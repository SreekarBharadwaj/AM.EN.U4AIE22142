import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const StockPage = () => {
  const [data, setData] = useState([]);
  const [average, setAverage] = useState(0);
  const [timeFrame, setTimeFrame] = useState(5); // Default to last 5 minutes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/stock-data?timeFrame=${timeFrame}`);
        setData(response.data);
        const avg = response.data.reduce((sum, point) => sum + point.price, 0) / response.data.length;
        setAverage(avg);
      } catch (error) {
        console.error('Error fetching stock data', error);
      }
    };

    fetchData();
  }, [timeFrame]);

  const handleTimeFrameChange = (time) => {
    setTimeFrame(time);
  };

  return (
    <Box>
      <Typography variant="h4">Stock Price Chart</Typography>
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Button onClick={() => handleTimeFrameChange(5)} variant="contained">
          Last 5 Minutes
        </Button>
        <Button onClick={() => handleTimeFrameChange(15)} variant="contained">
          Last 15 Minutes
        </Button>
        <Button onClick={() => handleTimeFrameChange(30)} variant="contained">
          Last 30 Minutes
        </Button>
      </Box>

      <Box marginTop="20px">
        <Typography variant="h6">Average Price: {average.toFixed(2)}</Typography>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StockPage;
