module.exports = {
  // 拦截权限低于admin的用户请求
  authCheckAdmin: async (ctx, next) => {
    const role_id = ctx.state.user.userrole.role_id
    if (role_id !== 1) {
      ctx.status = 403
      ctx.body = {
        msg: '无权访问',
        status: 403,
        type: 'error',
      }
    } else {
      await next()
    }
  },

  // 拦截权限低于director的用户请求
  authCheckDirector: async (ctx, next) => {
    const role_id = ctx.state.user.userrole.role_id
    if (role_id !== 1 && role_id !== 2) {
      ctx.status = 403
      ctx.body = {
        msg: '无权访问',
        status: 403,
        type: 'error',
      }
    } else {
      await next()
    }
  },

  // 拦截权限低于doctor的用户请求
  authCheckDoctor: async (ctx, next) => {
    const role_id = ctx.state.user.userrole.role_id
    if (role_id !== 1 && role_id !== 2 && role_id !== 3) {
      ctx.status = 403
      ctx.body = {
        msg: '无权访问',
        status: 403,
        type: 'error',
      }
    } else {
      await next()
    }
  },
}
