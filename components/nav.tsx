"use client";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {Accordion} from "@/components/ui/accordion";

import NavItem from "@/components/navItem";
import LoggedInUserMenu from "@/components/LoggedInUserMenu";
import {chairmanNavItems, generateNavItems} from "@/config/navConfig";
import SelectRole from "@/components/SelectRole";
import {RoleType, useRoleStore} from "@/store/RoleStore";

export function Nav({className}: { className?: string }) {
    const {currentRole} = useRoleStore();
    const [roleState, setRoleState] = useState("");
    useEffect(() => {
        setRoleState(currentRole);
    }, [currentRole]);
    return (
        <div
            className={`w-full ${cn(className)} h-full flex flex-col justify-between`}>
            <nav className="grid gap-4 px-2 w-full">
                <SelectRole/>
                <Accordion type="single" collapsible
                           className="hover:decoration-0">
                    {generateNavItems(roleState as RoleType).navItems.map((navItem, index) => {
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