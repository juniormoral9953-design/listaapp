// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Responsaveis from '../pages/Responsaveis';
import ResponsavelDetalhe from '../pages/ResponsavelDetalhe';import Localidades from '../pages/Localidades';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/responsaveis" element={<Responsaveis />} />
        <Route path="/responsaveis/:id" element={<ResponsavelDetalhe />} />
        <Route path="/localidades" element={<Localidades />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
