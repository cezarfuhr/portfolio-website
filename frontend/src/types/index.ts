// Enums
export enum Category {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  FULLSTACK = 'FULLSTACK',
  MOBILE = 'MOBILE',
  AI_ML = 'AI_ML',
  CLOUD = 'CLOUD',
  DEVOPS = 'DEVOPS',
  DATA_SCIENCE = 'DATA_SCIENCE',
  BLOCKCHAIN = 'BLOCKCHAIN',
  GAME_DEV = 'GAME_DEV',
  OTHER = 'OTHER',
}

export enum Status {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum SkillCategory {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  DATABASE = 'DATABASE',
  DEVOPS = 'DEVOPS',
  CLOUD = 'CLOUD',
  AI_ML = 'AI_ML',
  MOBILE = 'MOBILE',
  TOOLS = 'TOOLS',
  SOFT_SKILLS = 'SOFT_SKILLS',
  OTHER = 'OTHER',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  FREELANCE = 'FREELANCE',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
}

// Types
export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: Category;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  images: string[];
  featured: boolean;
  status: Status;
  views: number;
  likes: number;
  githubRepo?: string;
  githubStars?: number;
  githubForks?: number;
  githubLanguage?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  color?: string;
  order: number;
  yearsOfExp?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description?: string;
  location?: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate?: string;
  current: boolean;
  skills: string[];
  achievements: string[];
  companyLogo?: string;
  companyUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  description?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  grade?: string;
  location?: string;
  logo?: string;
  url?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  skills: string[];
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  avatar?: string;
  resume?: string;
  availableForWork: boolean;
  availabilityText?: string;
  hourlyRate?: string;
  email: string;
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
  metaKeywords: string[];
  ogImage?: string;
  githubUsername?: string;
  googleAnalyticsId?: string;
  updatedAt: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languageStats: Record<string, number>;
  contributionYears: number[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: any[];
}
