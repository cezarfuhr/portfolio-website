import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// API Functions
export const apiClient = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      api.post('/auth/login', { email, password }),
    me: () => api.get('/auth/me'),
    changePassword: (oldPassword: string, newPassword: string) =>
      api.put('/auth/change-password', { oldPassword, newPassword }),
  },

  // Projects
  projects: {
    getAll: (params?: any) => api.get('/projects', { params }),
    getBySlug: (slug: string) => api.get(`/projects/${slug}`),
    create: (data: any) => api.post('/projects', data),
    update: (id: string, data: any) => api.put(`/projects/${id}`, data),
    delete: (id: string) => api.delete(`/projects/${id}`),
    like: (id: string) => api.post(`/projects/${id}/like`),
    getStats: () => api.get('/projects/stats'),
  },

  // GitHub
  github: {
    getProfile: (username?: string) =>
      api.get('/github/profile', { params: { username } }),
    getRepos: (username?: string) =>
      api.get('/github/repos', { params: { username } }),
    getStats: (username?: string) =>
      api.get('/github/stats', { params: { username } }),
    syncRepoStats: (githubUrl: string) =>
      api.post('/github/sync', { githubUrl }),
  },

  // Skills
  skills: {
    getAll: (category?: string) =>
      api.get('/skills', { params: { category } }),
    create: (data: any) => api.post('/skills', data),
    update: (id: string, data: any) => api.put(`/skills/${id}`, data),
    delete: (id: string) => api.delete(`/skills/${id}`),
    reorder: (skills: any[]) => api.put('/skills/reorder', { skills }),
  },

  // Profile
  profile: {
    get: () => api.get('/profile'),
    update: (data: any) => api.put('/profile', data),
    getExperiences: () => api.get('/profile/experiences'),
    createExperience: (data: any) => api.post('/profile/experiences', data),
    updateExperience: (id: string, data: any) =>
      api.put(`/profile/experiences/${id}`, data),
    deleteExperience: (id: string) => api.delete(`/profile/experiences/${id}`),
    getEducation: () => api.get('/profile/education'),
    createEducation: (data: any) => api.post('/profile/education', data),
    updateEducation: (id: string, data: any) =>
      api.put(`/profile/education/${id}`, data),
    deleteEducation: (id: string) => api.delete(`/profile/education/${id}`),
    getCertificates: () => api.get('/profile/certificates'),
    createCertificate: (data: any) => api.post('/profile/certificates', data),
    updateCertificate: (id: string, data: any) =>
      api.put(`/profile/certificates/${id}`, data),
    deleteCertificate: (id: string) =>
      api.delete(`/profile/certificates/${id}`),
    downloadCV: () => api.get('/profile/cv/download', { responseType: 'blob' }),
  },
};

export default apiClient;
