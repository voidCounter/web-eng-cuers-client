import {create} from "zustand";
import {persist} from "zustand/middleware";

type ChairmanRole = "chairman" | "none";
type CECRole = "chairman-of-exam-committee" | "none";
type EvaluatorRole = "evaluator" | "none";
type AccountBillSectionRole = "account_bill_section" | "none";
type ExamBillSection = "exam_bill_section" | "none";
type AccountChequeSectionRole = "account_cheque_section" | "none";
type AccountChiefRole = "account_chief" | "none";
type ExamControllerRole = "exam_controller" | "none";
type SectionOfficerRole = "section_officer" | "none";

export type RoleType =
    ChairmanRole
    | CECRole
    | ExamBillSection
    | EvaluatorRole
    | AccountChiefRole
    | AccountChequeSectionRole
    | AccountBillSectionRole
    | ExamControllerRole
    | SectionOfficerRole

export interface RolesType {
    chairman_role: ChairmanRole
    cec_role: CECRole
    evaluator_role: EvaluatorRole
    account_bill_section_role: AccountBillSectionRole
    account_cheque_section_role: AccountChequeSectionRole
    account_chief_role: AccountChiefRole
    exam_controller_role: ExamControllerRole
    exam_bill_section_role: ExamBillSection
    section_officer_role: SectionOfficerRole
}

interface RoleStore {
    roles: RolesType;
    currentRole: RoleType
    setRoles: (roles: RolesType) => void;
    setCurrentRole: (role: RoleType) => void;
    deleteRoleStore: () => void;
}

export const useRoleStore = create<RoleStore>()(persist((set) => ({
            roles: {
                chairman_role: "none",
                account_chief_role: "none",
                account_bill_section_role: "none",
                account_cheque_section_role: "none",
                exam_controller_role: "none",
                section_officer_role: "none",
                exam_bill_section_role: "none",
                cec_role: "none",
                evaluator_role: "none",
            },
            currentRole: "none",
            setCurrentRole: (role) => set({currentRole: role}),
            setRoles: (roles) => set({roles}),
            deleteRoleStore: () => set({
                currentRole: "none", roles: {
                    chairman_role: "none",
                    account_chief_role: "none",
                    account_bill_section_role: "none",
                    account_cheque_section_role: "none",
                    exam_controller_role: "none",
                    section_officer_role: "none",
                    exam_bill_section_role: "none",
                    cec_role: "none",
                    evaluator_role: "none",
                }
            }),
        }),
        {
            name: "role-storage",
        }
    ))
;