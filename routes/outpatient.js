const router = require('koa-router')()
const outpatientController = require('../controllers/outpatientController')

router.prefix('/outpatient')

// 获取门诊量记录
router.get('/outpatient', outpatientController.getOutpatient)

// 根据日期获取门诊量记录
router.get('/dateoutpatient', outpatientController.getOutpatientByDate)

// 获取所有门诊量记录
router.get('/outpatients', outpatientController.getAllOutpatient)

// 新增门诊量记录
router.post('/insert', outpatientController.insertOutpatient)

// 修改门诊量记录
router.post('/update', outpatientController.updateOutpatient)

// 删除门诊量记录
router.post('/delete', outpatientController.deleteOutpatient)

module.exports = router
