import {AxiosInstance} from "@/utils/AxiosInstance";
import {QueryKey} from "@/utils/queryKeys";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export function useFetchData(queryKey: QueryKey, url: string) {
    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            if (url.endsWith(".json")) {
                return await fetch(url).then(res => res.json());
            }
            const response = await AxiosInstance.get(url);
            return response?.data?.data;
        },
        enabled: false
    });
}