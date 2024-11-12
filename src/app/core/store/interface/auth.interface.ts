export interface ValidationErrorResponse {
  message: string;
  path: string;
  summary: string;
}
export interface LoginResponse {
  access_token: string;
}
export interface UnauthorizedResponse {
  status: string; 
  message: string; 
}