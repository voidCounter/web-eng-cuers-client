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
import {useEvaluatorExamInfoStore} from "@/store/EvaluatorExamInfoStore";
import {useRouter} from "next/navigation";

export function Nav({className}: { className?: string }) {
    const route = useRouter();
    const {currentRole} = useRoleStore();
    const {setCurrentEvaluatorExamInfo} = useEvaluatorExamInfoStore();
    const [roleState, setRoleState] = useState<RoleType>("none");

    useEffect(() => {
        setRoleState(currentRole);
        // route to the first default route
    }, [currentRole]);


    const {
        data: evaluatorExamInfo,
        isSuccess: evaluatorInfoFetched
    } = useQuery({
            queryKey: ["evaulator_info"],
            queryFn: (): Promise<ExamInfoType[]> => fetchData("/cuers/calculate-bill").then((data) => {
                setCurrentEvaluatorExamInfo(data.data);
                return data.data;
            }),
            enabled: roleState == "evaluator" && roleState != undefined,
        }
    );

    // const {data: cecExamInfo, isSuccess: cecInfoFetched} = useQuery({
    //     queryKey: ["cec_info"],
    //     queryFn: (): Promise<ExamInfoType[]> => fetchData("/cuers/evaluates-activity").then((data) => {
    //         return data.data;
    //     }),
    //     enabled: roleState == "chairman-of-exam-committee" && roleState != undefined,
    // })
    // if (cecInfoFetched) {
    //     console.log(cecExamInfo);
    // }

    return (
        <div
            className={`w-full ${cn(className)} h-full flex flex-col justify-between`}>
            <nav className="grid gap-4 px-2 w-full">
                <SelectRole/>
                <Accordion type="single" collapsible
                           className="hover:decoration-0">
                    {generateNavItems(roleState as RoleType, evaluatorExamInfo)?.navItems?.map((navItem, index) => {
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