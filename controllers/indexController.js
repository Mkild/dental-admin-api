const { userDao } = require('../services/userService')
const passport = require('../config/passport_config')
const encryption = require('../lib/encryption')
const jwt = require('jsonwebtoken')
const key = require('../config/key_config')
const { errTemps } = require('../utils/common')

module.exports = {
  // 主页
  index: async (ctx, next) => {
    await ctx.render('index')
  },

  // 登录(本地验证)
  login: async (ctx, next) => {
    return passport.authenticate('local', async (err, user, info) => {
      if (err) {
        ctx.throw('服务器错误', 500)
      }
      if (user) {
        ctx.login(user)
        const username = user.username
        const data = await userDao.getUserRole(username)
        if (data) {
          ctx.session.rolename = data.role.rolename
          ctx.body = {
            user,
            data,
            msg: info,
            status: 200,
            type: 'success',
          }
        } else {
          ctx.body = {
            msg: info,
            status: 400,
            type: 'error',
          }
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    })(ctx)
  },

  // 登录(jwt验证)
  jwtLogin: async (ctx, next) => {
    try {
      const { username, password } = ctx.request.body
      if (!username || !password) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const user = await userDao.getUser(username)
      if (!user) {
        ctx.body = {
          msg: '该用户不存在',
          status: 200,
          type: 'error',
        }
        return
      }
      if (user.state === false) {
        ctx.body = {
          msg: '该用户不可用',
          status: 200,
          type: 'error',
        }
        return
      }
      const pwd = await encryption.MD5(password, user.salt)
      if (pwd === user.password) {
        const payload = { id: user.id, username: user.username }
        const token = jwt.sign(payload, key.secretKey, { expiresIn: 432000 })
        ctx.body = {
          token,
          id: user.id,
          msg: '登录成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          msg: '密码错误',
          status: 200,
          type: 'error',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 注册
  register: async (ctx, next) => {
    try {
      const { username, password } = ctx.request.body
      if (!username || !password) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const user = await userDao.getUser(username)
      if (user) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const salt = await encryption.getUuid()
      const pwd = await encryption.MD5(password, salt)
      await userDao.insertUser(username, pwd, salt)
      await userDao.insertUserRole(username)
      await userDao.insertUserDetail(username)
      ctx.body = {
        msg: '注册成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },
}
