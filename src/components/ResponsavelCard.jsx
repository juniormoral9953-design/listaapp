// src/components/ResponsavelCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';

function getInitials(nome) {
  if (!nome) return '?';
  return nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getAvatarColor(nome) {
  const colors = ['#1a56a4', '#2e7d32', '#7b1fa2', '#c62828', '#e65100', '#00695c'];
  let hash = 0;
  for (let i = 0; i < (nome || '').length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ResponsavelCard({ responsavel, pessoasCount, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 32px rgba(26,86,164,0.15)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: getAvatarColor(responsavel.nome),
              width: 52,
              height: 52,
              fontSize: 18,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {getInitials(responsavel.nome)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              noWrap
              title={responsavel.nome}
            >
              {responsavel.nome}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <PhoneRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" noWrap>
                {responsavel.contato}
              </Typography>
              {responsavel.contato && <WhatsAppButton telefone={responsavel.contato} size="small" />}
            </Box>
          </Box>
        </Box>

        {responsavel.observacao && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              p: 1.5,
              bgcolor: 'background.default',
              borderRadius: 2,
              borderLeft: '3px solid',
              borderLeftColor: 'primary.light',
              fontStyle: 'italic',
            }}
          >
            {responsavel.observacao}
          </Typography>
        )}

        <Chip
          icon={<PeopleAltRoundedIcon fontSize="small" />}
          label={`${pessoasCount ?? '...'} pessoa${(pessoasCount ?? 0) !== 1 ? 's' : ''} vinculada${(pessoasCount ?? 0) !== 1 ? 's' : ''}`}
          size="small"
          color={pessoasCount > 0 ? 'primary' : 'default'}
          variant={pessoasCount > 0 ? 'filled' : 'outlined'}
          sx={{ fontWeight: 600 }}
        />
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Box>
          <Tooltip title="Editar responsável">
            <IconButton size="small" color="primary" onClick={onEdit}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir responsável">
            <IconButton size="small" color="error" onClick={onDelete}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Tooltip title="Ver pessoas vinculadas">
          <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(`/responsaveis/${responsavel.id}`)}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <ArrowForwardRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
