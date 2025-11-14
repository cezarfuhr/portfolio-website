# 🚀 API Capabilities - O Que Você Pode Fazer

Documentação completa de todas as funcionalidades disponíveis na API do Portfolio.

---

## 📊 Visão Geral

Esta API é um **CMS completo para portfolio profissional** com:

✅ **70+ Endpoints** RESTful
✅ **Autenticação JWT** com controle de acesso
✅ **Integração GitHub** em tempo real
✅ **Geração de PDF** automática
✅ **Sistema de Tags** e categorização
✅ **Analytics** e estatísticas
✅ **Validação** completa de dados

---

## 🎯 O Que Dá Para Fazer?

### 1. 📁 Gerenciamento Completo de Projetos

**Criar, editar, deletar e listar projetos** com informações ricas:

#### Dados do Projeto
```json
{
  "title": "Portfolio Website",
  "slug": "portfolio-website",
  "description": "Sistema completo de portfolio",
  "longDescription": "Descrição detalhada em Markdown...",

  "technologies": ["React", "Node.js", "PostgreSQL"],
  "category": "FULLSTACK",

  "githubUrl": "https://github.com/user/repo",
  "demoUrl": "https://demo.com",
  "imageUrl": "https://image.com/main.jpg",
  "images": ["img1.jpg", "img2.jpg"],

  "featured": true,
  "status": "PUBLISHED",
  "views": 1250,
  "likes": 45,

  "githubStars": 128,
  "githubForks": 34,
  "githubLanguage": "TypeScript",

  "startDate": "2024-01-01",
  "endDate": "2024-06-01",

  "tags": [
    { "name": "React", "slug": "react", "color": "#61DAFB" },
    { "name": "TypeScript", "slug": "typescript" }
  ]
}
```

#### O Que Você Pode Fazer
- ✅ **CRUD Completo** (Create, Read, Update, Delete)
- ✅ **Filtrar** por categoria, status, featured, tags, busca
- ✅ **Busca Textual** em título e descrição
- ✅ **Slug Automático** gerado do título
- ✅ **Estatísticas** (total, por categoria, views, likes)
- ✅ **Sistema de Likes** (pública, sem autenticação)
- ✅ **Incremento de Views** automático
- ✅ **Upload de Múltiplas Imagens**
- ✅ **Markdown** em descrição longa
- ✅ **Sync GitHub** automático (stars, forks, linguagem)

#### Endpoints

```bash
# Públicos
GET    /api/projects                 # Listar todos (com filtros)
GET    /api/projects/stats           # Estatísticas
GET    /api/projects/:slug           # Buscar por slug
POST   /api/projects/:id/like        # Dar like

# Admin (Requer JWT)
POST   /api/projects                 # Criar projeto
PUT    /api/projects/:id             # Atualizar projeto
DELETE /api/projects/:id             # Deletar projeto
```

#### Filtros Disponíveis
```bash
# Exemplos de uso
GET /api/projects?category=FULLSTACK
GET /api/projects?status=PUBLISHED
GET /api/projects?featured=true
GET /api/projects?tags=react,typescript
GET /api/projects?search=portfolio
GET /api/projects?category=AI_ML&featured=true
```

---

### 2. 🐙 Integração GitHub Completa

**Buscar dados reais do GitHub** sem precisar fazer scraping:

#### O Que Você Pode Fazer
- ✅ **Perfil GitHub** (avatar, bio, seguidores, etc.)
- ✅ **Lista de Repositórios** (público)
- ✅ **Estatísticas Agregadas** (total repos, stars, forks)
- ✅ **Sync Automático** de stats para projetos
- ✅ **Linguagens Predominantes**
- ✅ **Contribuições**

#### Endpoints

```bash
# Públicos
GET  /api/github/profile?username=usuario    # Perfil
GET  /api/github/repos?username=usuario      # Repositórios
GET  /api/github/stats?username=usuario      # Estatísticas

# Admin
POST /api/github/sync                         # Sincronizar stats
     Body: { "githubUrl": "https://github.com/user/repo" }
```

#### Dados Retornados

