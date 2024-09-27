"use client";
import {useQuery} from "@tanstack/react-query";
import {ExamActivityType} from "@/types/ActiviityTypes";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useAuthStore} from "@/store/AuthStore";

export default function BillingRuleBook() {
    const {authenticatedSession} = useAuthStore();
    const {data, isSuccess} = useQuery({
        queryKey: ["exam-activity"],
        queryFn: (): Promise<ExamActivityType[]> => AxiosInstance.get("/cuers/evaluates-activity",
            {
                headers: {
                    "Authorization": `Bearer ${authenticatedSession?.session_id}`
                }
            }).then((response) => response.data)
    })
    if (isSuccess) {
        console.log(data);
    }

    return (<div>hello</div>);
}