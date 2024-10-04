import {
    ProcedureProgress
} from '@/wels-components/ProcedureProgress/ProcedureProgress';
import {ProgressStep} from '@/wels-components/ProcedureProgress/ProgressStep';
import {
    Banknote,
    BookText,
    Building,
    Check,
    FilePenLine,
    TowerControl,
} from 'lucide-react';
import {useQuery} from "@tanstack/react-query";
import {useBillPdfDataStore} from "@/store/BillPdfDataStore";
import {ExamInfoType} from "@/types/ExamInfoType";
import {AxiosInstance} from "@/utils/AxiosInstance";
import Loading from "@/components/loading";
import {ExamBillType} from "@/types/ExamBillType";
import {useState} from "react";

export default function BillStatus() {
    const {examInfo} = useBillPdfDataStore();
    const currExamInfo = examInfo as ExamInfoType;
    const [currBillStatus, setCurrBillStatus] = useState<ExamBillType | undefined>(undefined);
    const {data, isLoading, isSuccess} = useQuery({
                queryKey: ['bill-status', currExamInfo?.exam_id],
                queryFn: async (): Promise<ExamBillType[]> => {
                    const response = await AxiosInstance.get(`/cuers/exam-bill`);
                    console.log(response.data);
                    const filtered = response.data.data.filter((item: ExamBillType) => item.exam_id == currExamInfo?.exam_id && item.academic_session_id == currExamInfo?.academic_session_id)[0];
                    setCurrBillStatus(filtered);
                    return response.data.data;
                },
                enabled:
                    currExamInfo != undefined
            }
        )
    ;

    if (isLoading) {
        return <Loading text={"Fetching bill status"}/>
    }
    const billSteps = [
        {
            name: "Submitted",
        },
        {
            name: "Chairman of Exam Committee",
        },
        {
            name: "Exam Controller",
        },
        {
            name: "Exam Bill Section",
        },
        {
            name: "Account Chief",
        },
        {
            name: "Account Bill Section",
        },
        {
            name: "Account Cheque Section",
        }
    ]

    const findStatus = (index: number) => {
        if (currBillStatus != undefined) {
            if ((index) < currBillStatus?.exam_bill_position) {
                return "approved";
            } else if ((index) > currBillStatus?.exam_bill_position) {
                return "waiting";
            } else {
                return currBillStatus?.status;
            }
        }
    }

    return (
        <div className={"mt-20 px-12"}>
            <ProcedureProgress showSerial={true} direction="horizontal">
                {
                    billSteps.map((step, index) => <ProgressStep key={index}
                                                                 status={findStatus(index) ?? "processing"}>{step.name}</ProgressStep>)
                }
            </ProcedureProgress>
        </div>
    );
}