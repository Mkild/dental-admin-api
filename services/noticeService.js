const { notice, notice_text } = require('../models/index')

class noticeDao {
  static async getNotice(id) {
    return await notice.findOne({
      where: {
        id,
      },
    })
  }

  static async getAllNotice(offset = 0, limit = 20) {
    return await notice.findAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit,
      raw: true,
    })
  }

  static async getNoticeAmount() {
    return await notice.count()
  }

  static async insertNotice(title, author) {
    return await notice.create({
      title,
      author,
    })
  }

  static async updateNotice(id, title, author) {
    return await notice.update(
      {
        title,
        author,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async deleteNotice(id) {
    return await notice.destroy({
      where: {
        id,
      },
    })
  }

  static async getNoticeContent(id) {
    return await notice.findOne({
      include: [
        {
          model: notice_text,
        },
      ],
      where: {
        id,
      },
    })
  }

  static async insertNoticeText(notice_id, text) {
    return await notice_text.create({
      notice_id,
      text,
    })
  }

  static async updateNoticeText(notice_id, text) {
    return await notice_text.update(
      {
        text,
      },
      {
        where: {
          notice_id,
        },
      }
    )
  }
}

module.exports = {
  noticeDao,
}
