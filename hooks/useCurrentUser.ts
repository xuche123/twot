import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = (shouldFetch: boolean) => {
  const { data, error, isLoading, mutate } = useSWR(shouldFetch ? '/api/current' : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;
