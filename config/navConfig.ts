import {
    BookOpenTextIcon, CalendarFoldIcon,
    CalendarIcon, FormInputIcon,
    Grid2x2CheckIcon,
    LayoutListIcon
} from "lucide-react";
import {NavConfigType} from "@/types/NavTypes";
import {RoleType} from "@/store/RoleStore";
import {ExamInfoType} from "@/types/ExamInfoType";
import {generateSlug} from "@/utils/slugGenerator";


export const generateNavItems = (role: RoleType, passedExamInfo?: ExamInfoType[] | TeacherRoleInExamCommitteeInfoType[]): NavConfigType => {
    console.log("Current roel", role);
    switch (role) {
        case "chairman":
            return chairmanNavItems;
        case "exam-controller":
        case "account-bill-section":
        case "account-cheque-section":
        case "account-chief":
        case "section-officer":
            return staffNavItems;
        case "chairman-of-exam-committee": {
            let cecNavItems: NavConfigType = {navItems: []};
            const examInfo = passedExamInfo as TeacherRoleInExamCommitteeInfoType[];
            if (examInfo) {
                console.log("to generate dynamic nav items: ", examInfo);
                const yearGroups: Record<string, {
                    label: string,
                    path: string
                }[]> = {};
                examInfo.forEach((exam) => {
                    const year = exam.exam_session;

                    if (!yearGroups[year]) {
                        yearGroups[year] = [];
                    }

                    // Push the exam into the respective year's group
                    yearGroups[year].push({
                        label: `${exam.session} ${exam.exam_name}`,
                        path: `/app/exam-activities/${year}/${exam.session}-${generateSlug(exam.exam_name, " ")}`
                    });
                    console.log("Year group is: ", yearGroups);
                    cecNavItems.navItems = [];
                    Object.keys(yearGroups).forEach((year) => {
                        cecNavItems.navItems.push({
                            label: year,
                            icon: CalendarFoldIcon,
                            path: `/app/exam-activities/${year}`,
                            subItems: yearGroups[year] // Add the grouped exams as subItems
                        });
                    });
                });
            }
            console.log(cecNavItems);
            return cecNavItems;
        }
        case "evaluator": {
            let evaluatorNavItems: NavConfigType = {navItems: []};
            const examInfo = passedExamInfo as ExamInfoType[];
            if (examInfo) {
                // Group exams by year (exam_session)
                const yearGroups: Record<string, {
                    label: string,
                    path: string
                }[]> = {};

                examInfo.forEach((exam) => {
                    const year = exam.exam_session;

                    if (!yearGroups[year]) {
                        yearGroups[year] = [];
                    }

                    // Push the exam into the respective year's group
                    evaluatorNavItems.navItems = [];
                    yearGroups[year].push({
                        label: `${exam.session} ${exam.exam_name}`,
                        path: `/app/calculate-bill/${year}/${exam.session}-${generateSlug(exam.exam_name, " ")}`
                    });
                });

                // Now, transform the yearGroups into navItems structure
                Object.keys(yearGroups).forEach((year) => {
                    evaluatorNavItems.navItems.push({
                        label: year,
                        icon: CalendarFoldIcon,
                        path: `/app/calculate-bill/${year}`,
                        subItems: yearGroups[year] // Add the grouped exams as subItems
                    });
                });
            }
            return evaluatorNavItems;
        }
        default:
            return {navItems: []};
    }
}

export const cecNavItems: NavConfigType = {
    navItems: [
        {
            label: "Manage activity data",
            icon: Grid2x2CheckIcon,
            path: "/app/manage-activity-data"
        },
        {
            label: "Check Bills",
            icon: FormInputIcon,
            path: "/app/check-bills"
        }
    ]
}

export const staffNavItems: NavConfigType = {
    navItems: [
        {
            label: "Check Bills",
            icon: FormInputIcon,
            path: "/app/check-bills"
        }
    ]
}

export const chairmanNavItems: NavConfigType = {
    navItems: [
        {
            label: "Manage billing sectors",
            icon: Grid2x2CheckIcon,
            path: "/app/billing-sectors",
        },
        {
            label: "Manage Activity Types",
            icon: LayoutListIcon,
            path: "/app/billing-activity-types",
        },
        {
            label: "Manage Billing Rules",
            icon: BookOpenTextIcon,
            path: "/app/billing-rule-book",
        },
    ]
}


export default chairmanNavItems;
