'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/store';
import { ConceptSpan } from '@/components/canvas/ConceptSpan';
import styles from './DocumentCanvas.module.css';

const sampleContent = `Backpropagation is the foundational algorithm for training deep neural networks. It works by calculating how much each weight in the network contributed to the final error, using the chain rule of calculus. This allows us to efficiently update every weight in a multilayer network in a single backward pass.

The chain rule is essential for computing gradients in complex models. It states that the derivative of a composite function is the product of the derivatives of the inner and outer functions.

Gradient descent is then used to actually update the weights based on these calculated gradients. The learning rate determines how big a step we take in the direction that reduces the error.

A loss function measures the difference between the predicted output and the actual target. Common loss functions include mean squared error for regression and cross-entropy for classification.`;

const concepts = [
  { name: 'backpropagation', type: 'unknown' as const, prereqs: ['chain rule', 'gradient descent', 'partial derivatives'] },
  { name: 'chain rule', type: 'prereq' as const, prereqs: ['calculus'] },
  { name: 'gradient descent', type: 'prereq' as const, prereqs: ['loss functions', 'linear algebra'] },
  { name: 'loss function', type: 'prereq' as const, prereqs: [] },
  { name: 'multilayer network', type: 'known' as const, prereqs: [] },
];

interface ConceptData {
  name: string;
  type: 'unknown' | 'prereq' | 'known' | 'active';
  prereqs: string[];
}

export function DocumentCanvas() {
  const [activeConcept, setActiveConcept] = useState<ConceptData | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isConceptMastered } = useAppStore();

  const handleConceptHover = (concept: ConceptData) => {
    setActiveConcept(concept);
  };

  const handleConceptLeave = () => {
    setActiveConcept(null);
  };

  const renderContent = () => {
    const words = sampleContent.split(' ');
    return words.map((word, idx) => {
      const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
      const concept = concepts.find(c => c.name === cleanWord);
      
      if (concept) {
        return (
          <ConceptSpan
            key={idx}
            concept={concept}
            isMastered={isConceptMastered(concept.name)}
            onHover={handleConceptHover}
            onLeave={handleConceptLeave}
          >
            {word}
          </ConceptSpan>
        );
      }
      return <span key={idx}> {word}</span>;
    });
  };

  return (
    <div className={styles.canvas} ref={contentRef}>
      <h1 className={styles.title}>Introduction to Backpropagation</h1>
      <div className={styles.body}>
        {renderContent()}
      </div>

      {activeConcept && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipArrow}></div>
          <div className={styles.tooltipHeader}>
            <span className={styles.tooltipName}>{activeConcept.name}</span>
            <span className={styles.depthBadge}>3 levels deep</span>
          </div>
          <div className={styles.tooltipBody}>
            An algorithm for efficiently computing gradients in neural networks by applying the chain rule.
          </div>
          {activeConcept.prereqs.length > 0 && (
            <div className={styles.prereqChips}>
              {activeConcept.prereqs.map(prereq => (
                <span key={prereq} className={styles.prereqChip}>→ {prereq}</span>
              ))}
            </div>
          )}
          <div className={styles.tooltipActions}>
            <button className={styles.expandBtn}>Expand concept</button>
            <button className={styles.skipBtn}>Skip</button>
          </div>
        </div>
      )}
    </div>
  );
}