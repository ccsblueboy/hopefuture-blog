'use strict';

/**
 * register the interceptor as a service
 * 给 http 请求注册一个拦截器
 */
angular.module('hopefutureBlogApp')
  .factory('hfbHttpInterceptor', function ($q) {
    return {
      // optional method
      'request': function (config) {
        // do something on success
        return config || $q.when(config);
      },

      // optional method
      'requestError': function (rejection) {
        // do something on error
        return $q.reject(rejection);
      },

      // optional method
      'response': function (response) {
        // do something on success
        return response || $q.when(response);
      },

      // optional method
      'responseError': function (rejection) {
        // do something on error
        return $q.reject(rejection);
      }
    };

  })
  .config(function ($httpProvider) {
    //为 $httpProvider 加入拦击器 hfbHttpInterceptor
    $httpProvider.interceptors.push('hfbHttpInterceptor');
    $httpProvider.defaults.transformRequest.push(function (data, headersGetter) {
      //      if ($('#sspAjaxLoadingBackdrop').length === 0) {
      //        $('body').append('<div class="ajax-loading-backdrop" id="sspAjaxLoadingBackdrop"></div>');
      //      } else {
      //        $('#sspAjaxLoadingBackdrop').show();
      //      }
      //      if ($('#sspAjaxLoading').length === 0) {
      //        $('body').append('<div class="ajax-loading" id="sspAjaxLoading">working...</div>');
      //      } else {
      //        $('#sspAjaxLoading').show();
      //      }
      console.log(headersGetter);
      return data;
    });
    $httpProvider.defaults.transformResponse.push(function (data, headersGetter) {
      console.log(headersGetter);
      return data;
    });

    /**
     * Setting HTTP Headers 详细看官方文档，可以设置http headers
     * http://docs.angularjs.org/api/ng/service/$http
     */
    $httpProvider.defaults.headers.common.xRequestedWith = 'XMLHttpRequest';
  })
  .factory('hfbHttpService', ['$http', '$q', function ($http, $q) {// 创建 custom Http Service
    return {
      get: function (url, config) {
        var defer = $q.defer();
        $http.get(url, config).
          success(function (data, status) {
            defer.resolve(data);
          }).
          error(function (data, status) {
          });
        return defer.promise;
      },
      post: function (url, config) {
        var defer = $q.defer();
        $http.post(url, config).
          success(function (data, status) {
            defer.resolve(data);
          }).
          error(function (data, status) {
          });
        return defer.promise;
      },
      /*
       * The delete is the keyword, it is error in ie8.
       */
      'delete': function (url, config) {
        var defer = $q.defer();
        $http.delete(url, config).
          success(function (data, status) {
            defer.resolve(data);
          }).
          error(function (data, status) {
          });
        return defer.promise;
      }
    };
  }]);