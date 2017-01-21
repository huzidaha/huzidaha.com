import Router from 'koa-router'

export default class CustomRouter extends Router {
  constructor () {
    super()
    const methods = ['get', 'post', 'put', 'delete']
    methods.forEach((method) => {
      this[method] = (path, fn) => {
        super[method](path, this.wrap(fn))
      }
    })
  }

  wrap (fn) {
    return async (ctx) => {
      try {
        const ret = await fn(ctx)
        ctx.status = 200
        ctx.body = {
          requestId: ctx.state.requestId,
          data: ret
        }
      } catch (e) {
        if (e.name === 'ValidationError') {
          ctx.status = 400
          ctx.body = {
            message: '参数验证错误',
            errors: e.errors || e.message
          }
        } else {
          // More error handling
          ctx.status = e.status || 500
          ctx.body = {
            error: '服务器未知异常',
            message: e.message || e
          }
        }
      }
    }
  }
}
