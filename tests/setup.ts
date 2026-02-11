/**
 * Vitest global setup for unit tests.
 *
 * - Adds @testing-library/jest-dom matchers (toBeInTheDocument, etc.)
 * - Ensures RTL auto-cleanup between tests
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
