import {create} from "zustand";
import {persist} from "zustand/middleware";

type StaffRole = "chairman" | "registrar" | "none";
type CECRole = "cec" | "none";
type EvaluatorRole = "evaluator" | "none";

export type RoleType = StaffRole | CECRole | EvaluatorRole;

export interface RolesType {
    staff_role: StaffRole
    cec_role: CECRole
    evaluator_role: EvaluatorRole
}

interface RoleStore {
    roles: RolesType;
    currentRole: StaffRole | CECRole | EvaluatorRole,
    setRoles: (roles: RolesType) => void;
    setCurrentRole: (role: StaffRole | CECRole | EvaluatorRole) => void;
}

export const useRoleStore = create<RoleStore>()(persist((set) => ({
    roles: {
        staff_role: "none",
        cec_role: "none",
        evaluator_role: "none",
    },
    currentRole: "none",
    setCurrentRole: (role) => set({currentRole: role}),
    setRoles: (roles) => set({roles}),
}), {
    name: "role-storage",
}));