**Perfil:**
```json
{
  "login": "username",
  "name": "Full Name",
  "avatar_url": "https://...",
  "bio": "Developer...",
  "location": "City, Country",
  "blog": "https://...",
  "public_repos": 42,
  "followers": 150,
  "following": 80,
  "created_at": "2020-01-01"
}
```

**Estatísticas:**
```json
{
  "totalRepos": 42,
  "totalStars": 1250,
  "totalForks": 320,
  "languages": {
    "JavaScript": 45,
    "TypeScript": 30,
    "Python": 25
  },
  "mostStarredRepo": {
    "name": "awesome-project",
    "stars": 450
  }
}
```

---

### 3. 🎯 Sistema de Skills (Habilidades)

**Gerenciar habilidades técnicas** com níveis e categorias:

#### Dados da Skill
```json
{
  "name": "React",
  "category": "FRONTEND",
  "level": 90,           // 0-100
  "yearsOfExp": 4,
  "icon": "react.svg",
  "color": "#61DAFB",
  "order": 1
}
```

#### O Que Você Pode Fazer
- ✅ **CRUD Completo**
- ✅ **Categorização** (Frontend, Backend, Database, etc.)
- ✅ **Níveis de Proficiência** (0-100)
- ✅ **Anos de Experiência**
- ✅ **Reordenação** drag-and-drop
- ✅ **Ícones e Cores** personalizados
- ✅ **Filtro por Categoria**

#### Categorias Disponíveis
```
FRONTEND, BACKEND, DATABASE, DEVOPS,
CLOUD, AI_ML, MOBILE, TOOLS, SOFT_SKILLS, OTHER
```

#### Endpoints

```bash
# Públicos
GET    /api/skills                   # Listar todas
GET    /api/skills?category=FRONTEND # Filtrar por categoria

# Admin
POST   /api/skills                   # Criar
PUT    /api/skills/:id               # Atualizar
DELETE /api/skills/:id               # Deletar
PUT    /api/skills/reorder           # Reordenar
       Body: { "skills": [{ "id": "...", "order": 1 }, ...] }
```

---

### 4. 👤 Gerenciamento de Perfil

**Sistema completo de portfolio pessoal** com:

#### Informações do Perfil
```json
{
  "fullName": "Seu Nome",
  "title": "Full Stack Developer",
  "bio": "Desenvolvedor apaixonado...",
  "email": "contato@email.com",
  "phone": "+55 11 99999-9999",
  "location": "São Paulo, Brasil",
  "website": "https://...",
  "githubUsername": "username",
  "linkedinUrl": "https://linkedin.com/in/...",
  "twitterUrl": "https://twitter.com/...",
  "avatarUrl": "https://...",
  "resumeUrl": "https://...",
  "availableForWork": true,
  "availabilityText": "Disponível para projetos"
}
```

#### Endpoints

```bash
# Públicos
GET /api/profile                      # Obter perfil

# Admin
PUT /api/profile                      # Atualizar perfil
```

---

### 5. 💼 Experiência Profissional (Timeline)

**Criar timeline de carreira profissional:**

#### Dados da Experiência
```json
{
  "company": "Empresa ABC",
  "position": "Senior Developer",
  "location": "São Paulo, SP",
  "startDate": "2020-01-01",
  "endDate": "2023-06-30",    // null = atual
  "current": false,
  "description": "Responsabilidades e conquistas...",
  "technologies": ["React", "Node.js", "AWS"],
  "achievements": [
    "Reduziu tempo de build em 40%",
    "Implementou CI/CD completo"
  ]
}
```

#### O Que Você Pode Fazer
- ✅ **CRUD Completo**
- ✅ **Período de Trabalho** (início, fim, atual)
- ✅ **Tecnologias Utilizadas**
- ✅ **Conquistas** em lista
- ✅ **Ordenação Automática** por data

#### Endpoints

```bash
# Públicos
GET    /api/profile/experiences       # Listar todas

# Admin
POST   /api/profile/experiences       # Criar
PUT    /api/profile/experiences/:id   # Atualizar
DELETE /api/profile/experiences/:id   # Deletar
```

