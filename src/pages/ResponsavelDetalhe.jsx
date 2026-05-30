// src/pages/ResponsavelDetalhe.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useParams } from 'react-router-dom';
import { responsaveisService } from '../services/responsaveisService';
import { pessoasService } from '../services/pessoasService';
import { useSnackbar } from '../hooks/useSnackbar';
import { useConfirm } from '../hooks/useConfirm';
import PageHeader from '../components/PageHeader';
import PessoaFormDialog from '../components/PessoaFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import GlobalSnackbar from '../components/GlobalSnackbar';
import LoadingOverlay from '../components/LoadingOverlay';
import EmptyState from '../components/EmptyState';

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1 }}>
      <Box sx={{ color: 'primary.main', mt: 0.2 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={500} color="text.primary">{value}</Typography>
      </Box>
    </Box>
  );
}

export default function ResponsavelDetalhe() {
  const { id } = useParams();
  const [responsavel, setResponsavel] = useState(null);
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { confirm, askConfirm, handleClose: closeConfirm, handleConfirm } = useConfirm();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [resp, listaPessoas] = await Promise.all([
        responsaveisService.buscarPorId(id),
        pessoasService.listar(id),
      ]);
      setResponsavel(resp);
      setPessoas(listaPessoas);
    } catch (e) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleOpenCreate = () => { setEditTarget(null); setDialogOpen(true); };
  const handleOpenEdit = (p) => { setEditTarget(p); setDialogOpen(true); };
  const handleCloseDialog = () => { setDialogOpen(false); setEditTarget(null); };

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (editTarget) {
        await pessoasService.atualizar(id, editTarget.id, form);
        showSnackbar('Pessoa atualizada com sucesso!');
      } else {
        await pessoasService.criar(id, form);
        showSnackbar('Pessoa adicionada com sucesso!');
      }
      handleCloseDialog();
      loadData();
    } catch (e) {
      showSnackbar('Erro ao salvar pessoa.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (p) => {
    askConfirm(
      'Excluir pessoa',
      `Tem certeza que deseja excluir "${p.nome}"?`,
      async () => {
        try {
          await pessoasService.excluir(id, p.id);
          showSnackbar('Pessoa excluída com sucesso!');
          loadData();
        } catch (e) {
          showSnackbar('Erro ao excluir pessoa.', 'error');
        }
      }
    );
  };

  const filtered = pessoas.filter(
    (p) =>
      p.nome?.toLowerCase().includes(search.toLowerCase()) ||
      p.endereco?.toLowerCase().includes(search.toLowerCase()) ||
      p.contato?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingOverlay message="Carregando dados..." />;

  if (notFound) {
    return (
      <Box>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Responsável não encontrado. Verifique o ID e tente novamente.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title={responsavel?.nome}
        subtitle="Gerenciamento de pessoas vinculadas"
        breadcrumbs={[
          { label: 'Responsáveis', href: '/responsaveis' },
          { label: responsavel?.nome },
        ]}
        action={
          <Button variant="contained" color="secondary" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
            Adicionar pessoa
          </Button>
        }
      />

      <Grid container spacing={3}>
        {/* Painel lateral do responsável */}
        <Grid item xs={12} md={3}>
          <Card sx={{ position: { md: 'sticky' }, top: 80 }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: 'primary.main',
                    fontSize: 28,
                    fontWeight: 700,
                    mx: 'auto',
                    mb: 1.5,
                  }}
                >
                  {responsavel?.nome?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {responsavel?.nome}
                </Typography>
                <Chip
                  icon={<PersonRoundedIcon fontSize="small" />}
                  label={`${pessoas.length} pessoa${pessoas.length !== 1 ? 's' : ''}`}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <InfoRow
                icon={<PhoneRoundedIcon fontSize="small" />}
                label="Contato"
                value={responsavel?.contato}
              />
              {responsavel?.observacao && (
                <InfoRow
                  icon={<NotesRoundedIcon fontSize="small" />}
                  label="Observação"
                  value={responsavel?.observacao}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Lista de pessoas */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              placeholder="Buscar pessoas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {filtered.length === 0 ? (
            <EmptyState
              title={search ? 'Nenhuma pessoa encontrada' : 'Nenhuma pessoa vinculada'}
              description={
                search
                  ? `Nenhuma pessoa corresponde a "${search}".`
                  : 'Adicione a primeira pessoa a este responsável clicando no botão acima.'
              }
              actionLabel={!search ? 'Adicionar pessoa' : undefined}
              onAction={!search ? handleOpenCreate : undefined}
            />
          ) : (
            <Card sx={{ overflow: 'hidden', overflowX: { xs: 'auto', md: 'visible' } }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5, display: { xs: 'none', sm: 'table-cell' } }}
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }}
                    >
                      Nome
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5, display: { xs: 'none', md: 'table-cell' } }}
                    >
                      Endereço
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5, display: { xs: 'none', md: 'table-cell' } }}
                    >
                      Contato
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5, display: { xs: 'none', lg: 'table-cell' } }}
                    >
                      Observação
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, py: 1.5 }}
                    >
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((p, idx) => (
                    <TableRow key={p.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main', fontSize: 12, fontWeight: 700 }}>
                          {idx + 1}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600} fontSize={14}>{p.nome}</Typography>
                      </TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOnRoundedIcon sx={{ fontSize: 13, color: 'text.secondary', flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {p.endereco}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PhoneRoundedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">{p.contato}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.observacao || '—'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Editar">
                          <IconButton size="small" color="primary" onClick={() => handleOpenEdit(p)}>
                            <EditRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton size="small" color="error" onClick={() => handleDelete(p)}>
                            <DeleteRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  bgcolor: 'background.default',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {filtered.length} de {pessoas.length} pessoa{pessoas.length !== 1 ? 's' : ''}
                </Typography>
                <Button size="small" startIcon={<AddRoundedIcon />} color="secondary" variant="outlined" onClick={handleOpenCreate}>
                  Adicionar
                </Button>
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>

      <PessoaFormDialog
        open={dialogOpen}
        pessoa={editTarget}
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
