'use strict';

/**
 * 文章 Controller
 * @class ArticleCtrl
 * @since 0.2.0
 * @version @@currentVersion
 * @author Linder linder0209@126.com
 * @createdDate 2014-7-23
 * */

angular.module('hopefutureBlogApp')
  .controller('ArticleCtrl', function ($scope, $location, $modal, blogService, errorCodes, blogMethod) {

    var pathname = window.location.pathname;
    var account = pathname.substring(1);
    var absUrl = $location.absUrl();
    var articleIdReg = /\/\w+$/;

    $scope.articleLink = absUrl;
    //文章相关信息
    $scope.article = {};
    $scope.comments = [];
    $scope.prevArticle = undefined;
    $scope.nextArticle = undefined;
    $scope.relatedArticle = [];

    // 评论表单
    $scope.comment = {
      articleID: undefined,
      commentator: '',
      content: '',
      email: '',
      site: '',
      commentParent: undefined
    };

    var path = $location.path();
    var id = path.substring(path.lastIndexOf('/') + 1);
    blogService.articleInfo(account, id, function (data) {
      if (data.success === true) {
        $scope.article = data.articleInfo.article;

        $scope.comments = data.articleInfo.comments;
        if (data.articleInfo.prevArticle) {
          $scope.prevArticle = data.articleInfo.prevArticle;
          $scope.prevArticle.articleLink = absUrl.replace(articleIdReg, '/' + $scope.prevArticle._id);
        }

        if (data.articleInfo.nextArticle) {
          $scope.nextArticle = data.articleInfo.nextArticle;
          $scope.nextArticle.articleLink = absUrl.replace(articleIdReg, '/' + $scope.nextArticle._id);
        }

        $scope.relatedArticle = data.articleInfo.relatedArticle;
        angular.forEach(function (item) {
          item.articleLink = absUrl.replace(articleIdReg, '/' + item._id);
        });

        $scope.comment.articleID = data.articleInfo.article._id;
        if (data.account) {
          angular.extend($scope.comment, data.account);
        }

        //FIXME 这里递归渲染没有使用指令实现（以后有机会再研究），只是简单的通过模板来渲染html
        var html = blogMethod.renderComment($scope.comments);
        $('#commentList').html(html);
      }
    });

    //发表评论
    $scope.publishComment = function () {
      if ($('form[name="commentForm"]').valid()) {
        publishComment();
      }
    };

    //提交发表评论
    function publishComment() {
      blogService.comment(account, $scope.comment, function (data) {
        if (data.success) {
          console.info(1);
        } else {
          var errCode = data.errMessage;
          $modal.open({
            templateUrl: '../views/templates/alertModal.html',
            controller: 'AlertModalCtrl',
            resolve: {
              config: function () {
                return {
                  modalContent: errorCodes[errCode]
                };
              }
            }
          });
        }
      });
    }
  });