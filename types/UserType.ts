export interface UserType {
    user_id: string;
    profile_image_id: number;
    sign_id: number;
    permanent_address_id: number;
    email: string;
    phone: string;
    first_name_bn: string;
    last_name_bn: string;
    first_name: string;
    last_name: string;
    dob: string; // ISO 8601 date format
    gender: 'male' | 'female' | 'other'; // Consider using union types for fixed values
    blood_group: string | null;
    religion: string;
    ethnicity: string;
    nationality: string;
    password: string;
    present_address_id: number;
    department_id: number;
    teacher_id: number;
    title: string;
    designation: string;
    area_of_interest: string;
    title_bn: string | null;
    designation_bn: string;
}
