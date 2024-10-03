import {TeacherType} from "@/types/TeacherType";
import {ExamInfoType} from "@/types/ExamInfoType";
import {UserType} from "@/types/UserType";
import {DepartmentType} from "@/types/DepartmentType";
import {create} from "zustand";

interface BillPdfDataStore {
    teacherInfo: TeacherType | {}
    examInfo: ExamInfoType | {}
    userInfo: UserType | {}
    department: DepartmentType | {},
    university: UniversityType | {},
    setTeacherInfo: (teacherInfo: TeacherType) => void,
    setExamInfo: (examInfo: ExamInfoType) => void,
    setUserInfo: (userInfo: UserType) => void,
    setDepartment: (department: DepartmentType) => void,
    setUniversity: (university: UniversityType) => void,
}

export const useBillPdfDataStore = create<BillPdfDataStore>((set) => ({
    teacherInfo: {},
    examInfo: {},
    userInfo: {},
    department: {},
    university: {},
    setTeacherInfo: (teacherInfo: TeacherType) => set({teacherInfo}),
    setExamInfo: (examInfo: ExamInfoType) => set({examInfo}),
    setUserInfo: (userInfo: UserType) => set({userInfo}),
    setDepartment: (department: DepartmentType) => set({department}),
    setUniversity: (university: UniversityType) => set({university}),
}));