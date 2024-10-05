import {Image, Text, View} from "@react-pdf/renderer";
import {toBanglaNumber} from "@/utils/toBanglaInteger";
import {useBillPdfDataStore} from "@/store/BillPdfDataStore";
import {UserType} from "@/types/UserType";
import {ExamInfoType} from "@/types/ExamInfoType";
import {DepartmentType} from "@/types/DepartmentType";
import {formatDateString} from "@/utils/formatDate";

interface BillPdfTopProps {
    styles: any
}

export default function BillPdfTop({
                                       styles,
                                   }: BillPdfTopProps) {

    const {
        university,
        userInfo,
        department,
        examInfo
    } = useBillPdfDataStore.getState();
    const evaluatorInfo = userInfo as UserType;
    const evaluatorExamInfo = examInfo as ExamInfoType;
    const evaluatorDeptInfo = department as DepartmentType;
    const evaluatorUniInfo = university as UniversityType;

    return (
        <View>
            <View style={[styles.topPart, {marginBottom: '0px'}]}>
                <View>
                    <Image
                        style={styles.logo}
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/8/86/University_of_Chittagong_logo.svg/225px-University_of_Chittagong_logo.svg.png"
                    ></Image>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        right: '1px',
                        width: '100%',
                        textAlign: 'right',
                        margin: 'auto',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={[
                            styles.text,
                            {textAlign: 'right'},
                        ]}
                    >
                        রেজিস্টারের পৃষ্ঠা
                        নংঃ.......................... {'\n'}
                        পরীক্ষকের ক্রমিক নংঃ{' '}
                        {`${toBanglaNumber(
                            4535345
                        )}`}
                        {' '.repeat(
                            13 -
                            "sljjflsdjf"
                                .length
                        )}{' '}
                    </Text>
                </View>
            </View>
            <View style={{}}>
                <Text
                    style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}
                >
                    পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম{' '}
                </Text>
                <Text style={{fontSize: '9.3px'}}>
                    (বিল সংশ্লিষ্ট পরীক্ষা কমিটির চেয়ারম্যানের
                    মাধ্যমে পরীক্ষা অনুষ্ঠিত হওয়ার এক বছরের মধ্যে
                    পরীক্ষা নিয়ন্ত্রণ দপ্তরে দাখিল করতে হবে। প্রতি
                    পরীক্ষার জন্য পৃথক পৃথকভাবে বিল দাখিল করতে হবে।)
                </Text>
            </View>
            <View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View
                            style={[
                                styles.tableCol,
                                {width: '65%'},
                            ]}
                        >
                            <Text style={styles.tableCell}>
                                পরীক্ষকের নাম (বাংলায়) :{' '}
                                {`${evaluatorInfo?.first_name_bn} ${evaluatorInfo?.last_name_bn}`}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableCol,
                                {width: '35%'},
                            ]}
                        >
                            <Text style={styles.tableCell}>
                                বিষয় : কম্পিউটার সায়েন্স এন্ড
                                ইঞ্জিনিয়ারিং
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View
                            style={[
                                styles.tableCol,
                                {width: '65%'},
                            ]}
                        >
                            <Text style={styles.tableCell}>
                                ইংরেজি (বড় অক্ষরে) :{' '}
                                {`${evaluatorInfo?.first_name?.toUpperCase() ?? " "} ${evaluatorInfo?.last_name?.toUpperCase()} `}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableCol,
                                {width: '35%'},
                            ]}
                        >
                            <Text
                                style={styles.tableCell}
                            >{`পরীক্ষার নাম : ${evaluatorExamInfo?.exam_name}`}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View
                            style={[
                                styles.tableCol,
                                {width: '65%'},
                            ]}
                        >
                            <Text style={[styles.tableCell, {}]}>
                                পদবী, পূর্ণ ঠিকানা ও {'   '}:{' '}
                                {`${
                                    evaluatorInfo?.designation_bn +
                                    ', ' +
                                    evaluatorDeptInfo?.department_name_bn +
                                    ', ' +
                                    evaluatorUniInfo?.university_name +
                                    ', '
                                } `}{' '}
                                {'\n'} মোবাইল নম্বর{'            '}
                                {`${evaluatorInfo?.phone} `}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.tableCol,
                                {width: '35%'},
                            ]}
                        >
                            <View style={styles.tableRow}>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {
                                            width: '100%',
                                            border: 'none',
                                            borderBottom: '0.5px',
                                        },
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        পরীক্ষার বৎসর :{' '}
                                        {`${toBanglaNumber(
                                            parseInt(evaluatorExamInfo?.exam_session)
                                        )}`}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View
                                    style={[
                                        styles.tableCol,
                                        {
                                            width: '100%',
                                            border: 'none',
                                        },
                                    ]}
                                >
                                    <Text style={styles.tableCell}>
                                        পরীক্ষা অনুষ্ঠানের তারিখ :{' '}
                                        {`${formatDateString(evaluatorExamInfo?.exam_start_date)}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}