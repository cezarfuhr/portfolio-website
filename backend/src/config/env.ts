import dotenv from 'dotenv';

dotenv.config();

export const env = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // GitHub
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || '',

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),

  // Admin
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
};

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
