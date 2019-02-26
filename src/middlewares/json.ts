/** 将对象转换为请求参数并从响应中解析 */
export const json = () => (request: {
  options: {
    json: any
    body: string
    headers: { [x: string]: string; Accept: string }
  }
}) => {
  if (request.options.json) {
    request.options.body = JSON.stringify(request.options.json)
    request.options.headers['Content-Type'] = 'application/json'
  }
  request.options.headers.Accept = 'application/json'

  return (response: {
    headers: { get: (arg0: string) => string }
    json: () => { then: (arg0: (json: any) => any) => void }
    jsonData: any
  }) => {
    const contentType = response.headers.get('Content-Type') || ''
    if (contentType.indexOf('json') === -1) return response
    return response.json().then(json => ((response.jsonData = json), response))
  }
}
