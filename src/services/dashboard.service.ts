"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import { IAdminDashboardData } from "@/types/dashboard.type";


export async function getDashboardData() {
  try {
    const response = await httpClient.get<IAdminDashboardData>("/stats");
    return response;
  } catch (error: any) {
    return {
        success: false,
        message: error.message || "An error occurred while fetching dashboard data.",
        data: null,
        meta: null,
      }  
  }
}