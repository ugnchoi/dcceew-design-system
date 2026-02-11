/**
 * Shared types used across the design system.
 */

/** Common interactive states for components */
export interface InteractiveState {
  /** Whether the component is in a loading state */
  loading?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Utility type to make specific props required.
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type to override specific props in a type.
 */
export type OverrideProps<T, U> = Omit<T, keyof U> & U;
