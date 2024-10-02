import {AxiosInstance} from "@/utils/AxiosInstance";

export const fetchData = async (fetchUrl: string) => {
    const response = await AxiosInstance.get(fetchUrl);
    return response.data;
}
