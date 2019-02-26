/** 用于添加请求头参数 */
export const header = (headers: any) => (request: {
  options: { headers: any }
}) => {
  request.options.headers = { ...request.options.headers, ...headers }
}
