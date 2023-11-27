import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义请求和响应的类型
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

export function handleApiResponse(response: ApiResponse) {
  // 处理全局响应事件，以及自定义code
  return response.data;
}

export const handleError = <T>(error: AxiosError<T>): Promise<ApiResponse> => {
  if (axios.isCancel(error)) {
    // 请求被取消
    return Promise.reject({
      status: 499,
      statusText: "Request canceled",
      data: null,
      headers: {},
      config: error.config,
      request: error.request,
    });
  } else if ("response" in error) {
    // 请求发出但服务器响应状态码不在 2xx 范围
    const { response }: any = error;
    return Promise.reject<ApiResponse>({
      ...response,
    } as ApiResponse);
  } else if ("request" in error) {
    // 请求发出但是服务器没有响应
    return Promise.reject({
      status: 0,
      statusText: "No response received",
      data: null,
      headers: {},
      config: {},
      request: null,
    });
  } else {
    // 其他错误
    return Promise.reject({
      status: -1, // 自定义其他错误的状态码
      statusText: "Other error",
      data: null,
      headers: {},
      // config: error.config,
      config: {},
      request: null,
    });
  }
  // return Promise.reject(error);
};
