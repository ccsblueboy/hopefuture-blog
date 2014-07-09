/**
 * Created by linder on 2014/7/7.
 */
'use strict';

(function ($, undefined) {
  var re = /\{(\d+)\}/g;
  var applyTemplate = function (template, values) {
    return template.replace(re, function (match, key, index, source) {
      return values[key] !== undefined ? values[key] : '';
    });
  };

  var pluginName = 'schedulePicker';
  var today = moment().isoWeekday(1).startOf('day');
  var defaults = {
    date: today,
    style: {
      selected: 'selected',
      current: 'current',
      weekend: 'weekend'
    },
    context: './',
    tmplUrl: 'templates/component-tmpl.html'
  };

  var componentTmpl;

  $.fn[pluginName] = function (options) {

    var plugin = $(this).data(pluginName);

    if (plugin) {
      return plugin;
    }

    return this.each(function () {
      var api;
      var settings = $.extend(true, {}, defaults, options);
      var picker = $(this);
      var showedDate = settings.date;
      var selectedDate = showedDate.clone();

      if (!componentTmpl) {//加载模板，只加载一次
        $.ajax({
          url: settings.context + settings.tmplUrl,
          async: false,
          dataType: 'text',
          success: function (content) {
            componentTmpl = $.templates(content);
          }
        });
      }

      //渲染当月日期
      var renderDays = function (step) {
        var a = showedDate.clone();
        if(step){
          a.add('m', step);
        }
        a.startOf('month').startOf('isoWeek');
        var b = a.clone().add('d', 42);
        var html = '';
        var isNext = false;

        while (a < b) {
          var classes = [];
          if (a.format('D-M-YYYY') === today.format('D-M-YYYY')) {
            classes.push(settings.style.current);
          }
          if (a.weekday() === 6 || a.weekday() === 0) {//周末
            classes.push(settings.style.weekend);
          }
          if (a.month() !== showedDate.month()) {
            classes.push(isNext ? 'next' : 'prev');
          } else {
            isNext = true;
          }
          html += '<span data-day="' + a.format('YYYY-MM-DD') + '" class="' + classes.join(' ') + '">' + a.date() + '</span>';
          a.add('d', 1);
        }
        return html;
      };

      //渲染当天时段
      var renderCalendarItems = function () {
        var tmpl = '<div class="calendar-item"><span class="calendar-item-inner">{0}</span></div>';
        var val;
        var html = '';
        for (var i = 0; i < 48; i++) {
          if (i % 2 === 0) {
            val = i / 2;
            if (val < 10) {
              val = '0' + val;
            }
            val += ':00';
          } else {
            val = '';
          }
          html += applyTemplate(tmpl, [val]);
        }
        return html;
      };

      //初始化相关事件
      var initEvent = function(){
        picker.on('click','[data-prev-month]',function(){
          renderDays(-1);
        });
        picker.on('click','[data-prev-next]',function(){
          renderDays(1);
        });
      };

      //渲染模板数据
      var json = {};

      json.currentDate = showedDate.format('YYYY年M月');
      json.daysHtml = renderDays();
      json.calendarItems = renderCalendarItems();
      json.currentYMD = showedDate.format('YYYY年M月D日');
      picker.html(componentTmpl.render(json));

      var dataMonth = picker.find('[data-month]');

      initEvent();

      var initData = function (data) {
        if (!data) {
          return;
        }
        if (!$.isArray(data)) {
          data = [data];
        }
        for (var i = 0, len = data.length; i < len; i++) {
          dataMonth.find('[data-day="' + data[i].date + '"]').addClass(settings.style.selected);
        }
      };

      //加载数据
      if (settings.events && $.isFunction(settings.events)) {
        settings.events(showedDate.clone().startOf('month'), showedDate.clone().endOf('month'), initData);
      }

      picker.data(pluginName, api);

    });
  };
})(jQuery);

