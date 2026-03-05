import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Status constants for async operations
 */
export const ASYNC_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

/**
 * Custom hook for handling async movie data fetching with abort support
 * 
 * @param {Function} asyncFunction - Async function that returns movie data
 * @param {Object} options - Configuration options
 * @param {boolean} options.immediate - Execute immediately on mount (default: true)
 * @param {*} options.initialData - Initial data state
 * @param {Function} options.onSuccess - Callback on successful fetch
 * @param {Function} options.onError - Callback on error
 * @returns {Object} - { data, loading, error, status, execute, reset }
 * 
 * @example
 * const { data, loading, error, execute } = useMovies(
 *   () => fetchPopularMovies(),
 *   { immediate: true, onSuccess: (data) => console.log('Loaded:', data) }
 * );
 */
const useMovies = (
    asyncFunction, 
    { 
        immediate = true, 
        initialData = null,
        onSuccess,
        onError 
    } = {}
) => {
    const [data, setData] = useState(initialData);
    const [status, setStatus] = useState(immediate ? ASYNC_STATUS.LOADING : ASYNC_STATUS.IDLE);
    const [error, setError] = useState(null);
    
    // Use refs to avoid stale closure issues
    const asyncFunctionRef = useRef(asyncFunction);
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    const abortControllerRef = useRef(null);
    
    // Update refs when callbacks change
    useEffect(() => {
        asyncFunctionRef.current = asyncFunction;
        onSuccessRef.current = onSuccess;
        onErrorRef.current = onError;
    }, [asyncFunction, onSuccess, onError]);

    // Execute the async function
    const execute = useCallback(async (overrideFunction) => {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        setStatus(ASYNC_STATUS.LOADING);
        setError(null);

        try {
            const fn = overrideFunction || asyncFunctionRef.current;
            const result = await fn({ signal });

            // Check if request was aborted
            if (signal.aborted) return;

            setData(result);
            setStatus(ASYNC_STATUS.SUCCESS);
            onSuccessRef.current?.(result);
            
            return result;
        } catch (err) {
            // Ignore abort errors
            if (err.name === 'AbortError' || signal.aborted) return;

            const errorMessage = err.message || 'An error occurred while fetching data';
            setError(errorMessage);
            setStatus(ASYNC_STATUS.ERROR);
            onErrorRef.current?.(err);
            
            throw err;
        }
    }, []);

    // Reset state to initial values
    const reset = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setData(initialData);
        setStatus(ASYNC_STATUS.IDLE);
        setError(null);
    }, [initialData]);

    // Execute on mount if immediate is true
    useEffect(() => {
        if (immediate) {
            execute().catch(() => {
                // Error already handled in execute
            });
        }

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [immediate, execute]);

    return { 
        data, 
        loading: status === ASYNC_STATUS.LOADING, 
        error, 
        status,
        execute,
        reset,
        isIdle: status === ASYNC_STATUS.IDLE,
        isLoading: status === ASYNC_STATUS.LOADING,
        isSuccess: status === ASYNC_STATUS.SUCCESS,
        isError: status === ASYNC_STATUS.ERROR
    };
};

export default useMovies;
