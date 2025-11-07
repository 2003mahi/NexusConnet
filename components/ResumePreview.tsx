import React from 'react';
import { ResumeSection } from '../types';
import { TemplateName, templates } from '../styles/templates';

interface ResumePreviewProps {
  sections: ResumeSection[];
  template: TemplateName;
}

const renderContent = (text: string) => {
    // Basic markdown-like substitutions
    const html = text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<ul class="list-disc list-inside ml-4"><li>$1</li></ul>') // Basic list support
      .replace(/<\/ul>\s*<ul class="list-disc list-inside ml-4">/g, '') // Merge consecutive lists
      .replace(/\n/g, '<br />');
    return { __html: html };
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ sections, template }) => {
  const styles = templates[template];

  return (
    <div className={styles.container}>
      <div className="space-y-6">
        {sections.map(section => (
          <div key={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {section.title}
            </h2>
            <div 
                className={styles.content} 
                dangerouslySetInnerHTML={renderContent(section.content)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;