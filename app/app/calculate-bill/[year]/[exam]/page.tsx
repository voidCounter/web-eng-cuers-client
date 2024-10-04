"use client";
import {usePathname} from "next/navigation";
import {useEvaluatorExamInfoStore} from "@/store/EvaluatorExamInfoStore";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useEffect, useState} from "react";
import {ExamInfoType} from "@/types/ExamInfoType";
import {generateSlug} from "@/utils/slugGenerator";
import {useQuery} from "@tanstack/react-query";
import {useAuthStore} from "@/store/AuthStore";
import {fetchData} from "@/utils/fetchData";
import BillPdf from "@/app/app/calculate-bill/[year]/[exam]/BillPdf";
import BillStatus from "@/app/app/calculate-bill/[year]/[exam]/BillStatus";
import Loading from "@/components/loading";


function parseExamPath(url: string) {
    // Get the relevant path part (after /calculate-bill/)
    const parts = url.split('/app/calculate-bill/')[1].split('/');

    // Extract year, session and exam name
    const year = parts[0]; // "2019"
    const sessionAndExam = parts[1]; // "2018-19-8th-semester-bsc-engineering"

    // Split session and exam name
    const [session, ...examNameParts] = sessionAndExam.split('-');
    const batchSession = session + '-' + examNameParts[0]; // "2018-19"
    const examName = examNameParts.slice(1).join(' '); // "8th semester bsc engineering"

    return {
        year,
        batchSession,
        examName
    };
}

export default function BillPage() {
    const pathName = usePathname();
    const {evaluatorExamInfo} = useEvaluatorExamInfoStore();
    const {authenticatedSession} = useAuthStore();
    const {year, batchSession, examName} = parseExamPath(pathName);

    const [currExamInfo, setCurrExamInfo] = useState<ExamInfoType | undefined>(undefined);

    useEffect(() => {
        setCurrExamInfo(() => {
            const matchedExam = evaluatorExamInfo.filter((item) => item.exam_session == year && generateSlug(item.exam_name, " ") == generateSlug(examName, " ") && item.session == batchSession);
            if (matchedExam.length > 0 && matchedExam[0] != undefined) {
                return matchedExam[0];
            }
        })

    }, [evaluatorExamInfo]);

    const {
        data: bill_info,
        isLoading: bill_info_loading,
        isSuccess: billDataFetched
    } = useQuery({
        queryKey: [examName, year, authenticatedSession?.user?.user_id],
        queryFn: () => fetchData(`/cuers/calculate-bill/${currExamInfo?.exam_id}/${currExamInfo?.academic_session_id}`),
        enabled: currExamInfo != undefined,
    })
    if (bill_info_loading) return <Loading text={"Fetching bill data"}/>

    return (<div className={"w-full flex justify-center mt-4"}>
        <Tabs defaultValue="bill"
              className="w-full flex flex-col items-center">
            <TabsList className={"w-[400px] h-[48px]"}>
                <TabsTrigger value="bill" className={"w-full h-full"}>View
                    Bill</TabsTrigger>
                <TabsTrigger value="status" className={"w-full h-full"}>View
                    Status</TabsTrigger>
            </TabsList>
            <TabsContent value="bill" className={"w-full"}>{
                currExamInfo && bill_info &&
                <BillPdf
                    currExamInfo={currExamInfo ?? {}}
                    billInfo={bill_info ? bill_info.data : []}/>}</TabsContent>
            <TabsContent value="status"
                         className={"w-full"}><BillStatus/></TabsContent>
        </Tabs>
    </div>);
}
