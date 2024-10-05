import {QueryKey} from "@/utils/queryKeys";
import {OptionType} from "@/types/optionType";
import {BillSectorType} from "@/app/app/billing-sectors/columns";
import {useOptionStore} from "@/store/OptionStore";
import {Option} from "commander";
import {ExamActivityType} from "@/app/app/billing-activity-types/columns";
import {TeacherPersonalInfo, TeacherType} from "@/types/TeacherType";
import {CourseType} from "@/types/Course";

export const handleSelectOptions = (key: QueryKey, data: any[]): OptionType[] => {
    const {options, setOptions} = useOptionStore.getState();
    if (data.length === 0) return [];
    let mappedOptions: OptionType[] = [];
    switch (key) {
        case QueryKey.BILL_SECTORS:
            mappedOptions = data.map((sector: BillSectorType) => ({
                label: sector.bill_sector_name,
                value: sector.bill_sector_id
            }));
            break;
        case QueryKey.BILLING_RULES:
            mappedOptions = data.map((rule: any) => ({
                label: rule.name,
                value: rule.id
            }));
            break;
        case QueryKey.EXAM:
            mappedOptions = data.map((exam: any) => ({
                label: exam.examName,
                value: exam.exam_id
            }))
            break;
        case QueryKey.TEACHERS:
            mappedOptions = data.map((teacher: TeacherPersonalInfo) => ({
                label: teacher.title_bn + " " + teacher.first_name_bn + " " + teacher.last_name_bn,
                value: teacher.teacher_id
            }));
            break;
        case QueryKey.COURSES:
            mappedOptions = data.map((course: CourseType) => ({
                label: course.course_code + "-" + course.course_title,
                value: course.course_id
            }));
            mappedOptions.push({label: "None", value: "None"});
            break;
        case QueryKey.ACTIVITY_TYPE:
            mappedOptions = data.map((activity: ExamActivityType) => ({
                label: activity.exam_activity_name,
                value: activity.exam_activity_type_id
            }));
            break;
    }
    setOptions(key, mappedOptions);
    return [];
}