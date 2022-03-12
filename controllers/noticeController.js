const { noticeDao } = require('../services/noticeService')
const { errTemps, isNum } = require('../utils/common')

module.exports = {
  // 获取公告
  getNotice: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const notice = await noticeDao.getNotice(id)
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

  // 获取所有公告
  getAllNotice: async (ctx, next) => {
    try {
      let { offset, limit } = ctx.query
      if (!offset) offset = 0
      if (!limit) limit = 30
      offset = Number(offset)
      limit = Number(limit)
      if (isNaN(offset) || isNaN(limit)) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const notices = await noticeDao.getAllNotice(offset, limit)
      if (notices) {
        const count = await noticeDao.getNoticeAmount()
        ctx.body = {
          count,
          notices,
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

  // 获取公告内容
  getNoticeContent: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const noticeContent = await noticeDao.getNoticeContent(id)
      if (noticeContent) {
        ctx.body = {
          noticeContent,
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

  // 新增公告
  insertNotice: async (ctx, next) => {
    try {
      const { title, text } = ctx.request.body
      if (!title || !text) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const author = ctx.state.user.username
      const notice = await noticeDao.insertNotice(title, author)
      const notice_id = notice.dataValues.id
      await noticeDao.insertNoticeText(notice_id, text)
      ctx.body = {
        msg: '新增公告成功',
        status: 200,
        type: 'success',
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },

  // 修改公告
  updateNotice: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const { title, text } = ctx.request.body
      if (!title || !text) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const author = ctx.state.user.username
      const result1 = await noticeDao.updateNotice(id, title, author)
      const notice_id = id
      const result2 = await noticeDao.updateNoticeText(notice_id, text)
      if (result1[0] || result2[0]) {
        ctx.body = {
          msg: '修改公告成功',
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

  // 删除公告
  deleteNotice: async (ctx, next) => {
    try {
      const id = ctx.query.id
      if (!id || !isNum(Number(id))) {
        ctx.status = 400
        ctx.body = errTemps.get(400)
        return
      }
      const result = await noticeDao.deleteNotice(id)
      if (result) {
        ctx.body = {
          msg: '删除公告成功',
          status: 200,
          type: 'success',
        }
      } else {
        ctx.body = {
          msg: '删除公告失败',
          status: 200,
          type: 'error',
        }
      }
    } catch (err) {
      ctx.throw('服务器错误', 500)
    }
  },
}
