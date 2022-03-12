const router = require('koa-router')()
const noticeController = require('../controllers/noticeController')

router.prefix('/notice')

// 获取公告
router.get('/notice', noticeController.getNotice)

// 获取所有公告
router.get('/notices', noticeController.getAllNotice)

// 新增公告
router.post('/insert', noticeController.insertNotice)

// 修改公告
router.post('/update', noticeController.updateNotice)

// 删除公告
router.post('/delete', noticeController.deleteNotice)

// 获取公告内容
router.get('/content', noticeController.getNoticeContent)

module.exports = router