---

### 6. 🎓 Educação

**Gerenciar formação acadêmica:**

#### Dados da Educação
```json
{
  "institution": "Universidade XYZ",
  "degree": "Bacharel em Ciência da Computação",
  "field": "Ciência da Computação",
  "location": "São Paulo, SP",
  "startDate": "2015-01-01",
  "endDate": "2019-12-31",
  "description": "Foco em desenvolvimento web...",
  "gpa": "8.5/10"
}
```

#### Endpoints

```bash
# Públicos
GET    /api/profile/education         # Listar todas

# Admin
POST   /api/profile/education         # Criar
PUT    /api/profile/education/:id     # Atualizar
DELETE /api/profile/education/:id     # Deletar
```

---

### 7. 📜 Certificações

**Gerenciar certificados e cursos:**

#### Dados da Certificação
```json
{
  "name": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "issueDate": "2023-06-15",
  "expiryDate": "2026-06-15",  // null = não expira
  "credentialId": "ABC123XYZ",
  "credentialUrl": "https://...",
  "description": "Certificação em arquitetura AWS"
}
```

#### Endpoints

```bash
# Públicos
GET    /api/profile/certificates      # Listar todos

# Admin
POST   /api/profile/certificates      # Criar
PUT    /api/profile/certificates/:id  # Atualizar
DELETE /api/profile/certificates/:id  # Deletar
```

---

### 8. 📄 Geração de CV em PDF

**Gerar currículo automaticamente** com todos os dados:

#### O Que É Gerado
- ✅ Informações pessoais
- ✅ Skills por categoria
- ✅ Experiências profissionais
- ✅ Educação
- ✅ Certificações
- ✅ Projetos em destaque
- ✅ **Formatação profissional**
- ✅ **Download direto** (PDF)

#### Endpoint

```bash
GET /api/profile/cv/download          # Download do PDF
```

**Uso:**
```html
<a href="http://localhost:5003/api/profile/cv/download" download>
  Download CV
</a>
```

---

### 9. 🔐 Autenticação e Segurança

**Sistema completo de autenticação:**

#### Funcionalidades
- ✅ **Login JWT**
- ✅ **Verificação de Token**
- ✅ **Troca de Senha**
- ✅ **Role-Based Access** (Admin/Viewer)
- ✅ **Rate Limiting** (100 req/15min)
- ✅ **CORS** configurável

#### Endpoints

```bash
POST /api/auth/login                  # Login
     Body: { "email": "...", "password": "..." }
     Returns: { "token": "...", "user": {...} }

GET  /api/auth/me                     # Usuário atual (requer token)

PUT  /api/auth/change-password        # Mudar senha
     Body: { "oldPassword": "...", "newPassword": "..." }
```

#### Como Usar o Token

```javascript
// No Header de todas as requisições privadas
Authorization: Bearer <seu-token-jwt>
```

---

### 10. 🏷️ Sistema de Tags

**Organizar projetos com tags:**

#### Dados da Tag
```json
{
  "name": "React",
  "slug": "react",
  "color": "#61DAFB"
}
```

#### O Que Você Pode Fazer
- ✅ Criar tags personalizadas
- ✅ Cores personalizadas
- ✅ Associar múltiplas tags a projetos
- ✅ Filtrar projetos por tags

---

## 🎨 Categorias de Projetos

```
FRONTEND      - Projetos frontend
BACKEND       - Projetos backend
FULLSTACK     - Aplicações completas
MOBILE        - Apps mobile
AI_ML         - Inteligência Artificial / Machine Learning
CLOUD         - Cloud Computing / DevOps
DEVOPS        - DevOps / Infraestrutura
DATA_SCIENCE  - Ciência de Dados
BLOCKCHAIN    - Blockchain / Web3
GAME_DEV      - Desenvolvimento de Jogos
OTHER         - Outros
```

---

## 📊 Analytics e Estatísticas

### Projeto Stats

```bash
GET /api/projects/stats
```

