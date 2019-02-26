/**
 * @file 对 fetch api封装，统一处理基于http的数据交互
 * @author 听歌<505253293@163.com>
 */

import fetch from './utils/fetch'

export function createRequest(middlewares: Function[] = []) {
  return (
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    options: any
  ) => {
    return fetch(path, { ...options, method }, middlewares)
  }
}

/**
 * 将各个中间件列表参数转换成中间件数组
 * some middleware for api, such as debug, log, cache, tracker and so on.
 * @param middlewares 中间件参数列表
 * @returns 中间件数组
 */
export function applyRequestMiddleware(...middlewares: any[]) {
  return middlewares
}

export default { createRequest, applyRequestMiddleware }
