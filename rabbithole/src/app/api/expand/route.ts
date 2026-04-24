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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const concept = searchParams.get('concept');
  const maxDepth = parseInt(searchParams.get('depth') || '3');
  
  if (!concept) {
    return NextResponse.json({ error: 'concept required' }, { status: 400 });
  }
  
  const concepts = loadConcepts();
  const result = await expandConcept(concept, concepts, maxDepth, 0);
  
  return NextResponse.json(result);
}

async function expandConcept(conceptName: string, allConcepts: any[], maxDepth: number, currentDepth: number): Promise<any> {
  const concept = allConcepts.find((c: any) => 
    c.name.toLowerCase() === conceptName.toLowerCase()
  );
  
  let definition = concept?.definition;
  let prerequisites = concept?.prerequisites || [];
  
  if (!definition && currentDepth < maxDepth) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `For concept "${conceptName}", list its prerequisites. Return JSON: {"prerequisites": ["concept1"], "definition": "brief definition"}`
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 500,
      });
      
      const llmResult = JSON.parse(completion.choices[0]?.message?.content || '{}');
      definition = definition || llmResult.definition;
      prerequisites = prerequisites.length ? prerequisites : (llmResult.prerequisites || []);
    } catch (e) {
      console.error('Expand LLM error:', e);
    }
  }
  
  definition = definition || `A concept related to ${conceptName}`;
  
  const result: any = {
    concept: conceptName,
    definition,
    requires: {}
  };
  
  if (currentDepth < maxDepth && prerequisites.length) {
    for (const prereq of prerequisites.slice(0, 3)) {
      result.requires[prereq] = await expandConcept(prereq, allConcepts, maxDepth, currentDepth + 1);
    }
  }
  
  return result;
}