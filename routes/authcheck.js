const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const authCheck = require('../middlewares/authcheck')

// 登录验证(本地)
// router.all('*', loginCheck.loginstats)

// 登录验证(jwt)
router.all('*', loginCheck.apiJwtCheck)

/* ----------------------- 分割线 ------------------------- */

/* 用户模块 权限验证(director及以上权限放行) */
// 获取所有用户
router.get('/user/users', authCheck.authCheckDirector)
// 新增用户
router.post('/user/add', authCheck.authCheckDirector)
// 获取所有用户详情
router.get('/user/details', authCheck.authCheckDirector)
// 获取所有权限信息
router.get('/user/roles', authCheck.authCheckDirector)

/* 用户模块 权限验证(admin及以上权限放行) */
// 新增用户
router.post('/user/insert', authCheck.authCheckAdmin)
// 修改用户
router.post('/user/update', authCheck.authCheckAdmin)
// 变更用户状态
router.post('user/state', authCheck.authCheckAdmin)
// 修改用户权限
router.post('/role/update', authCheck.authCheckAdmin)
// 删除用户
router.post('/user/delete', authCheck.authCheckAdmin)

/* ----------------------- 分割线 ------------------------- */

/* 公告模块 权限验证(director及以上权限放行) */
// 新增公告
router.post('/notice/insert', authCheck.authCheckDirector)
// 修改公告
router.post('/notice/update', authCheck.authCheckDirector)
// 删除公告
router.post('/notice/delete', authCheck.authCheckDirector)

/* ----------------------- 分割线 ------------------------- */

/* 科室模块 权限验证(director及以上权限放行) */
// 获取科室
router.get('/department/department', authCheck.authCheckDirector)
// 新增科室
router.post('/department/insert', authCheck.authCheckDirector)
// 修改科室
router.post('/department/update', authCheck.authCheckDirector)
// 删除科室
router.post('/department/delete', authCheck.authCheckDirector)

/* ----------------------- 分割线 ------------------------- */

/* 药品模块 权限验证(doctor及以上权限放行) */
// 获取药品
router.get('/drug/drug', authCheck.authCheckDoctor)
// 获取所有药品
router.get('/drug/drugs', authCheck.authCheckDoctor)
// 新增药品
router.post('/drug/insert', authCheck.authCheckDoctor)
// 修改药品
router.post('/drug/update', authCheck.authCheckDoctor)
// 删除药品
router.post('/drug/delete', authCheck.authCheckDoctor)

/* ----------------------- 分割线 ------------------------- */

/* 病历模块 权限验证(doctor及以上权限放行) */
// 获取病历
router.get('/record/record', authCheck.authCheckDoctor)
// 获取所有病历
router.get('/record/records', authCheck.authCheckDoctor)
// 新增病历
router.post('/record/insert', authCheck.authCheckDoctor)
// 修改病历
router.post('/record/update', authCheck.authCheckDoctor)
// 删除病历
router.post('/record/delete', authCheck.authCheckDoctor)

/* ----------------------- 分割线 ------------------------- */

/* 收费记录模块 权限验证(director及以上权限放行) */
// 获取收费记录
router.get('/charge/charge', authCheck.authCheckDirector)
// 获取所有收费记录
router.get('/charge/charges', authCheck.authCheckDirector)
// 新增收费记录
router.post('/charge/insert', authCheck.authCheckDirector)
// 修改收费记录
router.post('/charge/update', authCheck.authCheckDirector)
// 删除收费记录
router.post('/charge/delete', authCheck.authCheckDirector)

/* ----------------------- 分割线 ------------------------- */

/* 收入记录模块 权限验证(director及以上权限放行) */
// 获取收入记录
router.get('/income/income', authCheck.authCheckDirector)
// 新增收入记录
router.post('/income/insert', authCheck.authCheckDirector)
// 修改收入记录
router.post('/income/update', authCheck.authCheckDirector)
// 删除收入记录
router.post('/income/delete', authCheck.authCheckDirector)

/* ----------------------- 分割线 ------------------------- */

/* 门诊量记录模块 权限验证(doctor及以上权限放行) */
// 获取门诊量记录
router.get('/outpatient/outpatient', authCheck.authCheckDoctor)
// 新增门诊量记录
router.post('/outpatient/insert', authCheck.authCheckDirector)
// 修改门诊量记录
router.post('/outpatient/update', authCheck.authCheckDirector)
// 删除门诊量记录
router.post('/outpatient/delete', authCheck.authCheckDirector)

/* ----------------------- 分割线 ------------------------- */

/* 反馈模块 权限验证(director及以上权限放行) */
// 删除科室
router.post('/feedback/delete', authCheck.authCheckDirector)

/* ----------------------- 分割线 ------------------------- */

module.exports = router
