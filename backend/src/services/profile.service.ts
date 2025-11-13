import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';

export interface ProfileUpdateInput {
  fullName?: string;
  title?: string;
  bio?: string;
  avatar?: string;
  resume?: string;
  availableForWork?: boolean;
  availabilityText?: string;
  hourlyRate?: string;
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  medium?: string;
  devto?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  githubUsername?: string;
  googleAnalyticsId?: string;
}

export class ProfileService {
  async getProfile() {
    let profile = await prisma.siteSettings.findFirst();

    if (!profile) {
      // Create default profile if doesn't exist
      profile = await prisma.siteSettings.create({
        data: {
          id: 'default',
          fullName: 'Your Name',
          title: 'Software Developer',
          bio: 'Tell us about yourself...',
          email: 'contact@example.com',
          availableForWork: true,
        },
      });
    }

    return profile;
  }

  async updateProfile(data: ProfileUpdateInput) {
    const existing = await this.getProfile();

    const profile = await prisma.siteSettings.update({
      where: { id: existing.id },
      data,
    });

    return profile;
  }

  async getExperiences() {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ current: 'desc' }, { startDate: 'desc' }],
    });

    return experiences;
  }

  async createExperience(data: any) {
    const experience = await prisma.experience.create({
      data,
    });

    return experience;
  }

  async updateExperience(id: string, data: any) {
    const existing = await prisma.experience.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Experience not found');
    }

    const experience = await prisma.experience.update({
      where: { id },
      data,
    });

    return experience;
  }

  async deleteExperience(id: string) {
    const existing = await prisma.experience.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Experience not found');
    }

    await prisma.experience.delete({ where: { id } });
  }

  async getEducation() {
    const education = await prisma.education.findMany({
      orderBy: [{ current: 'desc' }, { startDate: 'desc' }],
    });

    return education;
  }

  async createEducation(data: any) {
    const education = await prisma.education.create({
      data,
    });

    return education;
  }

  async updateEducation(id: string, data: any) {
    const existing = await prisma.education.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Education not found');
    }

    const education = await prisma.education.update({
      where: { id },
      data,
    });

    return education;
  }

  async deleteEducation(id: string) {
    const existing = await prisma.education.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Education not found');
    }

    await prisma.education.delete({ where: { id } });
  }

  async getCertificates() {
    const certificates = await prisma.certificate.findMany({
      orderBy: { issueDate: 'desc' },
    });

    return certificates;
  }

  async createCertificate(data: any) {
    const certificate = await prisma.certificate.create({
      data,
    });

    return certificate;
  }

  async updateCertificate(id: string, data: any) {
    const existing = await prisma.certificate.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Certificate not found');
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data,
    });

    return certificate;
  }

  async deleteCertificate(id: string) {
    const existing = await prisma.certificate.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundError('Certificate not found');
    }

    await prisma.certificate.delete({ where: { id } });
  }
}

export default new ProfileService();
