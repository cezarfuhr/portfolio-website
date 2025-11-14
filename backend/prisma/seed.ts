import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@portfolio.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create site settings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      fullName: 'Seu Nome Completo',
      title: 'Full Stack Developer & AI Enthusiast',
      bio: 'Desenvolvedor de software apaixonado por criar soluções inovadoras usando tecnologias modernas. Especializado em desenvolvimento Full Stack, Cloud Computing e Inteligência Artificial.',
      email: 'contato@seuportfolio.com',
      location: 'São Paulo, Brasil',
      availableForWork: true,
      availabilityText: 'Disponível para projetos freelance',
      githubUsername: process.env.GITHUB_USERNAME || 'seu-usuario',
      metaTitle: 'Portfolio - Desenvolvedor Full Stack',
      metaDescription: 'Portfolio profissional de desenvolvimento de software',
      metaKeywords: ['desenvolvedor', 'full stack', 'react', 'node.js', 'typescript'],
    },
  });

  console.log('✅ Site settings created');

  // Create tags (expanded)
  const tagsList = [
    { name: 'React', slug: 'react', color: '#61DAFB' },
    { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
    { name: 'Node.js', slug: 'nodejs', color: '#339933' },
    { name: 'Python', slug: 'python', color: '#3776AB' },
    { name: 'Next.js', slug: 'nextjs', color: '#000000' },
    { name: 'Tailwind CSS', slug: 'tailwind', color: '#06B6D4' },
    { name: 'Prisma', slug: 'prisma', color: '#2D3748' },
    { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
    { name: 'AWS', slug: 'aws', color: '#FF9900' },
    { name: 'Docker', slug: 'docker', color: '#2496ED' },
    { name: 'Angular', slug: 'angular', color: '#DD0031' },
    { name: 'Vue.js', slug: 'vuejs', color: '#4FC08D' },
    { name: 'Kotlin', slug: 'kotlin', color: '#7F52FF' },
    { name: 'Spring Boot', slug: 'spring-boot', color: '#6DB33F' },
    { name: 'Django', slug: 'django', color: '#092E20' },
    { name: 'FastAPI', slug: 'fastapi', color: '#009688' },
    { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
    { name: 'Redis', slug: 'redis', color: '#DC382D' },
    { name: 'GraphQL', slug: 'graphql', color: '#E10098' },
    { name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' },
    { name: 'Terraform', slug: 'terraform', color: '#7B42BC' },
    { name: 'OpenAI', slug: 'openai', color: '#412991' },
    { name: 'TensorFlow', slug: 'tensorflow', color: '#FF6F00' },
    { name: 'LangChain', slug: 'langchain', color: '#1C3C3C' },
    { name: 'Flutter', slug: 'flutter', color: '#02569B' },
    { name: 'React Native', slug: 'react-native', color: '#61DAFB' },
    { name: 'Azure', slug: 'azure', color: '#0089D6' },
    { name: 'Firebase', slug: 'firebase', color: '#FFCA28' },
    { name: 'Stripe', slug: 'stripe', color: '#008CDD' },
  ];

  const tags = await Promise.all(
    tagsList.map((tag) =>
      prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      })
    )
  );

  console.log(`✅ ${tags.length} tags created`);

  // Create sample skills (only if none exist)
  const existingSkillsCount = await prisma.skill.count();
  let skills: any[] = [];

  if (existingSkillsCount === 0) {
    skills = await Promise.all([
      // Frontend
      prisma.skill.create({
        data: {
          name: 'React',
          category: 'FRONTEND',
          level: 90,
          yearsOfExp: 4,
          order: 1,
        },
      }),
    prisma.skill.create({
      data: {
        name: 'Next.js',
        category: 'FRONTEND',
        level: 85,
        yearsOfExp: 3,
        order: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'TypeScript',
        category: 'FRONTEND',
        level: 88,
        yearsOfExp: 3,
        order: 3,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Angular',
        category: 'FRONTEND',
        level: 75,
        yearsOfExp: 2,
        order: 4,
      },
    }),
    // Backend
    prisma.skill.create({
      data: {
        name: 'Node.js',
        category: 'BACKEND',
        level: 90,
        yearsOfExp: 5,
        order: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Python',
        category: 'BACKEND',
        level: 85,
        yearsOfExp: 4,
        order: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Kotlin',
        category: 'BACKEND',
        level: 70,
        yearsOfExp: 2,
        order: 3,
      },
    }),
    // Database
    prisma.skill.create({
      data: {
        name: 'PostgreSQL',
        category: 'DATABASE',
        level: 85,
        yearsOfExp: 4,
        order: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'MongoDB',
        category: 'DATABASE',
        level: 80,
        yearsOfExp: 3,
        order: 2,
      },
    }),
    // Cloud
    prisma.skill.create({
      data: {
        name: 'AWS',
        category: 'CLOUD',
        level: 80,
        yearsOfExp: 3,
        order: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Azure',
        category: 'CLOUD',
        level: 70,
        yearsOfExp: 2,
        order: 2,
      },
    }),
    // AI/ML
    prisma.skill.create({
      data: {
        name: 'OpenAI API',
        category: 'AI_ML',
        level: 85,
        yearsOfExp: 2,
        order: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'LangChain',
        category: 'AI_ML',
        level: 75,
        yearsOfExp: 1,
        order: 2,
      },
    }),
    // DevOps
    prisma.skill.create({
      data: {
        name: 'Docker',
        category: 'DEVOPS',
        level: 85,
        yearsOfExp: 3,
        order: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'CI/CD',
        category: 'DEVOPS',
        level: 80,
        yearsOfExp: 3,
        order: 2,
      },
    }),
    ]);
    console.log(`✅ ${skills.length} skills created`);
  } else {
    skills = await prisma.skill.findMany();
    console.log(`ℹ️  ${skills.length} skills already exist, skipping creation`);
  }

  // Create 30 sample projects
  const projects = [
    // FULLSTACK (5 projects)
    {
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Plataforma de e-commerce completa com painel administrativo e integração de pagamentos',
      longDescription: `# E-commerce Platform

Plataforma completa de e-commerce desenvolvida com tecnologias modernas.

## Funcionalidades

- 🛒 Carrinho de compras com persistência
- 💳 Integração com Stripe e PayPal
- 📊 Dashboard administrativo completo
- 📱 Design responsivo e mobile-first
- 🔍 Busca avançada com filtros
- ⭐ Sistema de avaliações e comentários
- 📧 Notificações por email
- 🚀 Performance otimizada

## Tecnologias

- Frontend: React + TypeScript + Next.js
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma
- Payments: Stripe API
- Deploy: Vercel + Railway`,
      category: 'FULLSTACK',
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
      githubUrl: 'https://github.com/usuario/ecommerce-platform',
      demoUrl: 'https://ecommerce-demo.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
      featured: true,
      status: 'PUBLISHED',
      views: 1250,
      likes: 180,
      githubStars: 342,
      githubForks: 89,
      tags: ['react', 'typescript', 'nodejs', 'postgresql'],
    },
    {
      title: 'Social Media Dashboard',
      slug: 'social-media-dashboard',
      description: 'Dashboard de análise de redes sociais com gráficos em tempo real e automação de posts',
      longDescription: `# Social Media Dashboard

Dashboard completo para gerenciar múltiplas redes sociais em um só lugar.

## Features

- 📊 Analytics em tempo real
- 📅 Agendamento de posts
- 📈 Relatórios detalhados
- 🤖 Automação com IA
- 🔗 Integração com Twitter, Instagram, LinkedIn

## Stack

- Frontend: Vue.js + Vuex
- Backend: Python + FastAPI
- Database: MongoDB
- Cache: Redis
- Deploy: AWS`,
      category: 'FULLSTACK',
      technologies: ['Vue.js', 'Python', 'FastAPI', 'MongoDB', 'Redis'],
      githubUrl: 'https://github.com/usuario/social-dashboard',
      demoUrl: 'https://social-dashboard-demo.com',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      featured: true,
      status: 'PUBLISHED',
      views: 890,
      likes: 145,
      githubStars: 256,
      githubForks: 67,
      tags: ['vuejs', 'python', 'fastapi', 'mongodb'],
    },
    {
      title: 'Task Management System',
      slug: 'task-management-system',
      description: 'Sistema de gerenciamento de tarefas com Kanban, calendário e colaboração em tempo real',
      longDescription: `# Task Management System

Sistema completo de gerenciamento de projetos e tarefas inspirado no Trello e Asana.

## Recursos

- 📋 Kanban Board interativo
- 📅 Calendário integrado
- 👥 Colaboração em tempo real
- 🔔 Notificações push
- 📊 Relatórios de produtividade
- 🎨 Temas customizáveis

## Tecnologias

- Next.js 14 + TypeScript
- tRPC para APIs type-safe
- Prisma + PostgreSQL
- WebSockets para real-time
- Tailwind CSS`,
      category: 'FULLSTACK',
      technologies: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'PostgreSQL'],
      githubUrl: 'https://github.com/usuario/task-manager',
      demoUrl: 'https://taskmanager-demo.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 670,
      likes: 98,
      githubStars: 189,
      githubForks: 45,
      tags: ['nextjs', 'typescript', 'prisma', 'postgresql'],
    },
    {
      title: 'Real Estate Marketplace',
      slug: 'real-estate-marketplace',
      description: 'Marketplace de imóveis com busca avançada, mapas interativos e tour virtual 3D',
      longDescription: `# Real Estate Marketplace

Plataforma moderna para compra, venda e aluguel de imóveis.

## Destaques

- 🗺️ Mapas interativos com Mapbox
- 🏠 Tour virtual 3D
- 🔍 Busca geolocalizada
- 💰 Calculadora de financiamento
- 📸 Galeria de fotos otimizada
- 📱 App mobile responsivo

## Stack Tecnológica

- React + Next.js + TypeScript
- Node.js + Express
- PostgreSQL + PostGIS
- AWS S3 para imagens
- Mapbox API`,
      category: 'FULLSTACK',
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
      githubUrl: 'https://github.com/usuario/real-estate',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 540,
      likes: 78,
      githubStars: 134,
      githubForks: 32,
      tags: ['react', 'nextjs', 'nodejs', 'aws'],
    },
    {
      title: 'Online Learning Platform',
      slug: 'online-learning-platform',
      description: 'Plataforma de cursos online com streaming de vídeo, quizzes e certificados',
      longDescription: `# Online Learning Platform

Plataforma completa de educação online com recursos avançados.

## Funcionalidades

- 🎥 Streaming de vídeo adaptativo
- 📝 Sistema de quizzes
- 🏆 Certificados automáticos
- 💬 Fórum de discussão
- 📊 Dashboard de progresso
- 🔐 Autenticação segura

## Tecnologias

- Angular + TypeScript
- NestJS backend
- PostgreSQL
- AWS CloudFront
- Redis cache`,
      category: 'FULLSTACK',
      technologies: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'AWS'],
      githubUrl: 'https://github.com/usuario/learning-platform',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 720,
      likes: 112,
      githubStars: 201,
      githubForks: 56,
      tags: ['angular', 'typescript', 'nodejs', 'aws'],
    },

    // FRONTEND (5 projects)
    {
      title: 'Portfolio Website Builder',
      slug: 'portfolio-website-builder',
      description: 'Construtor de sites de portfólio com drag-and-drop e templates prontos',
      longDescription: `# Portfolio Website Builder

Crie seu portfólio profissional sem código.

## Features

- 🎨 Drag-and-drop editor
- 📱 Templates responsivos
- 🎭 Temas customizáveis
- 📊 Analytics integrado
- 🚀 Deploy automático

## Stack

- React + TypeScript
- React DnD
- Styled Components
- Netlify`,
      category: 'FRONTEND',
      technologies: ['React', 'TypeScript', 'Styled Components'],
      githubUrl: 'https://github.com/usuario/portfolio-builder',
      demoUrl: 'https://portfolio-builder.netlify.app',
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 450,
      likes: 65,
      githubStars: 112,
      githubForks: 28,
      tags: ['react', 'typescript'],
    },
    {
      title: 'Weather Dashboard',
      slug: 'weather-dashboard',
      description: 'Dashboard de previsão do tempo com mapas, alertas e análise histórica',
      longDescription: `# Weather Dashboard

Dashboard completo de previsão do tempo com dados em tempo real.

## Recursos

- 🌤️ Previsão de 10 dias
- 🗺️ Mapas de radar
- ⚠️ Alertas climáticos
- 📈 Gráficos históricos
- 📍 Geolocalização

## Tech Stack

- Vue.js 3 + Composition API
- Chart.js
- OpenWeather API
- Leaflet maps`,
      category: 'FRONTEND',
      technologies: ['Vue.js', 'Chart.js', 'JavaScript'],
      githubUrl: 'https://github.com/usuario/weather-dashboard',
      demoUrl: 'https://weather-dash.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 380,
      likes: 52,
      githubStars: 89,
      githubForks: 21,
      tags: ['vuejs'],
    },
    {
      title: 'Music Player PWA',
      slug: 'music-player-pwa',
      description: 'Player de música progressivo com playlist, equalizer e modo offline',
      longDescription: `# Music Player PWA

Progressive Web App de player de música com recursos avançados.

## Features

- 🎵 Player completo
- 📻 Equalizer visual
- 💾 Modo offline
- 📱 PWA instalável
- 🎨 Interface moderna

## Tecnologias

- React + TypeScript
- Web Audio API
- Service Workers
- IndexedDB`,
      category: 'FRONTEND',
      technologies: ['React', 'TypeScript', 'PWA'],
      githubUrl: 'https://github.com/usuario/music-player',
      demoUrl: 'https://musicplayer-pwa.app',
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 320,
      likes: 48,
      githubStars: 76,
      githubForks: 18,
      tags: ['react', 'typescript'],
    },
    {
      title: 'Admin Dashboard Template',
      slug: 'admin-dashboard-template',
      description: 'Template de dashboard administrativo com componentes reutilizáveis',
      longDescription: `# Admin Dashboard Template

Template completo para dashboards administrativos.

## Componentes

- 📊 Gráficos diversos
- 📋 Tabelas com sorting/filter
- 🔔 Sistema de notificações
- 👤 Gestão de usuários
- 🎨 Tema dark/light
- 📱 Totalmente responsivo

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Recharts
- Radix UI`,
      category: 'FRONTEND',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/usuario/admin-template',
      demoUrl: 'https://admin-template-demo.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 590,
      likes: 87,
      githubStars: 156,
      githubForks: 42,
      tags: ['nextjs', 'typescript', 'tailwind'],
    },
    {
      title: 'Recipe Finder App',
      slug: 'recipe-finder-app',
      description: 'Aplicativo de busca de receitas com filtros nutricionais e lista de compras',
      longDescription: `# Recipe Finder App

Encontre receitas deliciosas e saudáveis facilmente.

## Funcionalidades

- 🔍 Busca por ingredientes
- 🥗 Filtros nutricionais
- 📝 Lista de compras
- ⭐ Favoritos
- 👨‍🍳 Modo passo a passo

## Tecnologias

- React + TypeScript
- Spoonacular API
- Material-UI
- LocalStorage`,
      category: 'FRONTEND',
      technologies: ['React', 'TypeScript', 'Material-UI'],
      githubUrl: 'https://github.com/usuario/recipe-finder',
      demoUrl: 'https://recipe-finder-demo.netlify.app',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 410,
      likes: 61,
      githubStars: 98,
      githubForks: 24,
      tags: ['react', 'typescript'],
    },

    // BACKEND (5 projects)
    {
      title: 'REST API Boilerplate',
      slug: 'rest-api-boilerplate',
      description: 'Boilerplate completo de API REST com autenticação, validação e documentação',
      longDescription: `# REST API Boilerplate

Estrutura completa para iniciar APIs REST rapidamente.

## Incluído

- 🔐 Autenticação JWT
- ✅ Validação com Zod
- 📝 Swagger docs
- 🧪 Testes automatizados
- 🐳 Docker ready
- 📊 Logging estruturado

## Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Jest`,
      category: 'BACKEND',
      technologies: ['Node.js', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL'],
      githubUrl: 'https://github.com/usuario/api-boilerplate',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 780,
      likes: 124,
      githubStars: 287,
      githubForks: 73,
      tags: ['nodejs', 'typescript', 'prisma'],
    },
    {
      title: 'GraphQL API Gateway',
      slug: 'graphql-api-gateway',
      description: 'API Gateway GraphQL com Apollo Server e federação de microsserviços',
      longDescription: `# GraphQL API Gateway

Gateway GraphQL moderno para arquitetura de microsserviços.

## Features

- 🔀 Federation
- 🚀 Apollo Server
- 📊 Monitoring
- 🔒 Auth middleware
- 📝 Schema stitching

## Tecnologias

- Apollo Server
- GraphQL
- Node.js
- Redis
- Docker`,
      category: 'BACKEND',
      technologies: ['GraphQL', 'Node.js', 'Apollo', 'Redis'],
      githubUrl: 'https://github.com/usuario/graphql-gateway',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 560,
      likes: 89,
      githubStars: 167,
      githubForks: 38,
      tags: ['nodejs', 'graphql', 'redis'],
    },
    {
      title: 'Microservices E-commerce Backend',
      slug: 'microservices-ecommerce',
      description: 'Arquitetura de microsserviços para e-commerce com RabbitMQ e Docker',
      longDescription: `# Microservices E-commerce

Backend em microsserviços escalável e resiliente.

## Serviços

- 🛍️ Products Service
- 👤 Users Service
- 💳 Orders Service
- 📧 Notifications Service
- 📊 Analytics Service

## Stack

- Kotlin + Spring Boot
- RabbitMQ
- PostgreSQL
- Redis
- Docker + Kubernetes`,
      category: 'BACKEND',
      technologies: ['Kotlin', 'Spring Boot', 'RabbitMQ', 'PostgreSQL', 'Kubernetes'],
      githubUrl: 'https://github.com/usuario/microservices-ecommerce',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 920,
      likes: 156,
      githubStars: 412,
      githubForks: 98,
      tags: ['kotlin', 'spring-boot', 'kubernetes'],
    },
    {
      title: 'Real-time Chat API',
      slug: 'realtime-chat-api',
      description: 'API de chat em tempo real com WebSockets, rooms e histórico de mensagens',
      longDescription: `# Real-time Chat API

API completa de chat em tempo real.

## Funcionalidades

- 💬 Chat em tempo real
- 🏠 Rooms privadas
- 📎 Upload de arquivos
- 🔍 Busca de mensagens
- 🔔 Notificações push
- 📊 Presença online

## Tecnologias

- Node.js + Socket.io
- Redis pub/sub
- MongoDB
- Express
- JWT auth`,
      category: 'BACKEND',
      technologies: ['Node.js', 'Socket.io', 'Redis', 'MongoDB'],
      githubUrl: 'https://github.com/usuario/chat-api',
      imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 640,
      likes: 102,
      githubStars: 234,
      githubForks: 61,
      tags: ['nodejs', 'mongodb', 'redis'],
    },
    {
      title: 'Payment Gateway Integration',
      slug: 'payment-gateway-integration',
      description: 'Sistema de integração com múltiplos gateways de pagamento',
      longDescription: `# Payment Gateway Integration

Integração unificada com múltiplos gateways de pagamento.

## Gateways

- 💳 Stripe
- 💰 PayPal
- 🏦 Mercado Pago
- 🔐 PagSeguro

## Features

- 🔄 Webhooks
- 📊 Reporting
- 🔒 PCI compliance
- ♻️ Retry logic
- 📝 Logs detalhados

## Stack

- Python + FastAPI
- PostgreSQL
- Redis queue
- Docker`,
      category: 'BACKEND',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/usuario/payment-gateway',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 710,
      likes: 118,
      githubStars: 289,
      githubForks: 72,
      tags: ['python', 'fastapi', 'postgresql'],
    },

    // AI/ML (5 projects)
    {
      title: 'AI Chatbot Platform',
      slug: 'ai-chatbot-platform',
      description: 'Plataforma de chatbot inteligente usando GPT-4 e LangChain',
      longDescription: `# AI Chatbot Platform

Crie chatbots inteligentes com IA generativa.

## Recursos

- 🤖 GPT-4 integration
- 📚 RAG com embeddings
- 💾 Memória conversacional
- 🎯 Fine-tuning
- 📊 Analytics de conversas
- 🔌 API REST

## Tecnologias

- Python + FastAPI
- LangChain
- OpenAI API
- Pinecone
- PostgreSQL`,
      category: 'AI_ML',
      technologies: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
      githubUrl: 'https://github.com/usuario/ai-chatbot',
      demoUrl: 'https://ai-chatbot-demo.com',
      imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
      featured: true,
      status: 'PUBLISHED',
      views: 1450,
      likes: 234,
      githubStars: 567,
      githubForks: 142,
      tags: ['python', 'openai', 'langchain'],
    },
    {
      title: 'Image Recognition API',
      slug: 'image-recognition-api',
      description: 'API de reconhecimento de imagens com TensorFlow e classificação em tempo real',
      longDescription: `# Image Recognition API

API de visão computacional com deep learning.

## Capabilities

- 🖼️ Object detection
- 🏷️ Image classification
- 👤 Face recognition
- 📝 OCR
- 🎨 Style transfer

## Stack

- Python + Flask
- TensorFlow
- OpenCV
- AWS S3
- Redis cache`,
      category: 'AI_ML',
      technologies: ['Python', 'TensorFlow', 'Flask', 'AWS'],
      githubUrl: 'https://github.com/usuario/image-recognition',
      imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
      featured: true,
      status: 'PUBLISHED',
      views: 890,
      likes: 167,
      githubStars: 412,
      githubForks: 98,
      tags: ['python', 'tensorflow'],
    },
    {
      title: 'Sentiment Analysis Tool',
      slug: 'sentiment-analysis-tool',
      description: 'Ferramenta de análise de sentimentos em textos e redes sociais',
      longDescription: `# Sentiment Analysis Tool

Analise sentimentos em textos de forma automática.

## Features

- 📊 Análise de polaridade
- 🎭 Detecção de emoções
- 🌐 Multi-idioma
- 📈 Visualizações
- 🐦 Integração Twitter

## Tecnologias

- Python
- NLTK
- spaCy
- Transformers
- FastAPI`,
      category: 'AI_ML',
      technologies: ['Python', 'NLTK', 'Transformers', 'FastAPI'],
      githubUrl: 'https://github.com/usuario/sentiment-analysis',
      demoUrl: 'https://sentiment-demo.herokuapp.com',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 620,
      likes: 98,
      githubStars: 234,
      githubForks: 56,
      tags: ['python'],
    },
    {
      title: 'Recommendation Engine',
      slug: 'recommendation-engine',
      description: 'Sistema de recomendação usando collaborative filtering e content-based',
      longDescription: `# Recommendation Engine

Engine de recomendações personalizado.

## Algoritmos

- 🤝 Collaborative filtering
- 📄 Content-based
- 🧠 Hybrid approach
- 🔥 Real-time updates
- 📊 A/B testing

## Stack

- Python
- Scikit-learn
- Apache Spark
- Redis
- PostgreSQL`,
      category: 'AI_ML',
      technologies: ['Python', 'Scikit-learn', 'Apache Spark', 'Redis'],
      githubUrl: 'https://github.com/usuario/recommendation-engine',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 550,
      likes: 87,
      githubStars: 198,
      githubForks: 45,
      tags: ['python'],
    },
    {
      title: 'AI Code Assistant',
      slug: 'ai-code-assistant',
      description: 'Assistente de código IA que gera, explica e corrige código automaticamente',
      longDescription: `# AI Code Assistant

Assistente de programação com IA.

## Funcionalidades

- 💻 Geração de código
- 📖 Explicação de código
- 🐛 Detecção de bugs
- ✨ Code refactoring
- 📝 Documentação auto

## Tecnologias

- Python + FastAPI
- OpenAI Codex
- LangChain
- VSCode Extension
- Docker`,
      category: 'AI_ML',
      technologies: ['Python', 'OpenAI', 'LangChain', 'FastAPI'],
      githubUrl: 'https://github.com/usuario/ai-code-assistant',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 780,
      likes: 145,
      githubStars: 389,
      githubForks: 92,
      tags: ['python', 'openai', 'langchain'],
    },

    // CLOUD (5 projects)
    {
      title: 'AWS Infrastructure as Code',
      slug: 'aws-infrastructure-as-code',
      description: 'Templates Terraform para deploy de infraestrutura AWS completa',
      longDescription: `# AWS Infrastructure as Code

Automação completa de infraestrutura AWS.

## Recursos

- 🏗️ VPC + Subnets
- 🖥️ EC2 + Auto Scaling
- 🗄️ RDS + Backups
- 🚀 CloudFront + S3
- 🔐 IAM + Security Groups
- 📊 CloudWatch monitoring

## Stack

- Terraform
- AWS CLI
- GitHub Actions
- Ansible`,
      category: 'CLOUD',
      technologies: ['Terraform', 'AWS', 'Ansible', 'GitHub Actions'],
      githubUrl: 'https://github.com/usuario/aws-iac',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 690,
      likes: 112,
      githubStars: 278,
      githubForks: 67,
      tags: ['aws', 'terraform'],
    },
    {
      title: 'Serverless API Framework',
      slug: 'serverless-api-framework',
      description: 'Framework para APIs serverless com AWS Lambda e API Gateway',
      longDescription: `# Serverless API Framework

Construa APIs serverless escaláveis.

## Features

- ⚡ AWS Lambda
- 🚪 API Gateway
- 🗄️ DynamoDB
- 🔐 Cognito auth
- 📧 SES emails
- 💰 Cost optimized

## Stack

- Node.js/TypeScript
- Serverless Framework
- AWS SAM
- CloudFormation`,
      category: 'CLOUD',
      technologies: ['AWS', 'Lambda', 'Node.js', 'Serverless'],
      githubUrl: 'https://github.com/usuario/serverless-api',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 540,
      likes: 89,
      githubStars: 201,
      githubForks: 48,
      tags: ['aws', 'nodejs'],
    },
    {
      title: 'Kubernetes Cluster Setup',
      slug: 'kubernetes-cluster-setup',
      description: 'Setup completo de cluster Kubernetes com monitoring e CI/CD',
      longDescription: `# Kubernetes Cluster Setup

Cluster K8s production-ready.

## Componentes

- ☸️ Kubernetes cluster
- 📊 Prometheus + Grafana
- 📝 ELK Stack logging
- 🔄 ArgoCD GitOps
- 🔐 Cert-manager
- 🌐 Ingress NGINX

## Stack

- Kubernetes
- Helm Charts
- Terraform
- ArgoCD
- Prometheus`,
      category: 'CLOUD',
      technologies: ['Kubernetes', 'Terraform', 'Prometheus', 'Docker'],
      githubUrl: 'https://github.com/usuario/k8s-setup',
      imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 820,
      likes: 134,
      githubStars: 356,
      githubForks: 89,
      tags: ['kubernetes', 'terraform', 'docker'],
    },
    {
      title: 'Multi-Cloud Deployment Tool',
      slug: 'multi-cloud-deployment',
      description: 'Ferramenta para deploy em múltiplos cloud providers (AWS, Azure, GCP)',
      longDescription: `# Multi-Cloud Deployment Tool

Deploy em múltiplas clouds com uma ferramenta.

## Clouds Suportadas

- ☁️ AWS
- 🔷 Azure
- 🌐 Google Cloud
- 🌊 DigitalOcean

## Features

- 🔄 Deploy unificado
- 📊 Cost comparison
- 🔐 Multi-account
- 📝 IaC templates

## Stack

- Terraform
- Pulumi
- Python CLI
- Docker`,
      category: 'CLOUD',
      technologies: ['Terraform', 'Pulumi', 'Python', 'AWS', 'Azure'],
      githubUrl: 'https://github.com/usuario/multi-cloud',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 470,
      likes: 76,
      githubStars: 167,
      githubForks: 41,
      tags: ['terraform', 'aws', 'azure'],
    },
    {
      title: 'Cloud Cost Optimizer',
      slug: 'cloud-cost-optimizer',
      description: 'Ferramenta de análise e otimização de custos em cloud',
      longDescription: `# Cloud Cost Optimizer

Reduza custos de cloud de forma inteligente.

## Funcionalidades

- 💰 Análise de custos
- 📊 Recomendações
- 🤖 Auto-scaling
- 📈 Forecasting
- 🔔 Alertas de budget
- 📝 Relatórios

## Tecnologias

- Python + Flask
- AWS Cost Explorer
- Azure Cost Management
- PostgreSQL
- Celery`,
      category: 'CLOUD',
      technologies: ['Python', 'AWS', 'Azure', 'PostgreSQL'],
      githubUrl: 'https://github.com/usuario/cost-optimizer',
      imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 610,
      likes: 98,
      githubStars: 223,
      githubForks: 54,
      tags: ['python', 'aws', 'azure'],
    },

    // MOBILE (3 projects)
    {
      title: 'Fitness Tracking App',
      slug: 'fitness-tracking-app',
      description: 'App de fitness com tracking de exercícios, dieta e progresso',
      longDescription: `# Fitness Tracking App

Seu personal trainer no bolso.

## Features

- 🏃 Tracking de exercícios
- 🍎 Diário alimentar
- 📊 Dashboard de progresso
- 💪 Planos de treino
- ⏱️ Timer de exercícios
- 📱 Sincronização cloud

## Stack

- React Native
- TypeScript
- Firebase
- Redux Toolkit
- HealthKit/GoogleFit`,
      category: 'MOBILE',
      technologies: ['React Native', 'TypeScript', 'Firebase'],
      githubUrl: 'https://github.com/usuario/fitness-app',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 520,
      likes: 94,
      githubStars: 178,
      githubForks: 43,
      tags: ['react-native', 'typescript', 'firebase'],
    },
    {
      title: 'Food Delivery App',
      slug: 'food-delivery-app',
      description: 'App de delivery de comida com rastreamento em tempo real',
      longDescription: `# Food Delivery App

Peça comida com facilidade.

## Funcionalidades

- 🍕 Cardápio digital
- 🛒 Carrinho de compras
- 💳 Pagamento integrado
- 📍 Rastreamento GPS
- ⭐ Avaliações
- 🔔 Push notifications

## Tecnologias

- Flutter + Dart
- Google Maps
- Firebase
- Stripe
- REST API`,
      category: 'MOBILE',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Stripe'],
      githubUrl: 'https://github.com/usuario/food-delivery',
      imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 670,
      likes: 118,
      githubStars: 245,
      githubForks: 62,
      tags: ['flutter', 'firebase', 'stripe'],
    },
    {
      title: 'Expense Manager App',
      slug: 'expense-manager-app',
      description: 'Gerenciador de despesas pessoais com gráficos e categorização',
      longDescription: `# Expense Manager App

Controle suas finanças pessoais.

## Recursos

- 💰 Registro de despesas
- 📊 Gráficos e relatórios
- 🏷️ Categorização
- 📅 Planejamento mensal
- 💳 Múltiplas contas
- ☁️ Backup automático

## Stack

- React Native
- SQLite
- Chart.js
- AsyncStorage
- Expo`,
      category: 'MOBILE',
      technologies: ['React Native', 'SQLite', 'Expo'],
      githubUrl: 'https://github.com/usuario/expense-manager',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 380,
      likes: 67,
      githubStars: 134,
      githubForks: 31,
      tags: ['react-native'],
    },

    // DEVOPS (2 projects)
    {
      title: 'CI/CD Pipeline Template',
      slug: 'cicd-pipeline-template',
      description: 'Template de pipeline CI/CD com GitHub Actions, Docker e Kubernetes',
      longDescription: `# CI/CD Pipeline Template

Pipeline completo de integração e deploy contínuo.

## Stages

- 🧪 Unit tests
- 🔍 Linting
- 🏗️ Build Docker
- 🔐 Security scan
- 🚀 Deploy K8s
- 📊 Monitoring

## Stack

- GitHub Actions
- Docker
- Kubernetes
- SonarQube
- Terraform`,
      category: 'DEVOPS',
      technologies: ['GitHub Actions', 'Docker', 'Kubernetes', 'Terraform'],
      githubUrl: 'https://github.com/usuario/cicd-pipeline',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 920,
      likes: 167,
      githubStars: 456,
      githubForks: 112,
      tags: ['docker', 'kubernetes', 'terraform'],
    },
    {
      title: 'Monitoring & Logging Stack',
      slug: 'monitoring-logging-stack',
      description: 'Stack completo de monitoring e logging com Prometheus, Grafana e ELK',
      longDescription: `# Monitoring & Logging Stack

Observabilidade completa para suas aplicações.

## Componentes

- 📊 Prometheus metrics
- 📈 Grafana dashboards
- 📝 ELK Stack logs
- 🔔 Alertmanager
- 📡 Jaeger tracing
- 🐝 OpenTelemetry

## Stack

- Prometheus
- Grafana
- Elasticsearch
- Logstash
- Kibana
- Docker Compose`,
      category: 'DEVOPS',
      technologies: ['Prometheus', 'Grafana', 'Elasticsearch', 'Docker'],
      githubUrl: 'https://github.com/usuario/monitoring-stack',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      featured: false,
      status: 'PUBLISHED',
      views: 740,
      likes: 128,
      githubStars: 334,
      githubForks: 87,
      tags: ['docker'],
    },
  ];

  // Create projects only if none exist
  const existingProjectsCount = await prisma.project.count();

  if (existingProjectsCount === 0) {
    console.log('🚀 Creating 30 sample projects...');

    for (const projectData of projects) {
      const tagSlugs = projectData.tags;
      delete projectData.tags;

      await prisma.project.create({
        data: {
          ...projectData,
          tags: {
            connect: tagSlugs.map((slug) => ({ slug })),
          },
        },
      });
    }

    console.log(`✅ ${projects.length} projects created`);
  } else {
    console.log(`ℹ️  ${existingProjectsCount} projects already exist, skipping creation`);
  }

  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - 1 admin user`);
  console.log(`   - ${tags.length} tags`);
  console.log(`   - ${skills.length} skills`);
  console.log(`   - ${projects.length} projects`);
  console.log('');
  console.log('🔑 Default credentials:');
  console.log('   Email: admin@portfolio.com');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
