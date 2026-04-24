import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo',
});

const DB_DIR = join(process.cwd(), 'data');
const DB_PATH = join(DB_DIR, 'db.json');

function ensureDir() {
  if (!existsSync(DB_DIR)) {
    mkdirSync(DB_DIR, { recursive: true });
  }
}

function loadConcepts(): any[] {
  ensureDir();
  if (!existsSync(DB_PATH)) return [];
  const db = JSON.parse(readFileSync(DB_PATH, 'utf-8'));
  return db.concepts || [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { highlightedText, context, surroundingText } = body;
    
    const concepts = loadConcepts();
    
    const matchedConcept = concepts.find((c: any) => 
      c.name.toLowerCase() === highlightedText.toLowerCase() ||
      c.name.toLowerCase().includes(highlightedText.toLowerCase()) ||
      highlightedText.toLowerCase().includes(c.name.toLowerCase())
    );
    
    if (matchedConcept) {
      return NextResponse.json({
        summary: matchedConcept.definition,
        concept_node: matchedConcept.name,
        prerequisites: matchedConcept.prerequisites,
        expandable: matchedConcept.prerequisites?.length > 0,
        deep_explanation: matchedConcept.definition
      });
    }
    
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `Given highlighted text and context, provide a clear explanation. Output JSON: {"summary": "one sentence", "deep_explanation": "2-3 sentences", "prerequisites": ["concept names"], "concept_node": "concept name"}` 
          },
          { 
            role: 'user', 
            content: `Highlighted: "${highlightedText}"\nContext: ${context || 'Uploaded document'}\n Surrounding: ${surroundingText?.slice(0, 500) || 'N/A'}` 
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 1000,
      });
      
      const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
      return NextResponse.json({
        ...result,
        expandable: result.prerequisites?.length > 0
      });
    } catch (e) {
      return NextResponse.json({
        summary: `Concept: ${highlightedText}`,
        deep_explanation: `This relates to understanding ${highlightedText} within the context of ${context || 'the material'}.`,
        concept_node: highlightedText,
        prerequisites: [],
        expandable: false
      });
    }
  } catch (error) {
    console.error('Explain error:', error);
    return NextResponse.json({ error: 'Failed to explain' }, { status: 500 });
  }
}