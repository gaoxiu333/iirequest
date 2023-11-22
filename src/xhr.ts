const createCHR = (method: string, url: string) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  // 设置请求头 TODO: 设置自定义请求头呢？比如 token
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // 设置超时时间
  xhr.timeout = 10000;

  // 设置响应类型
  xhr.responseType = "json";

  // 设置拦截器
  xhr.ontimeout = function () {
    console.log("请求超时");
  };

  // 携带cookie
  xhr.withCredentials = true;

  // 设置mimeType
  xhr.overrideMimeType("text/plain; charset=utf-8");

  // TODO: 设置下载/上传进度

  // 请求超时
  xhr.ontimeout = function () {
    console.log("请求超时");
  };

  xhr.onerror = function () {
    console.log("请求错误");
  };

  // 请求中断
  xhr.onabort = function () {
    console.log("请求中断");
  };

  // 请求成功
  xhr.onload = function () {
    console.log("请求成功");
  };

  // 发送请求
  xhr.send();

  return xhr;
};
