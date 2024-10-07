import {
    BillExamActivity,
    BillGroupedExamActivity
} from "@/types/BillActivityType";

export const groupBillData = (data: BillExamActivity[]): BillGroupedExamActivity[] => {
    const result: BillGroupedExamActivity[] = [];

    data.forEach(item => {
        // Find an existing entry with the same exam_activity_type_id and bill_sector_id
        const existingEntry = result.find(
            entry =>
                entry.exam_activity_type_id === item.exam_activity_type_id &&
                entry.bill_sector_id === item.bill_sector_id
        );

        if (existingEntry && (existingEntry.course_code != "" || existingEntry.course_code != null)) {
            // If found, sum the calculation_amount and concatenate the course_id
            const existingCourseIds = existingEntry?.course_code?.split(",");
            // what if course doesn't exist?

            if (!existingCourseIds?.includes(item.course_code) && item.activity_id != existingEntry?.activity_id) {
                existingEntry.course_code += `,${item.course_code}`;
            }

            // Merge the factors array
            existingEntry.factors.push({
                factor: item.factor,
                quantity: item.quantity
            });
        } else {
            // If not found, create a new entry
            result.push({
                activity_id: item.activity_id,
                exam_activity_type_id: item.exam_activity_type_id,
                exam_activity_name: item.exam_activity_name,
                bill_sector_id: item.bill_sector_id,
                bill_sector_name: item.bill_sector_name,
                calculation_amount: item.calculation_amount,
                course_code: item.course_code,
                last_calculated: item.last_calculated,
                calculation_status: item.calculation_status,
                course_id: `${item.course_id}`,  // Store course_id as a string
                department_id: item.department_id,
                academic_session_id: item.academic_session_id,
                exam_id: item.exam_id,
                teacher_id: item.teacher_id,
                last_modified: item.last_modified,
                factors: [
                    {
                        factor: item.factor,
                        quantity: item.quantity
                    }
                ]
            });
        }
    });

    return result;
};