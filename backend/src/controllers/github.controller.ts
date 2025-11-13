import { Request, Response, NextFunction } from 'express';
import githubService from '../services/github.service';
import { successResponse } from '../utils/response';

export class GitHubController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.query;
      const profile = await githubService.getUserProfile(username as string);
      return successResponse(res, profile);
    } catch (error) {
      next(error);
    }
  }

  async getRepos(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.query;
      const repos = await githubService.getUserRepos(username as string);
      return successResponse(res, repos);
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.query;
      const stats = await githubService.getGitHubStats(username as string);
      return successResponse(res, stats);
    } catch (error) {
      next(error);
    }
  }

  async syncRepoStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { githubUrl } = req.body;
      const stats = await githubService.syncRepoStats(githubUrl);
      return successResponse(res, stats);
    } catch (error) {
      next(error);
    }
  }
}

export default new GitHubController();
