import React from 'react';
import { Container, Box } from '@mui/material';
import StockPage from './StockPage';
import CorrelationHeatmap from './CorrelationHeatmap';

function App() {
  return (
    <Container maxWidth="lg">
      <Box marginTop="50px">
        <StockPage />
      </Box>
      <Box marginTop="50px">
        <CorrelationHeatmap />
      </Box>
    </Container>
  );
}

export default App;
