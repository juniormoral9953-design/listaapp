// src/components/PessoaFormDialog.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

const OPÇÕES_LOCALIDADE = [
  {
    label: 'Sede',
    options: [
      { value: 'Centro', label: 'Centro' },
      { value: 'São José', label: 'São José' },
      { value: 'Várzea', label: 'Várzea' },
      { value: 'São Francisco', label: 'São Francisco' }
    ]
  },
  {
    label: 'Sede Rural',
    options: [
      { value: 'Sítio Raposo', label: 'Sítio Raposo' },
      { value: 'Sítio Veneza', label: 'Sítio Veneza' },
      { value: 'Setor N', label: 'Setor N' },
      { value: 'Fazenda Primavera', label: 'Fazenda Primavera' },
      { value: 'Escondido', label: 'Escondido' },
      { value: 'Sítio Tigre', label: 'Sítio Tigre' },
      { value: 'Foveiro', label: 'Foveiro' },
      { value: 'Parque Primavera', label: 'Parque Primavera' },
      { value: 'Fazenda Seleção', label: 'Fazenda Seleção' },
      { value: 'Assentamento Ramalhete', label: 'Assentamento Ramalhete' },
      { value: 'Linha Base de Baixo', label: 'Linha Base de Baixo' },
      { value: 'Santa Fé', label: 'Santa Fé' },
      { value: 'Córrego do Corcunda do Cazuza', label: 'Córrego do Corcunda do Cazuza' },
      { value: 'Córrego do Corcunda do Raimundo Lima', label: 'Córrego do Corcunda do Raimundo Lima' },
      { value: 'Córrego do Corcunda do Serra', label: 'Córrego do Corcunda do Serra' },
      { value: 'Saco Grande', label: 'Saco Grande' },
      { value: 'Sítio Castelo', label: 'Sítio Castelo' },
      { value: 'Barreira do Exú', label: 'Barreira do Exú' },
      { value: 'Setor 3 do K', label: 'Setor 3 do K' },
      { value: 'Sítio Aliança', label: 'Sítio Aliança' },
      { value: 'Dourado', label: 'Dourado' },
      { value: 'Caraúna', label: 'Caraúna' },
      { value: 'Amapá', label: 'Amapá' },
      { value: 'Mocós', label: 'Mocós' },
      { value: 'Viuvinha', label: 'Viuvinha' },
      { value: 'Lagoa do Caranguejo', label: 'Lagoa do Caranguejo' },
      { value: 'Lagoa dos Cachorros', label: 'Lagoa dos Cachorros' },
      { value: 'Lagoa da Caraúba', label: 'Lagoa da Caraúba' },
      { value: 'Serrote do João Alves', label: 'Serrote do João Alves' },
      { value: 'Lagoa do João Alves', label: 'Lagoa do João Alves' },
      { value: 'Lagoa dos Veados', label: 'Lagoa dos Veados' },
      { value: 'Poço Verde', label: 'Poço Verde' },
      { value: 'Cauã', label: 'Cauã' },
      { value: 'Volta do João Mateus', label: 'Volta do João Mateus' },
      { value: 'Sossego', label: 'Sossego' },
      { value: 'Barbadinha do Nunes', label: 'Barbadinha do Nunes' },
      { value: 'Barbada I', label: 'Barbada I' },
      { value: 'Nova Esperança', label: 'Nova Esperança' },
      { value: 'Aroeira', label: 'Aroeira' },
      { value: 'Lourenço', label: 'Lourenço' },
      { value: 'Pacavira', label: 'Pacavira' },
      { value: 'Tanque do Emanuel', label: 'Tanque do Emanuel' },
      { value: 'Junco Manso', label: 'Junco Manso' },
      { value: 'Lagoa dos Bois', label: 'Lagoa dos Bois' },
      { value: 'Linha Base de Cima', label: 'Linha Base de Cima' },
      { value: 'Felipa de Cima', label: 'Felipa de Cima' },
      { value: 'Felipa de Baixo', label: 'Felipa de Baixo' },
      { value: 'Casa Nova', label: 'Casa Nova' },
      { value: 'Sítio Lacraia', label: 'Sítio Lacraia' },
      { value: 'Sítio Neblina', label: 'Sítio Neblina' },
      { value: 'Manoel Lopes', label: 'Manoel Lopes' },
      { value: 'Curral Velho', label: 'Curral Velho' },
      { value: 'Sítio Mateus', label: 'Sítio Mateus' },
      { value: 'Pau Branco', label: 'Pau Branco' },
      { value: 'Sítio Primavera', label: 'Sítio Primavera' },
      { value: 'Sitio Retrós', label: 'Sitio Retrós' },
      { value: 'Ipueira Cavada', label: 'Ipueira Cavada' },
      { value: 'Sítio Bartolomeu', label: 'Sítio Bartolomeu' },
      { value: 'Fazenda Monasa', label: 'Fazenda Monasa' },
      { value: 'Fazenda Vitória', label: 'Fazenda Vitória' },
      { value: 'Serrote do Teodoro', label: 'Serrote do Teodoro' },
      { value: 'Fazenda Queimada', label: 'Fazenda Queimada' },
      { value: 'Sítio Sabiá', label: 'Sítio Sabiá' },
      { value: 'Lagoa Verde', label: 'Lagoa Verde' },
      { value: 'Veado Magro', label: 'Veado Magro' },
      { value: 'Lagoa do Palhano', label: 'Lagoa do Palhano' },
      { value: 'Favela', label: 'Favela' },
      { value: 'Bom Princípio', label: 'Bom Princípio' },
      { value: 'Cachorra Magra', label: 'Cachorra Magra' },
      { value: 'Sítio Patos', label: 'Sítio Patos' },
      { value: 'Reforma', label: 'Reforma' },
      { value: 'Serrotinho', label: 'Serrotinho' },
      { value: 'Sítio Santo Antônio', label: 'Sítio Santo Antônio' },
      { value: 'Sítio Conceição', label: 'Sítio Conceição' },
      { value: 'Campestre', label: 'Campestre' },
      { value: 'Canto da Onça', label: 'Canto da Onça' },
      { value: 'Monte Vistoso', label: 'Monte Vistoso' },
      { value: 'Açude da Petronília', label: 'Açude da Petronília' },
      { value: 'Barbatão', label: 'Barbatão' },
      { value: 'Gangorrinha', label: 'Gangorrinha' },
      { value: 'Açude Novo', label: 'Açude Novo' },
      { value: 'Curral Novo', label: 'Curral Novo' },
      { value: 'Capim Pubo', label: 'Capim Pubo' },
      { value: 'Lagoa do Giral', label: 'Lagoa do Giral' },
      { value: 'Redonda', label: 'Redonda' },
      { value: 'Fazenda Currais', label: 'Fazenda Currais' },
      { value: 'Lagoa da Pedra', label: 'Lagoa da Pedra' },
      { value: 'Riacho da Forquilha', label: 'Riacho da Forquilha' },
      { value: 'Flamenga', label: 'Flamenga' },
      { value: 'Barbada II', label: 'Barbada II' }
    ]
  },
  {
    label: 'São João do Aruaru',
    options: [
      { value: 'Fazenda Lua Branca', label: 'Fazenda Lua Branca' },
      { value: 'Lagoa do Miguel', label: 'Lagoa do Miguel' },
      { value: 'Lagoa do Feijão', label: 'Lagoa do Feijão' },
      { value: 'Lagoa do Meio', label: 'Lagoa do Meio' },
      { value: 'Lagoa do São José', label: 'Lagoa do São José' },
      { value: 'Várzea da Jurema', label: 'Várzea da Jurema' },
      { value: 'Lagoa do Pimenta', label: 'Lagoa do Pimenta' },
      { value: 'Assentamento Amazonas', label: 'Assentamento Amazonas' },
      { value: 'Lagoa da Barbada', label: 'Lagoa da Barbada' },
      { value: 'Piauí de Dentro', label: 'Piauí de Dentro' },
      { value: 'Piauí de Fora', label: 'Piauí de Fora' },
      { value: 'Escondida', label: 'Escondida' },
      { value: 'Fazenda São José', label: 'Fazenda São José' },
      { value: 'Fazenda Cristalina', label: 'Fazenda Cristalina' },
      { value: 'Lagoa Comprida', label: 'Lagoa Comprida' },
      { value: 'Serra da Boa Fé', label: 'Serra da Boa Fé' },
      { value: 'Lagoa do Novilho', label: 'Lagoa do Novilho' },
      { value: 'Lagoa Salgada', label: 'Lagoa Salgada' },
      { value: 'Sitio Escondido', label: 'Sitio Escondido' },
      { value: 'Lajedo', label: 'Lajedo' },
      { value: 'Assentamento Água Doce Rabicha', label: 'Assentamento Água Doce Rabicha' },
      { value: 'Lagoa do Rancho', label: 'Lagoa do Rancho' },
      { value: 'Lagoa da Espora', label: 'Lagoa da Espora' },
      { value: 'Sítio Bela Vista', label: 'Sítio Bela Vista' },
      { value: 'Rancho da Caça', label: 'Rancho da Caça' },
      { value: 'Fazenda Paraiso', label: 'Fazenda Paraiso' },
      { value: 'Assentamento Cipó', label: 'Assentamento Cipó' },
      { value: 'Lagoa do Canto', label: 'Lagoa do Canto' },
      { value: 'Lagoa do Mar', label: 'Lagoa do Mar' },
      { value: 'Alto Alegre II', label: 'Alto Alegre II' },
      { value: 'Sítio Bastiões', label: 'Sítio Bastiões' },
      { value: 'Lagoa do Joaquim Alves', label: 'Lagoa do Joaquim Alves' },
      { value: 'Assentamento Lagoa dos Bois', label: 'Assentamento Lagoa dos Bois' },
      { value: 'Tapuio', label: 'Tapuio' },
      { value: 'Fazenda Tanques', label: 'Fazenda Tanques' },
      { value: 'Riacho da Areia', label: 'Riacho da Areia' },
      { value: 'Sítio Boa Vista', label: 'Sítio Boa Vista' },
      { value: 'Sítio Vassouras', label: 'Sítio Vassouras' },
      { value: 'Alto Alegre I', label: 'Alto Alegre I' },
      { value: 'Assentamento Novo Horizonte', label: 'Assentamento Novo Horizonte' },
      { value: 'Vaca Morta', label: 'Vaca Morta' },
      { value: 'Varzinha', label: 'Varzinha' },
      { value: 'Sítio Zacarias', label: 'Sítio Zacarias' },
      { value: 'Barra das Flores', label: 'Barra das Flores' },
      { value: 'Patinhos', label: 'Patinhos' },
      { value: 'Serra dos Banhos', label: 'Serra dos Banhos' },
      { value: 'Banhos', label: 'Banhos' },
      { value: 'Assentamento Banhos', label: 'Assentamento Banhos' },
      { value: 'Pedra Feia', label: 'Pedra Feia' },
      { value: 'Olho D\'água', label: 'Olho D\'água' },
      { value: 'Tabuleiro do Mulungu', label: 'Tabuleiro do Mulungu' },
      { value: 'Lagoa Redonda', label: 'Lagoa Redonda' },
      { value: 'Lagoa das Tábuas', label: 'Lagoa das Tábuas' },
      { value: 'Batentes', label: 'Batentes' },
      { value: 'Curralinho', label: 'Curralinho' },
      { value: 'Riacho Barra das Flores', label: 'Riacho Barra das Flores' },
      { value: 'Raposinho', label: 'Raposinho' },
      { value: 'Raposo', label: 'Raposo' },
      { value: 'Espinho', label: 'Espinho' },
      { value: 'Mela Pinto', label: 'Mela Pinto' },
      { value: 'Lagoa dos Patos', label: 'Lagoa dos Patos' },
      { value: 'Cumaru', label: 'Cumaru' },
      { value: 'Sítio Flores', label: 'Sítio Flores' },
      { value: 'Lagoa do serrote', label: 'Lagoa do serrote' },
      { value: 'Sitio Umari', label: 'Sitio Umari' },
      { value: 'Sítio Cumaru', label: 'Sítio Cumaru' },
      { value: 'Sítio Queimada', label: 'Sítio Queimada' },
      { value: 'Piauí', label: 'Piauí' },
      { value: 'Fazenda Flores', label: 'Fazenda Flores' },
      { value: 'Fazenda Pai Querer', label: 'Fazenda Pai Querer' },
      { value: 'Sítio Favela', label: 'Sítio Favela' }
    ]
  },
  {
    label: 'Boa Água',
    options: [
      { value: 'Timbaúba', label: 'Timbaúba' },
      { value: 'Assentamento Lagoa da Serra', label: 'Assentamento Lagoa da Serra' },
      { value: 'Massapê', label: 'Massapê' },
      { value: 'Gangorra', label: 'Gangorra' },
      { value: 'Jardim I', label: 'Jardim I' },
      { value: 'Riacho do Meio', label: 'Riacho do Meio' },
      { value: 'Assentamento Barra', label: 'Assentamento Barra' },
      { value: 'Retiro', label: 'Retiro' },
      { value: 'Perpétua I', label: 'Perpétua I' },
      { value: 'Perpétua II', label: 'Perpétua II' },
      { value: 'Cedro', label: 'Cedro' },
      { value: 'Lagoa do Tronco', label: 'Lagoa do Tronco' },
      { value: 'Aliança', label: 'Aliança' },
      { value: 'Salão', label: 'Salão' },
      { value: 'Assentamento Salão', label: 'Assentamento Salão' },
      { value: 'Poço Escuro', label: 'Poço Escuro' },
      { value: 'Assentamento Poço Escuro', label: 'Assentamento Poço Escuro' },
      { value: 'Riacho do Feijão', label: 'Riacho do Feijão' },
      { value: 'Santo Antônio', label: 'Santo Antônio' },
      { value: 'Assentamento Angico', label: 'Assentamento Angico' },
      { value: 'Mineiro', label: 'Mineiro' },
      { value: 'Manoel Pereira', label: 'Manoel Pereira' },
      { value: 'Trapiá', label: 'Trapiá' },
      { value: 'Dois Irmãos', label: 'Dois Irmãos' },
      { value: 'Vieira', label: 'Vieira' },
      { value: 'Lapa', label: 'Lapa' },
      { value: 'Lagoa do Poldrinho', label: 'Lagoa do Poldrinho' },
      { value: 'Chapada', label: 'Chapada' },
      { value: 'Nova Vista', label: 'Nova Vista' },
      { value: 'Cumbuca', label: 'Cumbuca' },
      { value: 'Extrema II', label: 'Extrema II' },
      { value: 'Serra dos Gomes', label: 'Serra dos Gomes' },
      { value: 'Veados', label: 'Veados' },
      { value: 'Lagoa do Serrote dos Gomes', label: 'Lagoa do Serrote dos Gomes' },
      { value: 'Lagoa do Serrote dos Libanos', label: 'Lagoa do Serrote dos Libanos' },
      { value: 'Várzea Queimada', label: 'Várzea Queimada' },
      { value: 'Santa Cruz', label: 'Santa Cruz' },
      { value: 'Barra', label: 'Barra' },
      { value: 'Boa Esperança', label: 'Boa Esperança' },
      { value: 'Salgadinho', label: 'Salgadinho' },
      { value: 'Canafístula', label: 'Canafístula' },
      { value: 'Quixelô', label: 'Quixelô' },
      { value: 'Cacimba Nova', label: 'Cacimba Nova' },
      { value: 'Tanques', label: 'Tanques' },
      { value: 'Assentamento Querência', label: 'Assentamento Querência' },
      { value: 'Assentamento Escodeiro', label: 'Assentamento Escodeiro' },
      { value: 'Assentamento Terra Nova', label: 'Assentamento Terra Nova' },
      { value: 'Assentamento Planalto', label: 'Assentamento Planalto' },
      { value: 'Serraria', label: 'Serraria' },
      { value: 'Assentamento Bom Jesus', label: 'Assentamento Bom Jesus' },
      { value: 'Assentamento Jucá Grosso', label: 'Assentamento Jucá Grosso' },
      { value: 'Lagoa Funda', label: 'Lagoa Funda' },
      { value: 'Juá dos Gomes', label: 'Juá dos Gomes' },
      { value: 'Água Fria', label: 'Água Fria' },
      { value: 'Boa Vista do Paulo', label: 'Boa Vista do Paulo' },
      { value: 'Santanas', label: 'Santanas' },
      { value: 'Seridó', label: 'Seridó' },
      { value: 'Assentamento Boa Vista', label: 'Assentamento Boa Vista' },
      { value: 'Mutamba', label: 'Mutamba' },
      { value: 'Assentamento Canafístula', label: 'Assentamento Canafístula' },
      { value: 'Melado', label: 'Melado' },
      { value: 'Pedra D\'água', label: 'Pedra D\'água' },
      { value: 'Altamira do Castro', label: 'Altamira do Castro' },
      { value: 'Várzea Grande', label: 'Várzea Grande' },
      { value: 'Fazenda Lua Nova', label: 'Fazenda Lua Nova' },
      { value: 'Boqueirão', label: 'Boqueirão' },
      { value: 'Nova Olinda', label: 'Nova Olinda' },
      { value: 'São Gonçalo', label: 'São Gonçalo' },
      { value: 'Guanabara', label: 'Guanabara' },
      { value: 'Riacho do Tronco', label: 'Riacho do Tronco' }
    ]
  },
  {
    label: 'Uiraponga',
    options: [
      { value: 'Poção do Holanda', label: 'Poção do Holanda' },
      { value: 'Porção do Henrique', label: 'Porção do Henrique' },
      { value: 'Porções do Despejo', label: 'Porções do Despejo' },
      { value: 'Melões do Franco', label: 'Melões do Franco' },
      { value: 'Juá do Pedro Climério', label: 'Juá do Pedro Climério' },
      { value: 'Retiro II', label: 'Retiro II' },
      { value: 'Sítio Estrela', label: 'Sítio Estrela' },
      { value: 'Viração', label: 'Viração' },
      { value: 'Estrela do Jonas', label: 'Estrela do Jonas' },
      { value: 'Tabuleirinho do João Almeida', label: 'Tabuleirinho do João Almeida' },
      { value: 'Forquilha', label: 'Forquilha' },
      { value: 'Jatobá', label: 'Jatobá' },
      { value: 'Boa Esperança II', label: 'Boa Esperança II' },
      { value: 'Retiro do Pedro Climério', label: 'Retiro do Pedro Climério' },
      { value: 'Malhada da Pedra', label: 'Malhada da Pedra' },
      { value: 'Lagoa da Pedra', label: 'Lagoa da Pedra' },
      { value: 'Lagoa Vermelha', label: 'Lagoa Vermelha' },
      { value: 'Fazenda Nova', label: 'Fazenda Nova' },
      { value: 'Sítio Volta', label: 'Sítio Volta' },
      { value: 'Fazenda do Pedro Maia', label: 'Fazenda do Pedro Maia' },
      { value: 'Cacodé', label: 'Cacodé' },
      { value: 'Batoque', label: 'Batoque' },
      { value: 'Poço do Barro', label: 'Poço do Barro' },
      { value: 'Tapera', label: 'Tapera' },
      { value: 'Juá II', label: 'Juá II' },
      { value: 'Caraúbas', label: 'Caraúbas' },
      { value: 'Caraúbas do Aníbal', label: 'Caraúbas do Aníbal' },
      { value: 'Tabuleiro Grande', label: 'Tabuleiro Grande' },
      { value: 'Córrego do Corcunda do Meio', label: 'Córrego do Corcunda do Meio' },
      { value: 'Sítio Jurema', label: 'Sítio Jurema' },
      { value: 'Flor de Liz', label: 'Flor de Liz' },
      { value: 'Córrego do Queijo', label: 'Córrego do Queijo' },
      { value: 'Flor de Liz do Zé Bedeu', label: 'Flor de Liz do Zé Bedeu' },
      { value: 'Boa Esperança', label: 'Boa Esperança' },
      { value: 'Pedra da Mesa', label: 'Pedra da Mesa' },
      { value: 'Boa Esperança III', label: 'Boa Esperança III' },
      { value: 'São José do Salvino', label: 'São José do Salvino' },
      { value: 'Mota do Tutu', label: 'Mota do Tutu' },
      { value: 'Mota do João Bezerra', label: 'Mota do João Bezerra' },
      { value: 'Lagoa da Pitinga', label: 'Lagoa da Pitinga' },
      { value: 'Lagoa do Meio', label: 'Lagoa do Meio' },
      { value: 'Sítio Marco', label: 'Sítio Marco' },
      { value: 'Extrema I', label: 'Extrema I' },
      { value: 'Alto Alegre', label: 'Alto Alegre' },
      { value: 'Pedra Grande', label: 'Pedra Grande' },
      { value: 'Cacimba de Baixo', label: 'Cacimba de Baixo' },
      { value: 'Tabuleirinho do Almeida', label: 'Tabuleirinho do Almeida' },
      { value: 'Tabuleirinho', label: 'Tabuleirinho' },
      { value: 'Barrinha', label: 'Barrinha' },
      { value: 'Canto do Jacinto', label: 'Canto do Jacinto' },
      { value: 'Melões', label: 'Melões' },
      { value: 'Sítio Córrego do Timóteo', label: 'Sítio Córrego do Timóteo' },
      { value: 'Caracará', label: 'Caracará' },
      { value: 'Várzea Redonda', label: 'Várzea Redonda' },
      { value: 'Junco', label: 'Junco' },
      { value: 'Santo Antônio', label: 'Santo Antônio' },
      { value: 'Riacho Seco', label: 'Riacho Seco' }
    ]
  },
  {
    label: 'Pedras',
    options: [
      { value: 'Lagoa do Frade', label: 'Lagoa do Frade' },
      { value: 'Alto dos Camaleões', label: 'Alto dos Camaleões' },
      { value: 'Setor O', label: 'Setor O' },
      { value: 'Pé de Serra', label: 'Pé de Serra' },
      { value: 'Bela Vista', label: 'Bela Vista' },
      { value: 'Lagoa da Serra', label: 'Lagoa da Serra' },
      { value: 'Lagoa do Jucá', label: 'Lagoa do Jucá' },
      { value: 'Lagoinha do Pé de Serra', label: 'Lagoinha do Pé de Serra' },
      { value: 'Assentamento Belford Roxo', label: 'Assentamento Belford Roxo' },
      { value: 'Sítio Lagoa do Tourinho', label: 'Sítio Lagoa do Tourinho' },
      { value: 'Casinhas', label: 'Casinhas' },
      { value: 'Pocinhos', label: 'Pocinhos' },
      { value: 'Louros', label: 'Louros' },
      { value: 'Seriema', label: 'Seriema' },
      { value: 'Jatobazinho', label: 'Jatobazinho' },
      { value: 'Pacova', label: 'Pacova' },
      { value: 'Setor NH-3', label: 'Setor NH-3' },
      { value: 'Lajes', label: 'Lajes' },
      { value: 'Lagoa das Bestas', label: 'Lagoa das Bestas' },
      { value: 'Ferrada', label: 'Ferrada' },
      { value: 'Andradina', label: 'Andradina' },
      { value: 'Salamanta', label: 'Salamanta' },
      { value: 'Francisco Pereira', label: 'Francisco Pereira' }
    ]
  },
  {
    label: 'Lagoa Grande',
    options: [
      { value: 'Gangorra do Raimundo Lira', label: 'Gangorra do Raimundo Lira' },
      { value: 'Sítio Tapera', label: 'Sítio Tapera' },
      { value: 'Bom Sucesso', label: 'Bom Sucesso' },
      { value: 'Juazeiro de Baixo', label: 'Juazeiro de Baixo' },
      { value: 'Lagoa da Barbada', label: 'Lagoa da Barbada' },
      { value: 'Poço da Serra', label: 'Poço da Serra' },
      { value: 'Cajueiro do Moisés', label: 'Cajueiro do Moisés' },
      { value: 'Juazeiro dos Abdias', label: 'Juazeiro dos Abdias' },
      { value: 'Carnaubinha', label: 'Carnaubinha' },
      { value: 'Jenipapo', label: 'Jenipapo' },
      { value: 'Baixio', label: 'Baixio' },
      { value: 'Lagoa do Caminho', label: 'Lagoa do Caminho' },
      { value: 'Tombador', label: 'Tombador' },
      { value: 'Juazeiro dos Sabinos', label: 'Juazeiro dos Sabinos' },
      { value: 'Altos', label: 'Altos' },
      { value: 'Lagoa da Canafístula', label: 'Lagoa da Canafístula' },
      { value: 'Barrocão', label: 'Barrocão' },
      { value: 'Açude dos Queiroz', label: 'Açude dos Queiroz' },
      { value: 'Riacho Grande', label: 'Riacho Grande' },
      { value: 'Riacho Grande do José Rodrigues', label: 'Riacho Grande do José Rodrigues' },
      { value: 'Lagoa da Barbada II', label: 'Lagoa da Barbada II' },
      { value: 'Lagoa do Massapê', label: 'Lagoa do Massapê' },
      { value: 'Sítio Barreiros', label: 'Sítio Barreiros' }
    ]
  },
  {
    label: 'Juazeiro da Quintina',
    options: [
      { value: 'Fazenda Nova I', label: 'Fazenda Nova I' },
      { value: 'Fazenda Nova II', label: 'Fazenda Nova II' },
      { value: 'Lagoa do Tapuio', label: 'Lagoa do Tapuio' },
      { value: 'Estrada Nova', label: 'Estrada Nova' },
      { value: 'Sítio Cumbe', label: 'Sítio Cumbe' },
      { value: 'Assentamento Fazenda Belmont', label: 'Assentamento Fazenda Belmont' },
      { value: 'Curralinho', label: 'Curralinho' },
      { value: 'Altos', label: 'Altos' },
      { value: 'Fazenda Dinamarca', label: 'Fazenda Dinamarca' },
      { value: 'Sítio Coronha', label: 'Sítio Coronha' },
      { value: 'Subcapa', label: 'Subcapa' },
      { value: 'Assentamento Aroeira I', label: 'Assentamento Aroeira I' },
      { value: 'Assentamento Aroeira II', label: 'Assentamento Aroeira II' },
      { value: 'Olho D\'água', label: 'Olho D\'água' },
      { value: 'Lagoa das Carnaúbas', label: 'Lagoa das Carnaúbas' },
      { value: 'Juazeiro de Cima', label: 'Juazeiro de Cima' },
      { value: 'Avelinos', label: 'Avelinos' }
    ]
  },
  {
    label: 'Roldão',
    options: [
      { value: 'Lagoa Nova', label: 'Lagoa Nova' },
      { value: 'Lagoa da Pedra', label: 'Lagoa da Pedra' },
      { value: 'Córrego do Corcunda', label: 'Córrego do Corcunda' },
      { value: 'Sítio Baixio', label: 'Sítio Baixio' },
      { value: 'Frei Remígio', label: 'Frei Remígio' },
      { value: 'Gangorra', label: 'Gangorra' },
      { value: 'Formoso', label: 'Formoso' },
      { value: 'Boa União', label: 'Boa União' },
      { value: 'Riacho do Serrote', label: 'Riacho do Serrote' },
      { value: 'Coroa Grande', label: 'Coroa Grande' },
      { value: 'Boa Vista de Baixo', label: 'Boa Vista de Baixo' },
      { value: 'Tabuleiro Grande', label: 'Tabuleiro Grande' },
      { value: 'Sítio Jurema III', label: 'Sítio Jurema III' },
      { value: 'Sítio Lajes', label: 'Sítio Lajes' },
      { value: 'Sítio Boa Vista', label: 'Sítio Boa Vista' },
      { value: 'Caiçara', label: 'Caiçara' },
      { value: 'Cachinoá', label: 'Cachinoá' },
      { value: 'Poço Redondo', label: 'Poço Redondo' },
      { value: 'Vai Quem Pode', label: 'Vai Quem Pode' },
      { value: 'Itaúna', label: 'Itaúna' },
      { value: 'Pedro Gomes', label: 'Pedro Gomes' },
      { value: 'Mangangá', label: 'Mangangá' },
      { value: 'Talismã', label: 'Talismã' },
      { value: 'Ipueiras', label: 'Ipueiras' },
      { value: 'Ipueiras das Carnaúbas', label: 'Ipueiras das Carnaúbas' },
      { value: 'São Luís', label: 'São Luís' },
      { value: 'Quatro Talentos', label: 'Quatro Talentos' },
      { value: 'Malhada do Anum', label: 'Malhada do Anum' },
      { value: 'Mangangá do Bausílio', label: 'Mangangá do Bausílio' },
      { value: 'Caiçara do Gildo', label: 'Caiçara do Gildo' },
      { value: 'Caiçara do Manoel Castro', label: 'Caiçara do Manoel Castro' },
      { value: 'Lagoa da Primavera', label: 'Lagoa da Primavera' },
      { value: 'Sítio Morros', label: 'Sítio Morros' },
      { value: 'Santa Rosa', label: 'Santa Rosa' },
      { value: 'Sítio Alexandre', label: 'Sítio Alexandre' },
      { value: 'Poço Dantas', label: 'Poço Dantas' },
      { value: 'Carnaubal', label: 'Carnaubal' },
      { value: 'Trincheiras', label: 'Trincheiras' },
      { value: 'Bom Fim', label: 'Bom Fim' },
      { value: 'Riacho Seco', label: 'Riacho Seco' },
      { value: 'Alto Vistoso', label: 'Alto Vistoso' },
      { value: 'Vaquejador', label: 'Vaquejador' },
      { value: 'Córrego do Corcunda de Cima', label: 'Córrego do Corcunda de Cima' },
      { value: 'Alto Mar', label: 'Alto Mar' },
      { value: 'Campo Alegre', label: 'Campo Alegre' },
      { value: 'Extrema', label: 'Extrema' },
      { value: 'Massapê do Rabelo', label: 'Massapê do Rabelo' },
      { value: 'Malhada da Areia', label: 'Malhada da Areia' },
      { value: 'Recanto', label: 'Recanto' },
      { value: 'Pedra Redonda', label: 'Pedra Redonda' },
      { value: 'Riacho do Severino', label: 'Riacho do Severino' },
      { value: 'Recanto do Abelardo', label: 'Recanto do Abelardo' },
      { value: 'Santa Marta', label: 'Santa Marta' },
      { value: 'Santa Marta do Otacílio', label: 'Santa Marta do Otacílio' },
      { value: 'Recanto do Mário Granja', label: 'Recanto do Mário Granja' },
      { value: 'Extrema do Jonas', label: 'Extrema do Jonas' },
      { value: 'Santo Antônio do Nobre', label: 'Santo Antônio do Nobre' },
      { value: 'Santo Antônio do Coutinho', label: 'Santo Antônio do Coutinho' },
      { value: 'Escondido do Florêncio', label: 'Escondido do Florêncio' },
      { value: 'Santo Antônio dos Borges', label: 'Santo Antônio dos Borges' },
      { value: 'São Gonçalo', label: 'São Gonçalo' },
      { value: 'Monte Alegre', label: 'Monte Alegre' },
      { value: 'Calçada', label: 'Calçada' },
      { value: 'Santa Rosa do Cândido', label: 'Santa Rosa do Cândido' },
      { value: 'Poço da Pedra', label: 'Poço da Pedra' },
      { value: 'Lagoa do Feijão', label: 'Lagoa do Feijão' },
      { value: 'Santa Luzia', label: 'Santa Luzia' },
      { value: 'Cipoada II', label: 'Cipoada II' },
      { value: 'Cachoeira do Joel', label: 'Cachoeira do Joel' },
      { value: 'Almas do Valdivino', label: 'Almas do Valdivino' },
      { value: 'Vila Batista', label: 'Vila Batista' },
      { value: 'Cachoeira', label: 'Cachoeira' },
      { value: 'Lagoa da Pedra do Zel', label: 'Lagoa da Pedra do Zel' },
      { value: 'Cipoada I', label: 'Cipoada I' },
      { value: 'Almas', label: 'Almas' },
      { value: 'Áustria', label: 'Áustria' },
      { value: 'Riacho do Mono', label: 'Riacho do Mono' },
      { value: 'Nova Olinda', label: 'Nova Olinda' },
      { value: 'Passagem', label: 'Passagem' },
      { value: 'Pedra Branca', label: 'Pedra Branca' },
      { value: 'Riacho da Serra', label: 'Riacho da Serra' }
    ]
  }
];

