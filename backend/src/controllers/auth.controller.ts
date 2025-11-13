import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { successResponse } from '../utils/response';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });
      return successResponse(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.verifyToken(req.user!.userId);
      return successResponse(res, user);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { oldPassword, newPassword } = req.body;
      await authService.changePassword(
        req.user!.userId,
        oldPassword,
        newPassword
      );
      return successResponse(res, null, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
