"use client"
import { PrimaryFormInput } from "@/components/shared/inputs/PrimaryFromInput"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useLogin } from "../login.hook"
import { Form } from "@/components/ui/form"
import { Loader2 } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit, isLoading } = useLogin()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <PrimaryFormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  control={form.control}
                />
                <PrimaryFormInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="********"
                  control={form.control}
                />
                <Field>
                  <Button
                    disabled={isLoading}
                    type="submit">
                    Login
                    {isLoading && <Loader2 className="size-4 animate-spin" />}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}
