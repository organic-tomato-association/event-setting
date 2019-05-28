import functions from 'firebase-functions';
import admin from 'firebase-admin';

const db = admin.firestore()

const CONFIG = functions.config();
const app_domain = CONFIG.app.domain;
const OGP_IMG_WIDTH = 1200;
const OGP_IMG_HEIGHT = 630;

const func = functions.https.onRequest((req, res) => {
  const [, , eventId] = req.path.split('/')
  return db.collection('events').doc(eventId).get().then(snap => {
    if (!snap) {
      res.status(404).end('404 Not Found')
      return
    }
    const eventItem = snap ? snap.data() : {}
    const name = eventItem.name || ''
    const html = createHtml(name, eventId)
    res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
    res.status(200).end(html)
    return
  }).catch((err) => {
    console.warn(err)
    // 略 : エラー時はデフォルトのhtml（固定のOGP）を返す
  })
});

const createHtml = (name, eventId) => {
  const SITEURL = `https://${app_domain}`
  const PAGEURL = `${SITEURL}/event/detail/${eventId}`
  const TITLE = `view ${escapeHtml(name)}'s colorsets on colorinco`
  const DESCRIPTION = ''
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>colorinco</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${SITEURL}/ogp/event/detail/${eventId}">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="event setting">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${SITEURL}/ogp/event/detail/${eventId}">
    <meta name="twitter:description" content="${DESCRIPTION}">
  </head>
  <body>
    <script type="text/javascript">window.location="/event/detail/${stockid}";</script>
  </body>
</html>
`
}

module.exports = func