export type TeacherPersonalInfo = {
    user_id: string;
    department_id: number;
    teacher_id: number;
    title: string;
    designation: string;
    area_of_interest: string;
    title_bn: string;
    designation_bn: string;
    profile_image_id: number;
    sign_id: number;
    permanent_address_id: number;
    email: string;
    phone: string;
    first_name_bn: string;
    last_name_bn: string;
    first_name: string;
    last_name: string;
    dob: string; // ISO string for date
    gender: string;
    blood_group: string;
    religion: string;
    ethnicity: string;
    nationality: string;
    password: string;
    present_address_id: number;
};

type ProfileImage = {
    image_id: number;
    image_type: string;
    image_path: string | null;
    remote_image_url: string;
};

export type TeacherType = {
    personal_info: TeacherPersonalInfo
    profile_image: ProfileImage;
};