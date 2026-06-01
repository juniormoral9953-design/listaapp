// src/components/ResponsaveisTable.jsx
import React from 'react';
import {
  Card,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

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
    <Card sx={{ overflow: 'hidden' }}>
      {responsaveis.map((r, index) => (
        <Box key={r.id}>
          {/* LINHA SIMPLIFICADA - NOME + PESSOAS + ENTRAR */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: 'transparent',
              transition: 'background-color 0.2s ease',
              justifyContent: 'space-between',
              '@media (max-width: 768px)': {
                p: 1.5,
                gap: 1,
              },
            }}
          >
            {/* LADO ESQUERDO - AVATAR + NOME */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                minWidth: 0,
                flex: 1,
                '@media (max-width: 768px)': {
                  gap: 1,
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: getAvatarColor(r.nome),
                  width: 40,
                  height: 40,
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                  '@media (max-width: 768px)': {
                    width: 36,
                    height: 36,
                    fontSize: 14,
                  },
                }}
              >
                {r.nome?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography
                fontWeight={600}
                fontSize={15}
                noWrap
                sx={{
                  '@media (max-width: 768px)': {
                    fontSize: 14,
                  },
                }}
              >
                {r.nome}
              </Typography>
            </Box>

            {/* CENTRO/DIREITA - BADGE DE PESSOAS + BOTÃO ENTRAR */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flex: '0 0 auto',
              }}
            >
              {/* BADGE PESSOAS */}
              <Chip
                icon={<PeopleAltRoundedIcon fontSize="small" />}
                label={`${pessoasCounts[r.id] ?? 0}`}
                size="small"
                color="primary"
                variant="filled"
                sx={{
                  fontWeight: 600,
                  fontSize: '12px',
                  '@media (max-width: 768px)': {
                    fontSize: '11px',
                  },
                }}
              />

              {/* BOTÃO ENTRAR */}
              <Tooltip title="Ver pessoas vinculadas">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/responsaveis/${r.id}`)}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    '@media (max-width: 768px)': {
                      p: 0.75,
                    },
                  }}
                >
                  <ArrowForwardRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* DIVISOR ENTRE ITENS */}
          {index < responsaveis.length - 1 && <Divider />}
        </Box>
      ))}
    </Card>
  );
}
