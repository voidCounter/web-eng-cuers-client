export type Exam = {
    exam_id: number;                      // maps to int
    department_id: number;                // maps to int
    academic_session_id: number;          // maps to int
    exam_name: string;                    // maps to varchar(128)
    exam_centre: string;                  // maps to varchar(128)
    exam_session: string;                 // maps to varchar(16)
    exam_end_date: Date | null;           // maps to datetime, allowing null
    exam_start_date: Date | null;         // maps to datetime, allowing null
    is_result_submitted: boolean;         // maps to tinyint, using boolean for 0/1
    result_submit_date: Date | null;      // maps to datetime, allowing null
    committee_created: boolean;           // maps to tinyint, using boolean for 0/1
    is_result_completed: boolean;         // maps to tinyint, using boolean for 0/1
};
