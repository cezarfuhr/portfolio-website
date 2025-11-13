# 📚 API Documentation

Documentação completa da API do Portfolio Backend.

Base URL: `http://localhost:5000/api`

## 🔐 Autenticação

A maioria dos endpoints de admin requerem autenticação via JWT.

### Headers

```
Authorization: Bearer {token}
Content-Type: application/json
```

---

## 📋 Endpoints

### Auth

#### Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clw123...",
      "email": "admin@portfolio.com",
      "name": "Admin User",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clw123...",
    "email": "admin@portfolio.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

---

### Projects

#### List All Projects

```http
GET /api/projects?category=FULLSTACK&status=PUBLISHED&featured=true&search=react
```

**Query Parameters:**
- `category` (optional): FRONTEND, BACKEND, FULLSTACK, AI_ML, CLOUD, etc.
- `status` (optional): DRAFT, PUBLISHED, ARCHIVED
- `featured` (optional): true, false
- `tags` (optional): comma-separated tags
- `search` (optional): search term

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clw456...",
      "title": "E-commerce Platform",
      "slug": "ecommerce-platform",
      "description": "Plataforma completa de e-commerce",
      "longDescription": "# Descrição detalhada...",
      "technologies": ["React", "Node.js", "PostgreSQL"],
      "category": "FULLSTACK",
      "githubUrl": "https://github.com/user/project",
      "demoUrl": "https://demo.com",
      "imageUrl": "https://...",
      "images": ["https://..."],
      "featured": true,
      "status": "PUBLISHED",
      "views": 150,
      "likes": 25,
      "githubStars": 42,
      "githubForks": 12,
      "tags": [
        {
          "id": "clw789...",
          "name": "React",
          "slug": "react",
          "color": "#61DAFB"
        }
      ],
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### Get Project by Slug

```http
GET /api/projects/ecommerce-platform
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clw456...",
    "title": "E-commerce Platform",
    // ... full project data
  }
}
```

#### Create Project (Admin)

```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Short description",
  "longDescription": "# Detailed markdown description",
  "technologies": ["React", "TypeScript"],
  "category": "FRONTEND",
  "githubUrl": "https://github.com/user/project",
  "demoUrl": "https://demo.com",
  "imageUrl": "https://image.com/cover.jpg",
  "images": ["https://image.com/1.jpg"],
  "featured": true,
  "status": "PUBLISHED",
  "tags": ["React", "TypeScript"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "clwabc...",
    "title": "New Project",
    "slug": "new-project",
    // ... full project data
  },
  "message": "Project created successfully"
}
```

#### Update Project (Admin)

```http
PUT /api/projects/{id}
Authorization: Bearer {token}
```

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "featured": false
}
```

#### Delete Project (Admin)

```http
DELETE /api/projects/{id}
Authorization: Bearer {token}
```

**Response (204):** No content

#### Like Project

```http
POST /api/projects/{id}/like
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "likes": 26
  }
}
```

#### Get Project Stats

```http
GET /api/projects/stats
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 15,
    "published": 12,
    "byCategory": [
      { "category": "FULLSTACK", "_count": 5 },
      { "category": "FRONTEND", "_count": 4 }
    ],
    "totalViews": 1250,
    "totalLikes": 320
  }
}
```

---

### GitHub

#### Get GitHub Profile

```http
GET /api/github/profile?username=octocat
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "login": "octocat",
    "name": "The Octocat",
    "bio": "GitHub mascot",
    "avatar_url": "https://avatars.githubusercontent.com/u/583231",
    "public_repos": 8,
    "followers": 1000,
    "following": 100
  }
}
```

#### Get GitHub Stats

```http
GET /api/github/stats?username=octocat
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalRepos": 42,
    "totalStars": 1250,
    "totalForks": 320,
    "languageStats": {
      "JavaScript": 15,
      "TypeScript": 12,
      "Python": 8
    },
    "contributionYears": [2024, 2023, 2022]
  }
}
```

---

### Skills

#### Get All Skills

```http
GET /api/skills?category=FRONTEND
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clw123...",
      "name": "React",
      "category": "FRONTEND",
      "level": 90,
      "yearsOfExp": 4,
      "order": 1,
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### Create Skill (Admin)

```http
POST /api/skills
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Next.js",
  "category": "FRONTEND",
  "level": 85,
  "yearsOfExp": 3,
  "order": 2
}
```

---

### Profile

#### Get Profile

```http
GET /api/profile
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "default",
    "fullName": "John Doe",
    "title": "Full Stack Developer",
    "bio": "Software developer passionate about...",
    "email": "contact@example.com",
    "availableForWork": true,
    "availabilityText": "Available for freelance projects",
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe"
  }
}
```

#### Get Experiences

```http
GET /api/profile/experiences
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clw123...",
      "company": "Tech Corp",
      "position": "Senior Developer",
      "description": "Led development of...",
      "employmentType": "FULL_TIME",
      "startDate": "2020-01-01T00:00:00.000Z",
      "endDate": null,
      "current": true,
      "skills": ["React", "Node.js"],
      "achievements": ["Increased performance by 50%"]
    }
  ]
}
```

#### Download CV

```http
GET /api/profile/cv/download
```

**Response:** PDF file download

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Project not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 🔒 Rate Limiting

A API possui rate limiting configurado:

- **Window**: 15 minutos
- **Max Requests**: 100 por IP

Quando excedido:
```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again later."
}
```

---

## 💡 Exemplos de Uso

### JavaScript/Fetch

```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@portfolio.com',
    password: 'admin123',
  }),
});

const data = await response.json();
const token = data.data.token;

// Get projects (authenticated)
const projects = await fetch('http://localhost:5000/api/projects', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Login
const { data } = await api.post('/auth/login', {
  email: 'admin@portfolio.com',
  password: 'admin123',
});

// Set token for future requests
api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;

// Create project
await api.post('/projects', {
  title: 'My Project',
  description: 'Description',
  category: 'FRONTEND',
  technologies: ['React'],
});
```

### cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'

# Get projects
curl http://localhost:5000/api/projects

# Create project (with auth)
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "New Project",
    "description": "Description",
    "category": "FRONTEND",
    "technologies": ["React"]
  }'
```

---

## 🧪 Testing with Postman

1. Import the collection from `postman_collection.json` (se disponível)
2. Set environment variable `base_url` = `http://localhost:5000/api`
3. Login to get token
4. Token will be automatically set for authenticated requests

---

**Para mais informações, consulte o README.md do projeto**
