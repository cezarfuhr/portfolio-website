import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Eye, Heart } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {project.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          {project.featured && (
            <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              Featured
            </span>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-md bg-secondary px-2 py-1 text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {project.views}
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {project.likes}
          </div>
          {project.githubStars !== null && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              {project.githubStars}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild className="flex-1">
          <Link href={`/projects/${project.slug}`}>View Details</Link>
        </Button>
        {project.demoUrl && (
          <Button asChild variant="outline" size="icon">
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline" size="icon">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
