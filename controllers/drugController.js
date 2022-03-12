const { drugDao } = require('../services/drugService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取药品
  getDrug: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const notice = await drugDao.getDrug(id)
      if (notice) {
        ctx.body = {
          notice,
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

  // 获取所有药品
  getAllDrug: async (ctx, next) => {
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
      const drugs = await drugDao.getAllDrug(offset, limit)
      if (drugs) {
        const count = await drugDao.getDrugAmount()
        ctx.body = {
          count,
          drugs,
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

  // 新增药品
  insertDrug: async (ctx, next) => {
    try {
      let { name, price, quantity, factory, batch, pd, exp } = ctx.request.body
      if (!name || !price || !quantity || !factory || !batch || !pd || !exp) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      await drugDao.insertDrug(name, price, quantity, factory, batch, pd, exp)
      ctx.body = {
        msg: '新增药品成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改药品
  updateDrug: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      let { name, price, quantity, factory, batch, pd, exp } = ctx.request.body
      if (!name || !price || !quantity || !factory || !batch || !pd || !exp) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await drugDao.updateDrug(id, name, price, quantity, factory, batch, pd, exp)
      if (result[0]) {
        ctx.body = {
          msg: '修改药品成功',
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

  // 删除药品
  deleteDrug: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await drugDao.deleteDrug(id)
      if (result) {
        ctx.body = {
          msg: '删除药品成功',
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
