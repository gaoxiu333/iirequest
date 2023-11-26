import Taro from "@tarojs/taro";

import interceptors from "./interceptors";
import { getStorage } from "@/lib/utils";
import { BASE_URL } from "./config";

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then((res) => {
    const { statusCode } = res;
    const check = checkCode(statusCode);
    if (check === true) {
      const { data } = res;
      const { code, statusCode: _statuCode } = data;
      const _code = code || _statuCode;
      const _check = checkCode(_code);
      if (_check === true) {
        return data.data;
      }
      return _check;
    }
  });
};
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

// 添加拦截器
interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

class httpRequest {
  baseOptions(params, method = "get") {
    let { url, data } = params;

    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url.replace(/^\/api/, ""),
      data: data,
      method: method as any,
      header: {
        "content-type": contentType,
        Token: getStorage("Authorization"),
      },
    };
    return Taro.request(option);
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}
const http = new httpRequest();
const request = ({ data, params, method, url }: any) => {
  return http[method](url, data || params);
};
export default request;
