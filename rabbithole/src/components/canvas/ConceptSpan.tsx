'use client';

import type { ConceptState } from '@/types';
import styles from './ConceptSpan.module.css';

interface ConceptData {
  name: string;
  type: ConceptState;
  prereqs: string[];
}

interface ConceptSpanProps {
  children: React.ReactNode;
  concept: ConceptData;
  isMastered: boolean;
  onHover: (concept: ConceptData) => void;
  onLeave: () => void;
}

export function ConceptSpan({ children, concept, isMastered, onHover, onLeave }: ConceptSpanProps) {
  const state = isMastered ? 'known' : concept.type;
  
  return (
    <span 
      className={`${styles.concept} ${styles[state]}`}
      onMouseEnter={() => onHover(concept)}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}