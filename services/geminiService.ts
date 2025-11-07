import { ResumeFeedback } from '../types';

export const getResumeFeedback = async (resumeText: string, analysisType: 'basic' | 'in-depth'): Promise<ResumeFeedback> => {
    try {
        // Call the secure Netlify Function instead of the Gemini API directly.
        const response = await fetch('/.netlify/functions/gemini-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resumeText, analysisType }),
        });

        if (!response.ok) {
            // Try to parse a structured error from the function, otherwise fall back to status text.
            const errorData = await response.json().catch(() => ({ error: `Request failed with status ${response.status}` }));
            throw new Error(errorData.error || 'An unknown error occurred.');
        }

        const feedback: ResumeFeedback = await response.json();
        
        // Basic validation of the response from our proxy
        if (!feedback.overallScore || !feedback.suggestions) {
            throw new Error("Invalid response structure from the API proxy.");
        }
        
        return feedback;

    } catch (error) {
        console.error("Error fetching resume feedback from Netlify Function:", error);
        // Re-throw a user-friendly error message.
        throw new Error(error instanceof Error ? error.message : "Failed to get feedback from AI. Please try again.");
    }
};
