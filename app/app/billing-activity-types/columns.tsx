"use client";

import {ColumnDef} from "@tanstack/table-core";

import {Button} from "@/components/ui/button"
import {ArrowUpDown} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import TableCellCmp from "@/components/table/TableCell";
import EditCellCmp from "@/components/table/EditCell";


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
        cell: TableCellCmp,
        meta: {
            type: "text",
            language: "Bengali",
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
        cell: TableCellCmp,
        meta: {
            type: "select",
            options: [
                {value: "কোর্স কার্যকলাপ", label: "কোর্স কার্যকলাপ"},
                {value: "সেমিস্টার কার্যকলাপ", label: "সেমিস্টার কার্যকলাপ"}
            ],
            placeholder: "Select Exam Activity Category",
            language: "Bengali"
        }
    },
    {
        id: "display",
        cell: EditCellCmp,
    }
]
