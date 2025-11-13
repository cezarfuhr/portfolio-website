import { Request, Response, NextFunction } from 'express';
import profileService from '../services/profile.service';
import cvService from '../services/cv.service';
import { successResponse, createdResponse, noContentResponse } from '../utils/response';

export class ProfileController {
  // Profile
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await profileService.getProfile();
      return successResponse(res, profile);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await profileService.updateProfile(req.body);
      return successResponse(res, profile, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  // Experiences
  async getExperiences(req: Request, res: Response, next: NextFunction) {
    try {
      const experiences = await profileService.getExperiences();
      return successResponse(res, experiences);
    } catch (error) {
      next(error);
    }
  }

  async createExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const experience = await profileService.createExperience(req.body);
      return createdResponse(res, experience, 'Experience created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const experience = await profileService.updateExperience(id, req.body);
      return successResponse(res, experience, 'Experience updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteExperience(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await profileService.deleteExperience(id);
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }

  // Education
  async getEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const education = await profileService.getEducation();
      return successResponse(res, education);
    } catch (error) {
      next(error);
    }
  }

  async createEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const education = await profileService.createEducation(req.body);
      return createdResponse(res, education, 'Education created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const education = await profileService.updateEducation(id, req.body);
      return successResponse(res, education, 'Education updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteEducation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await profileService.deleteEducation(id);
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }

  // Certificates
  async getCertificates(req: Request, res: Response, next: NextFunction) {
    try {
      const certificates = await profileService.getCertificates();
      return successResponse(res, certificates);
    } catch (error) {
      next(error);
    }
  }

  async createCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const certificate = await profileService.createCertificate(req.body);
      return createdResponse(res, certificate, 'Certificate created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const certificate = await profileService.updateCertificate(id, req.body);
      return successResponse(res, certificate, 'Certificate updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteCertificate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await profileService.deleteCertificate(id);
      return noContentResponse(res);
    } catch (error) {
      next(error);
    }
  }

  // CV
  async downloadCV(req: Request, res: Response, next: NextFunction) {
    try {
      const pdfBuffer = await cvService.generatePDF();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=curriculum-vitae.pdf'
      );
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
