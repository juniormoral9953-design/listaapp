// src/hooks/useConfirm.js
import { useState, useCallback } from 'react';

export function useConfirm() {
  const [confirm, setConfirm] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const askConfirm = useCallback((title, message, onConfirm) => {
    setConfirm({ open: true, title, message, onConfirm });
  }, []);

  const handleClose = useCallback(() => {
    setConfirm((prev) => ({ ...prev, open: false, onConfirm: null }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (confirm.onConfirm) confirm.onConfirm();
    handleClose();
  }, [confirm, handleClose]);

  return { confirm, askConfirm, handleClose, handleConfirm };
}
