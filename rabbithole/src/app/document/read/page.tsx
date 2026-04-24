'use client';

import { useState, useEffect, useRef } from 'react';

interface Concept {
  name: string;
  definition: string;
  prerequisites: string[];
}

const sampleContent = `Backpropagation is the foundational algorithm for training deep neural networks. It works by calculating how much each weight in the network contributed to the final error, using the chain rule of calculus. This allows us to efficiently update every weight in a multilayer network in a single backward pass.

The chain rule is essential for computing gradients in complex models. It states that the derivative of a composite function is the product of the derivatives of the inner and outer functions.

Gradient descent is then used to actually update the weights based on these calculated gradients. The learning rate determines how big a step we take in the direction that reduces the error.

A loss function measures the difference between the predicted output and the actual target. Common loss functions include mean squared error for regression and cross-entropy for classification.`;

const sampleConcepts: Concept[] = [
  { name: 'backpropagation', definition: 'Algorithm for computing gradients in neural networks by applying the chain rule from output to input layers.', prerequisites: ['chain rule', 'gradient descent', 'partial derivatives'] },
  { name: 'chain rule', definition: 'The derivative of a composite function is the product of the derivatives of its component functions.', prerequisites: ['calculus'] },
  { name: 'gradient descent', definition: 'An optimization algorithm that minimizes a function by moving in the direction of steepest descent.', prerequisites: ['derivatives', 'learning rate'] },
  { name: 'loss function', definition: 'A function that measures the difference between predicted and actual values.', prerequisites: ['mean squared error', 'cross-entropy'] },
];

export default function DocumentPage() {
  const [concepts, setConcepts] = useState<Concept[]>(sampleConcepts);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTextSelect = async () => {
    const sel = window.getSelection()?.toString().trim();
    if (!sel || sel.length < 3) return;
    
    setSelection(sel);
    setLoading(true);
    
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          highlightedText: sel,
          context: 'Neural Networks',
          surroundingText: sampleContent
        })
      });
      
      const data = await res.json();
      setExplanation(data);
    } catch (e) {
      // Use local concept match
      const match = concepts.find(c => 
        c.name.toLowerCase() === sel.toLowerCase() ||
        sel.toLowerCase().includes(c.name.toLowerCase())
      );
      
      if (match) {
        setExplanation({
          summary: match.definition,
          deep_explanation: match.definition,
          prerequisites: match.prerequisites,
          expandable: match.prerequisites.length > 0
        });
      } else {
        setExplanation({
          summary: `Concept: ${sel}`,
          deep_explanation: `This relates to understanding ${sel} within the context of neural networks and deep learning.`,
          prerequisites: [],
          expandable: false
        });
      }
    }
    
    setLoading(false);
  };

  const handleExpand = async (concept: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/expand?concept=${encodeURIComponent(concept)}&depth=3`);
      const data = await res.json();
      setExplanation({
        summary: data.definition,
        deep_explanation: JSON.stringify(data, null, 2),
        expandable: false,
        tree: data
      });
    } catch (e) {
      console.error('Expand error:', e);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '16px'
      }}>
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px 40px'
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '26px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            marginBottom: '20px'
          }}>
            Introduction to Backpropagation
          </h1>
          
          <div 
            ref={contentRef}
            onMouseUp={handleTextSelect}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.85,
              color: 'var(--text-secondary)',
              cursor: 'text',
              userSelect: 'text'
            }}
          >
            {sampleContent.split(' ').map((word, idx) => {
              const clean = word.replace(/[.,]/g, '').toLowerCase();
              const concept = concepts.find(c => c.name === clean);
              const isConcept = !!concept;
              
              return (
                <span
                  key={idx}
                  style={{
                    color: isConcept ? 'var(--amber-400)' : undefined,
                    background: isConcept ? 'rgba(245,158,11,0.08)' : undefined,
                    padding: isConcept ? '1px 2px' : undefined,
                    borderRadius: '3px',
                    cursor: isConcept ? 'pointer' : undefined,
                    borderBottom: isConcept ? '1px dashed rgba(245,158,11,0.4)' : undefined
                  }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </div>
          
          {selection && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: 'var(--amber-400)'
            }}>
              Selected: "{selection}"
            </div>
          )}
        </div>
        
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          height: 'fit-content'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}>
            Explanation
          </div>
          
          {loading ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Loading...</div>
          ) : explanation ? (
            <>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                {explanation.concept_node || selection || 'Concept'}
              </div>
              
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                marginBottom: '16px'
              }}>
                {explanation.summary}
              </div>
              
              {explanation.deep_explanation && (
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                  fontStyle: 'italic'
                }}>
                  {explanation.deep_explanation}
                </div>
              )}
              
              {explanation.prerequisites?.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '8px'
                  }}>
                    Prerequisites
                  </div>
                  {explanation.prerequisites.map((prereq: string) => (
                    <button
                      key={prereq}
                      onClick={() => handleExpand(prereq)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px',
                        marginBottom: '4px',
                        background: 'rgba(139,92,246,0.08)',
                        border: '1px solid rgba(139,92,246,0.2)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--violet-400)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      → {prereq}
                    </button>
                  ))}
                </div>
              )}
              
              {explanation.expandable && (
                <button
                  onClick={() => explanation.concept_node && handleExpand(explanation.concept_node)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(139,92,246,0.15)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--violet-400)',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Expand deeper →
                </button>
              )}
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              Select text in the document to see explanation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}