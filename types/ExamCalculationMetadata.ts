export type ExamCalculationMetadataType = {
    id: number;
    activity_id: number;
    calculation_amount?: number | null;
    last_calculated: Date; // Assuming you're working with dates in JavaScript/TypeScript
    calculation_status?: 'Failed' | 'Success' | null;
};