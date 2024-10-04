// components/GenericTable.tsx
import React from "react";
import {DataTable} from "@/components/ui/data-table";
import {toast} from "sonner";
import Loading from "@/components/loading";
import {
    subColumns
} from "@/app/app/exam-activities/[year]/[exam]/ExamActivitiesColumn";
import {
    ExpandedDataTable
} from "@/app/app/exam-activities/[year]/[exam]/ExamActivitiesExpandedDataTable";

interface GenericTableProps<T, T1> {
    columns: any;
    subColumns?: any;
    newRow: T;
    newSubRow?: T1;
    data: T[] | undefined;
    showAddButton?: boolean;
    isLoading: boolean;
    showPagination?: boolean;
    isExpanded?: boolean;
    isError: boolean;
    createMutation: any;
    updateMutation: any;
    deleteMutation: any;
}

const GenericTable = <T, T1>({
                                 columns,
                                 subColumns,
                                 newRow,
                                 newSubRow,
                                 data,
                                 isExpanded,
                                 showPagination, showAddButton,
                                 isLoading,
                                 isError,
                                 createMutation,
                                 updateMutation,
                                 deleteMutation,
                             }: GenericTableProps<T, T1>) => {

    const handleCreate = async (newRow: T): Promise<T | undefined> => {
        try {
            const {mutateAsync, isSuccess} = createMutation;
            console.log(newRow);
            return await mutateAsync(newRow, {
                onSuccess: () => {
                    toast.success("Row created successfully!");
                    return newRow;
                }
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to create row");
        }
        return undefined;
    };

    const handleUpdate = async (updatedRow: T): Promise<undefined | T> => {
        try {
            const {mutateAsync} = updateMutation;
            return await mutateAsync({updatedRow}, {
                onSuccess: () => {
                    toast.success("Row updated successfully!");
                    return updatedRow;
                }
            });
        } catch (error) {
            toast.error("Failed to update row");
        }
        return undefined;
    };

    const handleDelete = async (row: T): Promise<T | undefined> => {
        try {
            const {mutateAsync} = deleteMutation;
            return await mutateAsync(row, {
                onSuccess: () => {
                    toast.success("Row deleted successfully!");
                    return row;
                }
            });
        } catch (error) {
            toast.error("Failed to delete row");
        }
        return undefined;
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        toast.error("Failed to fetch data");
        return null;
    }

    if (!isExpanded) {
        return (
            <DataTable
                columns={columns}
                newRow={newRow}
                showPagination={showPagination}
                showAddButton={showAddButton}
                showSpacerBelow={true}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                defaultData={data ?? []}
            />
        );
    }
    return <ExpandedDataTable columns={columns} newSubRow={newSubRow}
                              newRow={newRow}
                              subColumns={subColumns as any}
                              defaultData={data ?? []} onCreate={createMutation}
                              onUpdate={updateMutation}
                              onDelete={deleteMutation}/>
};

export default GenericTable;
