// src/utils/getImageUrl.js
const BASE = 'https://spice-junction-server.onrender.com' // backend base URL

// helper: check if already full URL
function isFullUrl(u) {
  return typeof u === 'string' && (u.startsWith('http://') || u.startsWith('https://'))
}

// helper: prefix base + encode
function sanitizePath(p) {
  if (!p) return ''
  if (isFullUrl(p)) return p
  const trimmed = String(p).trim().replace(/^\/+/, '') // remove leading slashes
  return BASE.replace(/\/$/, '') + '/' + encodeURI(trimmed)
}

// main function
export default function getImageUrl(pathOrUrl) {
  if (!pathOrUrl) return ''

  // 1) String case
  if (typeof pathOrUrl === 'string') {
    return isFullUrl(pathOrUrl) ? pathOrUrl : sanitizePath(pathOrUrl)
  }

  // 2) Array case → pick first valid
  if (Array.isArray(pathOrUrl)) {
    for (const item of pathOrUrl) {
      const candidate = getImageUrl(item)
      if (candidate) return candidate
    }
    return ''
  }

  // 3) Object case
  if (typeof pathOrUrl === 'object') {
    if (pathOrUrl.url) return getImageUrl(pathOrUrl.url)
    if (pathOrUrl.path) return getImageUrl(pathOrUrl.path)

    // check common keys
    for (const key of ['image', 'photo', 'thumbnail', 'img', 'file']) {
      if (pathOrUrl[key]) return getImageUrl(pathOrUrl[key])
    }
  }

  return ''
}
