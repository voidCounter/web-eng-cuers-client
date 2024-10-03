export type DepartmentType = {
    department_id: number;       // Primary key, auto-incremented
    department_name: string;     // Department name (not null)
    university_id: number;       // Foreign key to the University table (not null)
    faculty: string;             // Faculty the department belongs to (not null)
    undergrad_semester_no: number; // Number of undergraduate semesters (not null)
    grad_semester_no: number;      // Number of graduate semesters (not null)
    department_abbr: string;       // Department abbreviation (not null)
    department_name_bn?: string;   // Department name in Bangla (optional)
};
