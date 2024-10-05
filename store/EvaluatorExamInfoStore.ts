import {ExamInfoType} from "@/types/ExamInfoType";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface EvaluatorExamInfoStore {
    evaluatorExamInfo: ExamInfoType[],
    setCurrentEvaluatorExamInfo: (examInfo: ExamInfoType[]) => void
}

export const useEvaluatorExamInfoStore = create<EvaluatorExamInfoStore>()(persist((set) => ({
    evaluatorExamInfo: [],
    setCurrentEvaluatorExamInfo: (examInfo: ExamInfoType[]) => set((state) => ({
        evaluatorExamInfo: examInfo
    }))
}), {
    name: "evaulatorExamInfo"
}));