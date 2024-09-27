import {BookOpenTextIcon, LayoutListIcon} from "lucide-react";
import {NavConfigType} from "@/types/NavTypes";
import {RoleType} from "@/store/RoleStore";

export const generateNavItems = (role: RoleType): NavConfigType => {
    switch (role) {
        case "chairman":
            return chairmanNavItems;
        // case "registrar":
        //     return registrarNavItems;
        default:
            return defaultNavItems;
    }
}

export const chairmanNavItems: NavConfigType = {
    navItems: [
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

export const defaultNavItems: NavConfigType = {
    navItems: [
        {
            label: "Activity types",
            icon: LayoutListIcon,
            path: "/app/activitytypes",
        },
        {
            label: "Rule book",
            icon: BookOpenTextIcon,
            path: "/app/rule-book",
        },
    ]
}

export default chairmanNavItems;
