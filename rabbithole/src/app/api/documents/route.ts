import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const DB_DIR = join(process.cwd(), 'data');
const DB_PATH = join(DB_DIR, 'db.json');

function ensureDir() {
  if (!existsSync(DB_DIR)) {
    mkdirSync(DB_DIR, { recursive: true });
  }
}

interface Concept {
  id: string;
  name: string;
  definition: string;
  prerequisites: string[];
  context?: string;
}

interface Document {
  id: string;
  title: string;
  type: string;
  sourceUrl?: string;
  content: string;
  concepts: string[];
  createdAt: string;
}

interface DB {
  documents: Document[];
  concepts: Concept[];
  userState: {
    mastered: string[];
  };
}

function loadDB(): DB {
  ensureDir();
  if (!existsSync(DB_PATH)) {
    return { documents: [], concepts: [], userState: { mastered: [] } };
  }
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
}

function saveDB(db: DB): void {
  ensureDir();
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// GET /api/documents - List all
export async function GET() {
  const db = loadDB();
  return NextResponse.json(db);
}

// POST /api/documents - Create new
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, content, title, sourceUrl } = body;
  
  const db = loadDB();
  
  const newDoc: Document = {
    id: Date.now().toString(),
    title: title || 'Untitled',
    type: type || 'text',
    sourceUrl,
    content,
    concepts: [],
    createdAt: new Date().toISOString(),
  };
  
  db.documents.push(newDoc);
  saveDB(db);
  
  return NextResponse.json({ document: newDoc });
}