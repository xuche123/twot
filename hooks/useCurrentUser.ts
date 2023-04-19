import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = (setState : boolean) => {
  const { data, error, isLoading, mutate } = useSWR(setState ? '/api/user' : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;
