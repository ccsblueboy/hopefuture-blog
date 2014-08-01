'use strict';

/**
 * 个人博客 Controller
 * @class BlogCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-12
 * */

angular.module('hopefutureBlogApp').controller('BlogCtrl', function ($scope, blogService, blogMethod) {

  /**
   * 创建新的文章
   */
  $scope.createBlog = function () {
    window.location.href = window.location.origin + window.location.pathname + '/manage#/publish';
  };

  /**
   * 管理我的博客
   */
  $scope.manageBlog = function () {
    window.location.href = window.location.origin + window.location.pathname + '/manage#/article';
  };

  var pathname = window.location.pathname;
  var account = pathname.substring(1);

  $scope.blog = {
    account: undefined,
    hotArticles: undefined,
    recentArticles: undefined,
    articlesArchive: undefined,
    categories: undefined,
    labels: undefined,
    comments: undefined,
    resources: undefined
  };
  /**
   * 加载博客相关数据
   */
  blogService.blog(account, function (data) {
    if (data.success === true) {
      data.blogData.labels = blogMethod.parseArticleLabel(data.blogData.labels);
      $scope.blog = data.blogData;
    }
  });

});