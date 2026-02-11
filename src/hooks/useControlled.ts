import { useCallback, useRef, useState } from 'react';

/**
 * Hook to support controlled / uncontrolled component patterns.
 * Mirrors the pattern used internally by MUI.
 *
 * @param controlled - The controlled value (or undefined if uncontrolled)
 * @param defaultValue - The default value for uncontrolled mode
 * @returns [value, setValue] — current value and updater (no-op if controlled)
 */
export function useControlled<T>(
  controlled: T | undefined,
  defaultValue: T,
): [T, (newValue: T) => void] {
  const { current: isControlled } = useRef(controlled !== undefined);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = isControlled ? (controlled as T) : internalValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
    },
    [isControlled],
  );

  return [value, setValue];
}