const EMPTY_FORM = {
  nome: '',
  endereco: '',
  contato: '',
  local: '',
  observacao: '',
};

export default function PessoaFormDialog({
  open,
  pessoa,
  onClose,
  onSave,
  loading,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const isEdit = Boolean(pessoa);

  useEffect(() => {
    if (open) {
      setForm(
        pessoa
          ? {
              nome: pessoa.nome || '',
              endereco: pessoa.endereco || '',
              contato: pessoa.contato || '',
              local: pessoa.local || '',
              observacao: pessoa.observacao || '',
            }
          : EMPTY_FORM
      );
      setErrors({});
    }
  }, [open, pessoa]);

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório';
    if (!form.endereco.trim()) e.endereco = 'Endereço é obrigatório';
    if (!form.contato.trim()) e.contato = 'Contato é obrigatório';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleChangeLocal = (selectedOption) => {
    setForm((prev) => ({ ...prev, local: selectedOption?.value || '' }));
    if (errors.local) setErrors((prev) => ({ ...prev, local: '' }));
  };

  const handleSubmit = () => {
    if (validate()) onSave(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          display: 'flex',
          flexDirection: 'column',
          maxHeight: isSelectOpen ? '95vh' : '85vh',
          top: isSelectOpen ? 10 : 'auto',
          transition: 'all 0.3s ease',
          '@media (max-width: 768px)': {
            maxHeight: isSelectOpen ? '95vh' : '90vh',
            top: isSelectOpen ? 10 : 0,
            width: '100%',
            margin: 0,
          },
        },
      }}
    >
      <DialogTitle sx={{ p: 0, position: 'sticky', top: 0, zIndex: 10 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #b3521a 0%, #e8732a 100%)',
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <GroupRoundedIcon sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white' }}>
              {isEdit ? 'Editar Pessoa' : 'Adicionar Pessoa'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'white' }} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent

        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
          py: 3,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#999',
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <TextField
              label="Nome *"
              fullWidth
              value={form.nome}
              onChange={handleChange('nome')}
              error={!!errors.nome}
              helperText={errors.nome}
              placeholder="Nome completo"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço *"
              fullWidth
              value={form.endereco}
              onChange={handleChange('endereco')}
              error={!!errors.endereco}
              helperText={errors.endereco}
              placeholder="Rua, número, bairro, cidade"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contato *"
              fullWidth
              value={form.contato}
              onChange={handleChange('contato')}
              error={!!errors.contato}
              helperText={errors.contato}
              placeholder="(00) 00000-0000"
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#666' }}>Local</Typography>
              <Select
                value={form.local ? { value: form.local, label: form.local } : null}
                onChange={handleChangeLocal}
                onMenuOpen={() => setIsSelectOpen(true)}
                onMenuClose={() => setIsSelectOpen(false)}
                options={OPÇÕES_LOCALIDADE}
                isSearchable={true}
                isClearable={true}
                noOptionsMessage={() => 'Local não encontrado'}
                placeholder="Selecione uma localidade..."
                menuPlacement="top"
                menuPosition="fixed"
                menuPortalTarget={document.body}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    fontSize: '16px',
                    minHeight: '42px',
                    borderColor: state.isFocused ? '#1976d2' : '#ccc',
                    boxShadow: state.isFocused ? '0 0 0 1px #1976d2' : 'none',
                    '&:hover': {
                      borderColor: '#999',
                    },
                  }),
                  input: (base) => ({
                    ...base,
                    fontSize: '16px',
                    minHeight: '42px',
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: '16px',
                    backgroundColor: state.isSelected ? '#1976d2' : state.isFocused ? '#e3f2fd' : 'white',
                    color: state.isSelected ? 'white' : 'black',
                    cursor: 'pointer',
                    padding: '10px 12px',
                  }),
                  groupHeading: (base) => ({
                    ...base,
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#666',
                    padding: '8px 12px',
                    textTransform: 'none',
                  }),
                  menuList: (base) => ({
                    ...base,
                    fontSize: '16px',
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Observação"
              fullWidth
              value={form.observacao}
              onChange={handleChange('observacao')}
              placeholder="Obs. (opcional)"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider sx={{ m: 0 }} />
      <DialogActions
        sx={{
          position: 'sticky',
          bottom: 0,
          px: 3,
          py: 2,
          gap: 1,
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
        <Button onClick={onClose} variant="outlined" color="inherit" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {loading ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Adicionar pessoa'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
