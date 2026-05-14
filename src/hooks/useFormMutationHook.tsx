"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { ZodType, TypeOf } from "zod";
import { toast } from "sonner";

type UseFormMutationOptions<
  TSchema extends ZodType<any, any, any>, // ✅ looser generic
  TData = any
> = {
  mutationKey: string[];
  mutationFn: (payload: TypeOf<TSchema>) => Promise<TData>;
  schema: TSchema;
  debugMode?: boolean;
  mutationOptions?: Omit<
    UseMutationOptions<TData, Error, TypeOf<TSchema>>,
    "mutationFn"
  >;
  formOptions?: Parameters<typeof useForm<TypeOf<TSchema>>>[0];
};

export function useFormMutation<
  TSchema extends ZodType<any, any, any>, // ✅ constrained properly
  TData = any
>({
  mutationKey,
  mutationFn,
  schema,
  debugMode = false,
  mutationOptions,
  formOptions,
}: UseFormMutationOptions<TSchema, TData>): {
  form: UseFormReturn<TypeOf<TSchema>>;
  mutation: UseMutationResult<TData, Error, TypeOf<TSchema>>;
  onSubmit: (payload: TypeOf<TSchema>) => void;
} {
  const form = useForm<TypeOf<TSchema>>({
    mode: "onSubmit",        // validate as you type
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema) as unknown as Resolver<TypeOf<TSchema>>, // ✅ safe cast
    ...formOptions,
  });

  const mutation = useMutation({
    mutationKey,
    mutationFn,
    ...mutationOptions,
  });

  const onSubmit = (payload: TypeOf<TSchema>) => {
    console.log("submiting")
    if (debugMode) {
      toast.success("Submitetd debugger")
      console.log("[useFormMutation:debug]", {
        values: payload,
        mutationKey,
        isDirty: form.formState.isDirty,
        errors: form.formState.errors,
      });
      return;
    }
    mutation.mutate(payload);
  };

  return {
    form,
    mutation,
    onSubmit,
  };
}