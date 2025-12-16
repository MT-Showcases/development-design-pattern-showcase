/**
 * COMPONENT TYPE: Client Component Hook
 * SECTION: Modal System
 *
 * ROLE:
 * - Intercept all link clicks when page is inside PatternModal iframe
 * - Send navigation requests to parent window via postMessage
 * - Prevent default navigation to keep user in modal
 *
 * PATTERNS USED:
 * - Observer Pattern (event listeners)
 * - Command Pattern (postMessage communication)
 *
 * NOTES FOR CONTRIBUTORS:
 * - Only runs when page is loaded in iframe (window.parent !== window)
 * - Intercepts clicks on <a> tags and pattern Tags
 * - Use this in layout.tsx to enable global link interception
 */

'use client';

import { useEffect } from 'react';

export function useModalLinkInterceptor() {
  useEffect(() => {
    // Only run if we're inside an iframe
    const isInIframe = window.self !== window.parent;
    if (!isInIframe) return;

    // PATTERN: Observer - Intercept all link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find closest <a> tag (handles clicks on children of <a>)
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Prevent default navigation
      e.preventDefault();
      e.stopPropagation();

      // Determine if link is internal or external
      let fullUrl = href;
      
      // Handle relative URLs
      if (href.startsWith('/')) {
        fullUrl = href; // Keep as-is for internal navigation
      } else if (!href.startsWith('http')) {
        // Relative path - construct full URL
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        fullUrl = `${basePath}/${href}`;
      }

      // Send navigation request to parent window
      window.parent.postMessage(
        {
          type: 'NAVIGATE_IN_MODAL',
          url: fullUrl,
        },
        window.location.origin
      );
    };

    // Attach listener to document (event delegation)
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);
}
