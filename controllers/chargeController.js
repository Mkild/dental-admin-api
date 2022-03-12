const { chargeDao } = require('../services/chargeService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取收费记录
  getCharge: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const charge = await chargeDao.getCharge(id)
      if (charge) {
        ctx.body = {
          charge,
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

  // 获取所有收费记录
  getAllCharge: async (ctx, next) => {
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
      const charges = await chargeDao.getAllCharge(offset, limit)
      if (charges) {
        const count = await chargeDao.getChargeAmount()
        ctx.body = {
          count,
          charges,
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

  // 获取某日收费总金额
  getChargeSum: async (ctx, next) => {
    try {
      const date = ctx.query.date
      if (!date) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const chargeSum = await chargeDao.getChargeSum(date)
      if (chargeSum) {
        ctx.body = {
          chargeSum,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          chargeSum: null,
          status: 200,
          type: 'success',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 新增收费记录
  insertCharge: async (ctx, next) => {
    try {
      let { project, name, amount, signature, date, charge_details } = ctx.request.body
      if (!project || !name || !amount || !signature || !date || !isNum(Number(amount))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      if (charge_details && !Array.isArray(charge_details)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await chargeDao.insertCharge(project, name, amount, signature, date)
      if (charge_details.length !== 0) {
        charge_details.forEach((el) => {
          el.charge_id = result.dataValues.id
        })
      }
      if (!charge_details) charge_details = []
      await chargeDao.insertChargeDetail(charge_details)
      ctx.body = {
        msg: '新增收费记录成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改收费记录
  updateCharge: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      let { project, name, amount, signature, date, charge_details } = ctx.request.body
      if (!project || !name || !amount || !signature || !date) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      if (charge_details && !Array.isArray(charge_details)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await chargeDao.updateCharge(id, project, name, amount, signature, date)
      await chargeDao.deleteChargeDetail(id)
      if (!charge_details) charge_details = []
      await chargeDao.insertChargeDetail(charge_details)
      if (result[0]) {
        ctx.body = {
          msg: '修改收费记录成功',
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

  // 删除收费记录
  deleteCharge: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await chargeDao.deleteCharge(id)
      if (result) {
        ctx.body = {
          msg: '删除收费记录成功',
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
