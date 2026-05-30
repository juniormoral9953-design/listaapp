// src/components/ResponsavelFormDialog.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const EMPTY_FORM = {
  nome: '',
  contato: '',
  observacao: '',
};

export default function ResponsavelFormDialog({
  open,
  responsavel,
  onClose,
  onSave,
  loading,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(responsavel);

  useEffect(() => {
    if (open) {
      setForm(responsavel ? { nome: responsavel.nome || '', contato: responsavel.contato || '', observacao: responsavel.observacao || '' } : EMPTY_FORM);
      setErrors({});
    }
  }, [open, responsavel]);

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório';
    if (!form.contato.trim()) e.contato = 'Contato é obrigatório';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = () => {
    if (validate()) onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0e3470 0%, #1a56a4 100%)',
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PersonRoundedIcon sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white' }}>
              {isEdit ? 'Editar Responsável' : 'Novo Responsável'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 4, pb: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome *"
              fullWidth
              value={form.nome}
              onChange={handleChange('nome')}
              error={!!errors.nome}
              helperText={errors.nome}
              placeholder="Nome completo do responsável"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contato / Telefone *"
              fullWidth
              value={form.contato}
              onChange={handleChange('contato')}
              error={!!errors.contato}
              helperText={errors.contato}
              placeholder="(00) 00000-0000"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observação"
              fullWidth
              multiline
              rows={3}
              value={form.observacao}
              onChange={handleChange('observacao')}
              placeholder="Informações adicionais (opcional)"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider sx={{ mt: 2 }} />
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {loading ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar responsável'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
