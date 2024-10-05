"use client";
import React, {useEffect} from "react";
import {cn} from "@/lib/utils";
import {Accordion} from "@/components/ui/accordion";
import LoggedInUserMenu from "@/components/LoggedInUserMenu";
import SelectRole from "@/components/SelectRole";
import {RolesType, RoleType, useRoleStore} from "@/store/RoleStore";
import {useQuery} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useAuthStore} from "@/store/AuthStore";
import DynamicNavCmp from "@/components/dynamicNavCmp";
import Loading from "@/components/loading";

export function Nav({className}: { className?: string }) {
    const {authenticatedSession} = useAuthStore();
    const updateStore = () => {
        useAuthStore.persist.rehydrate();
    };
    const {setRoles, setCurrentRole, currentRole} = useRoleStore();

    useEffect(() => {
        document.addEventListener("visibilitychange", updateStore);
        window.addEventListener("focus", updateStore);
        return () => {
            document.removeEventListener("visibilitychange", updateStore);
            window.removeEventListener("focus", updateStore);
        };
    }, [currentRole]);


    // fetching the roles of the currently loggedin user
    const {
        data: roles,
        isLoading: rolesDataLoading,
        isFetching: rolesDataFetching,
        isSuccess: rolesFetched
    } = useQuery({
        queryKey: ["roles-", authenticatedSession?.user?.user_id],
        queryFn: async (): Promise<RolesType> => await AxiosInstance.get("/cuers").then((response) => {
            console.log(response);
            if (response.data) {
                setRoles(response.data.roles);
                let isCurrentRolePresent: boolean = false;
                let firstNonNoneRole: RoleType = "none";
                Object.entries(response.data.roles).map((item) => {
                    if (item[1] != "none") {
                        firstNonNoneRole = item[1] as RoleType;
                    }
                    if (currentRole != undefined && item[1] == currentRole) {
                        isCurrentRolePresent = true;
                    }
                });
                if (isCurrentRolePresent && currentRole != "none") {
                    setCurrentRole(currentRole);
                } else {
                    setCurrentRole(firstNonNoneRole);
                }
                return response.data.roles;
            }
        }),
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        // refetchOnMount: false,
    });
    if (rolesDataLoading || rolesDataFetching) {
        return <Loading text={""}/>
    }
    return (
        <div
            className={`w-full ${cn(className)} h-full flex flex-col justify-between`}>
            <nav className="grid gap-4 px-2 w-full">
                <SelectRole/>
                <Accordion type="single" collapsible
                           className="hover:decoration-0">
                    <DynamicNavCmp/>
                </Accordion>
            </nav>
            <LoggedInUserMenu/>
        </div>
    );
}