import {
    BookOpenText, BookOpenTextIcon,
    LightbulbIcon, ListTodoIcon, LucideIcon,
    NewspaperIcon,
    NotebookIcon,
    RouteIcon, SparkleIcon
} from "lucide-react";
import {NavConfigType} from "@/types/NavTypes";


export const navConfig: NavConfigType = {
    navItems: [
        {
            label: "Activity types",
            icon: LightbulbIcon,
            path: "/app/activitytypes",
        },
        {
            label: "Rule book",
            icon: BookOpenTextIcon,
            path: "/app/rule-book",
        },
    ]
}

export default navConfig;
