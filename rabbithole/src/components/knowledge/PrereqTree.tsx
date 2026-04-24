'use client';

import styles from './PrereqTree.module.css';

interface TreeNode {
  name: string;
  level: number;
  status: 'unknown' | 'prereq' | 'known';
}

const treeData: TreeNode[] = [
  { name: 'Backpropagation', level: 0, status: 'unknown' },
  { name: 'Chain Rule', level: 1, status: 'prereq' },
  { name: 'Partial Derivatives', level: 2, status: 'prereq' },
  { name: 'Differentiation', level: 3, status: 'known' },
  { name: 'Gradient Descent', level: 1, status: 'prereq' },
  { name: 'Loss Functions', level: 2, status: 'prereq' },
  { name: 'Linear Algebra', level: 2, status: 'known' },
  { name: 'Matrix Multiplication', level: 1, status: 'known' },
];

export function PrereqTree() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.icon}>🕳</span>
          Prerequisite Tree
        </div>
        <button className={styles.collapseBtn}>Collapse</button>
      </div>
      
      <div className={styles.treeBody}>
        {treeData.map((node, idx) => (
          <div key={idx} className={`${styles.node} ${styles[`level${node.level}`]}`}>
            <div className={`${styles.nodeDot} ${styles[node.status]}`}></div>
            <span className={styles.nodeName}>
              {node.name}
              {node.status === 'known' && ' ✓'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}