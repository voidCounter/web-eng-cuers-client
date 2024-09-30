"use client";

import {ColumnDef} from "@tanstack/table-core";

import {Button} from "@/components/ui/button"
import {ArrowUpDown} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import TableCellCmp from "@/components/table/TableCell";
import EditCellCmp from "@/components/table/EditCell";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {BillSectorType} from "@/app/app/billing-sectors/columns";
import {QueryKey} from "@/utils/queryKeys";


export type BillingRuleType = {
    rule_id: number;              // auto_increment, primary key
    bill_sector_id: number;       // foreign key, not null
    exam_activity_type_id: number; // foreign key, not null
    quantity_initial: number;     // not null
    quantity_final: number;       // not null
    exam_bill: number;            // not null
    min_exam_bill: number;        // not null
    factor: string;               // varchar(200), not null
    valid_from: string;           // date (in JS/TS, dates are often handled as strings)
};
export const columns: ColumnDef<BillingRuleType>[] = [
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
                fetch_url: process.env.NEXT_PUBLIC_CUERS_EXAM_BILL_SECTORS,
                key: QueryKey.BILL_SECTORS
            }
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
            type: "text",
            language: "Bengali",
            fetchOptionsInfo: {
                fetch_url: process.env.NEXT_PUBLIC_CUERS_EXAM_ACTIVITY_TYPE,
                key: QueryKey.ACTIVITY_TYPE
            }
        }
    },

    {
        accessorKey: "quantity_initial",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Intial Quantity
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
        accessorKey: "quantity_final",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Final Quantity
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
        accessorKey: "exam_bill",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Exam bill
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
        accessorKey: "min_exam_bill",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Minimum Exam Bill
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
            options: [
                "পরীক্ষার সংখ্যা", "প্রশ্নের সংখ্যা", "ঘণ্টা", "ছাত্রের" +
                " সংখ্যা", "সদস্য সংখ্যা", "পরীক্ষার সংখ্যা", "পৃষ্ঠার" +
                " সংখ্যা", "কোর্স"
            ],
            language: "Bengali",
        }
    },
    {
        accessorKey: "valid_from",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Valid From
                    <ArrowUpDown className={"ml-2 h-4 w-4"}/>
                </Button>
            );
        },
        cell: TableCellCmp,
        meta: {
            type: "date",
        }
    },
    {
        id: "display",
        cell: EditCellCmp,
    }
]
