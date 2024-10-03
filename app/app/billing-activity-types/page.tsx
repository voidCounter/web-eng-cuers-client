"use client";
import {
    columns,
    ExamActivityType
} from "@/app/app/billing-activity-types/columns";
import Loading from "@/components/loading";
import {toast} from "sonner";
import {useTable} from "@/hooks/useTable";
import {DataTable} from "@/components/ui/data-table";
import GenericTable from "@/components/GenericTablePage";

export default function BillingActivityTypes() {
    const newExamActivityType: ExamActivityType = {
        exam_activity_name: "",
        exam_activity_type_id: 56,
        exam_category: ""
    }
    const {
        data,
        isLoading,
        createMutation, updateMutation, deleteMutation,
        isError
    } = useTable<ExamActivityType>("/cuers/exam-activity-type");
    if (isLoading) {
        return <Loading text={"Loading Billing Activity Types"}/>
    }

    return (
        <div>
            {
                data &&
                <GenericTable columns={columns} newRow={newExamActivityType}
                              data={data} isLoading={isLoading}
                              isError={isError} createMutation={createMutation}
                              updateMutation={updateMutation}
                              deleteMutation={deleteMutation}/>
            }
        </div>
    );
}