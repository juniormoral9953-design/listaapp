// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardRoundedIcon />, path: '/' },
  { label: 'Responsáveis', icon: <PeopleAltRoundedIcon />, path: '/responsaveis' },
];

function DrawerContent({ onClose, currentPath }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0e3470 0%, #1a56a4 100%)',
          px: 2.5,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 40, height: 40 }}>
            <PeopleAltRoundedIcon sx={{ color: 'white', fontSize: 22 }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}>
              Lista App
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Gerenciamento de Listas
            </Typography>
          </Box>
        </Box>
        {onClose && (
          <IconButton onClick={onClose} sx={{ color: 'white' }} size="small">
            <CloseRoundedIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        <Typography
          variant="caption"
          sx={{ px: 2.5, color: 'text.secondary', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}
        >
          Menu
        </Typography>
        <List sx={{ mt: 0.5 }}>
          {NAV_ITEMS.map((item) => {
            const active = currentPath === item.path ||
              (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <ListItem key={item.path} disablePadding sx={{ px: 1.5, mb: 0.5 }}>
                <ListItemButton
                  selected={active}
                  onClick={() => { navigate(item.path); if (onClose) onClose(); }}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      '&:hover': { bgcolor: 'primary.dark' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38, color: active ? 'white' : 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: active ? 700 : 500, fontSize: 14 }}
                  />
                  {active && (
                    <Chip size="small" label="•" sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: 'white', height: 20, fontSize: 10 }} />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          v1.0.0 · Lista App
        </Typography>
      </Box>
    </Box>
  );
}

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.15)', width: 32, height: 32 }}>
              <PeopleAltRoundedIcon sx={{ fontSize: 18 }} />
            </Avatar>
          </Box>
          <Typography variant="h6" sx={{ ml: { xs: 0, md: 1 }, fontWeight: 700, letterSpacing: '-0.3px' }}>
            Lista App
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Chip
            label="Firestore"
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: 11 }}
          />
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            mt: '64px',
            borderRight: '1px solid rgba(26,86,164,0.08)',
          },
        }}
        open
      >
        <DrawerContent currentPath={location.pathname} />
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
      >
        <DrawerContent currentPath={location.pathname} onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          mt: '64px',
          ml: { md: `${DRAWER_WIDTH}px` },
          p: { xs: 2, sm: 3 },
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
