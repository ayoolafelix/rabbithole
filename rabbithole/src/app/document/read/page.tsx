'use client';

import { DocumentCanvas } from '@/components/canvas/DocumentCanvas';
import styles from './page.module.css';

export default function DocumentPage() {
  return (
    <div className={styles.container}>
      <DocumentCanvas />
    </div>
  );
}