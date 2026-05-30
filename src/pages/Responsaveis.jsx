// src/pages/Responsaveis.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import { responsaveisService } from '../services/responsaveisService';
import { pessoasService } from '../services/pessoasService';
import { useSnackbar } from '../hooks/useSnackbar';
import { useConfirm } from '../hooks/useConfirm';
import PageHeader from '../components/PageHeader';
import ResponsavelCard from '../components/ResponsavelCard';
import ResponsavelFormDialog from '../components/ResponsavelFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import GlobalSnackbar from '../components/GlobalSnackbar';
import EmptyState from '../components/EmptyState';
import LoadingOverlay from '../components/LoadingOverlay';
import ResponsaveisTable from '../components/ResponsaveisTable';

export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState([]);
  const [pessoasCounts, setPessoasCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { confirm, askConfirm, handleClose: closeConfirm, handleConfirm } = useConfirm();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const lista = await responsaveisService.listar();
      setResponsaveis(lista);
      const counts = await Promise.all(
        lista.map(async (r) => {
          const pessoas = await pessoasService.listar(r.id);
          return { id: r.id, count: pessoas.length };
        })
      );
      const countMap = {};
      counts.forEach(({ id, count }) => { countMap[id] = count; });
      setPessoasCounts(countMap);
    } catch (e) {
      showSnackbar('Erro ao carregar responsáveis.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleOpenCreate = () => { setEditTarget(null); setDialogOpen(true); };
  const handleOpenEdit = (r) => { setEditTarget(r); setDialogOpen(true); };
  const handleCloseDialog = () => { setDialogOpen(false); setEditTarget(null); };

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (editTarget) {
        await responsaveisService.atualizar(editTarget.id, form);
        showSnackbar('Responsável atualizado com sucesso!');
      } else {
        await responsaveisService.criar(form);
        showSnackbar('Responsável criado com sucesso!');
      }
      handleCloseDialog();
      loadData();
    } catch (e) {
      showSnackbar('Erro ao salvar responsável.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (r) => {
    askConfirm(
      'Excluir responsável',
      `Tem certeza que deseja excluir "${r.nome}"? Todas as pessoas vinculadas também serão removidas.`,
      async () => {
        try {
          await responsaveisService.excluir(r.id);
          showSnackbar('Responsável excluído com sucesso!');
          loadData();
        } catch (e) {
          showSnackbar('Erro ao excluir responsável.', 'error');
        }
      }
    );
  };

  const filtered = responsaveis.filter((r) =>
    r.nome?.toLowerCase().includes(search.toLowerCase()) ||
    r.contato?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader
        title="Responsáveis"
        subtitle={`${responsaveis.length} responsável${responsaveis.length !== 1 ? 'is' : ''} cadastrado${responsaveis.length !== 1 ? 's' : ''}`}
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
            Novo responsável
          </Button>
        }
      />

      {/* Toolbar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Buscar por nome ou contato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 220 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, v) => v && setViewMode(v)}
          size="small"
        >
          <ToggleButton value="grid">
            <Tooltip title="Grade"><GridViewRoundedIcon fontSize="small" /></Tooltip>
          </ToggleButton>
          <ToggleButton value="list">
            <Tooltip title="Lista"><ViewListRoundedIcon fontSize="small" /></Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <LoadingOverlay message="Carregando responsáveis..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={search ? 'Nenhum resultado encontrado' : 'Nenhum responsável cadastrado'}
          description={
            search
              ? `Não encontramos resultados para "${search}".`
              : 'Comece cadastrando o primeiro responsável para gerenciar suas listas de pessoas.'
          }
          actionLabel={!search ? 'Cadastrar responsável' : undefined}
          onAction={!search ? handleOpenCreate : undefined}
        />
      ) : viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {filtered.map((r) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={r.id}>
              <ResponsavelCard
                responsavel={r}
                pessoasCount={pessoasCounts[r.id] ?? 0}
                onEdit={() => handleOpenEdit(r)}
                onDelete={() => handleDelete(r)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <ResponsaveisTable
          responsaveis={filtered}
          pessoasCounts={pessoasCounts}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      <ResponsavelFormDialog
        open={dialogOpen}
        responsavel={editTarget}
        onClose={handleCloseDialog}
        onSave={handleSave}
        loading={saving}
      />

      <ConfirmDialog
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />

      <GlobalSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </Box>
  );
}
