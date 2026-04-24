'use client';

interface Document {
  id: string;
  title: string;
  type: string;
  conceptCount: number;
  masteryPercent: number;
  lastOpened: string;
}

const mockDocs: Document[] = [
  { id: '1', title: 'Neural Networks & Deep Learning', type: 'PDF', conceptCount: 34, masteryPercent: 42, lastOpened: '2 days ago' },
  { id: '2', title: 'Backpropagation Explained', type: 'Video', conceptCount: 18, masteryPercent: 78, lastOpened: '1 week ago' },
  { id: '3', title: 'Gradient Descent Optimizers', type: 'Web', conceptCount: 12, masteryPercent: 25, lastOpened: '3 days ago' },
];

export default function LibraryPage() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 0' }}>
      <h1 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '28px', 
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: '32px'
      }}>
        Library
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px' 
      }}>
        {mockDocs.map((doc) => (
          <div key={doc.id} style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            cursor: 'pointer',
            transition: 'border-color 200ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                padding: '3px 8px',
                borderRadius: '9999px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-muted)'
              }}>{doc.type}</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--text-primary)',
              marginBottom: '12px',
              lineHeight: 1.3
            }}>{doc.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <span>{doc.conceptCount} concepts</span>
              <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${doc.masteryPercent}%`, background: 'linear-gradient(90deg, var(--emerald-600), var(--emerald-400))', borderRadius: '9999px' }}></div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--emerald-400)' }}>{doc.masteryPercent}% mastered</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{doc.lastOpened}</span>
          </div>
        ))}
      </div>
    </div>
  );
}