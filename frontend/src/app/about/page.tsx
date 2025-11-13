'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import apiClient from '@/lib/api';
import { SiteSettings, Skill, Experience } from '@/types';
import { Download, MapPin, Mail, Briefcase, GraduationCap } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';

export default function AboutPage() {
  const [profile, setProfile] = useState<SiteSettings | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, skillsRes, experiencesRes] = await Promise.all([
          apiClient.profile.get(),
          apiClient.skills.getAll(),
          apiClient.profile.getExperiences(),
        ]);

        setProfile(profileRes.data.data);
        setSkills(skillsRes.data.data || []);
        setExperiences(experiencesRes.data.data || []);
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

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-muted/50 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">About Me</h1>
            <p className="mt-2 text-muted-foreground">
              Learn more about my background and experience
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <div>
                <h2 className="mb-4 text-2xl font-bold">Bio</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.bio}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h2 className="mb-6 text-2xl font-bold">Skills & Technologies</h2>
                <div className="space-y-6">
                  {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <div key={category}>
                      <h3 className="mb-3 font-semibold text-lg">
                        {category.replace('_', ' & ')}
                      </h3>
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">
                                {skill.yearsOfExp ? `${skill.yearsOfExp} years` : `${skill.level}%`}
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              {experiences.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Work Experience</h2>
                  <div className="space-y-6">
                    {experiences.map((exp) => (
                      <Card key={exp.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{exp.position}</CardTitle>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {exp.company}
                              </p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <p>{formatDateShort(exp.startDate)}</p>
                              <p>
                                {exp.current
                                  ? 'Present'
                                  : exp.endDate
                                  ? formatDateShort(exp.endDate)
                                  : ''}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {exp.description && (
                            <p className="mb-3 text-muted-foreground">{exp.description}</p>
                          )}
                          {exp.skills && exp.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="rounded-md bg-secondary px-2 py-1 text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Contact Info</h3>
                  <div className="space-y-3">
                    {profile?.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile?.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Link href={`mailto:${profile.email}`} className="hover:underline">
                          {profile.email}
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">Availability</h3>
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        profile?.availableForWork
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20'
                      }`}
                    >
                      {profile?.availableForWork ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  {profile?.availabilityText && (
                    <p className="text-sm text-muted-foreground">{profile.availabilityText}</p>
                  )}
                </CardContent>
              </Card>

              <Button asChild className="w-full">
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/profile/cv/download`}
                  target="_blank"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
