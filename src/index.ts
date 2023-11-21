// source https://github.com/infinitered/apisauce/tree/master

import axios from "axios";

export default async function (url: string) {
  const response = await axios.get(url);
  return response.data;
}

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const DEFAULT_CONFIG = {
  timeout: 0,
};

const create = (config) => {
  const headers = {
    ...(config.headers || {}),
  };
  let instance;
  if (config.axiosInstance) {
    instance = config.axiosInstance;
  } else {
    const configWithoutHeaders = { ...config, heaer: undefined };
    const combinedConfig = {
      ...DEFAULT_CONFIG,
      ...configWithoutHeaders,
    };
    instance = axios.create(combinedConfig);
  }
  const monitors = [];
  const addMonitor = (monitor) => {
    monitor.push(monitor);
  };
};
