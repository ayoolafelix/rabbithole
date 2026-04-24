'use client';

import { AppShell } from '@/components/layout/AppShell';

export default function Home() {
  return (
    <AppShell>
      <div style={{ textAlign: 'center', padding: '64px 0' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '28px', 
          fontWeight: 400,
          color: 'var(--text-primary)',
          marginBottom: '16px'
        }}>
          Welcome to RabbitHole
        </h1>
        <p style={{ 
          fontFamily: 'var(--font-body)', 
          fontSize: '15px',
          color: 'var(--text-secondary)',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          Transform books, videos, and articles into explorable knowledge. Every concept becomes a doorway to deeper understanding.
        </p>
      </div>
    </AppShell>
  );
}