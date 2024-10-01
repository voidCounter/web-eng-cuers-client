import {CellContext} from "@tanstack/table-core";
import React, {Dispatch, SetStateAction} from "react";
import {Button} from "@/components/ui/button";
import {CheckIcon, PencilIcon, TrashIcon, XIcon} from "lucide-react";

export default function EditCellCmp({row, table}: CellContext<any, any>) {
    const meta = table.options.meta as {
        editedRows: [],
        setEditedRows: Dispatch<SetStateAction<{}>>,
        revertData: (rowIndex: number) => void,
        removeRow: (rowIndex: number) => void
        updateRow: (rowIndex: number) => void
    };

    const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
        const elName = e.currentTarget.name;
        meta?.setEditedRows((old: []) => ({
                // @ts-ignore
                ...old, [row.id]: !old[row.id],
            }
        ))
        if (elName != "edit") {
            e.currentTarget.name == "cancel" ? meta?.revertData(row.index) : meta?.updateRow(row.index);
        }
    }

    const removeRow = () => {
        console.log("to be removed...");
        meta?.removeRow(row.index);
    }

    // @ts-ignore
    return meta?.editedRows[row.id] ? (
        <div className={"flex flex-row gap-2"}>
            <Button variant={"outline"} size={"icon"} name={"cancel"}
                    onClick={setEditedRows}>
                <XIcon className={"w-4 h-4"}/>
            </Button>
            <Button variant={"outline"} size={"icon"} onClick={setEditedRows}
                    name={"done"}>
                <CheckIcon className={"w-4 h-4"}/>
            </Button>
        </div>
    ) : <div className={"flex flex-row gap-2"}><Button variant={"outline"}
                                                       size={"icon"}
                                                       onClick={setEditedRows}
                                                       name={"edit"}>
        <PencilIcon className={"w-4 h-4"}/>
    </Button>
        <Button variant={"outline"} className={"text-destructive"} size={"icon"}
                onClick={() => {
                    removeRow();
                    console.log("trashhhhhhh")
                }}>
            <TrashIcon className={"h-4 w-4"}/>
        </Button>
    </div>


}