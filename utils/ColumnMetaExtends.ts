import '@tanstack/react-table'
import {RowData} from "@tanstack/table-core";
import {Option} from "commander";
import {QueryKey} from "@/utils/queryKeys";
import {OptionType} from "@/types/optionType"; //or vue, svelte, solid, qwik, etc.

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        type: "select" | "text" | "date",
        language?: "Bengali" | "English",
        options?: OptionType[],
        fetchOptionsInfo?: { fetch_url: string, key: QueryKey },
        placeholder?: string,
    }
}