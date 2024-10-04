"use client";
import {useTable} from "@/hooks/useTable";
import GenericTable from "@/components/GenericTablePage";
import Loading from "@/components/loading";
import {ExamActivityType} from "@/types/ExamActivity";
import {
    columns
} from "@/app/app/exam-activities/[year]/[exam]/ExamActivitiesColumn";

interface ExamActivitiesProps {
    currExamInfo: TeacherRoleInExamCommitteeInfoType | undefined;
}


export default function ExamActivities({
                                           currExamInfo
                                       }: ExamActivitiesProps) {
    const newExamActivity: ExamActivityType = {
        academic_session_id: -1,
        session: "", // Default empty string for session
        semester: 0,
        activity_id: -1,
        exam_activity_type_id: -1,
        teacher_id: -1,
        course_id: -1,
        exam_id: -1,
        exam_session: "", // Default empty string for exam session
        bill_sector_name: "", // Default empty string for bill sector name
        bill_sector_id: -1,
        last_modified: new Date().toISOString(), // Set the current date and time in ISO format
        factor_information: [
            {
                factor_id: -1,
                activity_id: -1,
                factor: "", // Default empty string for factor description
                quantity: 0 // Default quantity to 0
            }
        ]
    };
    const {
        data,
        isLoading,
        createMutation, updateMutation, deleteMutation,
        isError
    } = useTable<ExamActivityType>(`/cuers/evaluates-activity/${currExamInfo?.exam_id}`);
    if (isLoading) {
        return <Loading text={"Loading Billing Rules"}/>
    }
    console.log(data);
    return (
        <div>
            {
                data &&
                <GenericTable columns={columns} newRow={newExamActivity}
                              newSubRow={newExamActivity.factor_information[0]}
                              isExpanded={true}
                              data={data} isLoading={isLoading}
                              isError={isError} createMutation={createMutation}
                              updateMutation={updateMutation}
                              deleteMutation={deleteMutation}/>
            }
        </div>
    );
}
