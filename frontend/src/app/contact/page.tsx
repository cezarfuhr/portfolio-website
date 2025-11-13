'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import apiClient from '@/lib/api';
import { SiteSettings } from '@/types';
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';

export default function ContactPage() {
  const [profile, setProfile] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await apiClient.profile.get();
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would send this to your API
      // await apiClient.contact.send(formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-muted/50 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Contact Me</h1>
            <p className="mt-2 text-muted-foreground">
              Get in touch for collaborations or just a friendly hello
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Send me a message</h2>
              {submitted ? (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <p className="text-green-800">
                      Thank you for your message! I'll get back to you soon.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-4"
                    >
                      Send another message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your message..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Feel free to reach out through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile?.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <Link href={`mailto:${profile.email}`} className="hover:underline">
                        {profile.email}
                      </Link>
                    </div>
                  )}

                  {profile?.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{profile.location}</span>
                    </div>
                  )}

                  {profile?.github && (
                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-muted-foreground" />
                      <Link
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        GitHub Profile
                      </Link>
                    </div>
                  )}

                  {profile?.linkedin && (
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-muted-foreground" />
                      <Link
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        LinkedIn Profile
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile?.availableForWork ? (
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Currently Available
                      </span>
                      {profile.availabilityText && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          {profile.availabilityText}
                        </p>
                      )}
                      {profile.hourlyRate && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Rate: {profile.hourlyRate}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                      Currently Unavailable
                    </span>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
