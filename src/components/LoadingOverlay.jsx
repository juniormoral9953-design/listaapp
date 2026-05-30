// src/components/LoadingOverlay.jsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingOverlay({ message = 'Carregando...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        gap: 2,
        color: 'text.secondary',
      }}
    >
      <CircularProgress color="primary" size={48} thickness={4} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
