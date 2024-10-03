"use client";
import Loading from "@/components/loading";
import {useTable} from "@/hooks/useTable";
import GenericTable from "@/components/GenericTablePage";
import {ExamBillType} from "@/types/ExamBillType";
import {columns} from "@/app/app/check-bills/columns";
import {useEffect, useState} from "react";
import {useRoleStore} from "@/store/RoleStore";

export default function BillingActivityTypes() {

    const [data, setData] = useState<ExamBillType[]>();
    const {currentRole} = useRoleStore.getState();
    const newExamBill: ExamBillType = {
        exam_id: 0,
        academic_session_id: 0,
        status: "waiting",
        exam_bill_position: 0,
        teacher_id: 0,
        department_id: 0,
        exam_bill_id: 0,
        file_path: ""
    }

    const {
        data: billsData,
        isLoading,
        createMutation, updateMutation, deleteMutation,
        isError
    } = useTable<ExamBillType>("/cuers/exam-bill");

    useEffect(() => {
        if (billsData) {
            let filteredData = [];
            switch (currentRole) {
                case "chairman-of-exam-committee":
                    filteredData = billsData.filter((bill: ExamBillType) => bill.exam_bill_position === 1);
                    break;
                case "exam-controller":
                    filteredData = billsData.filter((bill: ExamBillType) => bill.exam_bill_position === 2);
                    break;
                case "exam-bill-section":
                    filteredData = billsData.filter((bill: ExamBillType) => bill.exam_bill_position === 3);
                    break;
                case "account-chief":
                    filteredData = billsData.filter((bill: ExamBillType) => bill.exam_bill_position === 4);
                    break;
                case "account-bill-section":
                    filteredData = billsData.filter((bill: ExamBillType) => bill.exam_bill_position === 5);
                    break;
                case "account-cheque-section":
                    filteredData = billsData.filter((bill: ExamBillType) => bill.exam_bill_position === 6);
                    break;
                default:
                    filteredData = billsData;
            }
            setData(filteredData);
        }
    }, [billsData]);

    if (isLoading) {
        return <Loading text={"Loading Billing bills"}/>
    }
    return (
        <div>
            {
                data &&
                <GenericTable columns={columns} newRow={null}
                              data={data} isLoading={isLoading}
                              isError={isError} createMutation={createMutation}
                              updateMutation={updateMutation}
                              deleteMutation={deleteMutation}/>
            }
        </div>
    );
}
