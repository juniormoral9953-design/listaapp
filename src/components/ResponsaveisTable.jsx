// src/components/ResponsaveisTable.jsx
import React from 'react';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import { useNavigate } from 'react-router-dom';

function getAvatarColor(nome) {
  const colors = ['#1a56a4', '#2e7d32', '#7b1fa2', '#c62828', '#e65100', '#00695c'];
  let hash = 0;
  for (let i = 0; i < (nome || '').length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ResponsaveisTable({ responsaveis, pessoasCounts, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ overflow: 'hidden', overflowX: { xs: 'auto', md: 'visible' } }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'background.default' }}>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Responsável
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, display: { xs: 'none', sm: 'table-cell' } }}>
              Contato
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, display: { xs: 'none', md: 'table-cell' } }}>
              Pessoas
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, display: { xs: 'none', lg: 'table-cell' } }}>
              Observação
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responsaveis.map((r) => (
            <TableRow
              key={r.id}
              hover
              sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
            >
              <TableCell onClick={() => navigate(`/responsaveis/${r.id}`)}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: getAvatarColor(r.nome), width: 36, height: 36, fontSize: 14, fontWeight: 700 }}>
                    {r.nome?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography fontWeight={600} fontSize={14}>{r.nome}</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => navigate(`/responsaveis/${r.id}`)} sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PhoneRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">{r.contato}</Typography>
                </Box>
              </TableCell>
              <TableCell onClick={() => navigate(`/responsaveis/${r.id}`)} sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                <Chip
                  label={`${pessoasCounts[r.id] ?? 0}`}
                  size="small"
                  color={(pessoasCounts[r.id] ?? 0) > 0 ? 'primary' : 'default'}
                  sx={{ fontWeight: 700, minWidth: 32 }}
                />
              </TableCell>
              <TableCell onClick={() => navigate(`/responsaveis/${r.id}`)} sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.observacao || '—'}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Editar">
                  <IconButton size="small" color="primary" onClick={() => onEdit(r)}>
                    <EditRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton size="small" color="error" onClick={() => onDelete(r)}>
                    <DeleteRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ver pessoas">
                  <IconButton size="small" onClick={() => navigate(`/responsaveis/${r.id}`)}>
                    <ArrowForwardRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
