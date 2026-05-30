// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a56a4',
      light: '#4a7fc1',
      dark: '#0e3470',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e8732a',
      light: '#f0975c',
      dark: '#b3521a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f4fa',
      paper: '#ffffff',
    },
    success: { main: '#2e7d32' },
    error: { main: '#c62828' },
    warning: { main: '#e65100' },
    text: {
      primary: '#1a2340',
      secondary: '#4a5680',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Segoe UI", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: '0.3px' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1a56a4, #2e6bbf)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(26,86,164,0.08)',
          border: '1px solid rgba(26,86,164,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #0e3470 0%, #1a56a4 100%)',
          boxShadow: '0 2px 20px rgba(14,52,112,0.3)',
        },
      },
    },
  },
});

export default theme;
