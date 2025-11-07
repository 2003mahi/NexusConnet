import { ResumeSection } from '../types';

export type TemplateName = 'modern' | 'classic';

export type TemplateStyles = {
  container: string;
  section: string;
  sectionTitle: string;
  content: string;
};

export const templates: Record<TemplateName, TemplateStyles> = {
  modern: {
    container: 'p-8 md:p-10 font-sans text-slate-800',
    section: 'mb-6',
    sectionTitle: 'text-xl font-bold text-sky-700 border-b-2 border-sky-200 pb-2 mb-3',
    content: 'text-sm text-slate-700 leading-relaxed whitespace-pre-wrap',
  },
  classic: {
    container: 'p-8 md:p-10 font-serif bg-white',
    section: 'mb-6',
    sectionTitle: 'text-lg font-semibold uppercase tracking-wider text-center text-slate-800 mb-4 pb-2 border-b border-slate-300',
    content: 'text-sm text-slate-600 leading-relaxed whitespace-pre-wrap text-center',
  }
};


export const defaultResumeData: ResumeSection[] = [
  {
    id: `section-${Date.now()}-1`,
    title: 'Summary',
    content: 'Innovative and deadline-driven Software Engineer with 3+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.'
  },
  {
    id: `section-${Date.now()}-2`,
    title: 'Experience',
    content: `**Senior Frontend Developer** | Acme Inc. | Anytown, USA | 2021 - Present
- Led the development of a new e-commerce platform, resulting in a 20% increase in user engagement.
- Collaborated with cross-functional teams to define, design, and ship new features.
- Mentored junior developers and conducted code reviews to ensure code quality.

**Software Engineer** | Tech Solutions | Sometown, USA | 2019 - 2021
- Developed and maintained web applications using React and Node.js.
- Worked on improving application performance, reducing load times by 15%.
- Participated in the full software development lifecycle, from concept to deployment.`
  },
  {
    id: `section-${Date.now()}-3`,
    title: 'Education',
    content: '**B.S. in Computer Science** | University of Example | 2015 - 2019'
  },
  {
    id: `section-${Date.now()}-4`,
    title: 'Skills',
    content: 'JavaScript, TypeScript, React, Node.js, HTML, CSS, Git, Agile Methodologies, REST APIs'
  }
];