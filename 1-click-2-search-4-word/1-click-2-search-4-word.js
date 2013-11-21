if (FireGestures.API_1click2search4word===undefined) {

  FireGestures.API_1click2search4word={
    separator: ' .??!¡?¿,;:\'"`´¨?????«»/\\\\|¦+±\\-??*×÷=()\\[\\]{}<>@#$%??^&',
  }

  FireGestures.API_1click2search4word={
    before: new RegExp('([^'+FireGestures.API_1click2search4word['separator']+']*)(['+FireGestures.API_1click2search4word['separator']+']*)$'),
    after: new RegExp('^(['+FireGestures.API_1click2search4word['separator']+']*)([^'+FireGestures.API_1click2search4word['separator']+']*)'),
    extract: function(text,pos) {
      var before=text.substring(0,pos).match(FireGestures.API_1click2search4word['before'])
      var after=text.substring(pos).match(FireGestures.API_1click2search4word['after'])
      if (!before[2] && !after[1]) return before[1]+after[2]
      if (!before[2] && after[1]) return before[1]
      if (before[2] && !after[1]) return after[2]
      if (after[2]) return after[2]
      if (before[1]) return before[1]
      return
    }
  }

}

term=FireGestures.getSelectedText()

if (!term) {
  sel=window.content.getSelection()
  if (sel.isCollapsed && sel.anchorNode) {
    term=FireGestures.API_1click2search4word.extract(sel.anchorNode.textContent,sel.anchorOffset)
  }
}

if (term) {
  if (event.shiftKey) {
    BrowserSearch.searchBar.value=term
    BrowserSearch.webSearch()
  } else {
    BrowserSearch.loadSearch(term,true)
  }
}
