import {ExamInfoType} from "@/types/ExamInfoType";
import {Document, Font, Page, PDFViewer, StyleSheet} from "@react-pdf/renderer";
import {useQuery} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import BillStatementPdf
    from "@/app/app/exam-activities/[year]/[exam]/BillStatementPdf";
import {BillStatementInfoType} from "@/types/BillStatementInfoType";

interface BillStatementProps {
    currExamInfo: TeacherRoleInExamCommitteeInfoType | undefined;
}

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
    smallTableCell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5px 0.5px 0.5px 4px",
        fontSize: "6px",
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


export default function BillStatement({currExamInfo}: BillStatementProps) {
    const {
        data: billStatementInfo,
        isLoading: billStatementLoading
    } = useQuery({
        queryKey: ['bill_statement', currExamInfo?.exam_id],
        queryFn: async (): Promise<BillStatementInfoType[]> => {
            const response = await AxiosInstance.get(`/cuers/bill-statement/${currExamInfo?.exam_id}`);
            console.log(response);
            return response.data.data;
        },
    });

    const [billStatementText, setBillStatementText] = useState<string>("");
    const [billStatementTextSaved, setBillStatementTextSaved] = useState<string>("");

    const billStatement = () => {
        return <Document
            title={`Bill statement-${currExamInfo?.session}-${currExamInfo?.exam_name}`}>
            <Page size={{width: 612, height: 1008}} style={styles.pageCol}>
                <BillStatementPdf bill_statement_text={billStatementTextSaved}
                                  styles={styles}
                                  bill_statement_info={billStatementInfo ?? []}/>
            </Page>
        </Document>
    }
    return (
        <div className={"w-full h-full"}>
            <Textarea value={billStatementText}
                      onChange={(e) => setBillStatementText(e.target.value)}
                      onBlur={(e) => setBillStatementTextSaved(e.target.value)}/>
            <PDFViewer className={"w-full h-[800px]"}>
                {billStatement()}
            </PDFViewer>
        </div>);
}