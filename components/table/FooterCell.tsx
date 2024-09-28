import {Table} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

interface FooterCellProps<T> {
    table: Table<T>,
    newRow: T,
}

export default function FooterCell<T>({table, newRow}: FooterCellProps<T>) {
    const selectedRows = table.getSelectedRowModel().rows;
    const tableMeta = table?.options?.meta as {
        addRow: (newRow: T) => void,
        removeSelectedRows: (selectedRows: number[]) => void
    }

    const removeRows = () => {
        tableMeta.removeSelectedRows(
            table.getSelectedRowModel().rows.map(row => row.index)
        )
        table.resetRowSelection();
    }
    return (<div className={"w-full flex flex-row gap-2"}>
        {
            selectedRows.length > 0 &&
            <Button onClick={removeRows} variant={"destructive"}>
                Remove selected
            </Button>
        }
        <Button className={""} variant={"outline"}
                onClick={() => {
                    tableMeta.addRow(newRow)
                }}><PlusIcon
            className={"w-4 h-4 mr-2"}/>
            Add New
        </Button>
    </div>);

}