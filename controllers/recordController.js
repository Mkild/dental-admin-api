const { recordDao } = require('../services/recordService')
const { departmentDao } = require('../services/departmentService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取病历
  getRecord: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const record = await recordDao.getRecord(id)
      if (record) {
        ctx.body = {
          record,
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

  // 获取所有病历
  getAllRecord: async (ctx, next) => {
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
      const records = await recordDao.getAllRecord(offset, limit)
      if (records) {
        const count = await recordDao.getRecordAmount()
        ctx.body = {
          count,
          records,
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

  // 新增病历
  insertRecord: async (ctx, next) => {
    try {
      const { name, illness, text, dp, doctor } = ctx.request.body
      if (!name || !illness || !text || !dp || !doctor) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const department = await departmentDao.getDepartmentByName(dp)
      if (!department) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      await recordDao.insertRecord(name, illness, text, dp, doctor)
      ctx.body = {
        msg: '新增病历成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改病历
  updateRecord: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const { name, illness, text, dp, doctor } = ctx.request.body
      if (!name || !illness || !text || !dp || !doctor) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const department = await departmentDao.getDepartmentByName(dp)
      if (!department) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await recordDao.updateRecord(id, name, illness, text, dp, doctor)
      if (result[0]) {
        ctx.body = {
          msg: '修改病历成功',
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

  // 删除病历
  deleteRecord: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await recordDao.deleteRecord(id)
      if (result) {
        ctx.body = {
          msg: '删除病历成功',
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
