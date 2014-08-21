'use strict';

/**
 * 配置mongodb 相关参数
 * @module config
 * @since 0.0.2
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-5-8
 * */

module.exports = {
  /**
   * 生成 link 密钥，比如发送注册邮件等
   */
  linkSecret: 'hfblog',

  /**
   * Cookie 密钥
   */
  cookieSecret: 'hfblog',

  /**
   * session 密钥
   */
  sessionSecret: 'hope future blog, very secret',
  /**
   * 连接mongodb url
   */
  connectionUrl: 'mongodb://localhost/hfblog',

  /**
   * 注册用户时，保留的注册名称
   * 过滤分为两种情况，一种是系统保留的用户名
   * 另一种由于采用url来区分不同的用户名，所以系统已有的url名称，需要过滤掉，
   * 比如： http://localhost:9000/login 是一个有效的地址，这时我们就需要过滤掉login，否则注册的用户就会与系统本身的url冲突
   * 目前系统中用到的url有
   * 'examples', 'login', 'logout', 'signup', 'forgot', 'resetpassword', 'terms', 'about', 'manage', 'blog', 'reference'
   * 保留的将来使用的有（FIXME ：待实现考虑）
   *
   * 系统用户有：'admin', 'administrator'
   */
  accountFilters: ['examples', 'login', 'logout', 'signup', 'forgot', 'resetpassword', 'terms', 'about', 'manage', 'blog',
    'reference', 'admin', 'administrator'],

  /**
   * 系统默认主题
   */
  defaultTheme: 'spring-tones',

  /**
   * 邮箱配置项
   */
  mailConfig: {
    user: '',
    pass: '',
    from: ''
  }

};