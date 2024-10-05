"use client";
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import React, {useState} from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {useAuthStore} from "@/store/AuthStore";
import {RoleType, useRoleStore} from "@/store/RoleStore";
import {useRouter} from "next/navigation";

export default function SelectRole() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const {authenticatedSession} = useAuthStore();
    const route = useRouter();

    const {currentRole, setCurrentRole, roles} = useRoleStore();


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {currentRole
                        ? Object.entries(roles ?? {}).find((role) => role[1] === currentRole)?.at(1)
                        : "Select framework..."}
                    <ChevronsUpDown
                        className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {Object.entries(roles ?? {}).map((role: [string, RoleType]) => (
                                role[1] != "none" && <CommandItem
                                    key={role[0]}
                                    value={role[1]}
                                    onSelect={(currentValue: string) => {
                                        setValue(currentValue === currentRole ? "" : currentValue)
                                        setCurrentRole(currentValue as RoleType);
                                        setOpen(false);
                                        route.push("/app");
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            currentRole === role[1] ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {role[1]}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}