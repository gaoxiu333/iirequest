// source https://github.com/infinitered/apisauce/tree/master

import axios from "axios";

const service = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

service.interceptors.request.use(
  (config) => {
    // token
    return config;
  },
  (error) => {
    // TODO: 验证 reqct-query以及正常情况下 catch error能力
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // TODO: 同样验证 reqct-query以及正常情况下 catch error能力=> code 非200的错误
    if (response.data) {
      return response.data;
    }
    if (response.code !== 200) {
      return Promise.reject(new Error(response.message || "Error"));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
