if (FireGestures.API_copyURLTitle===undefined) {

  FireGestures.API_copyURLTitle={
    format:{
      'Plain':'{{url}}\n{{title}}',
      'HTML':'<a href="{{url|entity}}">{{title|entity}}</a>',
      'TGML':'[link {{url}}]{{title}}[/link]',
      'Creole':'[[{{url}}|{{title}}]]',
      'BBCode':'[url={{url}}]{{title}}[/url]',
      'AsciiDoc':'{{url}}[{{title}}]',
      'Haml':'%a{:href=>"{{url}}"}{{title}}',
      'Markdown':'[{{title|escape:]}}]({{url}})',
      'Org-mode':'[[{{url}}][{{title}}]]',
      'Textile':'"{{title}}":{{url}}',
      'txt2tags':'[{{title}} {{url}}]',
      'POD':'L<{{title}}|{{url}}>',
      'RDoc':'{{{title}}}[{{url}}]',
      'DocBook':'<ulink url="{{url|entity}}">{{title|entity}}</ulink>',
    },
    filter:{
      'entity':function(what) { return what.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') },
      'escape':function(what,char) { return what.replace(new RegExp('(['+char.replace(/([\[\]-])/g,'\\$1')+'])','g'),'\\$1') },
    },
    clipboard:Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper),
    source:undefined,
    command:function(markUp) {

      var value={
        'url':window.content.location.href,
        'title':window.content.document.title
      }

      if (this.source.nodeName.toLowerCase()=='a' && this.source.href) {
        value={
          'url':this.source.href,
          'title':this.source.text
        }
      }

      if (FireGestures.getSelectedText()) value.title=FireGestures.getSelectedText()

      var text=this.format[markUp].replace(/\{\{((?:url|title)(?:\|(?:entity|url|escape:.*?))*)\}\}/g,function(p0,p1) {
        var part=p1.split('|')
        var result=value[part.shift()]

        part.forEach(function(one) {
          piece=one.split(':')
          result=FireGestures.API_copyURLTitle.filter[piece[0]](result,piece[1])
        })

        return result
      })

      this.clipboard.copyString(text)

      FireGestures.setStatusText(markUp+' link in clipboard')
      FireGestures.clearStatusText(1000)

    }

  }

}

FireGestures.API_copyURLTitle.source=FireGestures.sourceNode;

FireGestures.generatePopup(event,
  [
    { label:'Plain',    oncommand:'this.API_copyURLTitle.command("Plain")' },
    { label:'HTML',     oncommand:'this.API_copyURLTitle.command("HTML")' },
    { label:'TGML',     oncommand:'this.API_copyURLTitle.command("TGML")' },
    { label:'Creole',   oncommand:'this.API_copyURLTitle.command("Creole")' },
    { label:'BBCode',   oncommand:'this.API_copyURLTitle.command("BBCode")' },
    { label:'AsciiDoc', oncommand:'this.API_copyURLTitle.command("AsciiDoc")' },
    { label:'Haml',     oncommand:'this.API_copyURLTitle.command("Haml")' },
    { label:'Markdown', oncommand:'this.API_copyURLTitle.command("Markdown")' },
    { label:'Org-mode', oncommand:'this.API_copyURLTitle.command("Org-mode")' },
    { label:'Textile',  oncommand:'this.API_copyURLTitle.command("Textile")' },
    { label:'txt2tags', oncommand:'this.API_copyURLTitle.command("txt2tags")' },
    { label:'POD',      oncommand:'this.API_copyURLTitle.command("POD")' },
    { label:'RDoc',     oncommand:'this.API_copyURLTitle.command("RDoc")' },
    { label:'DocBook',  oncommand:'this.API_copyURLTitle.command("DocBook")' },
  ]
)
