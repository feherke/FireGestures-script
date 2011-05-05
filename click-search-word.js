term=FireGestures.getSelectedText()

if (!term) {
  sel=window.content.getSelection()
  if (sel.isCollapsed && sel.anchorNode) {
    before=sel.anchorNode.textContent.substring(0,sel.anchorOffset)
    after=sel.anchorNode.textContent.substring(sel.anchorOffset)
    if (before.match(/\W$/) && after.match(/^\W/)) {
      after=after.replace(/^\W+/,'')
      if (!after) before=before.replace(/\W+$/,'')
    }
    term=before.replace(/.*\W+/,'')+after.replace(/\W.*/,'')
  }
}

if (term) BrowserSearch.loadSearch(term,false)
