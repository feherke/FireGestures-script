if (FireGestures.API_changeProtocol===undefined) {

  FireGestures.API_changeProtocol={
    command:function(protocol) {
      var loc=window.content.location
      loc.href=loc.href.replace(loc.protocol,protocol)
    },
  }

}

if (! event.shiftKey) {

  var loc=window.content.location
  loc.href=loc.href.replace(/^https?:/,loc.protocol=='http:'?'https:':'http:')
  return

}

FireGestures.generatePopup(event,
  [
    { label:'http:',  oncommand:'this.API_changeProtocol.command("http:")' },
    { label:'https:', oncommand:'this.API_changeProtocol.command("https:")' },
    { label:'spdy:',  oncommand:'this.API_changeProtocol.command("spdy:")' },
    { label:'ftp:',   oncommand:'this.API_changeProtocol.command("ftp:")' },
  ]
)
