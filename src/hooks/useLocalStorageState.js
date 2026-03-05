import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for persisting state to localStorage with cross-tab synchronization.
 * 
 * @param {string} key - The localStorage key to use
 * @param {*} initialValue - Initial value if key doesn't exist
 * @param {Object} options - Configuration options
 * @param {boolean} options.serialize - Custom serializer function (default: JSON.stringify)
 * @param {boolean} options.deserialize - Custom deserializer function (default: JSON.parse)
 * @param {boolean} options.syncTabs - Enable cross-tab synchronization (default: true)
 * @returns {[*, Function, Function]} - [state, setState, removeValue]
 * 
 * @example
 * const [theme, setTheme, removeTheme] = useLocalStorageState('theme', 'dark');
 * const [user, setUser] = useLocalStorageState('user', null, { syncTabs: false });
 */
export function useLocalStorageState(
    key, 
    initialValue, 
    { 
        serialize = JSON.stringify, 
        deserialize = JSON.parse,
        syncTabs = true 
    } = {}
) {
    // Use ref to avoid stale closure issues
    const initialValueRef = useRef(initialValue);
    
    // Get from local storage then parse stored json or return initialValue
    const readValue = useCallback(() => {
        if (typeof window === 'undefined') {
            return initialValueRef.current;
        }
        
        try {
            const item = window.localStorage.getItem(key);
            return item !== null ? deserialize(item) : initialValueRef.current;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValueRef.current;
        }
    }, [key, deserialize]);

    const [state, setState] = useState(readValue);

    // Memoized setter that persists to localStorage
    const setValue = useCallback((value) => {
        try {
            // Allow value to be a function so we have same API as useState
            setState(prevState => {
                const valueToStore = value instanceof Function ? value(prevState) : value;
                
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, serialize(valueToStore));
                }
                
                return valueToStore;
            });
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, serialize]);

    // Remove value from localStorage
    const removeValue = useCallback(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
            setState(initialValueRef.current);
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    }, [key]);

    // Listen to changes in other windows/tabs
    useEffect(() => {
        if (!syncTabs) return;
        
        const handleStorageChange = (e) => {
            if (e.key === key) {
                try {
                    const newValue = e.newValue !== null 
                        ? deserialize(e.newValue) 
                        : initialValueRef.current;
                    setState(newValue);
                } catch (error) {
                    console.warn(`Error parsing storage change for key "${key}":`, error);
                }
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, syncTabs, deserialize]);

    return [state, setValue, removeValue];
}

export default useLocalStorageState;
