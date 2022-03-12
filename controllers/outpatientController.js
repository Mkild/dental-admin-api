const { outpatientDao } = require('../services/outpatientService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取门诊量记录
  getOutpatient: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const outpatient = await outpatientDao.getOutpatient(id)
      if (outpatient) {
        ctx.body = {
          outpatient,
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

  // 根据日期获取门诊量记录
  getOutpatientByDate: async (ctx, next) => {
    try {
      let date = ctx.query.date
      if (!date) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const outpatient = await outpatientDao.getOutpatientByDate(date)
      if (outpatient) {
        ctx.body = {
          outpatient,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          outpatient: null,
          status: 200,
          type: 'success',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 获取所有门诊量记录
  getAllOutpatient: async (ctx, next) => {
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
      const outpatients = await outpatientDao.getAllOutpatient(offset, limit)
      if (outpatients) {
        const count = await outpatientDao.getOutpatientAmount()
        ctx.body = {
          count,
          outpatients,
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

  // 新增门诊量记录
  insertOutpatient: async (ctx, next) => {
    try {
      let { date, total, outpatient_details } = ctx.request.body
      if (!date || !total || !isNum(Number(total))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const outpatient = await outpatientDao.getOutpatientByDate(date)
      if (outpatient) {
        ctx.status = 400
        ctx.body = {
          msg: '该记录已存在',
          status: 400,
          type: 'error',
        }
        return
      }
      if (outpatient_details && !Array.isArray(outpatient_details)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const editor = ctx.state.user.username
      const result = await outpatientDao.insertOutpatient(date, total, editor)
      if (outpatient_details.length !== 0) {
        outpatient_details.forEach((el) => {
          el.outpatient_id = result.dataValues.id
        })
      }
      if (!outpatient_details) outpatient_details = []
      await outpatientDao.insertOutpatientDetail(outpatient_details)
      ctx.body = {
        msg: '新增门诊量记录成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改门诊量记录
  updateOutpatient: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      let { date, total, outpatient_details } = ctx.request.body
      if (!date || !total || !isNum(Number(total))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      if (outpatient_details && !Array.isArray(outpatient_details)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const editor = ctx.state.user.username
      const result = await outpatientDao.updateOutpatient(id, date, total, editor)
      await outpatientDao.deleteOutpatientDetail(id)
      if (!outpatient_details) outpatient_details = []
      await outpatientDao.insertOutpatientDetail(outpatient_details)
      if (result[0]) {
        ctx.body = {
          msg: '修改门诊量记录成功',
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

  // 删除门诊量记录
  deleteOutpatient: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await outpatientDao.deleteOutpatient(id)
      if (result) {
        ctx.body = {
          msg: '删除门诊量记录成功',
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
