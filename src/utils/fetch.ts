/**
 * fetch 方法，可以和 Fetch API 兼容
 */

export default function fetch(
  url: string,
  options: any, 
  middlewares?: Function[]
) {
  if (typeof fetch !== 'function') {
    throw new TypeError('fetch() function not available')
  }

  options = { headers: {}, ...options }

  const responseMiddlewares: any[] = []
  const requestPromise = (middlewares || [])
    .reduce(
      (promise, middleware) =>
        promise.then((request: any) => {
          const result = middleware(request)
          if (typeof result === 'function') {
            responseMiddlewares.push(result)
          }
          return result && typeof result !== 'function' ? result : request
        }),
      Promise.resolve({ url, options, fetch })
    )
    .then(
      (request: {
        fetch: (arg0: any, arg1: any) => void
        url: any
        options: any
      }) => request.fetch(request.url, request.options)
    )

  return requestPromise.then((response: any) =>
    responseMiddlewares.reduce(
      (promise, middleware) =>
        promise.then((resp: any) => middleware(resp) || resp),
      Promise.resolve(response)
    )
  )
}
