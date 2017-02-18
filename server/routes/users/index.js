import Joi from 'joi'
import bcrypt from 'bcrypt'
import Router from '../../utils/router'
import Crud from '../../utils/crud'
import User from '../../models/user'
import validate from '../../utils/validate'
import _ from 'ramda'

const router = new Router()
const crud = new Crud(router, User)
const saltRounds = 10

crud.except('create', 'read')

const userInfoValidateSchema = {
  username: Joi.string().min(4).max(30),
  password: Joi.string().min(6).max(30),
  email: Joi.string().email()
}

crud.create(async (ctx) => {
  const { body } = ctx.request
  await validate(body, userInfoValidateSchema)
  body.password = await bcrypt.hash(body.password, saltRounds) // never be cracked!
  body.nickname = body.username
}, async (ctx, ret) => {
  const user = await ret
  await ctx.jwtJar.sign({ user: user.getSafeJSON() })
  return ret
})

router.post('/login', async (ctx) => {
  const schema = _.pick(['email', 'password'], userInfoValidateSchema)
  const { body } = ctx.request
  await validate(body, schema)
  let user = await User.findUserByEmail(body.email)
  let isCorret = false
  if (user) {
    isCorret = await bcrypt.compare(body.password, user.password)
    user = user.getSafeJSON()
    await ctx.jwtJar.sign({ user })
  }
  if (isCorret) {
    return Promise.resolve(user)
  } else {
    return Promise.reject({
      status: 401,
      message: '邮箱或者密码错误'
    })
  }
})

router.get('/me', async (ctx) => {
  return ctx.state.session.user || null
})

export default router
