/**
 * 组合参数。
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (arg: any[]) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a: Function, b: Function) => (...args: any[]) =>
    a(b(...args))
  )
}
