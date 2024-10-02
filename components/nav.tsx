"use client";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {Accordion} from "@/components/ui/accordion";

import NavItem from "@/components/navItem";
import LoggedInUserMenu from "@/components/LoggedInUserMenu";
import {chairmanNavItems, generateNavItems} from "@/config/navConfig";
import SelectRole from "@/components/SelectRole";
import {RolesType, RoleType, useRoleStore} from "@/store/RoleStore";
import {useQuery} from "@tanstack/react-query";
import {fetchData} from "@/utils/fetchData";
import {ExamInfoType} from "@/types/ExamInfoType";
import {promises} from "node:dns";
import {Exam} from "@/types/ExamType";

export function Nav({className}: { className?: string }) {
    const {currentRole} = useRoleStore();
    const [roleState, setRoleState] = useState<RoleType>("none");
    useEffect(() => {
        setRoleState(currentRole);
    }, [currentRole]);

    const {data: examInfo, isSuccess: evaluatorInfoFetched} = useQuery({
            queryKey: ["evaulator_info"],
            queryFn: (): Promise<ExamInfoType[]> => fetchData("/cuers/calculate-bill").then((data) => data.data),
            enabled: roleState == "evaluator",
        }
    );

    if (evaluatorInfoFetched) {
        console.log(examInfo);
    }
    return (
        <div
            className={`w-full ${cn(className)} h-full flex flex-col justify-between`}>
            <nav className="grid gap-4 px-2 w-full">
                <SelectRole/>
                <Accordion type="single" collapsible
                           className="hover:decoration-0">
                    {generateNavItems(roleState as RoleType, examInfo)?.navItems?.map((navItem, index) => {
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