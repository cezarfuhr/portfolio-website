# 🚀 Portfolio Developer Showcase

A complete professional portfolio with Backend (Node.js + Express + Prisma) and Frontend (Next.js 14 + TypeScript + Tailwind CSS) for showcasing development projects.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

### ✅ Fully Implemented

#### **Backend API**
- 🔐 JWT Authentication
- 📦 Complete CRUD for Projects, Skills, Experience, Education, Certificates
- 🐙 GitHub API Integration
- 📄 PDF CV Generator (PDFKit)
- 🔒 Role-based access control
- ✅ Data validation (Zod)
- 📊 Analytics tracking
- 🚀 RESTful API with Express

#### **Frontend Application**
- 🏠 **Home Page** - Hero section, stats, and featured projects
- 📁 **Projects Page** - Filterable and searchable project listing
- 🔍 **Project Detail** - Full project view with markdown rendering
- 👤 **About Page** - Skills, experience timeline, bio
- 📧 **Contact Page** - Contact form and information
- 🔐 **Admin Panel** - Login and dashboard for content management
- 📱 Fully responsive design
- 🎨 Modern UI with Shadcn/UI components
- ⚡ Optimized performance with Next.js 14

#### **Additional Features**
- 📊 **GitHub Stats Dashboard** - Automatic GitHub statistics
- 📥 **Downloadable CV** - Auto-generated PDF resume
- 🎯 **Skills & Timeline** - Complete skills and experience system
- 🟢 **Availability Status** - Work availability indicator
- 🏷️ **Tag System** - Organize projects with tags
- 🌐 **30 Sample Projects** - Pre-seeded with realistic data

## 🛠️ Tech Stack

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
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (Shadcn/UI)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Markdown**: React Markdown

## 🚀 Quick Start with Docker

The easiest way to run the entire stack:

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-website

# Start everything with Docker Compose
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Database: localhost:5432
```

That's it! The application will:
- ✅ Start PostgreSQL database
- ✅ Run database migrations
- ✅ Seed with 30 sample projects
- ✅ Start backend API
- ✅ Start frontend application

## 📋 Manual Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn
- Git

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# DATABASE_URL, JWT_SECRET, GITHUB_TOKEN, etc.
```

**Configure `.env`:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_USERNAME=your-github-username
CORS_ORIGIN=http://localhost:3000
```

**Setup database:**

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

**Run backend:**

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Backend will be running at: `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Run frontend:**

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Frontend will be running at: `http://localhost:3000`

## 📁 Project Structure

```
portfolio-website/
├── backend/                    # Express API
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Sample data (30 projects)
│   ├── src/
│   │   ├── config/            # Configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middlewares/       # Auth, validation, errors
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utilities
│   │   └── server.ts          # Express server
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # Next.js App
│   ├── src/
│   │   ├── app/               # Pages (App Router)
│   │   │   ├── page.tsx       # Home
│   │   │   ├── projects/      # Projects pages
│   │   │   ├── about/         # About page
│   │   │   ├── contact/       # Contact page
│   │   │   └── admin/         # Admin panel
│   │   ├── components/        # React components
│   │   │   ├── ui/            # UI components
│   │   │   └── layout/        # Layout components
│   │   ├── lib/               # API client, utils
│   │   ├── types/             # TypeScript types
│   │   └── middleware.ts      # Route protection
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Docker orchestration
├── .dockerignore
└── README.md
```

## 🔑 Default Credentials

After running the seed:

```
Email: admin@portfolio.com
Password: admin123
```

**⚠️ IMPORTANT: Change these credentials in production!**

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login              # Login
GET    /api/auth/me                 # Current user
PUT    /api/auth/change-password    # Change password
```

### Projects
```
GET    /api/projects                # List projects (with filters)
GET    /api/projects/:slug          # Project details
POST   /api/projects                # Create project (Admin)
PUT    /api/projects/:id            # Update project (Admin)
DELETE /api/projects/:id            # Delete project (Admin)
POST   /api/projects/:id/like       # Like project
GET    /api/projects/stats          # Statistics
```

### GitHub
```
GET    /api/github/profile          # GitHub profile
GET    /api/github/repos            # Repositories
GET    /api/github/stats            # GitHub statistics
POST   /api/github/sync             # Sync repo stats (Admin)
```

### Skills
```
GET    /api/skills                  # List skills
POST   /api/skills                  # Create skill (Admin)
PUT    /api/skills/:id              # Update skill (Admin)
DELETE /api/skills/:id              # Delete skill (Admin)
PUT    /api/skills/reorder          # Reorder skills (Admin)
```

### Profile
```
GET    /api/profile                 # Profile data
PUT    /api/profile                 # Update profile (Admin)
GET    /api/profile/experiences     # Work experiences
GET    /api/profile/education       # Education
GET    /api/profile/certificates    # Certificates
GET    /api/profile/cv/download     # Download CV as PDF
```

See [API Documentation](./API_DOCUMENTATION.md) for detailed examples.

## 🗄️ Database Models

- **User** - Authentication and authorization
- **Project** - Project information with GitHub integration
- **Skill** - Technical skills with proficiency levels
- **Experience** - Work experience timeline
- **Education** - Academic background
- **Certificate** - Professional certifications
- **SiteSettings** - Site-wide configuration
- **Tag** - Project categorization
- **ContactMessage** - Contact form submissions
- **Analytics** - Usage tracking

## 📦 Deployment

### Backend

**Recommended platforms:**
- Railway
- Render
- Heroku
- AWS/DigitalOcean

**Requirements:**
- PostgreSQL database (Railway/Supabase/AWS RDS)
- Environment variables configured
- Run migrations before starting

### Frontend

**Recommended platforms:**
- Vercel (optimal for Next.js)
- Netlify
- Cloudflare Pages

**Requirements:**
- Set `NEXT_PUBLIC_API_URL` to your backend URL
- Enable ISR/SSR if needed

## 🎨 Customization

1. **Colors**: Edit `frontend/tailwind.config.ts`
2. **Personal Info**: Update via Admin Panel or seed data
3. **Projects**: Add via Admin Panel or modify `backend/prisma/seed.ts`
4. **GitHub Stats**: Add your GitHub token in `.env`

## 🛠️ Available Scripts

### Backend
```bash
npm run dev              # Development server
npm run build            # Build for production
npm start                # Production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database
npm run prisma:studio    # Open Prisma Studio
```

### Frontend
```bash
npm run dev              # Development server
npm run build            # Build for production
npm start                # Production server
npm run lint             # Run ESLint
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild images
docker-compose up --build

# View logs
docker-compose logs -f

# Access database
docker-compose exec postgres psql -U portfolio -d portfolio_db
```

## 📊 Sample Data

The seed includes:
- ✅ 30 diverse projects across all categories
- ✅ 15 skills with proficiency levels
- ✅ 29 technology tags with colors
- ✅ 1 admin user
- ✅ Sample site settings

Categories:
- 5 **Full Stack** projects
- 5 **Frontend** projects
- 5 **Backend** projects
- 5 **AI/ML** projects
- 5 **Cloud** projects
- 3 **Mobile** projects
- 2 **DevOps** projects

## 🤝 Contributing

This is a template project. Feel free to:
1. Fork and customize for your needs
2. Submit issues for bugs
3. Suggest new features
4. Share improvements

## 📝 License

MIT

## 🆘 Support

For implementation questions:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Shadcn/UI Examples](https://ui.shadcn.com/)

---

**Built with ❤️ using modern best practices**

**Ready to deploy! 🚀**
