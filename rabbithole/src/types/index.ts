export type ConceptState = 'unknown' | 'prereq' | 'known' | 'active';

export interface Concept {
  id: string;
  name: string;
  slug: string;
  quickExplanation: string;
  deepExplanation: string;
  whyNeeded?: string;
  prerequisites: string[];
  dependents: string[];
  mastered: boolean;
  depthFromRoot: number;
  tags: string[];
  sourceDocuments: string[];
}

export interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'text' | 'video' | 'web';
  sourceUrl?: string;
  rawContent: string;
  concepts: Concept[];
  conceptMap: ConceptEdge[];
  masteryPercent: number;
  createdAt: string;
  lastOpenedAt: string;
}

export interface ConceptEdge {
  from: string;
  to: string;
  type: 'requires' | 'explains' | 'simplifies' | 'related_to';
  weight: number;
}

export interface ConceptHighlight {
  conceptId: string;
  startOffset: number;
  endOffset: number;
  nodeText: string;
  state: ConceptState;
}

export type ViewMode = 'read' | 'graph' | 'video';
export type ContentCategory = 'textbook' | 'video' | 'notes' | 'web';

export interface UIState {
  sidebarCollapsed: boolean;
  rightPanelOpen: boolean;
  activeView: ViewMode;
}

export interface DocumentState {
  documents: Document[];
  activeDocumentId: string | null;
  activeConceptId: string | null;
}

export interface ConceptMastery {
  conceptId: string;
  mastered: boolean;
  lastReviewed: string;
}