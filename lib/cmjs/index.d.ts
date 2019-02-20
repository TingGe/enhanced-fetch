/**
 * @file 对 window.fetch api封装，统一处理基于http的数据请求端与数据端的通信
 * @author 听歌<505253293@163.com>
 */
declare function createRequest(middlewares: any): (url: string, options?: {
    params: {};
    method: string;
    timeout: number;
}) => Promise<any>;
/**
 * 将各个中间件列表参数转换成中间件数组
 * @param middlewares 中间件参数列表
 */
declare function applyRequestMiddleware(...middlewares: any[]): any[];
export { createRequest, applyRequestMiddleware };
