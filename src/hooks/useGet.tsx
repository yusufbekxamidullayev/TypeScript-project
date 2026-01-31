import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import type { GetPropsType } from '../types/GetPropsType';

const useGet = <T = unknown>({ url, key }: GetPropsType) => {
    const getData = async():Promise<T> => {
        let { data } = await axios.get<T>(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/${url}`);
        return data
    }

    const { data, isLoading, isFetching, error } = useQuery<T>({
        queryKey: key,
        queryFn: getData,
        staleTime: 1000 * 60 * 1, 
    })

    return { data, isLoading, isFetching, error }
}

export default useGet