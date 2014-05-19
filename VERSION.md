# HEAD

以下会记录项目开发过程中每个版本相关信息

##version 0.0.0 开启项目 (2014-3-13)

* 制定开发目的和目标
* 选用相关技术
* 搭建项目框架
* 参考同类产品

##version 0.0.1  搭建基本框架(2014-3-28)

* 用 yeoman 搭建 基于 angular 项目
* 使用后台 express
* 加入 grunt express task
* 修改Gruntfile.js文件，watch express 代码，grunt build express

##version 0.0.2  完善项目基本框架(2014-5-9)

* 调整文件夹 app 编译（build）后放到 webapp 目录下
* 完善 grunt 相关任务帮助文档
* 整合 mongodb 数据库
* 加入 Angular UI Bootstrap
* 加入对 less 的支持，并整合 grunt-contrib-less 任务
* 实现项目简单例子
    1. 分页显示例子，url相对路径为 example-pagination/
    2. 基本Grid 列表，url相对路径为 example-grid/
* 整合 grunt-jsdoc ，并生成 doc 帮助文档（基于angular书写的代码没有完成，待找到合适的专门用来生成angular文档的插件补上）
* 前端测试
    1. 单元测试， grunt + karma + Jasmine
    2. 端对端（e2e）测试， protractor

##version 0.1.0  进一步完善项目基本框架，使之成为一个通用的项目框架(2014-5-19)

* 升级[express](http://expressjs.com/)到4.x
* 支持url上下文部署（没有解决，先不考虑这个，利用相对路径来开发）
* 引入javascript模块化管理，可以用 [RequireJS](http://www.requirejs.org/)  或 [Sea.js](http://seajs.org/docs/)
`generator-angular` 结构不太适合模块化管理，我们可以安装 `npm install -g generator-angular-require` ，然后用 `yo angular-require [app-name] `
来生成基于 angular 和 require的项目框架。我们也可以用 `npm install -g generator-angular-with-require yo angular-with-require` 来生成项目框架
* 调试的使用（包括开发和测试的调试），具体开发中补充
