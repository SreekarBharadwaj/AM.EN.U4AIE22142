import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Heatmap from 'react-heatmap-grid';
import axios from 'axios';

const CorrelationHeatmap = () => {
  const [correlationData, setCorrelationData] = useState([]);
  const [average, setAverage] = useState({});
  const [stdDev, setStdDev] = useState({});

  useEffect(() => {
    const fetchCorrelationData = async () => {
      try {
        const response = await axios.get(`/api/correlation-data`);
        setCorrelationData(response.data);

        // Calculate average and standard deviation for each stock
        const avg = {};
        const std = {};
        response.data.forEach((row, i) => {
          row.forEach((value, j) => {
            if (!avg[i]) avg[i] = 0;
            if (!std[i]) std[i] = 0;
            avg[i] += value;
            std[i] += value * value;
          });
        });

        Object.keys(avg).forEach((key) => {
          avg[key] /= response.data.length;
          std[key] = Math.sqrt(std[key] / response.data.length - avg[key] * avg[key]);
        });

        setAverage(avg);
        setStdDev(std);
      } catch (error) {
        console.error('Error fetching correlation data', error);
      }
    };

    fetchCorrelationData();
  }, []);

  const handleCellHover = (row, col) => {
    alert(`Average: ${average[row].toFixed(2)}, Std Dev: ${stdDev[row].toFixed(2)}`);
  };

  return (
    <Box>
      <Typography variant="h4">Correlation Heatmap</Typography>
      <Box marginTop="20px">
        <Heatmap
          data={correlationData}
          xLabels={['Stock 1', 'Stock 2', 'Stock 3']} // Replace with actual stock names
          yLabels={['Stock 1', 'Stock 2', 'Stock 3']} // Replace with actual stock names
          cellStyle={(x, y) => ({
            backgroundColor: `rgb(255, ${255 - Math.abs(correlationData[x][y]) * 255}, 255)`,
          })}
          onClick={handleCellHover}
        />
      </Box>
    </Box>
  );
};

export default CorrelationHeatmap;
