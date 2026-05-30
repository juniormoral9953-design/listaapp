// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Button,
  Skeleton,
} from '@mui/material';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';
import { responsaveisService } from '../services/responsaveisService';
import { pessoasService } from '../services/pessoasService';
import PageHeader from '../components/PageHeader';

function StatCard({ icon, label, value, color, loading }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: color, width: 52, height: 52 }}>{icon}</Avatar>
          <Box>
            <Typography variant="h4" fontWeight={800} color="text.primary">
              {loading ? <Skeleton width={40} /> : value}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [responsaveis, setResponsaveis] = useState([]);
  const [totalPessoas, setTotalPessoas] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const lista = await responsaveisService.listar();
        setResponsaveis(lista);
        const counts = await Promise.all(
          lista.map((r) => pessoasService.listar(r.id).then((p) => p.length))
        );
        setTotalPessoas(counts.reduce((a, b) => a + b, 0));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral do sistema de gerenciamento"
        action={
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate('/responsaveis')}
          >
            Novo responsável
          </Button>
        }
      />

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<PeopleAltRoundedIcon sx={{ color: 'white' }} />}
            label="Responsáveis cadastrados"
            value={responsaveis.length}
            color="primary.main"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<GroupRoundedIcon sx={{ color: 'white' }} />}
            label="Pessoas vinculadas"
            value={totalPessoas}
            color="secondary.main"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<PeopleAltRoundedIcon sx={{ color: 'white' }} />}
            label="Média de pessoas/responsável"
            value={responsaveis.length ? (totalPessoas / responsaveis.length).toFixed(1) : '0'}
            color="#2e7d32"
            loading={loading}
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ pb: '16px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Responsáveis recentes</Typography>
            <Button
              size="small"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => navigate('/responsaveis')}
            >
              Ver todos
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={44} height={44} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="40%" height={16} />
                </Box>
              </Box>
            ))
          ) : responsaveis.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                Nenhum responsável cadastrado ainda.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/responsaveis')}
              >
                Cadastrar primeiro responsável
              </Button>
            </Box>
          ) : (
            responsaveis.slice(0, 5).map((r, i) => (
              <Box key={r.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    borderRadius: 2,
                    px: 1,
                    '&:hover': { bgcolor: 'background.default' },
                  }}
                  onClick={() => navigate(`/responsaveis/${r.id}`)}
                >
                  <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44, fontWeight: 700 }}>
                    {r.nome?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600}>{r.nome}</Typography>
                    <Typography variant="body2" color="text.secondary">{r.contato}</Typography>
                  </Box>
                  <ArrowForwardRoundedIcon fontSize="small" color="action" />
                </Box>
                {i < Math.min(responsaveis.length, 5) - 1 && <Divider />}
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
