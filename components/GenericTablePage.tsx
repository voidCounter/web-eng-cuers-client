// components/GenericTable.tsx
import React from "react";
import {DataTable} from "@/components/ui/data-table";
import {toast} from "sonner";
import Loading from "@/components/loading";

interface GenericTableProps<T> {
    columns: any;
    newRow: T;
    data: T[] | undefined;
    isLoading: boolean;
    isError: boolean;
    createMutation: any;
    updateMutation: any;
    deleteMutation: any;
}

const GenericTable = <T, >({
                               columns,
                               newRow,
                               data,
                               isLoading,
                               isError,
                               createMutation,
                               updateMutation,
                               deleteMutation,
                           }: GenericTableProps<T>) => {

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

    return (
        <DataTable
            columns={columns}
            newRow={newRow}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            defaultData={data ?? []}
        />
    );
};

export default GenericTable;
