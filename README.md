# 🚀 Portfolio Developer Showcase

Um portfólio profissional completo com Backend (Node.js + Express + Prisma) e Frontend (Next.js 14 + TypeScript + Tailwind CSS) para demonstração de projetos de desenvolvimento.

## ✨ Funcionalidades

### 🎯 CORE (Implementado)

- ✅ **Backend API completo**
  - Autenticação JWT
  - CRUD de Projetos
  - CRUD de Skills
  - CRUD de Experiências Profissionais
  - CRUD de Educação
  - CRUD de Certificados
  - Integração com GitHub API
  - Gerador de CV em PDF

- ✅ **Configuração Frontend**
  - Next.js 14 com App Router
  - TypeScript
  - Tailwind CSS
  - API Client configurado

### 🎨 Extras Implementados

- ✅ **GitHub Stats Dashboard** - Estatísticas automáticas do GitHub
- ✅ **CV Downloadable** - Geração automática de currículo em PDF
- ✅ **Skills & Timeline** - Sistema completo de habilidades e experiências
- ✅ **Availability Status** - Status de disponibilidade para trabalho

## 📋 Stack Tecnológica

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Bcrypt
- **Validation**: Zod
- **PDF Generation**: PDFKit
- **GitHub Integration**: Octokit

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (Shadcn/UI)
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State Management**: Zustand

## 📁 Estrutura do Projeto

```
portfolio-website/
├── backend/                     # API Backend
│   ├── prisma/
│   │   ├── schema.prisma       # Schema do banco de dados
│   │   └── seed.ts             # Dados iniciais
│   ├── src/
│   │   ├── config/             # Configurações (env, database)
│   │   ├── controllers/        # Controladores
│   │   ├── middlewares/        # Middlewares (auth, error, validation)
│   │   ├── routes/             # Rotas da API
│   │   ├── services/           # Lógica de negócio
│   │   ├── utils/              # Utilitários
│   │   └── server.ts           # Servidor Express
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                    # Next.js Application
│   ├── src/
│   │   ├── app/                # App Router
│   │   ├── components/         # Componentes React
│   │   ├── lib/                # Bibliotecas (api, utils)
│   │   └── types/              # Tipos TypeScript
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── .env.example
│
├── shared/                      # Tipos compartilhados
│   └── types/
│
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn
- Git

### 1. Configurar o Backend

```bash
# Navegar para pasta do backend
cd backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas configurações
# DATABASE_URL, JWT_SECRET, GITHUB_TOKEN, etc.
```

**Configurar `.env`:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
PORT=5000
NODE_ENV=development
JWT_SECRET=seu-secret-super-seguro-aqui
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
GITHUB_TOKEN=seu-github-token-aqui
GITHUB_USERNAME=seu-usuario-github
CORS_ORIGIN=http://localhost:3000
```

**Configurar banco de dados:**

```bash
# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Popular banco com dados iniciais
npm run prisma:seed
```

**Executar backend:**

```bash
# Modo desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Executar produção
npm start
```

O backend estará rodando em: `http://localhost:5000`

### 2. Configurar o Frontend

```bash
# Navegar para pasta do frontend
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.local

# Editar .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Executar frontend:**

```bash
# Modo desenvolvimento
npm run dev

# Build produção
npm run build

# Executar produção
npm start
```

O frontend estará rodando em: `http://localhost:3000`

## 📡 Endpoints da API

### Autenticação
```
POST   /api/auth/login          # Login
GET    /api/auth/me             # Usuário atual
PUT    /api/auth/change-password # Trocar senha
```

### Projetos
```
GET    /api/projects            # Listar projetos
GET    /api/projects/:slug      # Detalhes do projeto
POST   /api/projects            # Criar projeto (Admin)
PUT    /api/projects/:id        # Atualizar projeto (Admin)
DELETE /api/projects/:id        # Deletar projeto (Admin)
POST   /api/projects/:id/like   # Curtir projeto
GET    /api/projects/stats      # Estatísticas
```

### GitHub
```
GET    /api/github/profile      # Perfil GitHub
GET    /api/github/repos        # Repositórios
GET    /api/github/stats        # Estatísticas GitHub
POST   /api/github/sync         # Sincronizar stats (Admin)
```

### Skills
```
GET    /api/skills              # Listar skills
POST   /api/skills              # Criar skill (Admin)
PUT    /api/skills/:id          # Atualizar skill (Admin)
DELETE /api/skills/:id          # Deletar skill (Admin)
PUT    /api/skills/reorder      # Reordenar skills (Admin)
```

