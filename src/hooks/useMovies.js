import { useState, useEffect } from 'react';

const useMovies = (asyncFunction, immediate = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const execute = async () => {
            setLoading(true);
            setError(null);

            try {
                // Some functions might not support AbortController if not passed through,
                // but it's good practice to have it here for cleanup reference.
                const result = await asyncFunction({ signal: abortController.signal });

                if (isMounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'An error occurred while fetching data');
                    setLoading(false);
                }
            }
        };

        if (immediate) {
            execute();
        }

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [asyncFunction, immediate]);

    return { data, loading, error };
};

export default useMovies;
