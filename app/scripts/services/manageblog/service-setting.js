'use strict';

angular.module('hopefutureBlogApp')
  .factory('settingService', ['hfbHttpService', function (hfbHttpService) {
    return {
      findTheme: function ( success) {
        hfbHttpService.get('manage/setting/theme').then(success);
      },
      setTheme: function (themeCode, success) {
        hfbHttpService.post('manage/setting/theme/' + themeCode).then(success);
      }
    };
  }])
  .constant('blogThemes', [
    {
      code: 'blue-classic',
      name: '蓝色经典'
    },
    {
      code: 'spring-tones',// 自定义主题地址：http://getbootstrap.com/customize/?id=97567444cec84ab50d8c
      name: '春天色彩'
    },
    {
      code: 'sea-tones',// 自定义主题地址：http://getbootstrap.com/customize/?id=583a3050c460e8b9ec59
      name: '海的声音'
    },
    {
      code: 'grass-color',// 自定义主题地址：http://getbootstrap.com/customize/?id=ef6b7eb0611315d724f8
      name: '草地气息'
    }
  ]);

