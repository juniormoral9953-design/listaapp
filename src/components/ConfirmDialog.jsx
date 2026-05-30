// src/components/ConfirmDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function ConfirmDialog({ open, title, message, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <Box
          sx={{
            bgcolor: 'error.light',
            borderRadius: '50%',
            p: 0.8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <WarningAmberRoundedIcon sx={{ color: 'error.dark', fontSize: 22 }} />
        </Box>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Confirmar exclusão
        </Button>
      </DialogActions>
    </Dialog>
  );
}
