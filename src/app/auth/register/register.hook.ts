import { useFormMutation } from "@/hooks/useFormMutationHook"
import { RegisterSchema } from "./register.schema"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/hooks/useAuthStore"
import { AuthService } from "@/services"

export const useRegister = ({ debugMode = false }: { debugMode?: boolean } = {}) => {
    const router = useRouter()
    const authStore = useAuthStore()
    const hook = useFormMutation({
        mutationKey: ['register'],
        mutationFn: AuthService.register,
        schema: RegisterSchema,
        debugMode,
        mutationOptions: {
            onSuccess: (data) => {
                toast.success(data.message || "Registration successful! Please login.")
                router.push('/auth/login')
            },
            onError: (error) => {
                toast.error(error.message || "Registration failed")
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
