export type TeacherType = {
    user_id: string;           // Corresponds to CHAR(36) in SQL
    department_id: number;     // Corresponds to INT in SQL
    teacher_id: number;        // Corresponds to INT in SQL (unique)
    title: string;             // Corresponds to VARCHAR(250) in SQL
    designation: string;       // Corresponds to VARCHAR(250) in SQL
    area_of_interest?: string; // Corresponds to nullable VARCHAR(250) in SQL
    title_bn?: string;         // Corresponds to nullable VARCHAR(250) in SQL
    designation_bn?: string;   // Corresponds to nullable VARCHAR(250) in SQL
};
