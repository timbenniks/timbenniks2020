export default function (doc) {
  if (doc.type === 'home') {
    return '/'
  }

  if (doc.type === 'speaking') {
    return '/speaking'
  }

  if (doc.type === 'writings') {
    return '/writings'
  }

  if (doc.type === 'writing') {
    return `/writings/${doc.uid}`
  }

  return '/'
}
