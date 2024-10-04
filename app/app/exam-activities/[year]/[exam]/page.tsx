"use client";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import BillPdf from "@/app/app/calculate-bill/[year]/[exam]/BillPdf";
import BillStatus from "@/app/app/calculate-bill/[year]/[exam]/BillStatus";
import ExamActivities
    from "@/app/app/exam-activities/[year]/[exam]/ExamActivities";
import ActivityReport
    from "@/app/app/exam-activities/[year]/[exam]/ActivityReport";
import CheckBillsPage from "@/app/app/check-bills/page";
import {usePathname} from "next/navigation";
import {useCECExamInfoStore} from "@/store/CECExamInfoStore";
import {useAuthStore} from "@/store/AuthStore";
import {useEffect, useState} from "react";
import {ExamInfoType} from "@/types/ExamInfoType";
import {generateSlug} from "@/utils/slugGenerator";
import {useQuery} from "@tanstack/react-query";
import {fetchData} from "@/utils/fetchData";


function parseExamPath(url: string) {
    // Get the relevant path part (after /calculate-bill/)
    const parts = url.split('/app/exam-activities/')[1].split('/');

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

export default function ExamActivitiesPage() {
    const pathName = usePathname();
    const {cecExamInfo} = useCECExamInfoStore();
    const {authenticatedSession} = useAuthStore();
    const {year, batchSession, examName} = parseExamPath(pathName);

    const [currExamInfo, setCurrExamInfo] = useState<TeacherRoleInExamCommitteeInfoType | undefined>(undefined);
    useEffect(() => {
        setCurrExamInfo(() => {
            const matchedExam = cecExamInfo.filter((item) => item.exam_session == year && generateSlug(item.exam_name, " ") == generateSlug(examName, " ") && item.session == batchSession);
            if (matchedExam.length > 0 && matchedExam[0] != undefined) {
                return matchedExam[0];
            }
        })

    }, [cecExamInfo])

    return (
        <Tabs defaultValue="exam-activities"
              className="w-full flex flex-col items-center mt-8">
            <TabsList className={"w-full max-w-[600px] h-[48px]"}>
                <TabsTrigger value="exam-activities" className={"w-full" +
                    " h-full"}>Exam Activities</TabsTrigger>
                <TabsTrigger value="bills"
                             className={"w-full h-full"}>Bills</TabsTrigger>
                <TabsTrigger value="generate-activity-report"
                             className={"w-full h-full"}>Activity
                    Report</TabsTrigger>
            </TabsList>
            <TabsContent value="exam-activities" className={"w-full"}>
                <ExamActivities
                    currExamInfo={currExamInfo}/></TabsContent>
            <TabsContent value="bills"
                         className={"w-full"}><CheckBillsPage/></TabsContent>
            <TabsContent value="generate-activity-report"
                         className={"w-full"}><ActivityReport/></TabsContent>
        </Tabs>
    )
        ;
}