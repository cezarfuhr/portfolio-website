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

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'react' },
      update: {},
      create: { name: 'React', slug: 'react', color: '#61DAFB' },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
    }),
    prisma.tag.upsert({
      where: { slug: 'nodejs' },
      update: {},
      create: { name: 'Node.js', slug: 'nodejs', color: '#339933' },
    }),
    prisma.tag.upsert({
      where: { slug: 'python' },
      update: {},
      create: { name: 'Python', slug: 'python', color: '#3776AB' },
    }),
    prisma.tag.upsert({
      where: { slug: 'nextjs' },
      update: {},
      create: { name: 'Next.js', slug: 'nextjs', color: '#000000' },
    }),
    prisma.tag.upsert({
      where: { slug: 'tailwind' },
      update: {},
      create: { name: 'Tailwind CSS', slug: 'tailwind', color: '#06B6D4' },
    }),
    prisma.tag.upsert({
      where: { slug: 'prisma' },
      update: {},
      create: { name: 'Prisma', slug: 'prisma', color: '#2D3748' },
    }),
    prisma.tag.upsert({
      where: { slug: 'postgresql' },
      update: {},
      create: { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
    }),
    prisma.tag.upsert({
      where: { slug: 'aws' },
      update: {},
      create: { name: 'AWS', slug: 'aws', color: '#FF9900' },
    }),
    prisma.tag.upsert({
      where: { slug: 'docker' },
      update: {},
      create: { name: 'Docker', slug: 'docker', color: '#2496ED' },
    }),
  ]);

  console.log(`✅ ${tags.length} tags created`);

  // Create sample skills
  const skills = await Promise.all([
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

  // Create sample project
  const project = await prisma.project.create({
    data: {
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Plataforma de e-commerce completa com painel administrativo e integração de pagamentos',
      longDescription: `# E-commerce Platform

Plataforma completa de e-commerce desenvolvida com tecnologias modernas.

## Funcionalidades

- 🛒 Carrinho de compras
- 💳 Integração com gateways de pagamento
- 📊 Dashboard administrativo
- 📱 Design responsivo
- 🔍 Busca avançada de produtos
- ⭐ Sistema de avaliações

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
      views: 150,
      likes: 25,
      githubStars: 42,
      githubForks: 12,
      tags: {
        connect: [
          { slug: 'react' },
          { slug: 'typescript' },
          { slug: 'nodejs' },
          { slug: 'postgresql' },
        ],
      },
    },
  });

  console.log('✅ Sample project created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
