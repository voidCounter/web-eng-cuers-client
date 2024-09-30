import {QueryKey} from "@/utils/queryKeys";
import {Option} from "@/types/option";
import {BillSectorType} from "@/app/app/billing-sectors/columns";

export const handleSelectOptions = (key: QueryKey, data: any[]): Option[] => {
    if (data.length === 0) return [];
    console.log("Data: ", data);
    switch (key) {
        case QueryKey.BILL_SECTORS:
            return data.map((sector: BillSectorType) => ({
                label: sector.bill_sector_id + "-" + sector.bill_sector_name,
                value: sector.bill_sector_id
            }));
        case QueryKey.BILLING_RULES:
            return data.map((rule: any) => ({
                label: rule.name,
                value: rule.id
            }));
    }
    return [];
}