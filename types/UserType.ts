export interface UserType {
    user_id: string;                // char(36) in SQL can be represented as a string (UUID)
    profile_image_id?: number | null;  // int, can be nullable
    sign_id?: number | null;           // int, can be nullable
    permanent_address_id: number;   // int, not null
    email: string;                  // varchar(250), not null
    phone?: string | null;          // varchar(20), nullable
    first_name_bn?: string | null;  // varchar(250), nullable
    last_name_bn?: string | null;   // varchar(250), nullable
    first_name: string;             // varchar(250), not null
    last_name: string;              // varchar(250), not null
    dob: string;                    // date, typically represented as string (ISO date format)
    gender?: string | null;         // varchar(64), nullable
    blood_group?: string | null;    // varchar(4), nullable
    religion?: string | null;       // varchar(128), nullable
    ethnicity?: string | null;      // varchar(128), nullable
    nationality?: string | null;    // varchar(128), nullable
    password: string;               // varchar(32), not null
    present_address_id: number;     // int, not null
}
