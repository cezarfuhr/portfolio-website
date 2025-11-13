import { Request, Response, NextFunction } from 'express';
import projectsService from '../services/projects.service';
import { successResponse, createdResponse, noContentResponse } from '../utils/response';

export class ProjectsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, status, featured, tags, search } = req.query;

      const filters = {
        ...(category && { category: category as any }),
        ...(status && { status: status as any }),
        ...(featured !== undefined && { featured: featured === 'true' }),
        ...(tags && { tags: (tags as string).split(',') }),
        ...(search && { search: search as string }),
      };

      const projects = await projectsService.getAllProjects(filters);
      return successResponse(res, projects);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const project = await projectsService.getProjectBySlug(slug);
      return successResponse(res, project);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await projectsService.createProject(req.body);
      return createdResponse(res, project, 'Project created successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectsService.updateProject(id, req.body);
      return successResponse(res, project, 'Project updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await projectsService.deleteProject(id);
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async like(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectsService.incrementLikes(id);
      return successResponse(res, { likes: project.likes });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await projectsService.getProjectStats();
      return successResponse(res, stats);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectsController();
