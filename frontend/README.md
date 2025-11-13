# Portfolio Frontend

Frontend application for the Portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✅ **Home Page** - Hero section with stats and featured projects
- ✅ **Projects Page** - Filterable and searchable project listing
- ✅ **Project Detail** - Detailed project view with markdown support
- ✅ **About Page** - Skills, experience timeline, and bio
- ✅ **Contact Page** - Contact form and information
- ✅ **Admin Panel** - Login and dashboard for project management
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Mode Ready** - Theme support with Tailwind

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (Shadcn/UI)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Markdown**: React Markdown

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see `../backend/README.md`)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Update .env.local with your API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Create production build
npm run build

# Run production server
npm start
```

## Pages

### Public Pages

- `/` - Home page
- `/projects` - Projects listing
- `/projects/[slug]` - Project detail
- `/about` - About me page
- `/contact` - Contact page

### Admin Pages

- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## API Integration

The app uses Axios for API calls. See `src/lib/api.ts` for all API endpoints.

Example:
```typescript
import apiClient from '@/lib/api';

// Get all projects
const response = await apiClient.projects.getAll();

// Get single project
const project = await apiClient.projects.getBySlug('project-slug');

// Login
const auth = await apiClient.auth.login(email, password);
```

## Components

### UI Components (Shadcn/UI)

- `Button` - Customizable button component
- `Card` - Card layouts
- `Input` - Form inputs
- `Label` - Form labels
- `Textarea` - Text area inputs

### Custom Components

- `Header` - Main navigation header
- `Footer` - Site footer
- `ProjectCard` - Project display card

## Styling

Uses Tailwind CSS with custom theme configuration.

Theme variables are defined in `src/app/globals.css`.

## Admin Authentication

Login with default credentials:
- Email: `admin@portfolio.com`
- Password: `admin123`

Token is stored in localStorage and sent with all authenticated requests.

## Project Structure

```
frontend/
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── page.tsx      # Home page
│   │   ├── projects/     # Projects pages
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   └── admin/        # Admin pages
│   ├── components/        # React components
│   │   ├── ui/           # UI components
│   │   └── layout/       # Layout components
│   ├── lib/              # Utilities
│   │   ├── api.ts        # API client
│   │   └── utils.ts      # Helper functions
│   └── types/            # TypeScript types
├── public/               # Static files
├── .env.example          # Environment variables template
└── package.json
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variable:
- `NEXT_PUBLIC_API_URL`: Your backend API URL

### Other Platforms

Can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting

## License

MIT
