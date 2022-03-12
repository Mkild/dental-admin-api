const router = require('koa-router')()
const drugController = require('../controllers/drugController')

router.prefix('/drug')

// 获取药品
router.get('/drug', drugController.getDrug)

// 获取所有药品
router.get('/drugs', drugController.getAllDrug)

// 新增药品
router.post('/insert', drugController.insertDrug)

// 修改药品
router.post('/update', drugController.updateDrug)

// 删除药品
router.post('/delete', drugController.deleteDrug)

module.exports = router
