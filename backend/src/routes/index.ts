import { Router } from 'express';
import authRoutes from './auth.routes';
import projectsRoutes from './projects.routes';
import githubRoutes from './github.routes';
import skillsRoutes from './skills.routes';
import profileRoutes from './profile.routes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/github', githubRoutes);
router.use('/skills', skillsRoutes);
router.use('/profile', profileRoutes);

export default router;
