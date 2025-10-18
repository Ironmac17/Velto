export const BASE_URL = import.meta.env.VITE_BASE_URL || ""; 

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REQUEST_OTP: "/api/v1/auth/request-otp",    
    VERIFY_OTP: "/api/v1/auth/verify-otp",      
    GET_USER_INFO: "/api/v1/auth/getUser",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password", 
    RESET_PASSWORD: "/api/v1/auth/reset-password",  
    RESEND_OTP: "/api/v1/auth/resend-otp",         
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
