export type EvaluatesActivityType = {
    activity_id: number;
    exam_activity_type_id: number;
    academic_session_id: number;
    teacher_id: number;
    bill_sector_id: number;
    course_id?: number | null;
    department_id: number;
    exam_id: number;
    last_modified: Date;
};