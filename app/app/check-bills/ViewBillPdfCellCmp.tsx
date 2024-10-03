"use client";
import {CellContext} from "@tanstack/table-core";
import {Button} from "@/components/ui/button";
import {FileIcon} from "lucide-react";
import {useRouter} from "next/navigation";

export default function ViewBillPdfCellCmp({
                                               row,
                                               table
                                           }: CellContext<any, any>) {
    const route = useRouter();
    return (
        <div>
            <Button
                onClick={() => window.open(`http://localhost:5000/upload/${row.original.file_path.split('/').pop()}`, '_blank')}
                variant="outline">
                <FileIcon className="h-4 w-4 mr-2"/>
                View bill form</Button>
        </div>
    );
}