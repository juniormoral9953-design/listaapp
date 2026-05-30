// src/components/PessoaFormDialog.jsx
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
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

const EMPTY_FORM = {
  nome: '',
  endereco: '',
  contato: '',
  observacao: '',
};

export default function PessoaFormDialog({
  open,
  pessoa,
  onClose,
  onSave,
  loading,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(pessoa);

  useEffect(() => {
    if (open) {
      setForm(
        pessoa
          ? {
              nome: pessoa.nome || '',
              endereco: pessoa.endereco || '',
              contato: pessoa.contato || '',
              observacao: pessoa.observacao || '',
            }
          : EMPTY_FORM
      );
      setErrors({});
    }
  }, [open, pessoa]);

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório';
    if (!form.endereco.trim()) e.endereco = 'Endereço é obrigatório';
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
            background: 'linear-gradient(135deg, #b3521a 0%, #e8732a 100%)',
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <GroupRoundedIcon sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white' }}>
              {isEdit ? 'Editar Pessoa' : 'Adicionar Pessoa'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 5, pb: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label="Nome *"
              fullWidth
              value={form.nome}
              onChange={handleChange('nome')}
              error={!!errors.nome}
              helperText={errors.nome}
              placeholder="Nome completo"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço *"
              fullWidth
              value={form.endereco}
              onChange={handleChange('endereco')}
              error={!!errors.endereco}
              helperText={errors.endereco}
              placeholder="Rua, número, bairro, cidade"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contato *"
              fullWidth
              value={form.contato}
              onChange={handleChange('contato')}
              error={!!errors.contato}
              helperText={errors.contato}
              placeholder="(00) 00000-0000"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Observação"
              fullWidth
              value={form.observacao}
              onChange={handleChange('observacao')}
              placeholder="Obs. (opcional)"
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
          color="secondary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {loading ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Adicionar pessoa'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
