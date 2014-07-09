'use strict';

$(function() {
  $('#picker').schedulePicker({
    context: '../',
    events: function (start, end, callback) {
      $.ajax({
        url: './demo1.json',
        dataType: 'json',
        success: function (data) {
          callback(data);
        }
      });
    }
  });
});