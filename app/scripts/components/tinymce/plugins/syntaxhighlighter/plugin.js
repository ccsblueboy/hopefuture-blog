/**
 * plugin.js
 * 自定义插件  SyntaxHighlighter 代码高亮插件
 */

/*global tinymce:true */

tinymce.PluginManager.add('syntaxhighlighter', function (editor, url) {
  var brushes = {
    applescript: 'AppleScript',
    as3: 'ActionScript3',
    bash: 'Bash(Shell)',
    coldfusion: 'Cold Fusion',
    csharp: 'C#',
    cpp: 'C++',
    css: 'CSS',
    delphi: 'Delphi',
    diff: 'Diff',
    erlang: 'Erlang',
    groovy: 'Groovy',
    java: 'Java',
    javafx: 'JavaFX',
    javascript: 'JavaScript',
    perl: 'Perl',
    php: 'PHP',
    plain: 'Plain(Text)',
    powershell: 'PowerShell',
    python: 'Python',
    ruby: 'Ruby',
    sass: 'SASS',
    scala: 'Scala',
    sql: 'SQL',
    vb: 'VB',
    xml: 'XML/XHTML'
  };

  function showDialog() {

    var language = [
      {text: 'None', value: ''}
    ];
    //jshint -W089
    for (var brush in brushes) {
      language.push({text: brushes[brush], value: brush});
    }
    language.push({text: 'Other', value: 'other'});
    editor.windowManager.open({
      title: "Insert Code",
      bodyType: 'tabpanel',
      body: [
        {
          type: 'form',
          layout: 'flex',
          padding: 10,
          title: 'Code',
          items: [
            {
              label: 'Code Language',
              name: 'brush',
              type: 'listbox',
              text: 'None',
              maxWidth: 200,
              values: language
            },
            {
              type: 'textbox',
              name: 'code',
              multiline: true,
              minWidth: editor.getParam('code_dialog_width', 800),
              minHeight: editor.getParam('code_dialog_height', Math.min(tinymce.DOM.getViewPort().h - 100, 450)),
              spellcheck: false,
              style: 'direction: ltr; text-align: left;'
            }
          ]
        },
        {
          type: 'form',
          title: 'Settings',
          layout: 'flex',
          direction: 'column',
          labelGapCalc: 'children',
          padding: 20,
          items: [
            {
              type: 'form',
              labelGapCalc: false,
              padding: 0,
              layout: 'grid',
              columns: 2,
              defaults: {
                type: 'checkbox',
                maxWidth: 200
              },
              items: [
                {text: 'Display line numbers', name: 'gutter', checked: true},
                {text: 'Automatically make URLs clickable', name: 'autolinks', checked: true},
                {text: 'Use smart tabs allowing tabs being used for alignment', name: 'smarttabs', checked: true},
                {text: 'Display the toolbar', name: 'toolbar'},
                {text: 'Highlight a mixture of HTML/XML code and a script', name: 'htmlscript'},
                {text: 'Collapse code boxes', name: 'collapse'},
                {text: 'Use the light display mode, best for single lines of code', name: 'light'},
                {label: 'Starting Line Number', name: 'firstline', type: 'textbox', value: '1'},
                {label: 'Line Number Padding',
                  name: 'padlinenumbers',
                  type: 'listbox',
                  text: 'False',
                  values: [
                    {text: 'False', value: 'false'},
                    {text: 'True', value: 'true'},
                    {text: '3', value: '3'},
                    {text: '4', value: '4'},
                    {text: '5', value: '5'},
                    {text: '6', value: '6'}
                  ]},
                {label: 'Tab Size', name: 'tabsize', type: 'textbox', value: '4'},
                {label: 'Font Size', name: 'fontsize', type: 'textbox', value: '14'},
                {label: 'Highlight Line(s)', name: 'highlight', type: 'textbox'},
                {label: 'Title', name: 'title', type: 'textbox'}
              ]
            }
          ]
        }
      ],
      onSubmit: function (e) {
        var win = this;
        if(e.data.code === ''){
          win.close();
          return;
        }
        //语言
        var brush = win.find('#brush').value() || 'plain';
        var config = 'brush: ' + brush + '; ';
        //显示行号，默认 true
        if (!win.find('#gutter').checked()) {
          config += 'gutter: false; ';
        }
        //显示工具栏，默认true
        if (!win.find('#toolbar').checked()) {
          config += 'toolbar: false; ';
        }
        //默认 false
        if (win.find('#htmlscript').checked()) {
          config += 'html-script: true; ';
        }
        //加链接，默认true
        if (!win.find('#autolinks').checked()) {
          config += 'auto-links: false; ';
        }
        //折叠代码，默认 false
        if (win.find('#collapse').checked()) {
          config += 'collapse: true; ';
        }
        //只能缩进，默认 true
        if (!win.find('#smarttabs').checked()) {
          config += 'smart-tabs: false; ';
        }
        //精简模式，默认false
        if (win.find('#light').checked()) {
          config += 'light: true; ';
        }

        //开始行值，默认为1
        var firstline = win.find('#firstline').value();
        if (firstline !== '1') {
          firstline = parseInt(firstline);
          config += 'first-line: ' + firstline + '; ';
        }
        //行号位数
        var padlinenumbers = win.find('#padlinenumbers').value();
        if (padlinenumbers !== 'false') {
          config += 'pad-line-numbers: ' + padlinenumbers + '; ';
        }
        //tab 大小，默认为 4
        var tabsize = win.find('#tabsize').value();
        if (tabsize !== '4') {
          config += 'tab-size: ' + tabsize + '; ';
        }
        //字体大小 默认 14
        var fontsize = win.find('#fontsize').value();
        if (fontsize !== '') {
          fontsize = parseInt(fontsize);
          config += 'font-size: ' + fontsize + '; ';
        }
        //高亮行
        var highlight = win.find('#highlight').value();
        if (highlight !== '') {
          config += 'highlight: [' + highlight + ']; ';
        }
        //标题
        var title = win.find('#title').value();
        if (title !== '') {
          config += 'title: ' + title + '; ';
        }

        var content = '<pre class="' + config + '">';
        content += editor.dom.encode(e.data.code);
        content += '</pre>';
        editor.execCommand('mceInsertContent', false, content);
      }
    });
  }

  editor.addCommand("mceCodeEditor", showDialog);

  editor.addButton('syntaxhighlighter', {
    icon: 'code',
    tooltip: 'Source code',
    onclick: showDialog
  });

  editor.addMenuItem('code', {
    icon: 'code',
    text: 'Source code',
    context: 'tools',
    onclick: showDialog
  });
});