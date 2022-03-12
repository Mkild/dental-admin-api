const { feedback } = require('../models/index')

class feedbackDao {
  static async getFeedback(id) {
    return await feedback.findOne({
      where: {
        id,
      },
    })
  }

  static async getFeedbackByTitle(title) {
    return await feedback.findOne({
      where: {
        title,
      },
    })
  }

  static async getAllFeedback(offset = 0, limit = 100) {
    return await feedback.findAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit,
      raw: true,
    })
  }

  static async getFeedbackAmount() {
    return await feedback.count()
  }

  static async insertFeedback(title, text, editor) {
    return await feedback.create({
      title,
      text,
      editor,
    })
  }

  static async updateFeedback(id, title, text, editor) {
    return await feedback.update(
      {
        title,
        text,
        editor,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async deleteFeedback(id) {
    return await feedback.destroy({
      where: {
        id,
      },
    })
  }
}

module.exports = {
  feedbackDao,
}
