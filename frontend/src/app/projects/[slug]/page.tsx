'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import apiClient from '@/lib/api';
import { Project } from '@/types';
import { ArrowLeft, ExternalLink, Github, Eye, Heart, Star, GitFork, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '@/lib/utils';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await apiClient.projects.getBySlug(slug);
        setProject(response.data.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container py-24 text-center">
            <h1 className="text-4xl font-bold">Project Not Found</h1>
            <p className="mt-4 text-muted-foreground">
              The project you're looking for doesn't exist.
            </p>
            <Button asChild className="mt-8">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {project.imageUrl && (
                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">{project.title}</h1>
                  {project.featured && (
                    <span className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-4 text-lg text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {project.longDescription ? (
                  <ReactMarkdown>{project.longDescription}</ReactMarkdown>
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Project Links</h3>
                  <div className="space-y-2">
                    {project.demoUrl && (
                      <Button asChild className="w-full" variant="default">
                        <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild className="w-full" variant="outline">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-secondary px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Views</span>
                      </div>
                      <span className="font-medium">{project.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">Likes</span>
                      </div>
                      <span className="font-medium">{project.likes}</span>
                    </div>
                    {project.githubStars !== null && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Star className="h-4 w-4" />
                            <span className="text-sm">Stars</span>
                          </div>
                          <span className="font-medium">{project.githubStars}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GitFork className="h-4 w-4" />
                            <span className="text-sm">Forks</span>
                          </div>
                          <span className="font-medium">{project.githubForks}</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Created</span>
                      </div>
                      <span className="font-medium">{formatDate(project.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {project.tags && project.tags.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full px-3 py-1 text-sm"
                          style={{
                            backgroundColor: tag.color + '20',
                            color: tag.color,
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
