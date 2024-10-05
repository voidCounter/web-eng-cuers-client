import {generateNavItems} from "@/config/navConfig";
import {RoleType, useRoleStore} from "@/store/RoleStore";
import NavItem from "@/components/navItem";
import React, {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import Loading from "@/components/loading";
import {NavConfigType} from "@/types/NavTypes";
import {useAuthStore} from "@/store/AuthStore";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {AxiosResponse} from "axios";
import {ExamInfoType} from "@/types/ExamInfoType";
import {useEvaluatorExamInfoStore} from "@/store/EvaluatorExamInfoStore";
import {useCECExamInfoStore} from "@/store/CECExamInfoStore";

export default function DynamicNavCmp() {
    const {currentRole} = useRoleStore();
    const {authenticatedSession} = useAuthStore();
    const [generatedNavItems, setGeneratedNavItems] = React.useState<NavConfigType | null>(null);
    const {setCurrentEvaluatorExamInfo} = useEvaluatorExamInfoStore();
    const {setCurrentCECExamInfo} = useCECExamInfoStore();
    useEffect(() => {
        if (currentRole !== "evaluator" && currentRole !== "chairman-of-exam-committee") {
            setGeneratedNavItems(generateNavItems(currentRole as RoleType));
        }
    }, [currentRole]);

    const {
        data: cecExamInfo,
        isSuccess: cecExamInfoFetched,
        isLoading: fetchingCecExamInfo
    } = useQuery({
        queryKey: ["cecExamInfo", authenticatedSession?.user?.user_id],
        queryFn: async () => {
            const response: AxiosResponse<{
                exam_data: TeacherRoleInExamCommitteeInfoType[]
            }> = await AxiosInstance.get("/cuers/evaluates-activity");
            setCurrentCECExamInfo(response.data.exam_data);
            setGeneratedNavItems(generateNavItems(currentRole as RoleType, response.data.exam_data));
            return response.data;
        },
        enabled: currentRole === "chairman-of-exam-committee"
    });

    const {
        data: evaluatorExamInfo,
        isSuccess: evaluatorInfoFetched,
        isLoading: fetchingEvaluatorExamInfo
    } = useQuery({
            queryKey: ["evaluatorExamInfo", authenticatedSession?.user
                ?.user_id],
            queryFn: async () => {
                const response: AxiosResponse<{
                    data: ExamInfoType[]
                }> = await AxiosInstance.get("/cuers/calculate-bill");
                setCurrentEvaluatorExamInfo(response.data.data);
                setGeneratedNavItems(generateNavItems(currentRole as RoleType, response.data.data));
                return response.data.data;
            },
            enabled: currentRole === "evaluator"
        }
    );
    if (fetchingCecExamInfo || fetchingEvaluatorExamInfo) {
        return <Loading text={"..."}/>
    }
    return <div className={"w-full"}>
        {
            generatedNavItems && generatedNavItems?.navItems?.map((navItem, index) => {
                return (
                    <div key={index} className="flex flex-col">
                        <NavItem label={navItem.label}
                                 icon={navItem.icon} path={navItem.path}
                                 subItems={navItem.subItems}/>
                    </div>
                )
            })
        }
    </div>
}