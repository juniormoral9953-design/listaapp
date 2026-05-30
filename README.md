# Lista App — Gerenciamento de Listas de Pessoas

Sistema web completo para gerenciamento de responsáveis e pessoas vinculadas, construído com **React**, **Material UI** e **Firebase Firestore**.

---

## 🚀 Tecnologias

- **React 18** — UI
- **Material UI (MUI) v5** — Design system
- **Firebase 10** — Firestore (banco de dados) + Auth (preparado)
- **React Router v6** — Navegação
- **React Hooks** — Estado e efeitos

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ConfirmDialog.jsx          # Modal de confirmação de exclusão
│   ├── EmptyState.jsx             # Estado vazio com ação
│   ├── GlobalSnackbar.jsx         # Feedback toast
│   ├── LoadingOverlay.jsx         # Indicador de carregamento
│   ├── PageHeader.jsx             # Cabeçalho de página com breadcrumbs
│   ├── PessoaFormDialog.jsx       # Formulário de pessoa (criar/editar)
│   ├── ResponsavelCard.jsx        # Card de responsável (modo grade)
│   ├── ResponsavelFormDialog.jsx  # Formulário de responsável (criar/editar)
│   └── ResponsaveisTable.jsx      # Tabela de responsáveis (modo lista)
├── firebase/
│   └── config.js                  # Inicialização do Firebase
├── hooks/
│   ├── useConfirm.js              # Hook de confirmação
│   └── useSnackbar.js             # Hook de snackbar
├── layouts/
│   └── MainLayout.jsx             # Layout com AppBar + Drawer
├── pages/
│   ├── Dashboard.jsx              # Visão geral / estatísticas
│   ├── Responsaveis.jsx           # Lista de responsáveis
│   └── ResponsavelDetalhe.jsx     # Detalhe + pessoas vinculadas
├── routes/
│   └── AppRoutes.jsx              # Definição de rotas
├── services/
│   ├── pessoasService.js          # CRUD de pessoas (subcollection)
│   └── responsaveisService.js     # CRUD de responsáveis
├── styles/
│   └── theme.js                   # Tema MUI customizado
├── App.js
└── index.js
```

---

## ⚙️ Configuração do Firebase

### 1. Criar projeto no Firebase

1. Acesse [https://console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"** e siga as instruções
3. No painel do projeto, clique em **"</>"** (Web) para adicionar um app web
4. Copie as credenciais geradas

### 2. Ativar o Firestore

1. No menu lateral, vá em **Build → Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha **modo de produção** ou **modo de teste** (para desenvolvimento)
4. Selecione a região mais próxima

### 3. Regras do Firestore (desenvolvimento)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Apenas para desenvolvimento!
    }
  }
}
```

> ⚠️ Para produção, configure regras de segurança adequadas.

---

## 🔐 Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu-projeto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 📦 Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais Firebase

# 3. Iniciar em desenvolvimento
npm start

# 4. Build para produção
npm run build
```

O app estará disponível em: **http://localhost:3000**

---

## 🗄️ Estrutura do Firestore

```
firestore/
└── responsaveis/                    ← collection
    └── {responsavelId}/             ← document
        ├── nome: string
        ├── contato: string
        ├── observacao: string
        ├── criadoEm: timestamp
        ├── atualizadoEm: timestamp
        └── pessoas/                 ← subcollection
            └── {pessoaId}/          ← document
                ├── nome: string
                ├── endereco: string
                ├── contato: string
                ├── observacao: string
                ├── criadoEm: timestamp
                └── atualizadoEm: timestamp
```

---

## ✨ Funcionalidades

### Responsáveis
- ✅ Listar com busca em tempo real
- ✅ Visualização em grade (cards) ou tabela
- ✅ Criar novo responsável
- ✅ Editar responsável existente
- ✅ Excluir com confirmação (remove pessoas vinculadas automaticamente)
- ✅ Contador de pessoas por responsável

### Pessoas
- ✅ Listar pessoas vinculadas ao responsável
- ✅ Busca por nome, endereço ou contato
- ✅ Adicionar nova pessoa
- ✅ Editar pessoa existente
- ✅ Excluir com confirmação

### UX
- ✅ Feedback visual com Snackbar (sucesso/erro)
- ✅ Loading durante operações assíncronas
- ✅ Confirmação antes de deletar
- ✅ Validação de campos obrigatórios
- ✅ Mensagens de estado vazio
- ✅ Breadcrumbs de navegação
- ✅ Layout responsivo (mobile + desktop)
- ✅ Drawer colapsável em mobile

---

## 📱 Responsividade

- **Mobile**: Drawer deslizante, cards em coluna única
- **Tablet**: Grid de 2 colunas
- **Desktop**: Drawer fixo lateral, grid de 3-4 colunas

---

## 🔧 Dependências

```json
{
  "@mui/material": "^5.15.0",
  "@mui/icons-material": "^5.15.0",
  "@mui/x-data-grid": "^6.18.0",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "firebase": "^10.7.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "react-scripts": "5.0.1"
}
```
