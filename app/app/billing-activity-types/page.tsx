"use client";
import {
    columns,
    ExamActivityType
} from "@/app/app/billing-activity-types/columns";
import {DataTable} from "@/app/app/billing-activity-types/data-table";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useQuery} from "@tanstack/react-query";
import Loading from "@/components/loading";
import {toast} from "sonner";

export default function BillingActivityTypes() {

    const {
        data,
        isLoading,
        isSuccess,
        isError
    } = useQuery({
        queryKey: ["billing-activity-types"],
        queryFn: async (): Promise<ExamActivityType[]> => {
            const response = await fetch("/activity-types.json");
            return response.json();
        }
    });
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isSuccess) {
        console.log(data);
    }
    if (isError) {
        toast.error("Failed to fetch billing activity types");
    }
    return (
        <div>
            {
                data &&
                <DataTable columns={columns} data={data}/>
            }
        </div>
    );
}