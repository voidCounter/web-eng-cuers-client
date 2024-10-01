import {QueryKey} from "@/utils/queryKeys";
import {OptionType} from "@/types/optionType";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type OptionsMapping = {
    [key in QueryKey]: OptionType[];
};

interface OptionStoreType {
    options: OptionsMapping;
    setOptions: (key: QueryKey, options: OptionType[]) => void;
}

export const useOptionStore = create<OptionStoreType>()(persist((set) => ({
    options: {
        [QueryKey.ACTIVITY_TYPE]: [],
        [QueryKey.BILL_SECTORS]: [],
        [QueryKey.BILLING_RULES]: []
    },
    setOptions: (key, options) => set((state) => ({
        options: {
            ...state.options,
            [key]: options
        }
    })),
}), {
    name: "option-storage",
}));