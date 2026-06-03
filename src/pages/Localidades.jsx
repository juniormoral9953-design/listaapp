import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import PageHeader from '../components/PageHeader';
import { responsaveisService } from '../services/responsaveisService';
import { pessoasService } from '../services/pessoasService';
import { OPÇÕES_LOCALIDADE } from '../utils/localidades';

export default function Localidades() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const responsaveis = await responsaveisService.listar();

        let todasPessoas = [];
        for (const resp of responsaveis) {
          const pessoas = await pessoasService.listar(resp.id);
          todasPessoas = [...todasPessoas, ...pessoas];
        }

        // Count per local. local is the exact string value from the option.
        const contagemPorLocal = {};
        todasPessoas.forEach((p) => {
          const l = p.local || 'Sem local';
          contagemPorLocal[l] = (contagemPorLocal[l] || 0) + 1;
        });

        // Map counts back to Categories (e.g. Sede, Sede Rural)
        const estatisticas = OPÇÕES_LOCALIDADE.map((cat) => {
          let totalCategoria = 0;
          const locais = cat.options.map((opt) => {
            const count = contagemPorLocal[opt.value] || 0;
            totalCategoria += count;
            return {
              nome: opt.label,
              quantidade: count,
            };
          });

          // Sort descending by count
          locais.sort((a, b) => b.quantidade - a.quantidade);

          return {
            categoria: cat.label,
            total: totalCategoria,
            locais: locais.filter(l => l.quantidade > 0), // Show only ones with >0 or all? Better show only with people
          };
        });

        // Add 'Sem local' or unmapped just in case
        const mappedLocals = new Set(
          OPÇÕES_LOCALIDADE.flatMap(c => c.options.map(o => o.value))
        );
        let unmappedCount = 0;
        const unmappedLocals = [];
        Object.entries(contagemPorLocal).forEach(([loc, count]) => {
          if (!mappedLocals.has(loc)) {
            unmappedCount += count;
            unmappedLocals.push({ nome: loc, quantidade: count });
          }
        });

        if (unmappedCount > 0) {
          estatisticas.push({
            categoria: 'Outros / Sem local',
            total: unmappedCount,
            locais: unmappedLocals.sort((a, b) => b.quantidade - a.quantidade)
          });
        }

        setStats(estatisticas.sort((a, b) => b.total - a.total));

      } catch (err) {
        console.error('Erro ao carregar localidades', err);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  return (
    <Box>
      <PageHeader
        title="Localidades"
        subtitle="Contagem de pessoas por categoria e localidade"
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {stats.map((stat, idx) => (
            <Accordion key={idx} defaultExpanded={idx === 0 || stat.total > 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <MapRoundedIcon color="primary" />
                    <Typography variant="h6" sx={{ fontSize: '1.05rem', fontWeight: 600 }}>
                      {stat.categoria}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${stat.total} pessoa${stat.total !== 1 ? 's' : ''}`}
                    color={stat.total > 0 ? 'primary' : 'default'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'rgba(0,0,0,0.01)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                {stat.locais.length > 0 ? (
                  <List dense disablePadding>
                    {stat.locais.map((local, lIdx) => (
                      <ListItem key={lIdx} sx={{ px: 0 }}>
                        <ListItemText
                          primary={local.nome}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                        <Typography variant="body2" fontWeight={600} color="text.secondary">
                          {local.quantidade}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 1, textAlign: 'center' }}>
                    Nenhuma pessoa cadastrada nesta categoria.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
}

