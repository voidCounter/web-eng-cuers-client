"use client";

import {ColumnDef} from "@tanstack/table-core";

import {Button} from "@/components/ui/button"
import {ArrowUpDown, ChevronDown, ChevronUp} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import TableCellCmp from "@/components/table/TableCell";
import EditCellCmp from "@/components/table/EditCell";
import {ExamBillType} from "@/types/ExamBillType";
import ViewBillPdfCellCmp from "@/app/app/check-bills/ViewBillPdfCellCmp";
import {QueryKey} from "@/utils/queryKeys";
import {ExamActivityType, FactorInformationType} from "@/types/ExamActivity";


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
        id: "expand",
        cell: ({column, table, row}) => {
            const metaOptions = table?.options?.meta as {
                expanded: Array<string>,
                setExpanded: (id: string) => void
            };
            return <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => {
                    metaOptions.setExpanded(row.id);
                }}
                className={"cursor-pointer"}
            >
                {
                    metaOptions?.expanded?.includes(row.id) ?
                        <ChevronUp className={"w-4 h-4"}/> :
                        <ChevronDown className={"h-4 w-4"}/>
                }
            </Button>
        }
    },
    {
        accessorKey: "exam_activity_type_id",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Exam Activity Type
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "select",
            language: "Bengali",
            fetchOptionsInfo: {
                fetch_url: process.env.NEXT_PUBLIC_CUERS_EXAM_ACTIVITY_TYPE ?? "",
                key: QueryKey.ACTIVITY_TYPE
            }
        }
    },
    {
        accessorKey: "bill_sector_id",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Bill Sector
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "select",
            language: "Bengali",
            fetchOptionsInfo: {
                fetch_url: process.env.NEXT_PUBLIC_CUERS_EXAM_BILL_SECTORS ?? "",
                key: QueryKey.BILL_SECTORS
            }
        }
    },
    {
        accessorKey: "teacher_id",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Evaluator
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "select",
            language: "Bengali",
            fetchOptionsInfo: {
                fetch_url: process.env.NEXT_PUBLIC_CUERS_TEACHERS ?? "",
                key: QueryKey.TEACHERS
            }
        }
    },
    {
        accessorKey: "course_id",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Course
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "select",
            language: "English",
            fetchOptionsInfo: {
                fetch_url: process.env.NEXT_PUBLIC_CUERS_COURSES ?? "",
                key: QueryKey.COURSES
            }
        }
    },
    {
        id: "display",
        cell: EditCellCmp,
    }
]

export const subColumns: ColumnDef<FactorInformationType>[] = [
    {
        accessorKey: "factor",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Factor
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "select",
            language: "Bengali",
            options: [
                {
                    label: "পরীক্ষার সংখ্যা",
                    value: "পরীক্ষার সংখ্যা"
                },
                {
                    label: "প্রশ্নের সংখ্যা",
                    value: "প্রশ্নের সংখ্যা"
                },
                {
                    label: "অর্ধ/পূর্ণ",
                    value: "অর্ধ/পূর্ণ"
                },
                {
                    label: "দিন",
                    value: "দিন"
                },
                {
                    label: "ঘণ্টা",
                    value: "ঘণ্টা"
                },
                {
                    label: "ছাত্রের সংখ্যা",
                    value: "ছাত্রের সংখ্যা"
                },
                {
                    label: "সদস্য সংখ্যা",
                    value: "সদস্য সংখ্যা"
                },
                {
                    label: "পৃষ্ঠার সংখ্যা",
                    value: "পৃষ্ঠার সংখ্যা"
                },
            ]
        }
    },
    {
        accessorKey: "quantity",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Quantity
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
        id: "display",
        cell: EditCellCmp,
    }
]
