import { Request, Response, NextFunction } from 'express';
import skillsService from '../services/skills.service';
import { successResponse, createdResponse, noContentResponse } from '../utils/response';

export class SkillsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.query;

      if (category) {
        const skills = await skillsService.getSkillsByCategory(category as any);
        return successResponse(res, skills);
      }

      const skills = await skillsService.getAllSkills();
      return successResponse(res, skills);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const skill = await skillsService.createSkill(req.body);
      return createdResponse(res, skill, 'Skill created successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const skill = await skillsService.updateSkill(id, req.body);
      return successResponse(res, skill, 'Skill updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await skillsService.deleteSkill(id);
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const { skills } = req.body;
      await skillsService.reorderSkills(skills);
      return successResponse(res, null, 'Skills reordered successfully');
    } catch (error) {
      next(error);
    }
  }
}

export default new SkillsController();
