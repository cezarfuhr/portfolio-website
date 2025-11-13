import { Octokit } from 'octokit';
import { env } from '../config/env';
import { AppError } from '../utils/errors';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languageStats: Record<string, number>;
  contributionYears: number[];
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export class GitHubService {
  private octokit: Octokit | null = null;

  constructor() {
    if (env.GITHUB_TOKEN) {
      this.octokit = new Octokit({
        auth: env.GITHUB_TOKEN,
      });
    }
  }

  private ensureClient() {
    if (!this.octokit) {
      throw new AppError('GitHub token not configured', 500);
    }
    return this.octokit;
  }

  async getUserProfile(username: string = env.GITHUB_USERNAME): Promise<GitHubUser> {
    const client = this.ensureClient();

    try {
      const { data } = await client.rest.users.getByUsername({
        username,
      });

      return {
        login: data.login,
        name: data.name || '',
        bio: data.bio || '',
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
      };
    } catch (error: any) {
      throw new AppError(`Failed to fetch GitHub profile: ${error.message}`, 500);
    }
  }

  async getUserRepos(username: string = env.GITHUB_USERNAME): Promise<GitHubRepo[]> {
    const client = this.ensureClient();

    try {
      const { data } = await client.rest.repos.listForUser({
        username,
        sort: 'updated',
        per_page: 100,
      });

      return data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        topics: repo.topics || [],
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
      }));
    } catch (error: any) {
      throw new AppError(`Failed to fetch GitHub repos: ${error.message}`, 500);
    }
  }

  async getRepoStats(owner: string, repo: string) {
    const client = this.ensureClient();

    try {
      const { data } = await client.rest.repos.get({
        owner,
        repo,
      });

      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        watchers: data.watchers_count,
        open_issues: data.open_issues_count,
        language: data.language,
        size: data.size,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error: any) {
      throw new AppError(`Failed to fetch repo stats: ${error.message}`, 500);
    }
  }

  async getGitHubStats(username: string = env.GITHUB_USERNAME): Promise<GitHubStats> {
    const repos = await this.getUserRepos(username);

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    const languageStats: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    const years = new Set(
      repos.map((repo) => new Date(repo.created_at).getFullYear())
    );

    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      languageStats,
      contributionYears: Array.from(years).sort((a, b) => b - a),
    };
  }

  async syncRepoStats(githubUrl: string) {
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new AppError('Invalid GitHub URL', 400);
    }

    const [, owner, repo] = match;
    const stats = await this.getRepoStats(owner, repo.replace('.git', ''));

    return {
      githubStars: stats.stars,
      githubForks: stats.forks,
      githubLanguage: stats.language,
    };
  }
}

export default new GitHubService();
