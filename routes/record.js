const router = require('koa-router')()
const recordController = require('../controllers/recordController')

router.prefix('/record')

// 获取病历
router.get('/record', recordController.getRecord)

// 获取所有病历
router.get('/records', recordController.getAllRecord)

// 新增病历
router.post('/insert', recordController.insertRecord)

// 修改病历
router.post('/update', recordController.updateRecord)

// 删除病历
router.post('/delete', recordController.deleteRecord)

module.exports = router
