/**
 * plugin.js
 * 自定义插件  SyntaxHighlighter 代码高亮插件
 */

/*global tinymce:true */

tinymce.PluginManager.add('syntaxhighlighter', function (editor, url) {
  var languages =[{
    applescript: 'AppleScript',
    as3:'ActionScript3',
    bash:'Bash(Shell)',
    coldfusion:'Cold Fusion',
    csharp:'C#',
    cpp:'C++',
    css:'CSS',
    delphi:'Delphi',
    diff:'Diff',
    erlang:'Erlang',
    groovy:'Groovy',
    java:'Java',
    javafx:'JavaFX',
    jscript:'Jscript',
    perl:'Perl',
    php:'PHP',
    plain:'Plain(Text)',
    powershell:'PowerShell',
    python:'Python',
    ruby:'Ruby',
    sass:'SASS',
    scala:'Scala',
    sql:'SQL',
    vb:'VB',
    xml:'XML/XHTML',
    php:'PHP',




  }];
  function showDialog() {
    var html = '<form>'+
      '<input type="checkbox" name="syntaxhl_nogutter" id="syntaxhl_nogutter" value="1" /><label for="syntaxhl_nogutter" >{#syntaxhl_dlg.nogutter}</label>
    '<input type="checkbox" name="syntaxhl_light" id="syntaxhl_light" value="1" /><label for="syntaxhl_light">{#syntaxhl_dlg.light}</label>
    '<input type="checkbox" name="syntaxhl_collapse" id="syntaxhl_collapse" value="1" /><label for="syntaxhl_collapse">{#syntaxhl_dlg.collapse}</label>
    '<input type="checkbox" name="syntaxhl_html_script" id="syntaxhl_html_script" value="1" /><label for="syntaxhl_html_script">{#syntaxhl_dlg.html_script}</label>
    '<input type="checkbox" name="syntaxhl_hide_toolbar" id="syntaxhl_hide_toolbar" value="1" /><label for="syntaxhl_hide_toolbar">{#syntaxhl_dlg.hide_toolbar}</label><br />
    '<label for="syntaxhl_highlight">{#syntaxhl_dlg.highlight} </label><input type="text" name="syntaxhl_highlight" id="syntaxhl_highlight" style="width:50px;" /><br />
    '<label for="syntaxhl_language">{#syntaxhl_dlg.choose_lang}:</label>
    <select name="syntaxhl_language" id="syntaxhl_language">
      <option value="applescript">AppleScript</option>
      <option value="as3"></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
      <option value=""></option>
    </select>
    <label for="syntaxhl_firstline" style="margin-left: 15px;">{#syntaxhl_dlg.first_line}:</label><input type="textfield" name="syntaxhl_firstline" id="syntaxhl_firstline" value="1" style="width:20px;" />
    <label for="syntaxhl_fontsize">{#syntaxhl_dlg.fontsize}</label><input type="text" name="syntaxhl_fontsize" id="syntaxhl_fontsize" value="100" style="width:25px;" />%
  ';
    editor.windowManager.open({
      title: "Insert Code",
      body: {
        type: 'container',
        html: html,
        multiline: true,
        minWidth: editor.getParam("syntaxhl_dialog_width", 700),
        minHeight: editor.getParam("syntaxhl_dialog_height", Math.min(tinymce.DOM.getViewPort().h - 200, 500)),
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        // We get a lovely "Wrong document" error in IE 11 if we
        // don't move the focus to the editor before creating an undo
        // transation since it tries to make a bookmark for the current selection
        editor.focus();

        editor.undoManager.transact(function () {
          editor.setContent(e.data.code);
        });

        editor.selection.setCursorLocation();
        editor.nodeChanged();
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