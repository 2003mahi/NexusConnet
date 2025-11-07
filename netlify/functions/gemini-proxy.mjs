// netlify/functions/gemini-proxy.mjs
import { GoogleGenAI, Type } from "@google/genai";

// Schema definitions moved from the client to the secure serverless function.
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

// Prompt generation logic also moved to the serverless function.
const getPrompt = (resumeText, analysisType) => {
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
};


// The main handler for the Netlify Function.
export const handler = async (event) => {
  // Only allow POST requests.
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // Securely access the API key from Netlify's environment variables.
  const { API_KEY } = process.env;
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key is not configured on the server.' }) };
  }
  
  try {
    const { resumeText, analysisType } = JSON.parse(event.body);
    if (!resumeText || !analysisType) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing resumeText or analysisType in request body.' }) };
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: getPrompt(resumeText, analysisType),
        config: {
            responseMimeType: "application/json",
            responseSchema: resumeFeedbackSchema,
            temperature: analysisType === 'in-depth' ? 0.7 : 0.5,
        },
    });
    
    // The Gemini API returns a JSON string in the text property when a schema is used.
    const jsonText = response.text.trim();
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: jsonText,
    };
  } catch (error) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An internal error occurred while analyzing the resume.' }),
    };
  }
};
