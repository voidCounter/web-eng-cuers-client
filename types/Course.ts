export type CourseType = {
    course_id: number;        // Auto-increment primary key
    department_id: number;    // Foreign key referencing Department
    course_code: string;      // Max length 32
    course_title: string;     // Max length 128
    credit: number;           // Number of credits for the course
    course_type: 'Theory' | 'Lab' | 'Viva' | 'Thesis' | 'Project';  // Enum type for course type
    exam_minutes: number;     // Duration of the exam in minutes
};
