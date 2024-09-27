"use client";

import {ColumnDef} from "@tanstack/table-core";
import {hind_siliguri} from "@/utils/fonts";
import {cn} from "@/lib/utils";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Button} from "@/components/ui/button"
import {
    ArrowUpDown,
    MoreHorizontal,
    Pencil,
    PencilIcon,
    TrashIcon
} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {useState} from "react";


export type ExamActivityType = {
    exam_activity_type_id: number;
    exam_activity_name: string;
    exam_category: string;
};

export const columns: ColumnDef<ExamActivityType>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions",
        cell: ({row}) => {
            const exam_activity_type_row = row.original as ExamActivityType;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(exam_activity_type_row.exam_activity_type_id.toString())}
                        >
                            Copy Row
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    },
    {
        accessorKey: "exam_activity_name",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Exam Activity Name
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: ({row}) => {
            return <div
                className={cn(hind_siliguri.className, "text-left ml-4")}>{row.getValue("exam_activity_name")}</div>
        }
    },
    {
        accessorKey: "exam_category",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Exam Category
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: ({row}) => {
            return <div
                className={cn(hind_siliguri.className, "text-left ml-4")}>{row.getValue("exam_category")}</div>
        }
    },
    {
        id: "editDelete",
        header: "",
        cell: ({row}) => {
            console.log(row);
            return (
                <div className={"flex flex-row gap-2"}>
                    <Button variant="outline" size={"icon"}
                            className="h-8 w-8 p-0">
                        <PencilIcon className="h-4 w-4 text-gray-600"/>
                    </Button>
                    <Button variant="outline" size={"icon"}
                            className="h-8 w-8 p-0">
                        <TrashIcon className="h-4 w-4 text-red-600"/>
                    </Button>
                </div>
            );
        }
    }
]
