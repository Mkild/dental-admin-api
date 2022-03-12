const passport = require('../config/passport_config')

module.exports = {
  // 本地验证
  loginstats: async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
      ctx.status = 401
    } else {
      await next()
    }
  },

  // jwt验证
  apiJwtCheck: async (ctx, next) => {
    return passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) {
        ctx.status = 501
        ctx.body = {
          msg: '无法完成验证',
          status: 501,
          type: 'error',
        }
      }
      if (!user) {
        ctx.status = 401
        ctx.body = {
          status: 401,
          msg: info + '，需要登录',
          type: 'error',
        }
      } else {
        ctx.state.user = user
        await next()
      }
    })(ctx, next)
  },
}
