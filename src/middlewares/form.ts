import { stringify } from 'query-string'

/** 类似 query，用来处理post表单值 */
export const form = () => (request: any) => {
  if (request.options.form) {
    request.options.body = stringify(request.options.form)
    request.options.headers['Content-Type'] =
      'application/x-www-form-urlencoded;charset=UTF-8'
  }
}
