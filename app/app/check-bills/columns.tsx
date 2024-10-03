"use client";

import {ColumnDef} from "@tanstack/table-core";

import {Button} from "@/components/ui/button"
import {ArrowUpDown} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import TableCellCmp from "@/components/table/TableCell";
import EditCellCmp from "@/components/table/EditCell";
import {ExamBillType} from "@/types/ExamBillType";
import ViewBillPdfCellCmp from "@/app/app/check-bills/ViewBillPdfCellCmp";


export const columns: ColumnDef<ExamBillType>[] = [
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
        accessorKey: "exam_id",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Exam
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "text",
            language: "English",
        }
    },
    {
        accessorKey: "academic_session_id",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Academic Session
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "text",
            language: "English"
        }
    },
    {
        accessorKey: "teacher_id",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Teacher
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "text",
        }
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Academic Session
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "select",
            options: [
                {
                    value: "processing",
                    label: "Processing"
                },
                {
                    value: "approved",
                    label: "Approved"
                },
                {
                    value: "cancelled",
                    label: "Cancelled"
                },
                {
                    value: "waiting",
                    label: "Waiting"
                }

            ],
            language: "English"
        }
    },
    {
        id: "view-pdf",
        cell: ViewBillPdfCellCmp
    },
    {
        id: "display",
        cell: EditCellCmp,
    }
]
