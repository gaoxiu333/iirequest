import axios, { AxiosError } from "axios";

export function handleApiResponse(response: any) {
  // 处理全局响应事件，以及自定义code
  return response.data;
}

export function handleApiError(error: AxiosError) {
  if (axios.isCancel(error)) {
    console.log("Request canceled", error.message);
  } else if (error.response) {
    console.log("HTTP Error Status:", error.response.status);
    console.log("Error Data:", error.response.data);
  } else if (error.request) {
    console.log("No response received:", error.request);
  } else {
    console.error("Error:", error.message);
  }
  return Promise.reject(error);
}