### Perfil
```
GET    /api/profile             # Dados do perfil
PUT    /api/profile             # Atualizar perfil (Admin)

GET    /api/profile/experiences # Experiências
POST   /api/profile/experiences # Criar (Admin)
PUT    /api/profile/experiences/:id
DELETE /api/profile/experiences/:id

GET    /api/profile/education   # Educação
POST   /api/profile/education
PUT    /api/profile/education/:id
DELETE /api/profile/education/:id

GET    /api/profile/certificates # Certificados
POST   /api/profile/certificates
PUT    /api/profile/certificates/:id
DELETE /api/profile/certificates/:id

GET    /api/profile/cv/download # Download CV em PDF
```

## 🗄️ Modelos do Banco de Dados

### User
- Autenticação e autorização
- Roles: ADMIN, VIEWER

### Project
- Informações do projeto
- Categorias: FRONTEND, BACKEND, FULLSTACK, AI_ML, CLOUD, etc
- Status: DRAFT, PUBLISHED, ARCHIVED
- Integração com GitHub

### Skill
- Habilidades técnicas
- Níveis (0-100)
- Categorias

### Experience
- Experiências profissionais
- Timeline de carreira

### Education
- Formação acadêmica

### Certificate
- Certificações profissionais

### SiteSettings
- Configurações gerais do site
- Informações pessoais
- Links sociais
- SEO

## 🔑 Credenciais Padrão

Após executar o seed:

```
Email: admin@portfolio.com
Senha: admin123
```

**⚠️ IMPORTANTE: Altere estas credenciais em produção!**

## 🎨 Próximos Passos para Implementação

### Frontend - Páginas Públicas

1. **Home Page** (`/src/app/page.tsx`)
   - Hero section
   - Projetos em destaque
   - GitHub stats
   - Call-to-action

2. **Projects Page** (`/src/app/projects/page.tsx`)
   - Grid de projetos
   - Filtros (categoria, tags)
   - Busca

3. **Project Detail** (`/src/app/projects/[slug]/page.tsx`)
   - Detalhes completos
   - Galeria de imagens
   - Markdown rendering

4. **About Page** (`/src/app/about/page.tsx`)
   - Bio
   - Skills
   - Experience timeline
   - Education
   - Certificates

5. **Contact Page** (`/src/app/contact/page.tsx`)
   - Formulário de contato
   - Links sociais

### Frontend - Painel Admin

1. **Login** (`/src/app/admin/login/page.tsx`)
2. **Dashboard** (`/src/app/admin/dashboard/page.tsx`)
3. **Projects Management** (`/src/app/admin/projects/page.tsx`)
4. **Skills Management** (`/src/app/admin/skills/page.tsx`)
5. **Profile Settings** (`/src/app/admin/settings/page.tsx`)

### Componentes UI Necessários

- Button, Card, Input, Select, Dialog
- ProjectCard, SkillCard
- Header, Footer, Navigation
- Forms (React Hook Form)
- Charts (Recharts para stats)

## 🛠️ Scripts Disponíveis

### Backend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build
npm start            # Produção
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Migrations
npm run prisma:seed      # Popular BD
npm run prisma:studio    # Prisma Studio
```

### Frontend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build
npm start            # Produção
npm run lint         # ESLint
```

## 🌟 Recursos Extras Sugeridos

1. **Blog Técnico** - Sistema de artigos
2. **Newsletter** - Captura de emails
3. **Analytics** - Google Analytics/Plausible
4. **SEO** - Sitemap, meta tags
5. **PWA** - Progressive Web App
6. **i18n** - Internacionalização (PT/EN)
7. **Dark Mode** - Tema escuro/claro
8. **Comments** - Sistema de comentários em projetos

## 📦 Deploy

### Backend
- Railway, Render, Heroku, ou AWS
- Configure variáveis de ambiente
- PostgreSQL no Railway/Supabase/AWS RDS

### Frontend
- Vercel (recomendado para Next.js)
- Netlify
- Configure NEXT_PUBLIC_API_URL

## 🤝 Contribuindo

Este é um projeto template. Personalize conforme sua necessidade:

1. Altere cores no `tailwind.config.ts`
2. Adicione seus projetos no seed
3. Configure suas redes sociais
4. Adicione seu GitHub token

## 📝 Licença

MIT

## 🆘 Suporte

Para dúvidas sobre a implementação:
- Revise a documentação do [Next.js](https://nextjs.org/docs)
- Consulte a documentação do [Prisma](https://www.prisma.io/docs)
- Veja exemplos do [Shadcn/UI](https://ui.shadcn.com/)

---

**Desenvolvido com ❤️ usando as melhores tecnologias modernas**
