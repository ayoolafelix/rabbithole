import { create } from 'zustand';
import type { Document, DocumentState, UIState, ViewMode } from '@/types';

interface AppStore {
  // UI State
  ui: UIState;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleRightPanel: () => void;
  setRightPanelOpen: (open: boolean) => void;
  setActiveView: (view: ViewMode) => void;
  
  // Document State
  documents: Document[];
  activeDocumentId: string | null;
  activeConceptId: string | null;
  setDocuments: (docs: Document[]) => void;
  setActiveDocument: (id: string | null) => void;
  setActiveConcept: (id: string | null) => void;
  
  // Mastery tracking
  masteredConcepts: Set<string>;
  markConceptAsKnown: (conceptId: string) => void;
  isConceptMastered: (conceptId: string) => boolean;
  
  // Onboarding
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  
  // Breadcrumb
  breadcrumb: string[];
  setBreadcrumb: (paths: string[]) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // UI State
  ui: {
    sidebarCollapsed: false,
    rightPanelOpen: true,
    activeView: 'read',
  },
  toggleSidebar: () => set((state) => ({ 
    ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed } 
  })),
  setSidebarCollapsed: (collapsed) => set((state) => ({ 
    ui: { ...state.ui, sidebarCollapsed: collapsed } 
  })),
  toggleRightPanel: () => set((state) => ({ 
    ui: { ...state.ui, rightPanelOpen: !state.ui.rightPanelOpen } 
  })),
  setRightPanelOpen: (open) => set((state) => ({ 
    ui: { ...state.ui, rightPanelOpen: open } 
  })),
  setActiveView: (view) => set((state) => ({ 
    ui: { ...state.ui, activeView: view } 
  })),
  
  // Document State
  documents: [],
  activeDocumentId: null,
  activeConceptId: null,
  setDocuments: (docs) => set({ documents: docs }),
  setActiveDocument: (id) => set({ activeDocumentId: id }),
  setActiveConcept: (id) => set({ activeConceptId: id }),
  
  // Mastery
  masteredConcepts: new Set<string>(),
  markConceptAsKnown: (conceptId) => set((state) => {
    const newMastered = new Set(state.masteredConcepts);
    newMastered.add(conceptId);
    return { masteredConcepts: newMastered };
  }),
  isConceptMastered: (conceptId) => get().masteredConcepts.has(conceptId),
  
  // Onboarding
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  // Breadcrumb
  breadcrumb: ['Library'],
  setBreadcrumb: (paths) => set({ breadcrumb: paths }),
}));