import { Router } from 'express';
import projectsController from '../controllers/projects.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @route   GET /api/projects
 * @desc    Get all projects (with filters)
 * @access  Public
 */
router.get('/', projectsController.getAll);

/**
 * @route   GET /api/projects/stats
 * @desc    Get project statistics
 * @access  Public
 */
router.get('/stats', projectsController.getStats);

/**
 * @route   GET /api/projects/:slug
 * @desc    Get project by slug
 * @access  Public
 */
router.get('/:slug', projectsController.getBySlug);

/**
 * @route   POST /api/projects/:id/like
 * @desc    Like a project
 * @access  Public
 */
router.post('/:id/like', projectsController.like);

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private (Admin)
 */
router.post('/', authenticate, requireAdmin, projectsController.create);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 * @access  Private (Admin)
 */
router.put('/:id', authenticate, requireAdmin, projectsController.update);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, requireAdmin, projectsController.delete);

export default router;
