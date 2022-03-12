const { userDao } = require('../services/userService')
const encryption = require('../lib/encryption')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 根据用户名获取用户
  getUser: async (ctx, next) => {
    try {
      const username = ctx.query.username
      if (!username) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const user = await userDao.getUser(username)
      if (user) {
        const userrole = await userDao.getUserRole(user.username)
        // 保护密码
        user.password = ''
        user.salt = ''
        ctx.body = {
          user,
          userrole,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          user: null,
          status: 200,
          type: 'success',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 根据ID获取用户
  getUserById: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const user = await userDao.getUserById(id)
      if (user) {
        const userrole = await userDao.getUserRole(user.username)
        // 保护密码
        user.password = ''
        user.salt = ''
        ctx.body = {
          user,
          userrole,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          user: null,
          status: 200,
          type: 'success',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 根据jwt获取用户
  getUserByJwt: async (ctx, next) => {
    try {
      const user = ctx.state.user
      if (user) {
        // 保护密码
        user.password = ''
        user.salt = ''
        const userrole = user.userrole
        ctx.body = {
          user,
          userrole,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          user: null,
          status: 200,
          type: 'success',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 获取所有用户
  getAllUser: async (ctx, next) => {
    try {
      let { offset, limit } = ctx.query
      if (!offset) offset = 0
      if (!limit) limit = 50
      offset = Number(offset)
      limit = Number(limit)
      if (isNaN(offset) || isNaN(limit)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      let users = await userDao.getAllUser(offset, limit)
      if (users) {
        // 保护密码
        users.forEach((user) => {
          user.password = ''
          user.salt = ''
        })
        const count = await userDao.getUserAmount()
        ctx.body = {
          count,
          users,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 新增用户(director)
  // 新增的用户只能是游客权限
  addUser: async (ctx, next) => {
    try {
      let { username, password, name, gender, phone, email } = ctx.request.body
      if (!username || !password) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const user = await userDao.getUser(username)
      if (user) {
        ctx.status = 400
        ctx.body = {
          msg: '此用户已存在',
          status: 400,
          type: 'error',
        }
        return
      }
      if (!name) name = null
      if (!gender) gender = null
      if (!phone) phone = null
      if (!email) email = null
      const salt = await encryption.getUuid()
      const pwd = await encryption.MD5(password, salt)
      await userDao.insertUser(username, pwd, salt)
      await userDao.insertUserRole(username, 4)
      await userDao.insertUserAllDetail(name, username, gender, phone, email)
      ctx.body = {
        msg: '新增用户成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 新增用户(admin)
  // 新增的用户可以是任何权限
  insertUser: async (ctx, next) => {
    try {
      let { username, password, role_id, name, gender, phone, email } = ctx.request.body
      if (!username || !password) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const user = await userDao.getUser(username)
      if (user) {
        ctx.status = 400
        ctx.body = {
          msg: '此用户已存在',
          status: 400,
          type: 'error',
        }
        return
      }
      if (!name) name = null
      if (!gender) gender = null
      if (!phone) phone = null
      if (!email) email = null
      const salt = await encryption.getUuid()
      const pwd = await encryption.MD5(password, salt)
      await userDao.insertUser(username, pwd, salt)
      await userDao.insertUserRole(username, role_id)
      await userDao.insertUserAllDetail(name, username, gender, phone, email)
      ctx.body = {
        msg: '新增用户成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改用户
  updateUser: async (ctx, next) => {
    try {
      const usernamequery = ctx.query.username
      if (!usernamequery) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const { username, password, role_id } = ctx.request.body
      if (!username || !password) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const salt = encryption.getUuid()
      const pwd = await encryption.MD5(password, salt)
      const result = await userDao.updateUser(usernamequery, username, pwd, salt)
      if (result[0]) {
        if (role_id && isNum(Number(role_id))) {
          await userDao.updateUserRole(username, role_id)
        }
        ctx.body = {
          msg: '修改用户成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 变更用户状态
  changeUserState: async (ctx, next) => {
    try {
      const id = ctx.query.id
      const state = ctx.request.body.state
      if (!id || !state) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      if (state !== 'true' && state !== 'false') {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await userDao.changeUserState(id, state)
      if (result[0]) {
        ctx.body = {
          msg: '变更用户状态成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改用户权限
  updateUserRole: async (ctx, next) => {
    try {
      const username = ctx.query.username
      const role_id = ctx.request.body.role_id
      if (!username || !role_id || !isNum(Number(role_id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await userDao.updateUserRole(username, role_id)
      if (result[0]) {
        ctx.body = {
          msg: '修改用户权限成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          msg: '修改用户权限失败',
          status: 200,
          type: 'error',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 删除用户
  deleteUser: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        errTemps.get(400)
        ctx.body = errTemps.get(400)
        return
      }
      const result = await userDao.deleteUser(id)
      if (result) {
        ctx.body = {
          msg: '删除用户成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 获取用户详情
  getUserDetail: async (ctx, next) => {
    try {
      const username = ctx.query.username
      const userDetail = await userDao.getUserDetail(username)
      if (userDetail) {
        ctx.body = {
          userDetail,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 获取所有用户详情
  getAllUserDetail: async (ctx, next) => {
    try {
      let { offset, limit } = ctx.query
      if (!offset) offset = 0
      if (!limit) limit = 50
      offset = Number(offset)
      limit = Number(limit)
      if (isNaN(offset) || isNaN(limit)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const userDetails = await userDao.getAllUserDetail(offset, limit)
      if (userDetails) {
        const count = await userDao.getUserDetailAmount()
        ctx.body = {
          count,
          userDetails,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改用户详情
  updateUserDetail: async (ctx, next) => {
    try {
      const username = ctx.query.username
      if (!username) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      let { name, gender, phone, email } = ctx.request.body
      if (!name) name = null
      if (!gender) gender = null
      if (!phone) phone = null
      if (!email) email = null
      const result = await userDao.updateUserDetail(username, name, gender, phone, email)
      if (result[0]) {
        ctx.body = {
          msg: '修改用户详情成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          msg: '修改用户详情失败',
          status: 200,
          type: 'error',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改用户用户名
  updateUserUsername: async (ctx, next) => {
    try {
      const usernamequery = ctx.query.username
      if (!usernamequery) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const username = ctx.request.body.username
      if (!username) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      if (username !== ctx.state.user.username) {
        const result = await userDao.updateUserUsername(usernamequery, username)
        if (result[0]) {
          ctx.body = {
            msg: '修改用户名成功',
            status: 200,
            type: 'success',
          }
        } else {
          ctx.body = errTemps.get(404)
        }
      } else {
        ctx.body = {
          msg: '修改用户名成功',
          status: 200,
          type: 'success',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改用户密码
  updateUserPassword: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id)) || Number(id) !== ctx.state.user.id) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const { pass, password } = ctx.request.body
      if (!pass || !password) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const user = await userDao.getUserById(id)
      const saltpass = await encryption.MD5(pass, user.salt)
      if (saltpass !== user.password) {
        ctx.body = {
          msg: '密码错误',
          status: 200,
          type: 'error',
        }
        return
      }
      const salt = encryption.getUuid()
      const pwd = await encryption.MD5(password, salt)
      const result = await userDao.updateUserPassword(id, pwd, salt)
      if (result[0]) {
        ctx.body = {
          msg: '修改密码成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 获取所有权限信息
  getAllRole: async (ctx, next) => {
    try {
      const roles = await userDao.getAllRole()
      if (roles) {
        ctx.body = {
          roles,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.status = 404
        ctx.body = errTemps.get(404)
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 登出(本地) jwt的话直接删除token即可登出
  logout: async (ctx, next) => {
    ctx.logout()
  },
}
