/**
 * Defensive programming utilities to prevent common runtime errors
 * These helpers provide safe access patterns that avoid index out of bounds and null reference errors
 */

/**
 * Safely access array element by index
 * @param array - The array to access
 * @param index - The index to access
 * @param defaultValue - Default value if access fails
 * @returns The element at index or defaultValue
 */
export function safeArrayAccess<T>(
  array: unknown,
  index: number,
  defaultValue: T | null = null
): T | null {
  try {
    if (!Array.isArray(array)) {
      return defaultValue;
    }
    
    if (index < 0 || index >= array.length) {
      return defaultValue;
    }
    
    return array[index] ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely get array length
 * @param array - The array to check
 * @returns Length of array or 0 if not an array
 */
export function safeArrayLength(array: unknown): number {
  try {
    return Array.isArray(array) ? array.length : 0;
  } catch {
    return 0;
  }
}

/**
 * Safely access nested object properties
 * @param obj - The object to access
 * @param path - The property path (e.g., 'user.profile.name')
 * @param defaultValue - Default value if access fails
 * @returns The property value or defaultValue
 */
export function safeObjectAccess<T>(
  obj: unknown,
  path: string,
  defaultValue: T | null = null
): T | null {
  try {
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }
    
    const keys = path.split('.');
    let current: any = obj;
    
    for (const key of keys) {
      if (current == null || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely access localStorage
 * @param key - The key to access
 * @param defaultValue - Default value if access fails
 * @returns The stored value or defaultValue
 */
export function safeLocalStorageGet(key: string, defaultValue: string | null = null): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    return localStorage.getItem(key) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely set localStorage
 * @param key - The key to set
 * @param value - The value to set
 * @returns Success boolean
 */
export function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely remove localStorage item
 * @param key - The key to remove
 * @returns Success boolean
 */
export function safeLocalStorageRemove(key: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely parse JSON
 * @param jsonString - The JSON string to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed object or defaultValue
 */
export function safeJsonParse<T>(jsonString: string | null, defaultValue: T | null = null): T | null {
  try {
    if (!jsonString) {
      return defaultValue;
    }
    return JSON.parse(jsonString) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely access element by querySelector
 * @param selector - CSS selector
 * @param defaultValue - Default value if element not found
 * @returns Element or defaultValue
 */
export function safeQuerySelector<T extends Element>(
  selector: string,
  defaultValue: T | null = null
): T | null {
  try {
    if (typeof document === 'undefined') {
      return defaultValue;
    }
    return (document.querySelector(selector) as T) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Wrap function execution with error handling
 * @param fn - Function to execute
 * @param onError - Error handler (optional)
 * @returns Function result or undefined on error
 */
export function safeExecute<T>(
  fn: () => T,
  onError?: (error: Error) => void
): T | undefined {
  try {
    return fn();
  } catch (error) {
    if (onError && error instanceof Error) {
      onError(error);
    }
    return undefined;
  }
}

/**
 * Debounce function to prevent excessive calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function safeDebounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    try {
      if (timeout) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(() => {
        try {
          func(...args);
        } catch (error) {
          console.warn('Debounced function error:', error);
        }
      }, wait);
    } catch (error) {
      console.warn('Debounce setup error:', error);
    }
  };
}
