"use client";

import {ColumnDef} from "@tanstack/table-core";

import {Button} from "@/components/ui/button"
import {ArrowUpDown} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import TableCellCmp from "@/components/table/TableCell";
import EditCellCmp from "@/components/table/EditCell";


export type BillSectorType = {
    bill_sector_id: number;
    bill_sector_name: string;
};

export const columns: ColumnDef<BillSectorType>[] = [
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
        accessorKey: "bill_sector_name",
        header: ({column}) => {
            return (
                <Button variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
                    Bill Sector Name
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
        id: "display",
        cell: EditCellCmp,
    }
]
