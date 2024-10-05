"use client";
import {BillExamActivity} from "@/types/BillActivityType";
import {
    Document,
    Font,
    Page,
    PDFDownloadLink,
    PDFViewer,
    StyleSheet
} from "@react-pdf/renderer";
import {useEvaluatorExamInfoStore} from "@/store/EvaluatorExamInfoStore";
import {groupBillData} from "@/utils/groupBillData";
import {ExamInfoType} from "@/types/ExamInfoType";
import BillPdfTop from "@/app/app/calculate-bill/[year]/[exam]/BillPdfTop";
import {useAuthStore} from "@/store/AuthStore";
import {useQuery} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useBillPdfDataStore} from "@/store/BillPdfDataStore";
import {DepartmentType} from "@/types/DepartmentType";
import {UserType} from "@/types/UserType";
import Loading from "@/components/loading";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import BillSubmitDialog
    from "@/app/app/calculate-bill/[year]/[exam]/BillSubmitDialog";
import BillPdfTable from "@/app/app/calculate-bill/[year]/[exam]/BillPdfTable";
import BillPdfBottom
    from "@/app/app/calculate-bill/[year]/[exam]/BillPdfBottom";

Font.register({
    family: 'Kalpurush',
    src: "/fonts/kalpurush.ttf",
    fontStyle: 'normal',
    fontWeight: 'normal',
});

const styles = StyleSheet.create({
    text: {
        lineHeight: "1.5",
    },
    pageCol: {
        flexDirection: "column",
        padding: "20px 20px 20px 20px",
        fontFamily: "Kalpurush",
        fontSize: "10px",
    },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title1: {
        fontSize: "22px",
        fontWeight: "bold",
        textDecoration: "underline",
        marginBottom: "9.5px",
    },
    table: {
        fontFamily: "Kalpurush",
        display: "flex",
        flexDirection: "column",
        width: "auto",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 0.5,
        fontSize: "7.5px",
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableHeader: {
        // borderWidth: 1,
        backgroundColor: "#e2e8f0",
        flexDirection: "row",
    },
    tableRow: {
        // padding: "5px",
        margin: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5px 0.5px 0.5px 4px",
    },
    leftAligned: {
        textAlign: "left",
    },
    rightAligned: {
        textAlign: "right",
    },
    topPart: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
    },
    topPart1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: "1px",
        borderBottom: "1px solid black",
        marginBottom: "10px",
        // border: "1px solid gray",
    },
    topPart2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logo: {
        width: "50px",
        height: "78px",
    },
    spacer: {
        height: "30px",
        padding: "20px",
        border: "2px solid black",
    },
    applicationBody: {
        lineHeight: 1.5,
        marginTop: "40px",
        marginBottom: "20px",
    },
    aTable: {
        marginBottom: "40px",
    },
    bottomPart: {
        width: "100%",
        paddingTop: "10px",
        fontSize: "7px",
    },
    sign1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
    },
    sign2: {
        display: "flex",
        height: "55px",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    indSign: {},
    writing: {
        paddingTop: "10px",
    },
});

interface BillPdfProps {
    currExamInfo: ExamInfoType | {}
    billInfo: BillExamActivity[]
}

export default function BillPdf({
                                    billInfo = [],
                                    currExamInfo
                                }: BillPdfProps) {

    const [billSubmitDialogOpen, setBillSubmitDialogOpen] = useState(false);
    const {evaluatorExamInfo} = useEvaluatorExamInfoStore();
    const {authenticatedSession} = useAuthStore();
    const groupedData = groupBillData(billInfo);
    const {
        setExamInfo,
        setUserInfo,
        setDepartment,
        setUniversity
    } = useBillPdfDataStore();

    useEffect(() => {
        setExamInfo(currExamInfo as ExamInfoType);
        setUserInfo(authenticatedSession?.user as UserType);
    }, [currExamInfo]);

    const {data: departmentInfo, isLoading: departmentInfoLoading} = useQuery({
        queryKey: ['department', authenticatedSession?.user?.department_id],
        queryFn: async (): Promise<DepartmentType> => {
            const response = await AxiosInstance.get(`/department/${authenticatedSession?.user?.department_id}`);
            setDepartment(response.data);
            return response.data;
        },
        enabled: authenticatedSession?.user?.department_id != undefined,
    });

    const {data: universityInfo, isLoading: universityInfoLoading} = useQuery({
        queryKey: ['university', departmentInfo?.university_id],
        queryFn: async (): Promise<UniversityType> => {
            const response = await AxiosInstance.get(`/university/${departmentInfo?.university_id}`);
            setUniversity(response.data);
            return response.data;
        }, enabled: !!departmentInfo,
    });

    const currExam = currExamInfo as ExamInfoType;
    if (departmentInfoLoading || universityInfoLoading) return <Loading
        text={"Generating bill pdf"}/>

    const MyDoc = () => (
        <Document
            title={currExam.session + "-" + currExam.exam_name}>
            <Page size={{width: 612, height: 1008}}
                  style={styles.pageCol}>
                <BillPdfTop styles={styles}/>
                <BillPdfTable styles={styles} billInfo={groupedData}/>
                <BillPdfBottom styles={styles}/>
            </Page>
        </Document>
    );
    return (
        <div className={"w-full h-full flex flex-col gap-4"}>
            <PDFViewer className={"w-full h-[800px]"}>
                {MyDoc()}
            </PDFViewer>
            <div className={"flex flex-flow gap-2"}>
                <PDFDownloadLink document={<MyDoc/>}
                                 fileName={`${currExam?.session}-${currExam?.exam_name}-${authenticatedSession?.user?.user_id}`}>
                    <Button variant={"secondary"}>Download Bill Pdf</Button>

                </PDFDownloadLink>
                <Button variant={"default"}
                        onClick={() => setBillSubmitDialogOpen(!billSubmitDialogOpen)}>Submit</Button>
            </div>
            <BillSubmitDialog open={billSubmitDialogOpen}
                              onOpen={() => setBillSubmitDialogOpen(!billSubmitDialogOpen)}/>
        </div>
    );
}