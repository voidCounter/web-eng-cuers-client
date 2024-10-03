import {useQuery} from "@tanstack/react-query";
import {UserType} from "@/types/UserType";
import {AxiosInstance} from "@/utils/AxiosInstance";

export const fetchUserInfo = (session_id: string) => {
    console.log("Requesting with session_id: ", session_id);
    return useQuery({
            queryKey: ['user', session_id],
            queryFn: async (): Promise<UserType> => {
                const response = await AxiosInstance.get("/user", {
                    headers: {
                        "Authorization": `Bearer ${session_id}`
                    }
                });
                return response.data;
            },
            enabled: !!session_id,
        }
    )
}
