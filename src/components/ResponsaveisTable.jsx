// src/components/ResponsaveisTable.jsx
import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import NoteRoundedIcon from '@mui/icons-material/NoteRounded';
import WhatsAppButton from './WhatsAppButton';

function getAvatarColor(nome) {
  const colors = ['#1a56a4', '#2e7d32', '#7b1fa2', '#c62828', '#e65100', '#00695c'];
  let hash = 0;
  for (let i = 0; i < (nome || '').length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ResponsaveisTable({ responsaveis, pessoasCounts, onEdit, onDelete }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };


  return (
    <Card sx={{ overflow: 'hidden' }}>
      {responsaveis.map((r, index) => (
        <Box key={r.id}>
          {/* LINHA PRINCIPAL - NOME + WHATSAPP + AÇÕES */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: expandedId === r.id ? 'action.hover' : 'transparent',
              transition: 'background-color 0.2s ease',
            }}
          >
            {/* AVATAR + NOME */}
            <Avatar
              sx={{
                bgcolor: getAvatarColor(r.nome),
                width: 40,
                height: 40,
                fontSize: 16,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {r.nome?.charAt(0).toUpperCase()}
            </Avatar>

            <Box
              sx={{ flex: 1, cursor: 'pointer' }}
              onClick={() => toggleExpanded(r.id)}
            >
              <Typography fontWeight={600} fontSize={15}>
                {r.nome}
              </Typography>
            </Box>

            {/* BOTÃO WHATSAPP */}
            {r.contato && <WhatsAppButton telefone={r.contato} size="small" />}

            {/* AÇÕES - EDITAR E EXCLUIR */}
            <Tooltip title="Editar">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(r)}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(r)}
              >
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* DETALHES EXPANDIDOS - RENDERIZAÇÃO CONDICIONAL */}
          {expandedId === r.id && (
            <Box
              sx={{
                bgcolor: 'background.default',
                px: 2,
                py: 1.5,
                borderLeft: '4px solid',
                borderColor: 'primary.main',
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
              {/* CONTATO */}
              {r.contato && (
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
                      {r.contato}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* DIVISOR */}
              {r.contato && r.endereco && <Divider sx={{ my: 1 }} />}

              {/* ENDEREÇO */}
              {r.endereco && (
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
                      {r.endereco}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* DIVISOR */}
              {r.endereco && r.observacao && <Divider sx={{ my: 1 }} />}

              {/* OBSERVAÇÃO */}
              {r.observacao && (
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <NoteRoundedIcon
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
                      {r.observacao}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* DIVISOR ENTRE ITENS */}
          {index < responsaveis.length - 1 && <Divider />}
        </Box>
      ))}
    </Card>
  );
}
