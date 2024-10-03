export type ExamBillType = {
    exam_bill_id: number;
    teacher_id: number;
    academic_session_id: number;
    department_id: number;
    exam_bill_position: number;
    exam_id: number;
    file_path: string;
    status: 'approved' | 'waiting' | 'processing' | 'cancelled';
};
