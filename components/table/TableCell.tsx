"use client";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {CellContext} from "@tanstack/table-core";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {kalpurush} from "@/utils/fonts";
import {useQuery} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {QueryKey} from "@/utils/queryKeys";
import {Option} from "@/types/option";
import {handleSelectOptions} from "@/utils/SelectOptionsHandler";


export default function TableCellCmp(props: CellContext<any, any>) {
    // handling different types:
    const {table, row, getValue, cell, column} = props;
    const columnMeta = column.columnDef.meta as {
        type: string,
        options?: Option[],
        fetchOptionsInfo?: { fetch_url: string, key: QueryKey },
        placeholder?: string,
        language?: "Bengali" | "English"
    };

    const [options, setOptions] = useState<Option[]>(columnMeta.options ?? []);

    const {
        data: fetchedOptionData,
        isSuccess: selectOptionsFetched
    } = useQuery({
        queryKey: [columnMeta.fetchOptionsInfo?.key],
        queryFn: async () => {
            if (columnMeta.fetchOptionsInfo?.fetch_url.endsWith(".json")) {
                return await fetch(columnMeta.fetchOptionsInfo?.fetch_url).then(res => res.json());
            }
            const response = await AxiosInstance.get(columnMeta.fetchOptionsInfo?.fetch_url ?? "");
            return response?.data?.data;
        },
        enabled: false
    })
    if (selectOptionsFetched) {
        const key = columnMeta.fetchOptionsInfo?.key;

        if (Object.values(QueryKey).includes(key as QueryKey)) {
            const selectOptions = handleSelectOptions(key as QueryKey, fetchedOptionData);
            setOptions(selectOptions);
        } else {
            console.warn(`Invalid query key: ${key}`);
        }
    }


    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const tableMeta = table.options.meta as {
        updateData: (rowIndex: number, columnId: string, value: string) => void,
        editedRows: [],
    }

    const onBlur = () => {
        tableMeta.updateData(row.index, column.id, value)
    }

    const onSelectChange = (newValue: string) => {
        setValue(newValue);
        tableMeta?.updateData(row.index, column.id, newValue);
    }


    const cellContent = () => {
        // @ts-ignore
        if (tableMeta?.editedRows[row.id]) {
            if (columnMeta.type == "text") {
                return <Input value={value} onChange={e => {
                    setValue(e.target.value);
                }}
                              onBlur={onBlur}/>
            } else if (columnMeta.type == "select") {
                return (
                    <Select onValueChange={(value) => onSelectChange(value)}
                            value={value}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue
                                placeholder={columnMeta?.placeholder ?? "Select"}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                options.map((option) => <SelectItem
                                    key={option.value}
                                    className={cn(columnMeta?.language == "Bengali" && kalpurush.className)}
                                    value={option.value.toString()}>{option.label}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                )
                    ;
            }
        } else {
            return <div
                className={cn("ml-4")}>{value}</div>
        }
    }

    return (<div
        className={cn(columnMeta?.language == "Bengali" && kalpurush.className)}>{cellContent()}</div>)


}