import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo',
});

const SYSTEM_PROMPT = `You are a knowledge extraction engine. Extract key teachable concepts with definitions and prerequisites. Output ONLY valid JSON:
{"concepts": [{"name": "string", "definition": "1-2 sentence explanation", "prerequisites": ["prerequisite concept names"], "context": "subject area"}]}`;

function fallbackExtraction(text: string): any[] {
  const words = text.split(/\s+/);
  const potentialConcepts = words
    .filter(w => w.length > 6 && /^[A-Z]/.test(w))
    .slice(0, 10);
  
  return potentialConcepts.map(name => ({
    name,
    definition: `Found in text: ${name}`,
    prerequisites: [],
    context: 'Extracted from content'
  }));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, context } = body;
    
    if (!text || text.length < 50) {
      return NextResponse.json({ error: 'Text too short' }, { status: 400 });
    }
    
    const chunks = text.length > 8000 
      ? text.match(/.{1,8000}/g) || [text]
      : [text];
    
    const allConcepts: any[] = [];
    
    for (const chunk of chunks) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Context: ${context || 'General knowledge'}\n\nText: ${chunk.slice(0, 8000)}` }
          ],
          response_format: { type: 'json_object' },
          max_tokens: 4000,
        });
        
        const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
        if (result.concepts) {
          allConcepts.push(...result.concepts);
        }
      } catch (e) {
        console.error('OpenAI error:', e);
      }
    }
    
    const seen = new Set<string>();
    const unique = allConcepts.filter(c => {
      if (seen.has(c.name.toLowerCase())) return false;
      seen.add(c.name.toLowerCase());
      return true;
    });
    
    return NextResponse.json({ concepts: unique });
  } catch (error: any) {
    console.error('Extraction error:', error);
    return NextResponse.json({ 
      error: 'Extraction failed',
      concepts: []
    }, { status: 200 });
  }
}