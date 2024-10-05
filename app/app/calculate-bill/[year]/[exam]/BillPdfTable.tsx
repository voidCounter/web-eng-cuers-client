import {Text, View} from "@react-pdf/renderer";
import activityList from "@/config/activityList";
import {BillGroupedExamActivity} from "@/types/BillActivityType";
import {toBanglaNumber} from "@/utils/toBanglaInteger";
import {toEnglishNumber} from "@/utils/toEnglishNumber";

interface BillPdfTableProps {
    styles: any,
    billInfo: BillGroupedExamActivity[]
}

export default function BillPdfTable({styles, billInfo}: BillPdfTableProps) {
    const keys = [
        ["ক্রমিক\nনং ", "6%"],
        ["কাজের নাম ", "21%"],
        ["কোর্স নং ", "12%"],
        ["খাতা/ছাত্রের\n সংখ্যা ", "12%"],
        ["কত ঘণ্টার\n পরীক্ষা ", "12%"],
        ["মোট দিন/\nসদস্য সংখ্যা ", "12%"],
        ["অর্ধ/পূর্ণ পত্র ", "12%"],
        ["টাকার পরিমাণ ", "13%"],
    ];
    const totalBill = billInfo.reduce((acc, curr) => {
        return acc + curr.calculation_amount;
    }, 0);
    return (
        <View style={[styles.table, {marginTop: "5px"}]}>
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
            <View style={[]}>
                {activityList.map((item, index) => {
                    console.log(item.exam_activity_type, item.bill_sector)
                    let matchedBill = null;
                    const matchedBills = billInfo.filter(
                        (bill) => bill.exam_activity_type_id === item.exam_activity_type);
                    if (matchedBills.length > 1) {
                        matchedBill = matchedBills.filter((bill) => bill.bill_sector_id == item.bill_sector)[0];
                    }
                    console.log(matchedBill?.bill_sector_id, matchedBill?.exam_activity_type_id)
                    if (item.noEntry) {
                        return (
                            <View key={index} style={styles.tableRow}>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {width: "6%", paddingLeft: "7.5px"},
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        {`${toBanglaNumber(parseInt(item.no))}.`}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {
                                            width: item.noEntry ? "94%" : "24%",
                                            fontWeight: "bold",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            {
                                                paddingLeft:
                                                    new RegExp("^\\d+\\.\\d$").test(item.no) &&
                                                    "12px",
                                                // opacity: item.no === `8.1` || item.no === `8.2` || item.no === `8.3` || item.no === `8.4` || item.no === `8.5` ? 0 : 1,
                                            },
                                        ]}
                                    >{`${item.row}: `}</Text>
                                </View>
                            </View>
                        );
                    } else {
                        return (
                            <View key={index} style={styles.tableRow}>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {width: "6%", paddingLeft: "7.5px"},
                                    ]}
                                >
                                    <Text style={[styles.tableCell, {}]}>
                                        {item.no.includes(`.`)
                                            ? null
                                            : `${toBanglaNumber(parseInt(item.no))}.`}
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, {width: "21%"}]}>
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            {
                                                paddingLeft: item.no.includes(`8.`)
                                                    ? new RegExp("^\\d+\\.\\d$").test(item.no) &&
                                                    "4px"
                                                    : new RegExp("^\\d+\\.\\d$").test(item.no) &&
                                                    "26px",
                                            },
                                        ]}
                                    >
                                        {item.no === `3` ? `${item.row}: ` : `${item.row} `}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {
                                            width: "12%",
                                            textAlign: "center",
                                            fontSize: "6.5px",
                                        },
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        {matchedBill && matchedBill.course_id
                                            ? matchedBill.course_id.length > 22
                                                ? matchedBill.course_id.slice(0, 21) + "..."
                                                : matchedBill.course_id
                                            : ""}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {width: "12%", textAlign: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        {matchedBill &&
                                        matchedBill.factors.find(factor =>
                                            factor.factor.match(/(খাতা|ছাত্র|পৃষ্ঠা)/)
                                        )
                                            ? matchedBill.factors
                                                .filter(factor => factor.factor.match(/(খাতা|ছাত্র|পৃষ্ঠা)/))
                                                .map(factor =>
                                                    !toEnglishNumber(factor.quantity).includes('0') ? factor.quantity : ""
                                                ).join(', ')
                                            : ""}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {width: "12%", textAlign: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        {matchedBill &&
                                        matchedBill.factors.find(factor =>
                                            factor.factor.match(/ঘণ্টা/)
                                        )
                                            ? matchedBill.factors
                                                .filter(factor => factor.factor.match(/ঘণ্টা/))
                                                .map(factor =>
                                                    !toEnglishNumber(factor.quantity).includes('0') ? factor.quantity : ""
                                                ).join(', ')
                                            : ""}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {width: "12%", textAlign: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        {matchedBill &&
                                        matchedBill.factors.find(factor =>
                                            factor.factor.match(/দিন|সদস্য|পরীক্ষা/)
                                        )
                                            ? matchedBill.factors
                                                .filter(factor => factor.factor.match(/দিন|সদস্য|পরীক্ষা/))
                                                .map(factor =>
                                                    !toEnglishNumber(factor.quantity).includes('0') ? factor.quantity : ""
                                                ).join(', ')
                                            : ""}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {width: "12%", textAlign: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        {matchedBill &&
                                        matchedBill.factors.find(factor =>
                                            factor.factor.match(/অর্ধ|পূর্ণ/)
                                        )
                                            ? matchedBill.factors
                                                .filter(factor => factor.factor.match(/অর্ধ|পূর্ণ/))
                                                .map(factor =>
                                                    toEnglishNumber(factor.quantity) == '1' ? "অর্ধ" : "পূর্ণ"
                                                ).join(', ')
                                            : ""}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {width: "13%", textAlign: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        {matchedBill && matchedBill?.calculation_amount
                                            ? matchedBill.calculation_amount
                                            : ""}
                                    </Text>
                                </View>
                            </View>
                        )
                            ;
                    }
                })}
                <View style={styles.tableRow}>
                    <View
                        style={[
                            styles.tableCol,
                            {
                                width: "87%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            },
                        ]}
                    >
                        <Text style={styles.tableCell}>
                            মোট টাকা কথায়
                            = {`${toBanglaNumber(totalBill)}`}{" "}
                        </Text>
                        <Text>মোট টাকা = </Text>
                    </View>
                    <View
                        style={[
                            styles.tableCol,
                            {width: "13%", textAlign: "center"},
                        ]}
                    >
                        <Text
                            style={styles.tableCell}> {`${toBanglaNumber(totalBill)}`} </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}