
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './common/Button';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <header className="sticky top-0 bg-slate-50/80 backdrop-blur-lg border-b border-slate-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <SparklesIcon className="w-6 h-6 text-sky-600" />
            <span>NexusConnect</span>
          </a>
          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:block">
                  <span className="text-slate-600">Welcome, {user.name}</span>
                  {user.plan === 'free' && (
                    <span className="ml-4 bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{user.analysesLeft} analyses left</span>
                  )}
                </div>
                <Button onClick={logout} variant="outline" size="sm">Log Out</Button>
              </>
            ) : (
              <>
                 <a href="#features" className="text-slate-600 hover:text-sky-600 font-medium hidden md:block">Features</a>
                 <a href="#pricing" className="text-slate-600 hover:text-sky-600 font-medium hidden md:block">Pricing</a>
                 <Button onClick={login} variant="outline" size="sm">Login</Button>
                 <Button onClick={login} variant="primary" size="sm">Get Started</Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
