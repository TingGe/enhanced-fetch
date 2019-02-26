import { stringify } from 'query-string'

/** query 中间件，将对象值附加到查询字符串 */
export const query = () => (request: any) => {
  if (request.options.query) {
    const queryString = stringify(request.options.query)
    if (request.url.indexOf('?') === -1) {
      request.url = request.url.concat('?')
    }
    if (request.url.endsWith('&') || request.url.endsWith('?')) {
      request.url = request.url.concat(queryString)
    } else {
      request.url = request.url.concat('&', queryString)
    }
  }
}
