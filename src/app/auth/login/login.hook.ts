"use client"
import { useFormMutation } from "@/hooks/useFormMutationHook"
import { LoginSchema } from "./login.schema"
import { AuthService } from "@/services"
import { useAuthStore } from "@/hooks/useAuthStore"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useLogin = ({ debugMode = false }: { debugMode?: boolean } = {}) => {
    const authStore = useAuthStore()
    const router = useRouter()
    const hook = useFormMutation({
        mutationKey: ['login'],
        mutationFn: AuthService.login,
        schema: LoginSchema,
        debugMode,
        mutationOptions: {
            onSuccess: (data) => {
                // Save token to localStorage
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken)
                }
                authStore.setIsAuthenticated(true)
                authStore.setAccessToken(data.accessToken || null)
                authStore.setUser(data.user)
                toast.success("Login successful!")
                router.push("/dashboard")
            },
            onError: (error) => {
                toast.error(error.message || "Login failed")
            }
        }
    })
    return {
        form: hook.form,
        mutation: hook.mutation,
        onSubmit: hook.onSubmit,
        isLoading: hook.mutation.isPending,
    }
}
