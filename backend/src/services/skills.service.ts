import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';
import { SkillCategory } from '@prisma/client';

export interface SkillInput {
  name: string;
  category: SkillCategory;
  level?: number;
  icon?: string;
  color?: string;
  order?: number;
  yearsOfExp?: number;
}

export class SkillsService {
  async getAllSkills() {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    return skills;
  }

  async getSkillsByCategory(category: SkillCategory) {
    const skills = await prisma.skill.findMany({
      where: { category },
      orderBy: { order: 'asc' },
    });

    return skills;
  }

  async createSkill(data: SkillInput) {
    const skill = await prisma.skill.create({
      data,
    });

    return skill;
  }

  async updateSkill(id: string, data: Partial<SkillInput>) {
    const existing = await prisma.skill.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Skill not found');
    }

    const skill = await prisma.skill.update({
      where: { id },
      data,
    });

    return skill;
  }

  async deleteSkill(id: string) {
    const existing = await prisma.skill.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Skill not found');
    }

    await prisma.skill.delete({ where: { id } });
  }

  async reorderSkills(skills: { id: string; order: number }[]) {
    await Promise.all(
      skills.map((skill) =>
        prisma.skill.update({
          where: { id: skill.id },
          data: { order: skill.order },
        })
      )
    );
  }
}

export default new SkillsService();
