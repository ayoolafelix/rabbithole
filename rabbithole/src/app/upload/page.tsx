'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type UploadState = 'idle' | 'analyzing' | 'success';

export default function UploadPage() {
  const router = useRouter();
  const [state, setState] = useState<UploadState>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setState('analyzing');
      setTimeout(() => {
        setState('success');
        router.push('/document/read');
      }, 2000);
    }
  }, [router]);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 0' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', marginBottom: '32px' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Library</span>
        <span style={{ color: 'var(--text-muted)' }}>›</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>New Document</span>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {state === 'idle' && (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              style={{
                border: `1.5px dashed ${dragActive ? 'rgba(245,158, 11, 0.4)' : 'var(--border-strong)'}`,
                borderRadius: 'var(--radius-xl)',
                padding: '48px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                background: dragActive ? 'rgba(245,158, 11, 0.03)' : 'transparent',
                transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ fontSize: '32px', color: 'var(--text-muted)' }}>📁</div>
              <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 500 }}>Drop your file here</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>or click to browse</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                {['PDF', 'TXT', 'DOCX', 'YouTube URL'].map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-muted)'
                  }}>{t}</span>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '12px' }}>
              <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}>or paste text</span>
              <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>
            
            <textarea 
              placeholder="Paste your content here..."
              style={{
                width: '100%',
                minHeight: '200px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />
          </>
        )}

        {state === 'analyzing' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '48px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-primary)' }}>{fileName}</div>
            <div style={{ width: '100%', maxWidth: '300px', height: '4px', background: 'var(--bg-elevated)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--amber-500)', borderRadius: '9999px', animation: 'progress 2s ease-out forwards' }}></div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>Analysing content...</div>
            <style>{`@keyframes progress { from { width: 0; } to { width: 100%; } }`}</style>
          </div>
        )}

        {state === 'success' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '48px' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--emerald-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white' }}>✓</div>
            <div style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>Ready!</div>
          </div>
        )}
      </div>
    </div>
  );
}