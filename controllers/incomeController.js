const { incomeDao } = require('../services/incomeService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取收入记录
  getIncome: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const income = await incomeDao.getIncome(id)
      if (income) {
        ctx.body = {
          income,
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

  // 根据日期获取收入记录
  getIncomeByDate: async (ctx, next) => {
    try {
      let date = ctx.query.date
      if (!date) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const income = await incomeDao.getIncomeByDate(date)
      if (income) {
        ctx.body = {
          income,
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          income: null,
          status: 200,
          type: 'success',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 获取所有收入记录
  getAllIncome: async (ctx, next) => {
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
      const incomes = await incomeDao.getAllIncome(offset, limit)
      if (incomes) {
        const count = await incomeDao.getIncomeAmount()
        ctx.body = {
          count,
          incomes,
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

  // 新增收入记录
  insertIncome: async (ctx, next) => {
    try {
      const { date, total } = ctx.request.body
      if (!date || !total || !isNum(Number(total))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const income = await incomeDao.getIncomeByDate(date)
      if (income) {
        ctx.status = 400
        ctx.body = {
          msg: '该记录已存在',
          status: 400,
          type: 'error',
        }
        return
      }
      const editor = ctx.state.user.username
      await incomeDao.insertIncome(date, total, editor)
      ctx.body = {
        msg: '新增收入记录成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改收入记录
  updateIncome: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      let { date, total } = ctx.request.body
      if (!date || !total || !isNum(Number(total))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const editor = ctx.state.user.username
      const result = await incomeDao.updateIncome(id, date, total, editor)
      if (result[0]) {
        ctx.body = {
          msg: '修改收入记录成功',
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

  // 删除收入记录
  deleteIncome: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await incomeDao.deleteIncome(id)
      if (result) {
        ctx.body = {
          msg: '删除收入记录成功',
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
