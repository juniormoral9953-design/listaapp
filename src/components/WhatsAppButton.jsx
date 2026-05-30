import React from 'react';
import { Button, Tooltip } from '@mui/material';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import { gerarUrlWhatsApp } from '../utils/whatsappUtils';

/**
 * Componente que exibe um botão do WhatsApp
 * Ao clicar, abre a conversa no WhatsApp Web
 * @param {string} telefone - Número de telefone
 * @param {string} size - Tamanho do botão ('small', 'medium')
 */
export default function WhatsAppButton({ telefone, size = 'small' }) {
  if (!telefone) return null;

  const urlWhatsApp = gerarUrlWhatsApp(telefone);

  if (!urlWhatsApp) return null;

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <Tooltip title="Abrir conversa no WhatsApp" arrow>
      <Button
        size={size}
        variant="outlined"
        startIcon={<PhoneRoundedIcon sx={{ fontSize: size === 'small' ? '1rem' : '1.25rem' }} />}
        onClick={handleWhatsAppClick}
        sx={{
          color: '#25d366',
          borderColor: '#25d366',
          fontWeight: 600,
          fontSize: size === 'small' ? '0.65rem' : '0.75rem',
          padding: size === 'small' ? '2px 8px' : '4px 12px',
          minWidth: 'auto',
          transition: 'all 0.2s ease',
          textTransform: 'none',
          letterSpacing: '0.3px',
          '&:hover': {
            bgcolor: 'rgba(37, 211, 102, 0.08)',
            borderColor: '#20c257',
            color: '#20c257',
            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.2)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        WhatsApp
      </Button>
    </Tooltip>
  );
}
