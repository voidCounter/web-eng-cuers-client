import {UserType} from "@/types/UserType";

export interface LoginResponseType {
    message: string;
    session_id: string | null;
    user: UserType | null;
    role: string | null
}