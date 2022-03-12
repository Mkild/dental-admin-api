# Dental Admin API

<p align="center">
    <img src="https://i.imgur.com/8KFVZlq.png" alt="dental-admin-api" />
</p>
<p align="center">
    <a href="https://koajs.com/"><img src="https://img.shields.io/badge/koa-v2.7.0-blue.svg?color=33333D&logo=koa" alt="koa" /></a>
    <a href="https://www.sequelize.com.cn/"><img src="https://img.shields.io/badge/sequelize-v6.3.5-blue.svg?color=52B0E7&logo=sequelize" alt="sequelize" /></a>
    <a href="https://github.com/koajs/router"><img src="https://img.shields.io/badge/koa--router-v8.0.8-blue.svg?color=3EAF7C" alt="koa-router" /></a>
    <a href="https://github.com/rkusa/koa-passport"><img src="https://img.shields.io/badge/koa--passport-v8.0.8-blue.svg?color=34E27A&logo=passport" alt="koa-passport" /></a>
    <a href="https://github.com/log4js-node/log4js-node"><img src="https://img.shields.io/badge/log4js-v6.3.0-blue.svg?color=39C5BB" alt="log4js" /></a>
    <a href="https://github.com/log4js-node/log4js-node"><img src="https://img.shields.io/badge/MySQL-v8.0.22-blue.svg?color=4479A1&logo=MySQL" alt="MySQL" /></a>
    <img src="https://img.shields.io/badge/version-v1.0.0-yellow.svg" alt="version" />
    <img src="https://img.shields.io/badge/license-AGPL--3.0-green.svg" alt="license" />
</p>
> **Dental Admin API 牙科诊所管理系统 API**
>
> 基于Node.js koa2 的 牙科诊所管理系统 API | Dental Admin API based on koa2
>
> 同时使用了：ORM sequelize，路由 koa-router，认证中间件 koa-passport, 日志模块 log4js...

## 简介

一个平平无奇的 web 后台管理系统的接口，提供 牙科诊所管理系统 的接口。

前后端分离。

密码进行简单加密（MD5 + uuid）。

基于 Token(JWT) 实现登录注册和权限认证。

包含以下模块：

用户模块、公告模块、科室模块、药品模块、病历模块、收费统计模块、收入统计模块、门诊量统计模块、问题反馈模块等。

更多接口有待后续开发。

提供接口文档，文档使用 [Apifox](https://www.apifox.cn/) 生成。

为方便使用，接口全部使用 GET 或 POST

> **接口文档指路：** [接口文档在线分享](https://www.apifox.cn/apidoc/shared-6ec12252-6de6-4404-bdd7-a087d9e13d46)

前端在我的另一个仓库：dental-admin

> **前端指路：** [dental-admin](https://github.com/Mkild/dental-admin)

## 快速启动
首先确保 [Node.js](https://nodejs.org/en/)  和 [MySQL](https://www.mysql.com/) 已经安装且能正常运行。

作为参考，我的 Node.js 版本是`16.14.0`，MySQL版本是`8.0.22`，其他版本请自行测试。

```shell
# 克隆项目
# cnpmjs
git clone https://github.com.cnpmjs.org/Mkild/dental-admin-api.git
# or
git clone https://github.com/Mkild/dental-admin-api.git
# 进入项目目录
cd dental-admin-api
# 安装依赖 
npm install
# 修改MySQL配置
# 修改根目录下config文件夹中的 mysql_config.js 和 mysql_sequelize.js 中的配置
# 将user、password等修改成你自己MySQL中的user、password等
# 启动服务 （默认为http://localhost:3000）
npm run start  / nodemon

```

## 工程化

- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范： [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)