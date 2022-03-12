const router = require('koa-router')()
const feedbackController = require('../controllers/feedbackController')

router.prefix('/feedback')

// 获取反馈记录
router.get('/feedback', feedbackController.getFeedback)

// 获取所有反馈记录
router.get('/feedbacks', feedbackController.getAllFeedback)

// 新增反馈记录
router.post('/insert', feedbackController.insertFeedback)

// 删除反馈记录
router.post('/delete', feedbackController.deleteFeedback)

module.exports = router
