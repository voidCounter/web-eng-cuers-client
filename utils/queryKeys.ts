export enum QueryKey {
    BILL_SECTORS = "bill_sectors",
    BILLING_RULES = "billing_rules",
    ACTIVITY_TYPE = "exam-activity-type"
}

export function convertToQueryKey(key: string): QueryKey {
    const convertedValue = QueryKey[key as keyof typeof QueryKey];
    if (convertedValue != undefined) {
        return convertedValue;
    } else {
        throw new Error("Invalid Query Key");
    }
}