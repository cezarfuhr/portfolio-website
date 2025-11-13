import prisma from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors';
import { generateUniqueSlug } from '../utils/slugify';
import { Prisma, Category, Status } from '@prisma/client';

export interface ProjectFilters {
  category?: Category;
  status?: Status;
  featured?: boolean;
  tags?: string[];
  search?: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: Category;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  images?: string[];
  featured?: boolean;
  status?: Status;
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
}

export class ProjectsService {
  async getAllProjects(filters: ProjectFilters = {}) {
    const { category, status, featured, tags, search } = filters;

    const where: Prisma.ProjectWhereInput = {
      ...(category && { category }),
      ...(status && { status }),
      ...(featured !== undefined && { featured }),
      ...(tags && tags.length > 0 && {
        tags: {
          some: {
            slug: { in: tags },
          },
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { technologies: { hasSome: [search] } },
        ],
      }),
    };

    const projects = await prisma.project.findMany({
      where,
      include: {
        tags: true,
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });

    return projects;
  }

  async getProjectBySlug(slug: string) {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        tags: true,
      },
    });

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    // Increment views
    await prisma.project.update({
      where: { id: project.id },
      data: { views: { increment: 1 } },
    });

    return project;
  }

  async createProject(data: ProjectInput) {
    // Generate unique slug
    const slug = await generateUniqueSlug(data.title, async (s) => {
      const existing = await prisma.project.findUnique({ where: { slug: s } });
      return !!existing;
    });

    // Handle tags
    const tagConnections = data.tags
      ? await Promise.all(
          data.tags.map(async (tagName) => {
            const tag = await prisma.tag.upsert({
              where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
              update: {},
              create: {
                name: tagName,
                slug: tagName.toLowerCase().replace(/\s+/g, '-'),
              },
            });
            return { id: tag.id };
          })
        )
      : [];

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        tags: {
          connect: tagConnections,
        },
      },
      include: {
        tags: true,
      },
    });

    return project;
  }

  async updateProject(id: string, data: Partial<ProjectInput>) {
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Project not found');
    }

    // Handle tags update
    let tagUpdate = {};
    if (data.tags) {
      const tagConnections = await Promise.all(
        data.tags.map(async (tagName) => {
          const tag = await prisma.tag.upsert({
            where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
            update: {},
            create: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/\s+/g, '-'),
            },
          });
          return { id: tag.id };
        })
      );

      tagUpdate = {
        tags: {
          set: tagConnections,
        },
      };
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        ...tagUpdate,
      },
      include: {
        tags: true,
      },
    });

    return project;
  }

  async deleteProject(id: string) {
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Project not found');
    }

    await prisma.project.delete({ where: { id } });
  }

  async incrementLikes(id: string) {
    const project = await prisma.project.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return project;
  }

  async getProjectStats() {
    const [total, published, byCategory, totalViews, totalLikes] =
      await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { status: 'PUBLISHED' } }),
        prisma.project.groupBy({
          by: ['category'],
          _count: true,
        }),
        prisma.project.aggregate({
          _sum: { views: true },
        }),
        prisma.project.aggregate({
          _sum: { likes: true },
        }),
      ]);

    return {
      total,
      published,
      byCategory,
      totalViews: totalViews._sum.views || 0,
      totalLikes: totalLikes._sum.likes || 0,
    };
  }
}

export default new ProjectsService();
