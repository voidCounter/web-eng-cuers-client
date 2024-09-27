"use client";
import {z} from "zod";
import React, {useEffect} from "react";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AxiosError, AxiosResponse} from "axios";
import {UserType} from "@/types/UserType";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {FormErrorType} from "@/types/FormErrorType";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useSettingStore} from "@/store/SettingStore";
import Loading from "@/components/loading";
import {PasswordInput} from "@/components/ui/PasswordInput";
import {LoginResponseType} from "@/types/LoginResponseType";
import {toast} from "sonner";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});


export default function Login() {
    const {
        authenticatedSession,
        setAuthenticatedSession,
        _hasHydrated,
        setAuthenticatedUser
    } = useAuthStore();
    const {lastRoute} = useSettingStore();
    const router = useRouter();
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const {
        data: userInfo,
        refetch: fetchUserInfo,
        isError: errorFetchingUserInfo,
        isSuccess
    } = useQuery({
            queryKey: ['user', authenticatedSession?.session_id],
            queryFn: (): Promise<UserType> => AxiosInstance.get("/user", {
                headers: {
                    "Authorization": `Bearer ${authenticatedSession?.session_id}`
                }
            }).then(response => response.data),
            enabled: false,
        }
    )

    if (errorFetchingUserInfo) {
        toast.error("Failed to fetch user information");
    }


    const {mutateAsync: login, isPending, isError} = useMutation({
        mutationFn: (data: z.infer<typeof loginSchema>) => AxiosInstance.post("/login", data),
        onSuccess: data => {
            const response: AxiosResponse<LoginResponseType> = data;
            console.log(response.data);
            // first time login
            if (response.data.user != null) {
                setAuthenticatedSession({
                    session_id: response.data.session_id,
                    user: response.data.user,
                    role: response.data.role
                });
            } else if (response.data.session_id != null) {
                // Session already exists - set only the session ID, then fetch user info
                setAuthenticatedSession({
                    session_id: response.data.session_id,
                    user: null,
                    role: null,
                });
            }
        },
        onError: error => {
            const axiosError
                = (error as AxiosError)?.response?.data as AxiosResponse
            if (axiosError.status == 403)
                toast.error("Invalid Credentials");
        },

    })

    function onLoginFormSubmit(data: z.infer<typeof loginSchema>) {
        useAuthStore.persist.rehydrate();
        login(data).then((data) => {
            // Ensure we have an authenticated session with session_id before fetching user info
            if (_hasHydrated && authenticatedSession?.session_id) {
                console.log("Still nothing");
                fetchUserInfo()
                    .then((response) => {
                        if (response.isSuccess) {
                            const user: UserType = response.data;
                            setAuthenticatedUser(user);
                            router.push("/app");
                        }
                        return response;
                    })
                    .then(() => {
                    })
                    .catch(error => {
                        console.error("Error fetching user info:", error);
                    });
            }
        });
    }

    return (
        <div className={"w-full px-4 h-screen no-scrollbar flex" +
            " justify-center overflow-y-scroll" +
            " items-center"}>
            <div className={"flex flex-col w-full rounded-lg" +
                " max-w-80"}>
                <div className={"flex-col mb-16"}>
                    <h2 className={"text-4xl font-bold"}>{`Welcome back to `}
                        <span
                            className={" bg-gradient-to-br" +
                                " from-red-400 to-indigo-900 bg-clip-text" +
                                " text-transparent"}>CUERS</span>
                    </h2>
                </div>
                {/*    form*/}
                <div className={"flex flex-col"}><Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}
                          className={"space-y-3  w-full"}>
                        <FormField control={loginForm.control} name={"email"}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormControl
                                           >
                                               <Input
                                                   placeholder={"Email"} {...field}/>
                                           </FormControl>
                                           <FormMessage className={"text-sm" +
                                               " font-normal"}/>
                                       </FormItem>
                                   )}>
                        </FormField>
                        <div className={"flex flex-col gap-2"}>
                            <FormField control={loginForm.control}
                                       name={"password"}
                                       render={({field}) => (
                                           <FormItem>
                                               <FormControl
                                               >
                                                   <PasswordInput
                                                       placeholder={"Password"}
                                                       autoComplete="current-password" {...field}
                                                   />
                                               </FormControl>
                                               <FormMessage
                                                   className={"text-sm font-normal"}/>
                                           </FormItem>
                                       )}>
                            </FormField>
                            <Link href={"/forgot-password"}
                                  className={"active:underline text-right" +
                                      " text-foreground/60 text-sm" +
                                      " hover:underline"}>Forgot
                                password?</Link>
                        </div>
                        <div className={"w-full pt-4"}>
                            <Button type={"submit"} className={"w-full"}
                                    disabled={isPending}
                            >{isPending ? <Loading
                                text={"Logging in"}/> : "Login"}</Button>
                        </div>
                    </form>
                </Form>
                    <h3 className={"mt-10 text-sm text-foreground/40 text-center"}>
                        By logging in, you agree to our <Link
                        href="/terms-of-service" className={"underline" +
                        " font-medium"}>Terms
                        of Service</Link> and <Link
                        href="/privacy-policy"
                        className={"underline font-medium"}>Privacy
                        Policy</Link>.
                    </h3>
                </div>
            </div>
        </div>
    );
}