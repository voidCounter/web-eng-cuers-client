import {UserType} from "@/types/UserType";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {AuthenticatedSessionType} from "@/types/AuthenticatedSessionType";

interface AuthStore {
    authenticatedSession: AuthenticatedSessionType | null,
    _hasHydrated: boolean,
    setAuthenticatedSession: (session: AuthenticatedSessionType) => void,
    setAuthenticatedUser: (user: UserType) => void,
    deleteAuthenticatedSession: () => void,
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            authenticatedSession: null,
            _hasHydrated: false,
            setAuthenticatedSession: (session: AuthenticatedSessionType) => {
                set({authenticatedSession: session});
            },
            setAuthenticatedUser: (user: UserType) => {
                set((state) => ({
                    authenticatedSession: state.authenticatedSession ? {
                        ...state.authenticatedSession, user: user
                    } : null
                }));
            },
            deleteAuthenticatedSession: () => {
                set({authenticatedSession: null});
            }
        }),
        // TODO: implement a encrypted storage option
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                if (state) {
                    useAuthStore.setState({_hasHydrated: true})
                }
            }
        }
    ));