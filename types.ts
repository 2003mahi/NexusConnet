export interface User {
  name: string;
  email: string;
  plan: 'free' | 'pro';
  analysesLeft: number;
}

export interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  upgrade: () => void;
  useAnalysis: (amount?: number) => void;
}

export interface ResumeSuggestion {
    section: string;
    originalText: string;
    suggestion: string;
    explanation: string;
}

export interface ResumeFeedback {
    overallScore: number;
    overallFeedback: string;
    suggestions: ResumeSuggestion[];
}

export interface ResumeSection {
    id: string;
    title: string;
    content: string;
}