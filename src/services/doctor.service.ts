"use server"
import { httpClient } from "@/lib/axios/httpClient"
import { IDoctorData } from "@/types/doctor.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getDoctor = async () => {
  try {
    const doctors = await httpClient.get<IDoctorData[]>("/doctors");
    return doctors;
  } catch (error: any) {
    console.log("Error fetching doctors:", error);
    throw error;
  }
}