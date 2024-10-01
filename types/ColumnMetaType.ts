import {QueryKey} from "@/utils/queryKeys";
import {OptionType} from "@/types/optionType";

export interface ColmnMetaType {
    type: "select" | "text" | "date",
    language?: "Bengali" | "English",
    options?: OptionType[],
    fetchOptionsInfo?: { fetch_url: string, key: QueryKey },
}