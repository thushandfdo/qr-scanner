import { useState, useCallback } from 'react';

const useFetch = (timeout = 5000) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(
        async (url, options = {}) => {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), timeout);
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal
                });
                clearTimeout(timer);

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const result = await response.json();
                setData(result);
                setError(null);
                return result;
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        },
        [timeout]
    );

    return { data, loading, error, fetchData };
};

export default useFetch;
