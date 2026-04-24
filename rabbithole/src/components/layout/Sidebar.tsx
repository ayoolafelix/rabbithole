'use client';

import { useAppStore } from '@/store';
import styles from './Sidebar.module.css';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

const navItems: { section: string; items: NavItem[] }[] = [
  {
    section: 'Main',
    items: [
      { id: 'library', label: 'Library', icon: '📚' },
      { id: 'explore', label: 'Explore', icon: '🔍' },
      { id: 'graph', label: 'Graph', icon: '🕸' },
      { id: 'videos', label: 'Videos', icon: '📹', badge: 3 },
    ],
  },
  {
    section: 'Progress',
    items: [
      { id: 'mastered', label: 'Mastered', icon: '⚡', badge: 42 },
      { id: 'gaps', label: 'Gaps', icon: '🕳', badge: 8 },
    ],
  },
];

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const activeItem = 'library';

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <nav className={styles.nav}>
        {navItems.map((section) => (
          <div key={section.section} className={styles.section}>
            {!collapsed && (
              <div className={styles.sectionHeader}>{section.section}</div>
            )}
            {section.items.map((item) => (
              <button
                key={item.id}
                className={`${styles.navItem} ${activeItem === item.id ? styles.active : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className={styles.badge}>{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}