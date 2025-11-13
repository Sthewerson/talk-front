"use server";

import { APIError } from "@/types/Api";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

type Props = {
    endpoint: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object,
    withAuth?: boolean,
    withAttachment?: boolean
}

const BASE_URL = ((process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000').replace(/\/+$|$/,'')).replace(/\/$/, '') + '/api/v1/'

export const api = async <TypeResponse>({
    endpoint,
    method = 'GET',
    data,
    withAuth = true,
    withAttachment = false
}: Props) => {
    const instance = axios.create({
        baseURL: BASE_URL
    })

    if (withAuth) {
        /* Getting auth cookie */
        const cookieStore = await cookies()
        const sessionAuth = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_KEY as string)

        console.log('🔐 Auth Cookie Key:', process.env.NEXT_PUBLIC_AUTH_KEY)
        console.log('🔐 Auth Cookie Value:', sessionAuth?.value ? `${sessionAuth.value.substring(0, 20)}...` : 'NOT FOUND')

        if (sessionAuth?.value) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${sessionAuth.value}`
        }
    }

    if (withAttachment) {
        instance.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    }

    try {
        console.log('🌐 API Request:', { endpoint, method, baseURL: BASE_URL })

        const config: any = { method }

        if (method === 'GET' && data) {
            config.params = data
        } else if (method !== 'GET' && data) {
            config.data = data
        }

        const request = await instance<TypeResponse>(endpoint, config)

        console.log('✅ API Success:', { endpoint, status: request.status })

        return {
            data: request.data
        }
    } catch (error) {
        const e = error as AxiosError<APIError>

        console.log('🔴 API Error:', {
            endpoint,
            status: e.response?.status,
            statusText: e.response?.statusText,
            detail: e.response?.data?.detail,
            message: e.message
        })

        return {
            error: {
                message: e.response?.data?.detail ?? e.message ?? 'Ocorreu um erro inesperado'
            }
        }
    }
}