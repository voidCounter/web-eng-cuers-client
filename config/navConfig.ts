import {
    BookOpenTextIcon, CalendarFoldIcon,
    CalendarIcon,
    Grid2x2CheckIcon,
    LayoutListIcon
} from "lucide-react";
import {NavConfigType} from "@/types/NavTypes";
import {RoleType} from "@/store/RoleStore";
import {ExamInfoType} from "@/types/ExamInfoType";
import {generateSlug} from "@/utils/slugGenerator";


export const generateNavItems = (role: RoleType, examInfo?: ExamInfoType[]): NavConfigType => {
    switch (role) {
        case "chairman":
            return chairmanNavItems;
        case "chairman-of-exam-committee":
            return cecNavItems;
        case "evaluator": {
            let evaluatorNavItems: NavConfigType = {navItems: []};
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
            return chairmanNavItems;
    }
}

export const cecNavItems: NavConfigType = {
    navItems: [
        {
            label: "Manage activity data",
            icon: Grid2x2CheckIcon,
            path: "/app/manage-activity-data"
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
