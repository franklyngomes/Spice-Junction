
const BASE = 'https://spice-junction-server.onrender.com'


function isFullUrl(u) {
  return typeof u === 'string' && (u.startsWith('http://') || u.startsWith('https://'))
}

function sanitizePath(p) {
  if (!p) return ''
  if (isFullUrl(p)) return p
  const trimmed = String(p).trim().replace(/^\/+/, '') 
  return BASE.replace(/\/$/, '') + '/' + encodeURI(trimmed)
}


export default function getImageUrl(pathOrUrl) {
  if (!pathOrUrl) return ''

  if (typeof pathOrUrl === 'string') {
    return isFullUrl(pathOrUrl) ? pathOrUrl : sanitizePath(pathOrUrl)
  }


  if (Array.isArray(pathOrUrl)) {
    for (const item of pathOrUrl) {
      const candidate = getImageUrl(item)
      if (candidate) return candidate
    }
    return ''
  }

  if (typeof pathOrUrl === 'object') {
    if (pathOrUrl.url) return getImageUrl(pathOrUrl.url)
    if (pathOrUrl.path) return getImageUrl(pathOrUrl.path)

  
    for (const key of ['image', 'photo', 'thumbnail', 'img', 'file']) {
      if (pathOrUrl[key]) return getImageUrl(pathOrUrl[key])
    }
  }

  return ''
}
