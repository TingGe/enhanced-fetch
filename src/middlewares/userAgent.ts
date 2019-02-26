/** 用于将User-Agent设置为请求头参数 */
export const userAgent = (ua: { [x: string]: any }) => (request: {
  options: { headers: { [x: string]: string } }
}) => {
  const uaSegments: string[] = []
  Object.keys(ua).forEach(key => uaSegments.push(`${key}/${ua[key]}`))
  request.options.headers['User-Agent'] = uaSegments.join(' ')
}
