const makeMapFromArr = (arr) => {
  const map = new Map()
  arr.forEach((key) => {
    map.set(key, true)
  })
  return map
}

const requireAdminPages = makeMapFromArr([
  '/posts/list',
  '/posts/create',
  '/tags/list'
])

const isAdmin = (profile) => {
  return profile && profile.isAdmin
}

const requireAdmin = (ctx) => {
  return requireAdminPages.has(ctx.pathname)
}

export const requireAuthorization = (ctx, profile) => {
  if (!isAdmin(profile) && requireAdmin(ctx)) {
    if (ctx.res) {
      ctx.res.end('未授权访问')
      ctx.res.status = 401
    } else {
      document.location.pathname = '/'
    }
  }
}

// Server APIs
export const apiRequireAdmin = async (ctx) => {
  const user = await ctx.state.session
  if (!isAdmin(user)) {
    return Promise.reject({
      status: 401,
      message: '需要管理员权限访问'
    })
  }
  return Promise.resolve(true)
}
