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
  IconButton,
  Tooltip,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useParams, useNavigate } from 'react-router-dom';
import { responsaveisService } from '../services/responsaveisService';
import { pessoasService } from '../services/pessoasService';
import { useSnackbar } from '../hooks/useSnackbar';
import { useConfirm } from '../hooks/useConfirm';
import PessoaFormDialog from '../components/PessoaFormDialog';
import ResponsavelFormDialog from '../components/ResponsavelFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import GlobalSnackbar from '../components/GlobalSnackbar';
import LoadingOverlay from '../components/LoadingOverlay';
import EmptyState from '../components/EmptyState';
import WhatsAppButton from '../components/WhatsAppButton';

function InfoRow({ icon, label, value, action }) {
  if (!value) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
      <Box sx={{ color: 'primary.main', mt: 0.2 }}>{icon}</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
            {label}
          </Typography>
          <Typography variant="body2" fontWeight={500} color="text.primary">{value}</Typography>
        </Box>
        {action}
      </Box>
    </Box>
  );
}

export default function ResponsavelDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responsavel, setResponsavel] = useState(null);
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [responsavelDialogOpen, setResponsavelDialogOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [expandedPessoaId, setExpandedPessoaId] = useState(null);

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

  const handleOpenEditResponsavel = () => { setResponsavelDialogOpen(true); };
  const handleCloseResponsavelDialog = () => { setResponsavelDialogOpen(false); };

  const handleDeleteResponsavel = () => {
    askConfirm(
      'Excluir responsável',
      `Tem certeza que deseja excluir "${responsavel?.nome}"? Todas as pessoas vinculadas também serão removidas.`,
      async () => {
        try {
          await responsaveisService.excluir(id);
          showSnackbar('Responsável excluído com sucesso!');
          navigate('/responsaveis');
        } catch (e) {
          showSnackbar('Erro ao excluir responsável.', 'error');
        }
      }
    );
  };

  const handleSaveResponsavel = async (form) => {
    setSaving(true);
    try {
      await responsaveisService.atualizar(id, form);
      showSnackbar('Responsável atualizado com sucesso!');
      handleCloseResponsavelDialog();
      loadData();
    } catch (e) {
      showSnackbar('Erro ao salvar responsável.', 'error');
    } finally {
      setSaving(false);
    }
  };

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
      {/* Breadcrumb + Botão Adicionar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' } }}
        >
          <Link
            color="primary"
            underline="hover"
            sx={{ cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
            onClick={() => navigate('/responsaveis')}
          >
            Responsáveis
          </Link>
          <Typography color="text.secondary" fontSize={13}>
            {responsavel?.nome}
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddRoundedIcon />}
          onClick={handleOpenCreate}
          sx={{
            flexShrink: 0,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            padding: { xs: '6px 12px', sm: '8px 16px' },
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Adicionar pessoa
          </Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
            + Pessoa
          </Box>
        </Button>
      </Box>

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
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Chip
                    icon={<PersonRoundedIcon fontSize="small" />}
                    label={`${pessoas.length} pessoa${pessoas.length !== 1 ? 's' : ''}`}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                  <Tooltip title="Editar responsável">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={handleOpenEditResponsavel}
                    >
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir responsável">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={handleDeleteResponsavel}
                    >
                      <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Divider sx={{ my: 2 }} />

              <InfoRow
                icon={<PhoneRoundedIcon fontSize="small" />}
                label="Contato"
                value={responsavel?.contato}
                action={responsavel?.contato ? <WhatsAppButton telefone={responsavel?.contato} size="small" /> : null}
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
            <Card sx={{ overflow: 'hidden' }}>
              {filtered.map((p, idx) => (
                <Box key={p.id}>
                  {/* LINHA PRINCIPAL - NOME + WHATSAPP + AÇÕES */}
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      bgcolor: expandedPessoaId === p.id ? 'action.hover' : 'transparent',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {/* ÍNDICE + NOME */}
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'secondary.main',
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </Avatar>

                    <Box
                      sx={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => setExpandedPessoaId(expandedPessoaId === p.id ? null : p.id)}
                    >
                      <Typography fontWeight={600} fontSize={14}>
                        {p.nome}
                      </Typography>
                    </Box>

                    {/* BOTÃO WHATSAPP */}
                    {p.contato && <WhatsAppButton telefone={p.contato} size="small" />}

                    {/* AÇÕES - EDITAR E EXCLUIR */}
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
                  </Box>

                  {/* DETALHES EXPANDIDOS - RENDERIZAÇÃO CONDICIONAL */}
                  {expandedPessoaId === p.id && (
                    <Box
                      sx={{
                        bgcolor: 'background.default',
                        px: 2,
                        py: 1.5,
                        borderLeft: '4px solid',
                        borderColor: 'secondary.main',
                        animation: 'slideDown 0.3s ease-in-out',
                        '@keyframes slideDown': {
                          from: {
                            opacity: 0,
                            transform: 'translateY(-10px)',
                          },
                          to: {
                            opacity: 1,
                            transform: 'translateY(0)',
                          },
                        },
                      }}
                    >
                      {/* ENDEREÇO */}
                      {p.endereco && (
                        <Box sx={{ mb: 1.5, display: 'flex', gap: 1.5 }}>
                          <LocationOnRoundedIcon
                            sx={{
                              fontSize: 18,
                              color: 'text.secondary',
                              mt: 0.25,
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.secondary',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 11,
                                letterSpacing: 0.3,
                              }}
                            >
                              Endereço
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.3 }}>
                              {p.endereco}
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {/* DIVISOR */}
                      {p.endereco && (p.contato || p.observacao) && <Divider sx={{ my: 1 }} />}

                      {/* CONTATO */}
                      {p.contato && (
                        <Box sx={{ mb: 1.5, display: 'flex', gap: 1.5 }}>
                          <PhoneRoundedIcon
                            sx={{
                              fontSize: 18,
                              color: 'text.secondary',
                              mt: 0.25,
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.secondary',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 11,
                                letterSpacing: 0.3,
                              }}
                            >
                              Contato
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.3 }}>
                              {p.contato}
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {/* DIVISOR */}
                      {(p.endereco || p.contato) && p.observacao && <Divider sx={{ my: 1 }} />}

                      {/* OBSERVAÇÃO */}
                      {p.observacao && (
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                          <NotesRoundedIcon
                            sx={{
                              fontSize: 18,
                              color: 'text.secondary',
                              mt: 0.25,
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.secondary',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: 11,
                                letterSpacing: 0.3,
                              }}
                            >
                              Observação
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.3 }}>
                              {p.observacao}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* DIVISOR ENTRE ITENS */}
                  {idx < filtered.length - 1 && <Divider />}
                </Box>
              ))}
            </Card>
          )}
        </Grid>
      </Grid>

      <ResponsavelFormDialog
        open={responsavelDialogOpen}
        responsavel={responsavel}
        onClose={handleCloseResponsavelDialog}
        onSave={handleSaveResponsavel}
        loading={saving}
      />

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
