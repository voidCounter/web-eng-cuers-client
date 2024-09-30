"use client";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    VisibilityState
} from "@tanstack/table-core";
import {
    ColumnFiltersState,
    flexRender,
    useReactTable
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {DataTablePagination} from "@/components/ui/DataTablePagination";
import {DataTableViewOptions} from "@/components/ui/DataTableViewOptions";
import FooterCell from "@/components/table/FooterCell";
import {all} from "axios";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    newRow: TData,
    defaultData: TData[],
    onCreate: (newRow: TData) => Promise<TData | undefined>,
    onUpdate: (updatedRow: TData) => Promise<TData | undefined>
    onDelete: (row: TData) => Promise<TData | undefined>
}

export function DataTable<TData, TValue>({
                                             columns,
                                             defaultData,
                                             onUpdate, onCreate, onDelete,
                                             newRow,
                                         }: DataTableProps<TData, TValue>) {
    const [data, setData] = useState(() => [...defaultData]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [originalData, setOriginalData] = useState(() => [...defaultData]);

    useEffect(() => {
        const allMeta = columns.map((column) => column.meta);
        console.log(allMeta);
    }, []);

    const [editedRows, setEditedRows] = useState({});

    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        autoResetPageIndex: false,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters, columnVisibility, rowSelection
        },
        meta: {
            addRow: async (newRow: TData) => {
                const setFunc = (old: TData[]) => [...old, newRow];
                // table.lastPage();
                const addedRow = await onCreate(newRow);
                if (addedRow != undefined) {
                    setData(setFunc);
                    setOriginalData(setFunc);
                }
            },
            removeRow: async (rowIndex: number) => {
                console.log("To be removed: ", data[rowIndex]);
                const row = await onDelete(data[rowIndex]);
                if (row != undefined) {
                    const filterFunc = (old: TData[]) => old.filter((_row, index) => index != rowIndex);
                    setData(filterFunc);
                    setOriginalData(filterFunc);
                }
            },
            revertData: (rowIndex: number) => {
                setData((old) =>
                    old.map((row, index) => index == rowIndex ? originalData[rowIndex] : row));
            },
            updateRow: async (rowIndex: number) => {
                const updatedRow = await onUpdate(data[rowIndex]);
                console.log("After updating: ", updatedRow);
                if (updatedRow != undefined) {
                    const updateFunc = (old: TData[]) => old.map((row, index) => index == rowIndex ? data[rowIndex] : row);
                    setOriginalData(updateFunc);
                }
            },
            removeSelectedRows: (selectedRows: number[]) => {
                // TODO: Needs fix more multiple deletion
                const filterFunc = (rowIndex: number) => (old: TData[]) => old.filter((_row, index) => index != rowIndex);
                selectedRows.map(async (index) => {
                        const deleted = await onDelete(data[index])
                        if (deleted != undefined) {
                            setData(filterFunc(index));
                            setOriginalData(filterFunc(index));
                        }
                    }
                );
                // check if all deleted successfully, if not deleted
                // successfully on item will be undefined
                //  if all get successfully deleted
            },
            updateData: (rowIndex: number, columnId: string, value: string) => {
                setData((oldData) =>
                    oldData.map((row, index) => {
                        if (index == rowIndex) {
                            return {
                                ...oldData[rowIndex], [columnId]: value
                            };
                        }
                        return row;
                    }))
            },
            editedRows, setEditedRows
        }
    })
    return (
        <div>
            <div
                className="flex flex-row gap-2 items-center justify-between py-4">
                {/*<Input*/}
                {/*    placeholder="Filter Exam Activity Names"*/}
                {/*    value={(table.getColumn("exam_activity_name")?.getFilterValue() as string) ?? ""}*/}
                {/*    onChange={(event) =>*/}
                {/*        table.getColumn("exam_activity_name")?.setFilterValue(event.target.value)*/}
                {/*    }*/}
                {/*    className="max-w-sm"*/}
                {/*/>*/}
                <div className={"flex flex-row gap-2 justify-between w-full"}>
                    <FooterCell table={table} newRow={newRow}/>
                    <DataTableViewOptions table={table}/>
                </div>
            </div>
            <div className={"rounded-lg border"}>
                <Table className={""}>
                    <TableHeader className={"bg-foreground/5"}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        );
                                    })
                                }
                            </TableRow>))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}
                                                   className={"text-base"}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}
                                           className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} className={"mt-4"}/>
            <div className={"py-16"}></div>
        </div>
    );
}