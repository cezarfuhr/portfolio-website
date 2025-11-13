'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import apiClient from '@/lib/api';
import { Project, SiteSettings } from '@/types';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<SiteSettings | null>(null);
  const [stats, setStats] = useState({ total: 0, totalViews: 0, totalLikes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, profileRes, statsRes] = await Promise.all([
          apiClient.projects.getAll({ featured: 'true', status: 'PUBLISHED' }),
          apiClient.profile.get(),
          apiClient.projects.getStats(),
        ]);

        setFeaturedProjects(projectsRes.data.data || []);
        setProfile(profileRes.data.data);
        setStats(statsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {profile?.fullName || 'Developer Portfolio'}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {profile?.title || 'Full Stack Developer & AI Enthusiast'}
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {profile?.bio || 'Building innovative solutions with modern technologies'}
            </p>

            {profile?.availableForWork && (
              <div className="mt-6">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {profile.availabilityText || 'Available for projects'}
                </span>
              </div>
            )}

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center justify-center gap-4">
              {profile?.github && (
                <Button asChild variant="ghost" size="icon">
                  <Link href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {profile?.linkedin && (
                <Button asChild variant="ghost" size="icon">
                  <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {profile?.email && (
                <Button asChild variant="ghost" size="icon">
                  <Link href={`mailto:${profile.email}`}>
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="icon">
                <Link href={`${process.env.NEXT_PUBLIC_API_URL}/profile/cv/download`} target="_blank">
                  <Download className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/50 py-12">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold">{stats.total}</div>
                <div className="mt-2 text-sm text-muted-foreground">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{stats.totalViews?.toLocaleString()}</div>
                <div className="mt-2 text-sm text-muted-foreground">Project Views</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{stats.totalLikes}</div>
                <div className="mt-2 text-sm text-muted-foreground">Total Likes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="container py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="mt-4 text-muted-foreground">
              Check out some of my best work
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
