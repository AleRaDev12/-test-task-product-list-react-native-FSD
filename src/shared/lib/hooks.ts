import {useState, useEffect, useCallback} from 'react';

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const memoizedAsyncFunction = useCallback(asyncFunction, dependencies);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    memoizedAsyncFunction()
      .then(result => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [memoizedAsyncFunction]);

  return {data, loading, error};
}
