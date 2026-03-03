"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(commonLayout)/(authRouteGroup)/login/_action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ILoginPayload, LoginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AppField } from "../shared/Form/AppField";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppSubmitButton } from "../shared/Form/AppSubmitButton";

export const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={
            (e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }
          }
          className="space-y-1.5"
        >
          <form.Field
            name="email"
            validators={{ onChange: LoginZodSchema.shape.email }}
          >
            {
              (field) => (
                <AppField
                  field={field}
                  type="email"
                  label="Email"
                  placeholder="Your Email"
                />
              )
            }
          </form.Field>
          <form.Field
            name="password"
            validators={{ onChange: LoginZodSchema.shape.password }}
          >
            {(field) => (
              <AppField
                field={field}
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Your Password"
                append={
                  <Button type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((value) => !value)}
                    className="z-50 cursor-pointer"
                  >
                    {
                      showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />
                    }
                  </Button>
                }
              />
            )}
          </form.Field>
          {
            serverError && (
              <Alert variant={"destructive"}>
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )
          }
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
           {([canSubmit, isSubmitting]) => (
               <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Loggin in.." disabled={!canSubmit}>
                Log In
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
};
