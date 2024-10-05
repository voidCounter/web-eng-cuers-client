import {create} from "zustand";
import {persist} from "zustand/middleware";

interface CECExamInfoStore {
    cecExamInfo: TeacherRoleInExamCommitteeInfoType[],
    setCurrentCECExamInfo: (examInfo: TeacherRoleInExamCommitteeInfoType[]) => void
}

export const useCECExamInfoStore = create<CECExamInfoStore>()(persist((set) => ({
    cecExamInfo: [],
    setCurrentCECExamInfo: (examInfo: TeacherRoleInExamCommitteeInfoType[]) => set((state) => ({
        cecExamInfo: examInfo
    }))
}), {
    name: "cecExamInfo"
}));
