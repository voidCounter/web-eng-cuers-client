export type FactorInformationType = {
    factor_id: number;
    activity_id: number;
    factor: string;
    quantity: number;
};

export type ExamActivityType = {
    academic_session_id: number;
    session: string;
    semester: number;
    activity_id: number;
    exam_activity_type_id: number;
    teacher_id: number;
    course_id: number;
    exam_id: number;
    exam_session: string;
    bill_sector_name: string;
    bill_sector_id: number;
    last_modified: string; // ISO string for date
    factor_information: FactorInformationType[];
};
