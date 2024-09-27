import {UserType} from "@/types/UserType";

export interface AuthenticatedSessionType {
    session_id: string | null;
    user: UserType | null;
    role: string | null;
}