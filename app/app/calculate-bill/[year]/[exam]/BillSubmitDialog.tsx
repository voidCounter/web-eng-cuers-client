import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ExamInfoType} from "@/types/ExamInfoType";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import Loading from "@/components/loading";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useBillPdfDataStore} from "@/store/BillPdfDataStore";
import {DepartmentType} from "@/types/DepartmentType";
import {UserType} from "@/types/UserType";

interface BillSubmitDialogProps {
    open: boolean
    onOpen: () => void,
}

const formSchema = z.object({
    file: z
        .instanceof(File)
});

export default function BillSubmitDialog({
                                             open,
                                             onOpen,
                                         }: BillSubmitDialogProps) {
    const {department, examInfo, userInfo} = useBillPdfDataStore();
    const currExamInfo = examInfo as ExamInfoType;
    const teacherDept = department as DepartmentType;
    const currUserInfo = userInfo as UserType;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {
        mutateAsync: insertIntoBillTable,
        isPending: isUpdatingBillTable
    } = useMutation({
        mutationFn: async (filePath: string) => await AxiosInstance.post("/cuers/exam-bill", {
            teacher_id: currUserInfo?.teacher_id,
            academic_session_id: currExamInfo?.academic_session_id,
            department_id: teacherDept?.department_id,
            exam_bill_position: 0,
            exam_id: currExamInfo?.exam_id,
            file_path: filePath
        })
    });

    const {mutateAsync: uploadFile, isPending: isUploading} = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const formData = new FormData();
            formData.append("items", data.file);
            console.log(data);
            return await fetch(`http://localhost:5000/api/upload`, {
                method: "POST",
                body: formData,
            }).then((res) => res.json()).then((data) => data);
        }
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res: {
            message: string, files: {
                path: string
            }[]
        } = await uploadFile(data);
        insertIntoBillTable(res.files[0].path);
        console.log("File uploaded", res);
    };
    return (<Dialog onOpenChange={() => onOpen()} open={open}>
            <DialogTrigger></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submit the bill pdf</DialogTitle>
                    <DialogDescription>
                        Your bill pdf will be submitted to the Chairman of Exam
                        Committee
                        of <span
                        className={"font-bold"}>{currExamInfo?.session}-{currExamInfo?.exam_name} exam</span>.
                        {`Please make sure you've downloaded and reviewed' +
                            ' the pdf
                        before submitting.`}
                    </DialogDescription>
                    <div className="grid w-full items-center gap-1.5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}
                                  className="w-full p-4 flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({field}) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>File</FormLabel>
                                                <FormControl>
                                                    <Input type="file"
                                                           placeholder="shadcn"
                                                           onChange={(event) => {
                                                               field.onChange(event.target?.files?.[0] ?? undefined);
                                                           }}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        );
                                    }}
                                />
                                <Button type="submit">{isUploading ?
                                    <Loading text="Uploading"/> :
                                    <div>Submit</div>}</Button>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}