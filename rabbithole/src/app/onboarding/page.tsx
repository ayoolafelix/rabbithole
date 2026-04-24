'use client';

import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';

const categories = [
  { id: 'textbook', label: 'Textbooks & PDFs', icon: '📚', description: 'Upload PDFs, documents, or paste text' },
  { id: 'video', label: 'Video Lectures', icon: '🎬', description: 'YouTube or video transcripts' },
  { id: 'notes', label: 'Notes & Articles', icon: '📝', description: 'Your notes or web articles' },
  { id: 'web', label: 'Web Links', icon: '🌐', description: 'Extract from any URL' },
];

export default function Onboarding() {
  const router = useRouter();
  const { selectedCategory, setSelectedCategory } = useAppStore();

  const handleSelect = (id: string) => {
    setSelectedCategory(id);
  };

  const handleProceed = () => {
    if (selectedCategory) {
      router.push('/upload');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-void)', padding: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '460px', width: '100%' }}>
        <div style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '36px', 
          fontWeight: 600, 
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <span style={{ width: '10px', height: '10px', background: 'var(--amber-500)', borderRadius: '50%' }}></span>
          RabbitHole
        </div>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '40px', textAlign: 'center' }}>
          What will you explore today?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', width: '100%', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              style={{
                background: selectedCategory === cat.id ? 'rgba(245,158,11,0.04)' : 'var(--bg-elevated)',
                border: `1px solid ${selectedCategory === cat.id ? 'var(--amber-500)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                position: 'relative'
              }}
            >
              {selectedCategory === cat.id && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '20px',
                  height: '20px',
                  background: 'var(--amber-500)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--bg-void)'
                }}>✓</div>
              )}
              <div style={{ fontSize: '22px', marginBottom: '16px' }}>{cat.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{cat.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{cat.description}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleProceed}
          disabled={!selectedCategory}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: selectedCategory ? 'var(--amber-500)' : 'var(--bg-surface)',
            color: selectedCategory ? 'var(--bg-void)' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: selectedCategory ? 'pointer' : 'not-allowed',
            opacity: selectedCategory ? 1 : 0.4,
            transition: 'all 120ms'
          }}
        >
          <span>Continue</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}