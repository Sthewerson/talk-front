"use server";

import { SignInData, SignUpData } from "@/lib/schemas/authSchema";
import { signIn, signUp } from "@/lib/requests";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { User } from "@/types/User";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const handleSignIn = async (data: SignInData) => {
    const response = await signIn(data)

    if (response.error) {
        return response
    }

    if (response.data) {
        const cookieStore = await cookies()
        cookieStore.set({
            name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
            value: response.data.access_token,
            httpOnly: true,
            maxAge: 86400 * 7, // 7 days
            path: '/',
            sameSite: 'lax'
        })
        console.log('✅ Cookie set for SignIn:', response.data.access_token.substring(0, 20) + '...')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export const handleSignUp = async (data: SignUpData) => {
    const response = await signUp(data)

    if (response.error) {
        return response
    }

    if (response.data) {
        const cookieStore = await cookies()
        cookieStore.set({
            name: process.env.NEXT_PUBLIC_AUTH_KEY as string,
            value: response.data.access_token,
            httpOnly: true,
            maxAge: 86400 * 7, // 7 days
            path: '/',
            sameSite: 'lax'
        })
        console.log('✅ Cookie set for SignUp:', response.data.access_token.substring(0, 20) + '...')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export const handleGetUser = async () => {
    try {
        const cookieStore = await cookies()
        const authCookie = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_KEY as string)

        console.log('🔍 handleGetUser - Cookie:', authCookie?.value ? 'EXISTS' : 'MISSING')

        const response = await api<{ user: User }>({
            endpoint: 'accounts/me/',
            withAuth: true
        })

        console.log('🔍 handleGetUser - Response:', response.error ? 'ERROR' : response.data ? 'SUCCESS' : 'NO DATA')

        if (response.error) {
            console.log('❌ handleGetUser - Error:', response.error.message)
            return null
        }

        if (response.data && response.data.user) {
            console.log('✅ handleGetUser - User found:', response.data.user.email)
            return response.data.user as User
        }

        console.log('⚠️ handleGetUser - No user in response')
        return null
    } catch (error) {
        console.log('💥 handleGetUser - Exception:', error)
        return null
    }
}

export const handleSignOut = async () => {
    const cookieStore = await cookies()
    cookieStore.delete(process.env.NEXT_PUBLIC_AUTH_KEY as string)
    redirect('/auth/signin')
}