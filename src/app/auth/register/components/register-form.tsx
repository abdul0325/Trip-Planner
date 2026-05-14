"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"

import { useRegister } from "../register.hook"

import { Form } from "@/components/ui/form"

import { PrimaryFormInput } from "@/components/shared/inputs/PrimaryFromInput"

import {
  Loader2,
  Home,
} from "lucide-react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {
    form,
    onSubmit,
    isLoading,
  } = useRegister()

  return (

    <div
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    >

      {/* HOME BUTTON */}

      <div className="flex justify-start">

        <Link href="/">

          <Button
            type="button"
            variant="outline"
            className="
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              shadow-sm
              bg-background/80
              backdrop-blur-xl
              hover:scale-105
              transition-all
            "
          >

            <Home className="w-4 h-4" />

            <span>Home</span>
          </Button>
        </Link>
      </div>

      {/* CARD */}

      <Card>

        <CardHeader className="text-center">

          <CardTitle className="text-xl">
            Create your account
          </CardTitle>

          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>

          <Form {...form}>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
            >

              <FieldGroup>

                <PrimaryFormInput
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                  control={form.control}
                />

                <PrimaryFormInput
                  name="email"
                  label="Email"
                  placeholder="m@example.com"
                  control={form.control}
                />

                <PrimaryFormInput
                  name="password"
                  label="Password"
                  placeholder="Password"
                  control={form.control}
                />

                <Field>

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full"
                  >

                    Create Account

                    {isLoading && (
                      <Loader2
                        className="
                          ml-2
                          h-4
                          w-4
                          animate-spin
                        "
                      />
                    )}
                  </Button>

                  <FieldDescription className="text-center">

                    Already have an account?{" "}

                    <Link
                      href="/auth/login"
                      className="
                        text-primary
                        hover:underline
                      "
                    >
                      Sign in
                    </Link>
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