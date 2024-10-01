"use client";
import {useEffect, useState} from "react";
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
import {QueryKey} from "@/utils/queryKeys";
import {OptionType} from "@/types/optionType";
import {useOptionStore} from "@/store/OptionStore";
import {formatDate} from "date-fns";
import {formatDateString} from "@/utils/formatDate";
import {CalendarPopOver} from "@/components/ui/CalendarPopOver";


export default function TableCellCmp(props: CellContext<any, any>) {
    // handling different types:
    const {table, row, getValue, cell, column} = props;
    const columnMeta = column.columnDef.meta as {
        type: string,
        options?: OptionType[],
        fetchOptionsInfo?: { fetch_url: string, key: QueryKey },
        placeholder?: string,
        language?: "Bengali" | "English"
    };

    const {options} = useOptionStore();
    const [passedOptions, setPassedOptions] = useState<OptionType[]>([]);

    useEffect(() => {
        setPassedOptions(() => {
            if (columnMeta.options) return columnMeta.options;
            if (columnMeta?.fetchOptionsInfo?.key) {
                if (options[columnMeta.fetchOptionsInfo?.key]) {
                    return options[columnMeta.fetchOptionsInfo?.key];
                }
            }
            return [];
        });
    }, [options]);

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
                // TODO: Instead of select use
                return (
                    <Select onValueChange={(value) => onSelectChange(value)}
                            value={value.toString()}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue
                                placeholder={columnMeta?.placeholder ?? "Select"}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                passedOptions.map((option) => <SelectItem
                                    key={option.value}
                                    className={cn(columnMeta?.language == "Bengali" && kalpurush.className)}
                                    value={option.value.toString()}>{option.label}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                )
                    ;
            } else if (columnMeta.type == "date") {
                return <CalendarPopOver value={value}/>
            }
        } else {
            if (columnMeta?.type == "select") {
                return <div>
                    {passedOptions?.filter((item => {
                        return item.value == value;
                    }))[0]?.label}
                </div>
            } else if (columnMeta?.type == "text") {
                return <div>{value}</div>
            } else if (columnMeta?.type == "date") {
                return <div>{formatDateString(value)}</div>
            } else {
                return <div>{value}</div>
            }
        }
    }

    return (<div
        className={cn(columnMeta?.language == "Bengali" && kalpurush.className)}>{cellContent()}</div>)
}