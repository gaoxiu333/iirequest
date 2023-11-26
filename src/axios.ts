// source https://github.com/infinitered/apisauce/tree/master

import axios, { InternalAxiosRequestConfig } from "axios";
import { BASE_URL, TIMEOUT } from "./config";
import { handleApiError, handleApiResponse } from "./utils/apiHandler";

/**
 * 取消请求
 * 1. 创建一个取消令牌
 * 2. 在需要的地方调用 cancel 方法，取消请求
 * 3. 通过 axios.isCancel(error) 来确定是否是由于取消请求引起的错误
 */
const cancelTokenSource = axios.CancelToken.source();

// 在需要取消请求的地方调用 cancel 方法；请求拦截里边也可以调用 cancel
function cancelRequest() {
  cancelTokenSource.cancel();
}

function createAxiosInstance() {
  const instance = axios.create();

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      return config;
    },
    (error) => {
      // TODO: 验证 reqct-query以及正常情况下 catch error能力
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(handleApiResponse, handleApiError);

  return instance;
}

function createRequest(service: any) {
  return (config: any) => {
    const opts = {
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return service({
      ...opts,
      ...config,
    });
  };
}

const service = createAxiosInstance();
const request = createRequest(service);

export { service, request, cancelRequest };

// TODO: 导出几个常用请求头
export const HEADERS = {
  upload: "multipart/form-data",
  json: "application/json",
  form: "application/x-www-form-urlencoded",
  text: "text/plain",
  xml: "text/xml",
  html: "text/html",
  default: "application/json",

  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
};
