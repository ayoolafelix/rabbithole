'use client';

import Link from 'next/link';
import { useAppStore } from '@/store';
import styles from './TopBar.module.css';

export function TopBar() {
  const { ui, toggleSidebar, setActiveView, breadcrumb } = useAppStore();
  const { activeView } = ui;

  const handleViewChange = (view: 'read' | 'graph' | 'video') => {
    setActiveView(view);
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.logoContainer}>
        <button className={styles.collapseBtn} onClick={toggleSidebar} aria-label="Toggle sidebar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDot}></span>
          RH
        </Link>
      </div>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        {breadcrumb.map((segment, index) => (
          <span key={index} className={styles.breadcrumbItem}>
            {index > 0 && <span className={styles.separator}>›</span>}
            <span className={`${styles.segment} ${index === breadcrumb.length - 1 ? styles.active : ''}`}>
              {segment}
            </span>
          </span>
        ))}
      </nav>

      <div className={styles.actions}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${activeView === 'read' ? styles.active : ''}`}
            onClick={() => handleViewChange('read')}
          >
            Read
          </button>
          <button
            className={`${styles.viewBtn} ${activeView === 'graph' ? styles.active : ''}`}
            onClick={() => handleViewChange('graph')}
          >
            Graph
          </button>
          <button
            className={`${styles.viewBtn} ${activeView === 'video' ? styles.active : ''}`}
            onClick={() => handleViewChange('video')}
          >
            Video
          </button>
        </div>
        <div className={styles.avatar}>FO</div>
      </div>
    </header>
  );
}