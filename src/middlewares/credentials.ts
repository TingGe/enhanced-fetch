/** 为 fetch 设置凭据选项。 如果要自动发送当前域的 cookie ，请使用此中间件并将其配置为 same-origin */
export const credentials = (credentials: any) => (request: {
  options: { credentials: any }
}) => {
  request.options.credentials = credentials
}
