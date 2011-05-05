loc=window.content.location
loc.href=loc.href.replace(/^https?:/,loc.protocol=='http:'?'https:':'http:')
