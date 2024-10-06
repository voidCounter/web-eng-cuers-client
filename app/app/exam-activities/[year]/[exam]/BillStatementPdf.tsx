import {BillStatementInfoType} from "@/types/BillStatementInfoType";
import {Text, View} from "@react-pdf/renderer";
import {toBanglaNumber} from "@/utils/toBanglaInteger";

interface BillStatementPdfProps {
    bill_statement_text: string,
    bill_statement_info: BillStatementInfoType[]
    styles: any
}


export default function BillStatementPdf({
                                             bill_statement_text,
                                             bill_statement_info,
                                             styles
                                         }: BillStatementPdfProps) {
    const keys = [
        ["Serial\nNo", "10%"],
        ["Name", "35%"],
        ["Address", "45%"],
        ["Total\nbills", "10%"],
    ];
    return (
        <div>
            <View>
                <Text>{bill_statement_text}</Text>
            </View>
            <View style={styles.tableRow}>
                {keys.map((item, index) => (
                    <View key={index}
                          style={[styles.tableCol, {width: item[1]}]}>
                        <Text
                            style={[
                                styles.tableCell,
                                {fontWeight: "bold", textAlign: "center"},
                            ]}
                        >
                            {item[0]}
                        </Text>
                    </View>
                ))}
            </View>
            {
                bill_statement_info?.map((item, index) =>
                    <View key={index} style={styles.tableRow}>
                        <View
                            style={[
                                styles.tableCol,
                                {width: "10%", paddingLeft: "7.5px"},
                            ]}
                        >
                            <Text style={[styles.tableCell, {}]}>
                                {index + 1}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableCol,
                                {width: "35%", paddingLeft: "7.5px"},
                            ]}
                        >
                            <Text style={[styles.tableCell, {}]}>
                                {item.teacher_name}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableCol,
                                {width: "45%", paddingLeft: "7.5px"},
                            ]}
                        >
                            <Text style={[styles.tableCell, {}]}>
                                {item.address}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableCol,
                                {width: "10%", paddingLeft: "7.5px"},
                            ]}
                        >
                            <Text style={[styles.tableCell, {}]}>
                                {item.number_of_bills}
                            </Text>
                        </View>
                    </View>
                )
            }
        </div>
    )
}