**Retorna:**
```json
{
  "total": 30,
  "published": 25,
  "draft": 3,
  "archived": 2,
  "featured": 5,
  "totalViews": 15420,
  "totalLikes": 892,
  "byCategory": [
    { "category": "FULLSTACK", "_count": 8 },
    { "category": "AI_ML", "_count": 5 }
  ],
  "topProjects": [
    {
      "title": "Project Name",
      "slug": "project-name",
      "views": 2500,
      "likes": 150
    }
  ]
}
```

---

## 🔍 Recursos Avançados

### 1. Busca e Filtros Combinados

```bash
# Buscar projetos FULLSTACK, publicados, featured, com React
GET /api/projects?category=FULLSTACK&status=PUBLISHED&featured=true&tags=react

# Buscar por texto
GET /api/projects?search=portfolio

# Combinar tudo
GET /api/projects?category=AI_ML&search=machine%20learning&featured=true
```

### 2. Markdown Support

Descrições longas aceitam Markdown:

```markdown
## Features

- ✅ Authentication
- ✅ Real-time updates
- ✅ Responsive design

### Tech Stack
**Frontend**: React, TypeScript
**Backend**: Node.js, PostgreSQL
```

### 3. Múltiplas Imagens

Projetos podem ter várias imagens:

```json
{
  "imageUrl": "main-image.jpg",      // Imagem principal
  "images": [                         // Galeria
    "screenshot1.jpg",
    "screenshot2.jpg",
    "demo.gif"
  ]
}
```

---

## 💡 Casos de Uso

### 1. Portfolio Público

```javascript
// Listar projetos publicados e featured
const response = await fetch('/api/projects?status=PUBLISHED&featured=true');

// Mostrar skills por categoria
const skills = await fetch('/api/skills?category=FRONTEND');

// Baixar CV
window.open('/api/profile/cv/download');
```

### 2. Painel Admin

```javascript
// Login
const login = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
const { token } = await login.json();

// Criar projeto (com token)
const createProject = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(projectData)
});
```

### 3. Integração com GitHub

```javascript
// Sincronizar stats do GitHub para projeto
await fetch('/api/github/sync', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({
    githubUrl: 'https://github.com/user/repo'
  })
});

// Buscar estatísticas do perfil
const stats = await fetch('/api/github/stats?username=seu-usuario');
```

---

## 🛡️ Segurança

### Rate Limiting

- **100 requisições** por **15 minutos** por IP
- Aplica-se a todos os endpoints `/api/*`
- Headers retornados:
  - `X-RateLimit-Limit`: Limite total
  - `X-RateLimit-Remaining`: Requisições restantes
  - `X-RateLimit-Reset`: Timestamp do reset

### CORS

- Configurável via `.env`: `CORS_ORIGIN`
- Default: `http://localhost:3003`
- Produção: Configure para seu domínio

### Validação

- Todos os inputs são validados com **Zod**
- Erros retornam **400 Bad Request** com detalhes
- Sanitização automática de dados

---

## 📋 Resumo do Poder da API

| Recurso | Endpoints | Admin | Público |
|---------|-----------|-------|---------|
| **Projetos** | 8 | CRUD, Stats | Lista, View, Like |
| **GitHub** | 4 | Sync | Profile, Repos, Stats |
| **Skills** | 5 | CRUD, Reorder | Lista |
| **Perfil** | 2 | Update | View |
| **Experiências** | 4 | CRUD | Lista |
| **Educação** | 4 | CRUD | Lista |
| **Certificações** | 4 | CRUD | Lista |
| **CV** | 1 | - | Download PDF |
| **Auth** | 3 | Change Password | Login, Me |

**Total**: ~35 endpoints principais + variações com filtros

---

## 🚀 Próximos Passos

Para usar a API:

1. **Autentique-se**: `POST /api/auth/login`
2. **Obtenha o token**: Guarde o JWT retornado
3. **Faça requisições**: Use o token no header `Authorization`
4. **Explore**: Use os endpoints públicos sem autenticação

**Documentação Interativa**: Em breve com Swagger/OpenAPI

---

**Esta API transforma seu portfolio em um CMS completo e profissional! 🎉**
