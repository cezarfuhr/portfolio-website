import { Router } from 'express';
import githubController from '../controllers/github.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @route   GET /api/github/profile
 * @desc    Get GitHub profile
 * @access  Public
 */
router.get('/profile', githubController.getProfile);

/**
 * @route   GET /api/github/repos
 * @desc    Get GitHub repositories
 * @access  Public
 */
router.get('/repos', githubController.getRepos);

/**
 * @route   GET /api/github/stats
 * @desc    Get GitHub statistics
 * @access  Public
 */
router.get('/stats', githubController.getStats);

/**
 * @route   POST /api/github/sync
 * @desc    Sync repository stats
 * @access  Private (Admin)
 */
router.post('/sync', authenticate, requireAdmin, githubController.syncRepoStats);

export default router;
