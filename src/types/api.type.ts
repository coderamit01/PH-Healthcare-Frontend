
export interface ApiResponse<TData = unknown> {
  success: boolean,
  message: string,
  data: TData,
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


export interface ApiErrorResponse {
  success: boolean,
  message: string,
}
export interface ApiSuccessRedirectResponse {
  success: true;
  redirectTo: string;
}