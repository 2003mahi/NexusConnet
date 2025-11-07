
import React, { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LandingPage from './components/LandingPage';
import ResumeEditor from './components/ResumeEditor';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {user ? (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <ResumeEditor />
          </main>
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
