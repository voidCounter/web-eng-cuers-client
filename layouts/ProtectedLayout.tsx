'use client';
import React, {useEffect, useLayoutEffect} from "react";
import {useAuthStore} from "@/store/AuthStore";
import {usePathname, useRouter} from "next/navigation";

export default function ProtectedLayout({children}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const {authenticatedSession, _hasHydrated} = useAuthStore();

    useLayoutEffect(() => {
        if (_hasHydrated && authenticatedSession?.session_id == null) {
            router.push("/login");
        }
    }, [authenticatedSession])
    return (
        <div className={"w-full"}>
            {children}
        </div>
    );
}