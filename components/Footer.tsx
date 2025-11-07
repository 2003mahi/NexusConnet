
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <a href="/" className="flex items-center justify-center md:justify-start gap-2 text-xl font-bold text-slate-800">
              <SparklesIcon className="w-6 h-6 text-sky-600" />
              <span>NexusConnect</span>
            </a>
            <p className="text-slate-500 mt-2">Supercharge your resume with AI.</p>
          </div>
          <div className="flex gap-6 text-slate-600">
            <a href="#" className="hover:text-sky-600">Privacy Policy</a>
            <a href="#" className="hover:text-sky-600">Terms of Service</a>
            <a href="#" className="hover:text-sky-600">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-300 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} NexusConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
