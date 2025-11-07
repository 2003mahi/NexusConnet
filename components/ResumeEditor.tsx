import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getResumeFeedback } from '../services/geminiService';
import { ResumeSection, ResumeFeedback } from '../types';
import { defaultResumeData, TemplateName } from '../styles/templates';
import Button from './common/Button';
import Card from './common/Card';
import ResumePreview from './ResumePreview';
import TrashIcon from './icons/TrashIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';
import ArrowDownIcon from './icons/ArrowDownIcon';
import SparklesIcon from './icons/SparklesIcon';

const getSectionPlaceholder = (title: string): string => {
    const lowerCaseTitle = title.toLowerCase().trim();

    if (lowerCaseTitle.includes('experience')) {
        return 'List your job responsibilities using action verbs and quantify achievements.';
    }
    if (lowerCaseTitle.includes('project')) {
        return 'Describe the project, your role, and the technologies used.';
    }
    if (lowerCaseTitle.includes('education')) {
        return 'Provide degree, university, and graduation date.';
    }
    if (lowerCaseTitle.includes('skill')) {
        return "Group skills by category like 'Programming Languages', 'Frameworks', 'Tools'.";
    }
    if (lowerCaseTitle.includes('summary')) {
        return 'A brief 2-3 sentence summary of your professional background and career goals.';
    }

    return `Enter content for the '${title}' section...`;
};


