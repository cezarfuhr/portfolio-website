import PDFDocument from 'pdfkit';
import prisma from '../config/database';

export class CVService {
  async generatePDF(): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        // Fetch all data
        const [profile, skills, experiences, education, certificates] =
          await Promise.all([
            prisma.siteSettings.findFirst(),
            prisma.skill.findMany({
              orderBy: [{ category: 'asc' }, { order: 'asc' }],
            }),
            prisma.experience.findMany({
              orderBy: [{ current: 'desc' }, { startDate: 'desc' }],
            }),
            prisma.education.findMany({
              orderBy: [{ current: 'desc' }, { startDate: 'desc' }],
            }),
            prisma.certificate.findMany({
              orderBy: { issueDate: 'desc' },
            }),
          ]);

        if (!profile) {
          throw new Error('Profile not found');
        }

        const doc = new PDFDocument({
          size: 'A4',
          margins: { top: 50, bottom: 50, left: 50, right: 50 },
        });

        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header
        doc
          .fontSize(24)
          .font('Helvetica-Bold')
          .text(profile.fullName, { align: 'center' });

        doc
          .fontSize(14)
          .font('Helvetica')
          .text(profile.title, { align: 'center' });

        doc.moveDown(0.5);

        // Contact Info
        doc
          .fontSize(10)
          .text(
            `${profile.email}${profile.phone ? ' | ' + profile.phone : ''}${
              profile.location ? ' | ' + profile.location : ''
            }`,
            { align: 'center' }
          );

        if (profile.github || profile.linkedin) {
          doc
            .fontSize(10)
            .text(
              `${profile.github || ''}${
                profile.github && profile.linkedin ? ' | ' : ''
              }${profile.linkedin || ''}`,
              { align: 'center' }
            );
        }

        doc.moveDown(1);

        // Bio
        if (profile.bio) {
          this.addSection(doc, 'Sobre');
          doc.fontSize(10).font('Helvetica').text(profile.bio, {
            align: 'justify',
          });
          doc.moveDown(1);
        }

        // Skills
        if (skills.length > 0) {
          this.addSection(doc, 'Habilidades');

          const skillsByCategory = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
              acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
          }, {} as Record<string, typeof skills>);

          Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
            doc
              .fontSize(11)
              .font('Helvetica-Bold')
              .text(this.formatCategory(category));

            const skillNames = categorySkills.map((s) => s.name).join(', ');
            doc.fontSize(10).font('Helvetica').text(skillNames);
            doc.moveDown(0.5);
          });

          doc.moveDown(0.5);
        }

        // Experience
        if (experiences.length > 0) {
          this.addSection(doc, 'Experiência Profissional');

          experiences.forEach((exp) => {
            doc
              .fontSize(12)
              .font('Helvetica-Bold')
              .text(exp.position);

            const period = this.formatDateRange(exp.startDate, exp.endDate, exp.current);
            doc
              .fontSize(10)
              .font('Helvetica-Oblique')
              .text(`${exp.company} | ${period}`);

            if (exp.description) {
              doc
                .fontSize(10)
                .font('Helvetica')
                .text(exp.description, { align: 'justify' });
            }

            if (exp.achievements && exp.achievements.length > 0) {
              exp.achievements.forEach((achievement) => {
                doc.fontSize(10).text(`• ${achievement}`);
              });
            }

            doc.moveDown(1);
          });
        }

        // Education
        if (education.length > 0) {
          this.addSection(doc, 'Formação Acadêmica');

          education.forEach((edu) => {
            doc
              .fontSize(11)
              .font('Helvetica-Bold')
              .text(`${edu.degree} - ${edu.field}`);

            const period = this.formatDateRange(edu.startDate, edu.endDate, edu.current);
            doc
              .fontSize(10)
              .font('Helvetica-Oblique')
              .text(`${edu.institution} | ${period}`);

            if (edu.description) {
              doc.fontSize(10).font('Helvetica').text(edu.description);
            }

            doc.moveDown(0.8);
          });
        }

        // Certificates
        if (certificates.length > 0) {
          this.addSection(doc, 'Certificações');

          certificates.forEach((cert) => {
            doc.fontSize(11).font('Helvetica-Bold').text(cert.name);

            doc
              .fontSize(10)
              .font('Helvetica')
              .text(
                `${cert.issuer} | ${new Date(cert.issueDate).toLocaleDateString('pt-BR')}`
              );

            if (cert.credentialId) {
              doc.fontSize(9).text(`ID: ${cert.credentialId}`);
            }

            doc.moveDown(0.8);
          });
        }

        // Footer
        doc
          .fontSize(8)
          .font('Helvetica-Oblique')
          .text(
            `Gerado em ${new Date().toLocaleDateString('pt-BR')}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
          );

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  private addSection(doc: PDFKit.PDFDocument, title: string) {
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .fillColor('#2563EB')
      .text(title.toUpperCase());

    doc
      .moveTo(50, doc.y)
      .lineTo(doc.page.width - 50, doc.y)
      .stroke('#2563EB');

    doc.fillColor('#000000').moveDown(0.5);
  }

  private formatDateRange(
    start: Date,
    end: Date | null,
    current: boolean
  ): string {
    const startDate = new Date(start).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric',
    });

    if (current) {
      return `${startDate} - Presente`;
    }

    if (end) {
      const endDate = new Date(end).toLocaleDateString('pt-BR', {
        month: 'short',
        year: 'numeric',
      });
      return `${startDate} - ${endDate}`;
    }

    return startDate;
  }

  private formatCategory(category: string): string {
    const categoryMap: Record<string, string> = {
      FRONTEND: 'Frontend',
      BACKEND: 'Backend',
      DATABASE: 'Banco de Dados',
      DEVOPS: 'DevOps',
      CLOUD: 'Cloud',
      AI_ML: 'IA & Machine Learning',
      MOBILE: 'Mobile',
      TOOLS: 'Ferramentas',
      SOFT_SKILLS: 'Soft Skills',
      OTHER: 'Outras',
    };

    return categoryMap[category] || category;
  }
}

export default new CVService();
