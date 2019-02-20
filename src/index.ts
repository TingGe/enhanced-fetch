/**
 * @file 对 window.fetch api封装，统一处理基于http的数据请求端与数据端的通信
 * @author 听歌<505253293@163.com>
 */

const defaultOptions = {
  params: {},
  method: 'get',
  timeout: 0,
};

function createRequest(middlewares) {
  /** 检测response状态 */
  function checkStatus(response) {
    if (!response) {
      return Promise.reject(new Error("Invalid or null response data."));
    }
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error["response"] = response;
      return Promise.reject(error);
    }
  }

  /** 解析response数据 */
  function parseJSON(response) {
    const promise = Promise.resolve(response.text());
    return promise.then(data => {
      try {
        let _tmp = JSON.parse(data);
        data = _tmp;
      } catch (ex) {
        console.error("enhanced-fetch: parseJSON Failed", ex, response);
        return Promise.reject(new Error("Failed to parse JSON."));
      }
      return Promise.resolve({
        status: response.status,
        statusText: response.statusText,
        data,
        body: data,
        headers: response.headers
      });
    });
  }
  
  return async (url: string, options = defaultOptions): Promise<any> => {
    const response = await fetch(url, options);
    const res = await checkStatus(response);
    const json = await parseJSON(res);
    console.log(json);
    return json;
  };
}

/**
 * 将各个中间件列表参数转换成中间件数组
 * @param middlewares 中间件参数列表
 */
function applyRequestMiddleware(...middlewares: any[]) {
  return middlewares;
}

export { createRequest, applyRequestMiddleware };
