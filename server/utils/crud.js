import _ from 'lodash'

export default class Crud {
  constructor (router, Model) {
    this.router = router
    this.Model = Model
    this.methods = [
      'create',
      'read',
      'update',
      'delete',
      'list'
    ]
  }

  all (methods) {
    const theMethods = methods || this.methods
    theMethods.forEach((method) => {
      this[method]()
    })
  }

  except (...args) {
    this.all(_.pull(this.methods, ...args))
  }

  wrap (before, after, fn) {
    return async (ctx) => {
      if (before) await before(ctx, this.Model)
      let ret = fn(ctx)
      if (after) ret = await after(ctx, ret, this.Model)
      return ret
    }
  }

  create (before, after) {
    this.router.post('/', this.wrap(before, after, async (ctx) => {
      const { body: data } = ctx.request
      return await this.Model.create(data)
    }))
  }

  read (before, after) {
    this.router.get('/:id', this.wrap(before, after, (ctx) => {
      return this.Model.findOne({ _id: ctx.params.id })
    }))
  }

  update (before, after) {
    this.router.put('/:id', this.wrap(before, after, async (ctx) => {
      const data = await this.Model.findOne({ _id: ctx.params.id })
      Object.assign(data, ctx.request.body)
      await data.save()
      return data
    }))
  }

  delete (before, after) {
    this.router.delete('/:id', this.wrap(before, after, async (ctx) => {
      const ret = await this.Model.remove({ _id: ctx.params.id })
      return ret.result.n === 0
        ? Promise.reject({ status: 404, message: '未能找到相应的数据' })
        : Promise.resolve(true)
    }))
  }

  list (before, after) {
    this.router.get('/', this.wrap(before, after, (ctx) => {
      let { offset, limit } = ctx.request.query
      offset = offset * 1 || 0
      limit = limit * 1 || 10
      return this.Model
        .find({})
        .skip(offset)
        .limit(limit)
    }))
  }
}
