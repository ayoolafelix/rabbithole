'use client';

import { useAppStore } from '@/store';
import { PrereqTree } from '@/components/knowledge/PrereqTree';
import styles from './RightPanel.module.css';

export function RightPanel() {
  const { ui } = useAppStore();
  const { rightPanelOpen } = ui;

  if (!rightPanelOpen) return null;

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Settings</div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Model</div>
          <div className={styles.sectionValue}>Claude Sonnet</div>
        </div>
        
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Context Window</div>
          <div className={styles.contextBar}>
            <div className={styles.contextFill} style={{ width: '65%' }}></div>
          </div>
          <div className={styles.contextLabel}>65% used (98K / 150K)</div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Features</div>
          <div className={styles.toggleRow}>
            <span>Auto-detect concepts</span>
            <button className={styles.toggle}></button>
          </div>
          <div className={styles.toggleRow}>
            <span>Prereq alerts</span>
            <button className={`${styles.toggle} ${styles.off}`}></button>
          </div>
          <div className={styles.toggleRow}>
            <span>Video sync</span>
            <button className={`${styles.toggle} ${styles.off}`}></button>
          </div>
          <div className={styles.toggleRow}>
            <span>Graph auto-layout</span>
            <button className={styles.toggle}></button>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Sources</div>
          <div className={styles.sourceItem}>
            <span className={styles.sourceIcon}>📄</span>
            <span className={styles.sourceName}>backpropagation.pdf</span>
            <span className={styles.sourceMeta}>PDF • 2.4MB</span>
          </div>
        </div>

        <div className={styles.divider}></div>
        
        <PrereqTree />
      </div>
    </aside>
  );
}