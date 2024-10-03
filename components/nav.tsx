"use client";
import React from "react";
import {cn} from "@/lib/utils";
import {Accordion} from "@/components/ui/accordion";

import NavItem from "@/components/navItem";
import LoggedInUserMenu from "@/components/LoggedInUserMenu";
import {generateNavItems} from "@/config/navConfig";
import SelectRole from "@/components/SelectRole";
import {RoleType, useRoleStore} from "@/store/RoleStore";
import {useQuery} from "@tanstack/react-query";
import {fetchData} from "@/utils/fetchData";
import {useEvaluatorExamInfoStore} from "@/store/EvaluatorExamInfoStore";
import {useRouter} from "next/navigation";

export function Nav({className}: { className?: string }) {
    const route = useRouter();
    const {currentRole} = useRoleStore();
    const {setCurrentEvaluatorExamInfo} = useEvaluatorExamInfoStore();

    const {
        data: evaluatorExamInfo,
        isSuccess: evaluatorInfoFetched
    } = useQuery({
            queryKey: ["cec-or-evaluator-info"],
            queryFn: async () => {
                if (currentRole === "evaluator") {
                    const response = await fetchData("/cuers/calculate-bill");
                    console.log(response);
                    return response.data;
                } else if (currentRole === "chairman-of-exam-committee") {
                    const response = await fetchData("/cuers/evaluates-activity");
                    console.log(response);
                    return response.data;
                }
                return null;  // Return null or empty data for other roles
            },
            enabled: currentRole != undefined && (currentRole == "evaluator" || currentRole == "chairman-of-exam-committee")
        }
    );

    return (
        <div
            className={`w-full ${cn(className)} h-full flex flex-col justify-between`}>
            <nav className="grid gap-4 px-2 w-full">
                <SelectRole/>
                <Accordion type="single" collapsible
                           className="hover:decoration-0">
                    {generateNavItems(currentRole as RoleType, evaluatorExamInfo)?.navItems?.map((navItem, index) => {
                        return (
                            <div key={index} className="flex flex-col">
                                <NavItem label={navItem.label}
                                         icon={navItem.icon} path={navItem.path}
                                         subItems={navItem.subItems}/>
                            </div>
                        )
                    })}
                </Accordion>
            </nav>
            <LoggedInUserMenu/>
        </div>
    );
}