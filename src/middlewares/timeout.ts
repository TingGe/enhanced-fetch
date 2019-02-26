/** 设置 fetch 的超时选项 */
export const timeout = (globalTimeout: any) => (request: {
  options: { timeout: any }
  fetch: (url: any, options: any) => Promise<any>
}) => {
  const ms = parseInt(request.options.timeout || globalTimeout, 10)

  if (ms) {
    const fetchRequest = request.fetch
    const abort = new Promise((resolve, reject) =>
      setTimeout(reject, ms, 'request timeout!')
    )

    request.fetch = (url: any, options: any) =>
      Promise.race([fetchRequest(url, options), abort])
  }
}
