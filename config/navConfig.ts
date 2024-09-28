import {BookOpenTextIcon, Grid2x2CheckIcon, LayoutListIcon} from "lucide-react";
import {NavConfigType} from "@/types/NavTypes";
import {RoleType} from "@/store/RoleStore";

export const generateNavItems = (role: RoleType): NavConfigType => {
    switch (role) {
        case "chairman":
            return chairmanNavItems;
        // case "registrar":
        //     return registrarNavItems;
        default:
            return chairmanNavItems;
    }
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
