'use strict';

/**
 * 个人博客 Controller
 * @class BlogCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-6-12
 * */

angular.module('hopefutureBlogApp')
  .controller('BlogCtrl', function ($scope, $location, blogService, blogMethod) {

    /**
     * 创建新的文章
     */
    $scope.createBlog = function () {
      window.location.href = window.location.href + '/manage#/publish';
    };

    /**
     * 管理我的博客
     */
    $scope.manageBlog = function () {
      window.location.href = window.location.href + '/manage#/article';
    };

    var path = $location.absUrl();
    var lastIndex = path.lastIndexOf('/') + 1;
    var account = path.substring(lastIndex);

    $scope.blog = {
      account: undefined,
      hotArticles: undefined,
      recentArticles: undefined,
      articlesArchive: undefined,
      categories: undefined,
      labels: undefined
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