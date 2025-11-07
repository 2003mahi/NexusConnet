
import React from 'react';
import Card from '../common/Card';
import SparklesIcon from '../icons/SparklesIcon';
import CheckIcon from '../icons/CheckIcon';

const features = [
  {
    title: 'Instant AI Feedback',
    description: 'Our advanced AI analyzes your resume for common mistakes, formatting issues, and provides actionable advice in seconds.',
    icon: <SparklesIcon className="w-8 h-8 text-white" />
  },
  {
    title: 'Action Verb Suggestions',
    description: 'Replace weak phrases with powerful action verbs that showcase your accomplishments and grab attention.',
    icon: <CheckIcon className="w-8 h-8 text-white" />
  },
  {
    title: 'Content Optimization',
    description: 'Get tailored suggestions to improve your bullet points, making them more impactful and results-oriented.',
    icon: <SparklesIcon className="w-8 h-8 text-white" />
  },
  {
    title: 'ATS Compatibility Check',
    description: 'Ensure your resume is optimized for Applicant Tracking Systems (ATS) so it gets seen by human recruiters.',
    icon: <CheckIcon className="w-8 h-8 text-white" />
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose NexusConnect?</h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mt-4">
            We combine cutting-edge AI with proven resume strategies to give you an unfair advantage in your job search.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-sky-600 rounded-full mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
