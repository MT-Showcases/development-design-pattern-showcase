/**
 * COMPONENT TYPE: Client Component
 * SECTION: App Configuration
 *
 * ROLE:
 * - Client-side wrapper for layout content
 * - Enable modal link interception globally
 *
 * PATTERNS USED:
 * - Wrapper Pattern
 * - Hook Pattern
 *
 * NOTES FOR CONTRIBUTORS:
 * - This wraps layout children to use client-side hooks
 * - useModalLinkInterceptor runs on every page
 */

'use client';

import { useModalLinkInterceptor } from '@/components/PatternModal/useModalLinkInterceptor';
import { ReactNode } from 'react';

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  // Intercept links when inside iframe
  useModalLinkInterceptor();

  return <>{children}</>;
}
