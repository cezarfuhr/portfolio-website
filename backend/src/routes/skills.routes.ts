import { Router } from 'express';
import skillsController from '../controllers/skills.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @route   GET /api/skills
 * @desc    Get all skills
 * @access  Public
 */
router.get('/', skillsController.getAll);

/**
 * @route   POST /api/skills
 * @desc    Create new skill
 * @access  Private (Admin)
 */
router.post('/', authenticate, requireAdmin, skillsController.create);

/**
 * @route   PUT /api/skills/reorder
 * @desc    Reorder skills
 * @access  Private (Admin)
 */
router.put('/reorder', authenticate, requireAdmin, skillsController.reorder);

/**
 * @route   PUT /api/skills/:id
 * @desc    Update skill
 * @access  Private (Admin)
 */
router.put('/:id', authenticate, requireAdmin, skillsController.update);

/**
 * @route   DELETE /api/skills/:id
 * @desc    Delete skill
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, requireAdmin, skillsController.delete);

export default router;
