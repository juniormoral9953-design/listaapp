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
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

const OPÇÕES_LOCALIDADE = [
  { label: 'Sede Urbana', options: [{ value: 'Centro', label: 'Centro' }, { value: 'São José', label: 'São José' }, { value: 'Várzea', label: 'Várzea' }, { value: 'São Francisco', label: 'São Francisco' }] },
  { label: 'Distrito de Aruaru', options: [{ value: 'Aruaru', label: 'Aruaru' }, { value: 'Patos', label: 'Patos' }] },
  { label: 'Distrito de Boa Água', options: [{ value: 'Boa Água', label: 'Boa Água' }, { value: 'Lagoa Funda', label: 'Lagoa Funda' }, { value: 'Quixelô', label: 'Quixelô' }, { value: 'São Gonçalo', label: 'São Gonçalo' }, { value: 'Assentamento Terra Nova', label: 'Assentamento Terra Nova' }, { value: 'Assentamento Jucá Grosso', label: 'Assentamento Jucá Grosso' }, { value: 'Assentamento Bom Jesus', label: 'Assentamento Bom Jesus' }, { value: 'Timbaúba', label: 'Timbaúba' }] },
  { label: 'Distrito de Pedras', options: [{ value: 'Pedras', label: 'Pedras' }, { value: 'Lagoa do Frade', label: 'Lagoa do Frade' }, { value: 'Poção', label: 'Poção' }, { value: 'Patinhos', label: 'Patinhos' }, { value: 'P.A. Belford Roxo', label: 'P.A. Belford Roxo' }, { value: 'Setor O', label: 'Setor O' }] },
  { label: 'Distrito de Uiraponga', options: [{ value: 'Uiraponga', label: 'Uiraponga' }, { value: 'Poço do Barro', label: 'Poço do Barro' }] },
  { label: 'Distrito de Juazeiro da Quintina', options: [{ value: 'Juazeiro da Quintina', label: 'Juazeiro da Quintina' }, { value: 'Lagoa das Carnaúbas', label: 'Lagoa das Carnaúbas' }, { value: 'Lagoa do Tapuio', label: 'Lagoa do Tapuio' }, { value: 'Aroeira', label: 'Aroeira' }] },
  { label: 'Distrito de Roldão', options: [{ value: 'Roldão', label: 'Roldão' }, { value: 'Extrema', label: 'Extrema' }, { value: 'Poço da Pedra', label: 'Poço da Pedra' }] },
  { label: 'Distrito de Lagoa Grande', options: [{ value: 'Lagoa Grande', label: 'Lagoa Grande' }, { value: 'Sítio Tapera', label: 'Sítio Tapera' }, { value: 'Lagoa da Barbada', label: 'Lagoa da Barbada' }, { value: 'Juazeiro de Baixo', label: 'Juazeiro de Baixo' }] }
];

const EMPTY_FORM = {
  nome: '',
  endereco: '',
  contato: '',
  local: '',
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const isEdit = Boolean(pessoa);

  useEffect(() => {
    if (open) {
      setForm(
        pessoa
          ? {
              nome: pessoa.nome || '',
              endereco: pessoa.endereco || '',
              contato: pessoa.contato || '',
              local: pessoa.local || '',
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

  const handleChangeLocal = (selectedOption) => {
    setForm((prev) => ({ ...prev, local: selectedOption?.value || '' }));
    if (errors.local) setErrors((prev) => ({ ...prev, local: '' }));
  };

  const handleSubmit = () => {
    if (validate()) onSave(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          display: 'flex',
          flexDirection: 'column',
          maxHeight: isSelectOpen ? '95vh' : '85vh',
          top: isSelectOpen ? 10 : 'auto',
          transition: 'all 0.3s ease',
          '@media (max-width: 768px)': {
            maxHeight: isSelectOpen ? '95vh' : '90vh',
            top: isSelectOpen ? 10 : 0,
            width: '100%',
            margin: 0,
          },
        },
      }}
    >
      <DialogTitle sx={{ p: 0, position: 'sticky', top: 0, zIndex: 10 }}>
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

      <DialogContent

        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
          py: 3,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#999',
          },
        }}
      >
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
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#666' }}>Local</Typography>
              <Select
                value={form.local ? { value: form.local, label: form.local } : null}
                onChange={handleChangeLocal}
                onMenuOpen={() => setIsSelectOpen(true)}
                onMenuClose={() => setIsSelectOpen(false)}
                options={OPÇÕES_LOCALIDADE}
                isSearchable={true}
                isClearable={true}
                noOptionsMessage={() => 'Local não encontrado'}
                placeholder="Selecione uma localidade..."
                menuPlacement="top"
                menuPosition="fixed"
                menuPortalTarget={document.body}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    fontSize: '16px',
                    minHeight: '42px',
                    borderColor: state.isFocused ? '#1976d2' : '#ccc',
                    boxShadow: state.isFocused ? '0 0 0 1px #1976d2' : 'none',
                    '&:hover': {
                      borderColor: '#999',
                    },
                  }),
                  input: (base) => ({
                    ...base,
                    fontSize: '16px',
                    minHeight: '42px',
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: '16px',
                    backgroundColor: state.isSelected ? '#1976d2' : state.isFocused ? '#e3f2fd' : 'white',
                    color: state.isSelected ? 'white' : 'black',
                    cursor: 'pointer',
                    padding: '10px 12px',
                  }),
                  groupHeading: (base) => ({
                    ...base,
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#666',
                    padding: '8px 12px',
                    textTransform: 'none',
                  }),
                  menuList: (base) => ({
                    ...base,
                    fontSize: '16px',
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
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

      <Divider sx={{ m: 0 }} />
      <DialogActions
        sx={{
          position: 'sticky',
          bottom: 0,
          px: 3,
          py: 2,
          gap: 1,
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
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