const ResumeEditor: React.FC = () => {
    const [sections, setSections] = useState<ResumeSection[]>([]);
    const [feedback, setFeedback] = useState<ResumeFeedback | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [template, setTemplate] = useState<TemplateName>('modern');
    const [activeTab, setActiveTab] = useState<'preview' | 'feedback'>('preview');
    const { user, useAnalysis } = useAuth();
    
    useEffect(() => {
        try {
            const savedResume = localStorage.getItem('nexus-resume');
            if (savedResume) {
                const parsedSections = JSON.parse(savedResume);
                if (Array.isArray(parsedSections) && parsedSections.length > 0) {
                    setSections(parsedSections);
                } else {
                    setSections(defaultResumeData);
                }
            } else {
                setSections(defaultResumeData);
            }
        } catch (error) {
            console.error("Failed to parse resume from localStorage", error);
            setSections(defaultResumeData);
        }
    }, []);

    const handleSectionChange = (id: string, field: 'title' | 'content', value: string) => {
        setSections(prev =>
            prev.map(section =>
                section.id === id ? { ...section, [field]: value } : section
            )
        );
    };

    const addCustomSection = () => {
        const newSection: ResumeSection = {
            id: `section-${Date.now()}`,
            title: '',
            content: '',
        };
        setSections(prev => [...prev, newSection]);
    };
    
    const addProjectsSection = () => {
        const newSection: ResumeSection = {
            id: `section-${Date.now()}`,
            title: 'Projects',
            content: `**Project Name** | 2023
- Describe the project and its purpose.
- Detail your role and specific contributions.
- Mention the technologies used (e.g., React, Node.js, Python).`,
        };
        setSections(prev => [...prev, newSection]);
    };

    const removeSection = (id: string) => {
        if (window.confirm('Are you sure you want to delete this section?')) {
            setSections(prev => prev.filter(section => section.id !== id));
        }
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newSections.length) return;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
        setSections(newSections);
    };

    const getFullResumeText = useCallback(() => {
        return sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n---\n\n');
    }, [sections]);

    const handleAnalyze = async (analysisType: 'basic' | 'in-depth') => {
        if (user?.plan === 'free' && user.analysesLeft <= 0) {
            setError("You've run out of free analyses. Please upgrade to Pro for unlimited analyses.");
            setActiveTab('feedback');
            return;
        }

        setIsLoading(true);
        setError(null);
        setFeedback(null);
        setActiveTab('feedback');

        try {
            const resumeText = getFullResumeText();
            const result = await getResumeFeedback(resumeText, analysisType);
            setFeedback(result);
            if (user?.plan === 'free') {
                useAnalysis();
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Column */}
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-slate-800">Resume Editor</h1>
                {sections.map((section, index) => (
                    <Card key={section.id} className="p-4">
                        <div className="flex justify-between items-center mb-2">
                             <input
                                type="text"
                                value={section.title}
                                onChange={e => handleSectionChange(section.id, 'title', e.target.value)}
                                placeholder="Enter Section Title (e.g., Experience, Projects, Skills, Awards)"
                                className="text-lg font-bold bg-transparent focus:outline-none focus:bg-slate-100 rounded p-1 w-full placeholder:text-slate-400 placeholder:font-medium"
                            />
                            <div className="flex gap-1">
                                <Button onClick={() => moveSection(index, 'up')} disabled={index === 0} size="sm" variant="outline" className="p-1"><ArrowUpIcon /></Button>
                                <Button onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} size="sm" variant="outline" className="p-1"><ArrowDownIcon /></Button>
                                <Button onClick={() => removeSection(section.id)} size="sm" variant="outline" className="p-1 text-red-500 hover:bg-red-50"><TrashIcon /></Button>
                            </div>
                        </div>
                        <textarea
                            value={section.content}
                            onChange={e => handleSectionChange(section.id, 'content', e.target.value)}
                            className="w-full h-48 p-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                            placeholder={getSectionPlaceholder(section.title)}
                        />
                    </Card>
                ))}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={addCustomSection} variant="outline" className="w-full sm:w-auto">
                        + Add Custom Section
                    </Button>
                     <Button onClick={addProjectsSection} variant="outline" className="w-full sm:w-auto">
                        + Add Projects Section
                    </Button>
                </div>

                <Card className="p-6 mt-4">
                    <h2 className="text-xl font-bold mb-4">AI Analysis</h2>
                    <p className="text-slate-600 mb-4">Get instant feedback on your resume. Pro users get a more in-depth analysis.</p>
                    <div className="flex gap-4">
                        <Button onClick={() => handleAnalyze('basic')} disabled={isLoading} className="flex-1">
                            {isLoading ? 'Analyzing...' : 'Run Basic Analysis'}
                        </Button>
                        <Button onClick={() => handleAnalyze('in-depth')} disabled={isLoading || user?.plan !== 'pro'} variant="primary" className="flex-1">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            {isLoading ? 'Analyzing...' : 'Run In-Depth Analysis (Pro)'}
                        </Button>
                    </div>
                    {user?.plan !== 'pro' && <p className="text-xs text-slate-500 mt-2 text-center">Upgrade to Pro for more detailed feedback.</p>}
                </Card>
            </div>

            {/* Right Panel with Tabs and Preview */}
            <div className="sticky top-24">
                <div className="flex flex-col h-[calc(100vh-7rem)]">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                           <Button size="sm" onClick={() => setActiveTab('preview')} className={`px-4 py-1 ${activeTab === 'preview' ? 'bg-white shadow rounded-md' : 'bg-transparent text-slate-600'}`}>Preview</Button>
                           <Button size="sm" onClick={() => setActiveTab('feedback')} className={`px-4 py-1 ${activeTab === 'feedback' ? 'bg-white shadow rounded-md' : 'bg-transparent text-slate-600'}`}>AI Feedback</Button>
                        </div>
                        <div>
                            <label htmlFor="template" className="text-sm font-medium text-slate-700 mr-2">Template:</label>
                             <select
                                id="template"
                                value={template}
                                onChange={(e) => setTemplate(e.target.value as TemplateName)}
                                className="rounded-lg border-slate-300 focus:ring-sky-500 focus:border-sky-500 text-sm"
                            >
                                <option value="modern">Modern</option>
                                <option value="classic">Classic</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex-grow bg-white rounded-2xl shadow-lg border border-slate-200 overflow-y-auto">
                        {activeTab === 'preview' && (
                            <ResumePreview sections={sections} template={template} />
                        )}
                        {activeTab === 'feedback' && (
                             <div className="p-6">
                                {isLoading && <div className="text-center p-8">Analyzing your resume...</div>}
                                {error && <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}
                                {!isLoading && !error && !feedback && (
                                    <div className="text-center p-8 text-slate-500">
                                        <h2 className="text-xl font-semibold mb-2">AI Feedback Panel</h2>
                                        <p>Run an analysis to see your results here.</p>
                                    </div>
                                )}
                                {feedback && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
                                        <div className="mb-4">
                                            <h3 className="font-bold">Overall Score: <span className="text-sky-600">{feedback.overallScore}/100</span></h3>
                                            <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
                                                <div className="bg-sky-600 h-2.5 rounded-full" style={{ width: `${feedback.overallScore}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className="font-bold mb-2">Overall Feedback:</h3>
                                            <p className="text-slate-700">{feedback.overallFeedback}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-2">Suggestions:</h3>
                                            <div className="space-y-4">
                                                {feedback.suggestions.map((s, i) => (
                                                    <details key={i} className="bg-slate-50 p-3 rounded-lg">
                                                        <summary className="font-semibold cursor-pointer text-sm">{s.section}: Improve "{s.originalText.substring(0, 30)}..."</summary>
                                                        <div className="mt-2 pl-4 border-l-2 border-sky-200">
                                                            <p className="text-sm text-slate-600 mb-2"><strong>Suggestion:</strong> {s.suggestion}</p>
                                                            <p className="text-sm text-slate-500"><strong>Explanation:</strong> {s.explanation}</p>
                                                        </div>
                                                    </details>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditor;