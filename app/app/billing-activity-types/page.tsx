"use client";
import {useQuery} from "@tanstack/react-query";
import {Axios} from "axios";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {ExamActivityType} from "@/types/ActiviityTypes";

export default function BillingActivityTypes() {
    const {} = useQuery({
        queryKey: ["exam-activity"],
        queryFn: (): Promise<ExamActivityType[]> => AxiosInstance.get("./activity-types.json").then((response) => response.data)
    })
    return (
        <div>Show activity-type table</div>
    );
}