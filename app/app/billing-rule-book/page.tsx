"use client";
import {useTable} from "@/hooks/useTable";
import GenericTable from "@/components/GenericTablePage";
import {BillingRuleType, columns} from "@/app/app/billing-rule-book/columns";
import Loading from "@/components/loading";

export default function BillingActivityTypes() {
    const newBillingRuleType: BillingRuleType = {
        rule_id: -1,
        bill_sector_id: -1,
        exam_activity_type_id: -1,
        quantity_initial: 0,
        quantity_final: 0,
        exam_bill: 0,
        min_exam_bill: 0,
        factor: "",
        valid_from: "",
    }
    const {
        data,
        isLoading,
        createMutation, updateMutation, deleteMutation,
        isError
    } = useTable<BillingRuleType>("/cuers/exam-activity");
    if (isLoading) {
        return <Loading text={"Loading Billing Rules"}/>
    }
    return (
        <div>
            {
                data &&
                <GenericTable columns={columns} newRow={newBillingRuleType}
                              data={data} isLoading={isLoading}
                              isError={isError} createMutation={createMutation}
                              updateMutation={updateMutation}
                              deleteMutation={deleteMutation}/>
            }
        </div>
    );
}
