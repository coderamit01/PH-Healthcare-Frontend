/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ILoginPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

export const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;
        if (!result.success) {
          setServerError(result.message || "Login Failed");
          return;
        }
      } catch (error: any) {
        setServerError(`Login Failed:  ${error.message}`);
      }
    },
  });
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>
          Please enter your credentials to log in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <form.Field></form.Field>
        </form>
      </CardContent>
    </Card>
  );
};
