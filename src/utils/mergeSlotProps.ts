/**
 * Merge two sets of slot props, combining className and style,
 * and chaining event handlers.
 */
export function mergeSlotProps<T extends Record<string, unknown>>(
  defaultProps: T,
  overrideProps?: Partial<T>,
): T {
  if (!overrideProps) return defaultProps;

  const merged = { ...defaultProps, ...overrideProps } as T;

  // Merge className strings
  if ('className' in defaultProps && 'className' in overrideProps) {
    (merged as Record<string, unknown>).className =
      `${defaultProps.className ?? ''} ${overrideProps.className ?? ''}`.trim();
  }

  // Merge style objects
  if ('style' in defaultProps && 'style' in overrideProps) {
    (merged as Record<string, unknown>).style = {
      ...(defaultProps.style as Record<string, unknown>),
      ...(overrideProps.style as Record<string, unknown>),
    };
  }

  return merged;
}
