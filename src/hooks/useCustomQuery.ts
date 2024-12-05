import { useQuery, UseQueryOptions } from '@tanstack/react-query';
// import apiSesi from '../services/apiSesi';
import api from '../services/api';
import { GlobalContext } from '../contexts/globalContext';
import { useContext } from 'react';

interface IUseCustomQuery {
  key: string;
  endpoint: string;
  params?: { [key: string]: any };
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
  response?: (res: any) => void;
}

const useCustomQuery = ({
  key,
  endpoint,
  params = {},
  refetchOnWindowFocus = false,
  enabled = true,
  response,
}: IUseCustomQuery) => {
  const { userData } = useContext(GlobalContext);

  // const apiInstance = isSesiAPI ? apiSesi() : api(userData?.strToken);
  const apiInstance = api(userData?.strToken);

  return useQuery({
    queryKey: [key],
    queryFn: () =>
      apiInstance.get(`${endpoint}`, { params }).then((res) => {
        response?.(res);
        return res.data;
      }),
    refetchOnWindowFocus,
    enabled,
  });
};

export default useCustomQuery;
