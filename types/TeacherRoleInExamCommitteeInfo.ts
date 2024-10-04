type TeacherRoleInExamCommitteeInfoType = {
    exam_id: number;
    teacher_id: number;
    role: string;
    formation_date: string; // ISO string for date
    department_id: number;
    academic_session_id: number;
    exam_name: string;
    exam_centre: string;
    exam_session: string;
    exam_end_date: string; // ISO string for date
    exam_start_date: string; // ISO string for date
    is_result_submitted: number; // 0 or 1
    result_submit_date: string; // ISO string for date
    committee_created: number; // 0 or 1
    is_result_completed: number; // 0 or 1
    session: string;
    semester: number;
    program_id: number;
};