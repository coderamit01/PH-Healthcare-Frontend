/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.type";
import { ILoginResponse } from "@/types/auth.type";
import { ILoginPayload, LoginZodSchema } from "@/zod/auth.validation";


export const loginAction = async (payload: ILoginPayload): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = LoginZodSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    }
  }
  try {
    const response = await httpClient.post<ILoginResponse>("/auth/login", parsedPayload.data);

    return response;
  } catch (error: any) {
    return {
      success: false,
      message: `Login failed: ${error.message}`,
    }
  }
}