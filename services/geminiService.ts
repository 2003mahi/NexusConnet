
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeFeedback, ResumeSuggestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll log a warning. The UI will show an error.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const resumeSuggestionSchema = {
    type: Type.OBJECT,
    properties: {
        section: {
            type: Type.STRING,
            description: "The section of the resume this suggestion applies to (e.g., 'Summary', 'Experience', 'Skills')."
        },
        originalText: {
            type: Type.STRING,
            description: "The specific sentence or phrase from the original resume that can be improved."
        },
        suggestion: {
            type: Type.STRING,
            description: "The improved version of the text."
        },
        explanation: {
            type: Type.STRING,
            description: "A brief explanation of why the suggestion is an improvement (e.g., 'Uses stronger action verbs', 'More quantifiable result')."
        }
    },
    required: ["section", "originalText", "suggestion", "explanation"]
};

const resumeFeedbackSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: {
            type: Type.NUMBER,
            description: "A score from 1 to 100 representing the overall quality of the resume."
        },
        overallFeedback: {
            type: Type.STRING,
            description: "A paragraph summarizing the strengths and weaknesses of the resume."
        },
        suggestions: {
            type: Type.ARRAY,
            items: resumeSuggestionSchema,
            description: "A list of specific, actionable suggestions for improvement."
        }
    },
    required: ["overallScore", "overallFeedback", "suggestions"]
};

const getPrompt = (resumeText: string, analysisType: 'basic' | 'in-depth'): string => {
    const basePrompt = `
        Analyze the following resume text. Act as an expert career coach and recruiter.
        Provide an overall score out of 100, a summary of feedback, and specific, actionable suggestions for improvement.
        Focus on clarity, impact, action verbs, and quantifiable results.
    `;

    if (analysisType === 'in-depth') {
        return `
            ${basePrompt}
            ---
            IN-DEPTH ANALYSIS INSTRUCTIONS:
            Be highly critical and thorough. Go beyond surface-level feedback.
            1.  **Quantifiable Metrics:** For every experience bullet point, identify if it lacks a quantifiable result. If so, provide a specific example of how to add one (e.g., instead of "improved performance," suggest "improved performance by 15% by implementing X").
            2.  **Weak Language:** Identify and replace weak verbs or phrases (e.g., "responsible for", "worked on") with powerful, industry-standard action verbs.
            3.  **Clarity and Conciseness:** Suggest rewrites for any sentences that are verbose, unclear, or use excessive jargon.
            4.  **Consistency:** Check for consistency in formatting, tense, and tone throughout the resume.
            5.  **Overall Narrative:** Comment on the overall story the resume tells. Does it clearly position the candidate for a specific type of role? If not, suggest how the summary and experience can be better aligned.
            Provide at least 5-10 detailed suggestions.

            Resume Text:
            ---
            ${resumeText}
            ---
        `;
    }

    // Basic prompt
    return `
        ${basePrompt}
        Resume Text:
        ---
        ${resumeText}
        ---
    `;
}


export const getResumeFeedback = async (resumeText: string, analysisType: 'basic' | 'in-depth'): Promise<ResumeFeedback> => {
    if (!API_KEY) {
      throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: getPrompt(resumeText, analysisType),
            config: {
                responseMimeType: "application/json",
                responseSchema: resumeFeedbackSchema,
                temperature: analysisType === 'in-depth' ? 0.7 : 0.5,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText) as ResumeFeedback;

        // Basic validation
        if (!parsedResponse.overallScore || !parsedResponse.suggestions) {
            throw new Error("Invalid response structure from API.");
        }
        
        return parsedResponse;

    } catch (error) {
        console.error("Error fetching resume feedback from Gemini API:", error);
        throw new Error("Failed to get feedback from AI. Please check your API key and try again.");
    }
};