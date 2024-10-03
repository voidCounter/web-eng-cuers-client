// Original data type
export type BillExamActivity = {
    id: number;
    activity_id: number;
    calculation_amount: number;
    last_calculated: string;
    calculation_status: string;
    factor: string;
    quantity: number;
    academic_session_id: number;
    bill_sector_id: number;
    bill_sector_name: string;
    course_id: string;
    department_id: number;
    exam_activity_type_id: number;
    exam_activity_name: string;
    exam_id: number;
    teacher_id: number;
    last_modified: string;
};

// Grouped data type
export type BillGroupedExamActivity = {
    activity_id: number;
    exam_activity_type_id: number;
    exam_activity_name: string;
    bill_sector_id: number;
    bill_sector_name: string;
    calculation_amount: number;
    last_calculated: string;
    calculation_status: string;
    course_id: string;
    department_id: number;
    academic_session_id: number;
    exam_id: number;
    teacher_id: number;
    last_modified: string;
    factors: Array<{
        factor: string;
        quantity: number;
    }>;
};
