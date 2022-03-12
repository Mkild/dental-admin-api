const { feedbackDao } = require('../services/feedbackService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取反馈记录
  getFeedback: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const feedback = await feedbackDao.getFeedback(id)
      if (feedback) {
        ctx.body = {
          feedback,
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

  // 获取所有反馈记录
  getAllFeedback: async (ctx, next) => {
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
      const feedbacks = await feedbackDao.getAllFeedback(offset, limit)
      if (feedbacks) {
        const count = await feedbackDao.getFeedbackAmount()
        ctx.body = {
          count,
          feedbacks,
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

  // 新增反馈记录
  insertFeedback: async (ctx, next) => {
    try {
      const { title, text } = ctx.request.body
      if (!title || !text) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const editor = ctx.state.user.username
      await feedbackDao.insertFeedback(title, text, editor)
      ctx.body = {
        msg: '新增反馈记录成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改反馈记录
  updateFeedback: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const { title, text, editor } = ctx.request.body
      if (!title || !text || !editor) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await feedbackDao.updateFeedback(id, title, text, editor)
      if (result[0]) {
        ctx.body = {
          msg: '修改反馈记录成功',
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

  // 删除反馈记录
  deleteFeedback: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await feedbackDao.deleteFeedback(id)
      if (result) {
        ctx.body = {
          msg: '删除反馈记录成功',
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
