const { departmentDao } = require('../services/departmentService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取科室
  getDepartment: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const department = await departmentDao.getDepartment(id)
      if (department) {
        ctx.body = {
          department,
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

  // 获取所有科室
  getAllDepartment: async (ctx, next) => {
    try {
      let { offset, limit } = ctx.query
      if (!offset) offset = 0
      if (!limit) limit = 100
      offset = Number(offset)
      limit = Number(limit)
      if (isNaN(offset) || isNaN(limit)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const departments = await departmentDao.getAllDepartment(offset, limit)
      if (departments) {
        const count = await departmentDao.getDepartmentAmount()
        ctx.body = {
          count,
          departments,
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

  // 新增科室
  insertDepartment: async (ctx, next) => {
    try {
      const { name, director } = ctx.request.body
      if (!name || !director) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      await departmentDao.insertDepartment(name, director)
      ctx.body = {
        msg: '新增科室成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改科室
  updateDepartment: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const { name, director } = ctx.request.body
      if (!name || !director) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await departmentDao.updateDepartment(id, name, director)
      if (result[0]) {
        ctx.body = {
          msg: '修改科室成功',
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

  // 删除科室
  deleteDepartment: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await departmentDao.deleteDepartment(id)
      if (result) {
        ctx.body = {
          msg: '删除科室成功',
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
}
