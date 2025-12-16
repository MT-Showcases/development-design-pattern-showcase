/**
 * COMPONENT TYPE: Container
 * SECTION: UI Components
 *
 * ROLE:
 * - Global modal system for ALL navigation (internal + external links)
 * - Intercept links and open in modal instead of navigating away
 * - Handle iframe navigation via postMessage communication
 *
 * PATTERNS USED:
 * - Context API (PatternModalProvider + usePatternModal hook)
 * - Observer Pattern (postMessage for iframe ↔ parent communication)
 * - Ant Design Modal component
 *
 * NOTES FOR CONTRIBUTORS:
 * - Modal intercepts ALL links via usePatternModal hook
 * - Links inside iframe send postMessage to update same iframe URL
 * - Use openModalWithUrl() for any URL (internal or external)
 * - Use openModal() for pattern theory pages specifically
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Modal } from 'antd';
import './PatternModal.scss';

// PATTERN: Context API for global state
// PURPOSE: Allow any component to open modal and navigate without prop drilling

interface PatternModalContextType {
  openModal: (category: string, patternId: string) => void;
  openModalWithUrl: (url: string) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const PatternModalContext = createContext<PatternModalContextType | undefined>(undefined);

export const usePatternModal = () => {
  const context = useContext(PatternModalContext);
  if (!context) {
    throw new Error('usePatternModal must be used within PatternModalProvider');
  }
  return context;
};

interface PatternModalProviderProps {
  children: ReactNode;
}

export const PatternModalProvider: React.FC<PatternModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // PATTERN: Observer - Listen for navigation requests from iframe
  // PURPOSE: Update iframe URL when links are clicked inside it
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: verify origin (only accept from same domain)
      if (event.origin !== window.location.origin) return;
      
      // Handle navigation request from iframe
      if (event.data.type === 'NAVIGATE_IN_MODAL') {
        setCurrentUrl(event.data.url);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const openModal = (category: string, patternId: string) => {
    setCurrentUrl(`/theory/${category}/${patternId}`);
    setIsOpen(true);
  };

  const openModalWithUrl = (url: string) => {
    setCurrentUrl(url);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Clear URL after animation completes
    setTimeout(() => setCurrentUrl(''), 300);
  };

  // PATTERN: Composition
  // PURPOSE: Render children + modal overlay
  return (
    <PatternModalContext.Provider value={{ openModal, openModalWithUrl, closeModal, isOpen }}>
      {children}
      
      <Modal
        open={isOpen}
        onCancel={closeModal}
        footer={null}
        title={"\u200B"}
        width="95vw"
        style={{ top: 10, maxWidth: '1600px' }}
        className="pattern-modal"
        destroyOnHidden
      >
        {currentUrl && (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className="pattern-modal__iframe"
            title="Content Viewer"
          />
        )}
      </Modal>
    </PatternModalContext.Provider>
  );
};
