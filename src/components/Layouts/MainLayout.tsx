"use client";

import { useAuthStore } from "@/stores/authStore";
import { useChatStore } from "@/stores/chatStore";
import { User } from "@/types/User"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { BarLoader } from 'react-spinners';
import { LeftSide } from "./LeftSide";
import {
    Sheet,
    SheetContent
} from "@/components/ui/sheet"

type Props = {
    user: User | null,
    children: React.ReactNode
}

export const MainLayout = ({ user, children }: Props) => {
    const auth = useAuthStore()
    const setUser = useAuthStore((state) => state.setUser)
    const { showChatsList, setShowChatsList } = useChatStore()

    const [loading, setLoading] = useState(true)

    const pathname = usePathname()

    useEffect(() => {
        if (user) {
            setUser(user)
        }
        setLoading(false)
    }, [user, setUser])

    const isAuthRoute = pathname.includes('auth')
    const hasUser = user || auth.user
    const shouldShowSidebar = !loading && hasUser && !isAuthRoute

    return (
        <div className="h-screen w-screen overflow-hidden bg-slate-200 dark:bg-slate-950">
            <Header />

            {loading &&
                <div className="flex items-center justify-center h-full">
                    <BarLoader
                        color="#493cdd"
                    />
                </div>
            }

            {!loading && shouldShowSidebar && (
                <div className="flex h-full">
                    <div className="hidden lg:block">
                        <LeftSide />
                    </div>

                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            )}

            {!loading && !shouldShowSidebar && (
                <div className="flex-1">
                    {children}
                </div>
            )}

            <Sheet open={showChatsList} onOpenChange={setShowChatsList}>
                <SheetContent className="p-0 bg-slate-100 dark:bg-slate-900">
                    <LeftSide variant="mobile" />
                </SheetContent>
            </Sheet>
        </div>
    )
}