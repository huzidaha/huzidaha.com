import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import { JWT_SECRECT_KEY } from '../../secrect'

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
        await verifyJWT(ctx)
        const ret = await fn(ctx)
        ctx.status = 200
        ctx.body = {
          requestId: ctx.state.requestId,
          data: ret
        }
      } catch (e) {
        console.log('ERROR: ', e)
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

const verifyJWT = (ctx) => {
  const token = ctx.cookies.get('token')
  return new Promise((resolve, reject) => {
    if (!token) {
      ctx.state.session = null
      return resolve(null)
    }
    jwt.verify(token, JWT_SECRECT_KEY, (err, sessionData) => {
      if (err) {
        ctx.state.session = null
        reject(err)
      } else {
        ctx.state.session = sessionData
        resolve(sessionData)
      }
    })
  })
}

const signJWT = (ctx, data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRECT_KEY, { expiresIn: '14 days' }, (err, token) => {
      if (err) return reject(err)
      ctx.cookies.set('token', token)
      resolve(token)
    })
  })
}
