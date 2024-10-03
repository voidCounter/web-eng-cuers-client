"use client";

import {useQuery} from "@tanstack/react-query";
import {Document} from "@react-pdf/renderer";

interface BillPdfTopProps {
    file_path: string
}

export default function PdfViewer({file_path}: BillPdfTopProps) {
    // const {data} = useQuery({
    //     queryKey: ['pdf', `${file_path}`],
    //     queryFn: async () => {
    //         const response = await fetch(`/upload/${file_path.split("/").pop()}`);
    //         return response.blob();
    //     },
    //     enabled: true
    // })
    // return <div>
    //     <Document file={`/upload/${file_path.split("/").pop()}`}/>
    // </div>
}