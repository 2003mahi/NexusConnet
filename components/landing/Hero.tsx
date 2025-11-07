
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const Hero: React.FC = () => {
  const { login } = useAuth();
  
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block bg-sky-100 text-sky-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          Powered by Gemini AI
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Craft a Resume That
          <br />
          <span className="text-sky-600">Opens Doors</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-8">
          Stop guessing what recruiters want. Get instant, AI-powered feedback to optimize your resume, highlight your strengths, and land more interviews.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={login} size="lg">
            Analyze My Resume For Free
            <ArrowRightIcon />
          </Button>
        </div>
         <div className="mt-12">
            <img src="https://picsum.photos/seed/nexus-hero/1024/576" alt="NexusConnect App Screenshot" className="rounded-2xl shadow-2xl mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
