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

    const handleCreate = async (newRow: T) => {
        try {
            const {mutateAsync, isSuccess} = createMutation;
            console.log(newRow);
            await mutateAsync(newRow);
            if (isSuccess) {
                toast.success("Row created successfully!");
            }
        } catch (error) {
            toast.error("Failed to create row");
        }
    };

    const handleUpdate = async (updatedRow: T) => {
        try {
            const {mutateAsync, isSuccess} = updateMutation;
            console.log(updatedRow);
            await mutateAsync({updatedRow});
            if (isSuccess) {
                toast.success("Row updated successfully!");
            }
        } catch (error) {
            toast.error("Failed to update row");
        }
    };

    const handleDelete = async (row: T) => {
        try {
            const {mutateAsync, isSuccess} = deleteMutation;
            console.log(row);
            await mutateAsync(row);  // You might need to pass the `id` here based on your API
            if (isSuccess) {
                toast.success("Row deleted successfully!");
            }
        } catch (error) {
            toast.error("Failed to delete row");
        }
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
