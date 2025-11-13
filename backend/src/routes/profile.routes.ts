import { Router } from 'express';
import profileController from '../controllers/profile.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Profile
router.get('/', profileController.getProfile);
router.put('/', authenticate, requireAdmin, profileController.updateProfile);

// Experiences
router.get('/experiences', profileController.getExperiences);
router.post('/experiences', authenticate, requireAdmin, profileController.createExperience);
router.put('/experiences/:id', authenticate, requireAdmin, profileController.updateExperience);
router.delete('/experiences/:id', authenticate, requireAdmin, profileController.deleteExperience);

// Education
router.get('/education', profileController.getEducation);
router.post('/education', authenticate, requireAdmin, profileController.createEducation);
router.put('/education/:id', authenticate, requireAdmin, profileController.updateEducation);
router.delete('/education/:id', authenticate, requireAdmin, profileController.deleteEducation);

// Certificates
router.get('/certificates', profileController.getCertificates);
router.post('/certificates', authenticate, requireAdmin, profileController.createCertificate);
router.put('/certificates/:id', authenticate, requireAdmin, profileController.updateCertificate);
router.delete('/certificates/:id', authenticate, requireAdmin, profileController.deleteCertificate);

// CV Download
router.get('/cv/download', profileController.downloadCV);

export default router;
