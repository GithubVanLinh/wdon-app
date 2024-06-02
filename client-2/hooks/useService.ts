import { useState, useEffect } from "react";

interface ServiceState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useService = <T, P>(
  service: (params: P) => Promise<T>,
  resp: P
): ServiceState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("use service");
    const fetchData = async () => {
      try {
        const response = await service(resp);
        setData(response);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [service, resp]);

  return { data, loading, error };
};

export default useService;
