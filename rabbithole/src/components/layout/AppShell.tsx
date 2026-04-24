'use client';

import { useAppStore } from '@/store';
import styles from './AppShell.module.css';
import { TopBar } from '@/components/layout/TopBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RightPanel } from '@/components/layout/RightPanel';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { ui } = useAppStore();
  const { sidebarCollapsed, rightPanelOpen } = ui;

  return (
    <div className={styles.shell}>
      <TopBar />
      <div className={styles.main}>
        <Sidebar collapsed={sidebarCollapsed} />
        <main className={styles.canvas}>
          {children}
        </main>
        {rightPanelOpen && <RightPanel />}
      </div>
    </div>
  );
}