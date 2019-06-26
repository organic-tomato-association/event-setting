// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const firebaseConfig = require('./src/firebase');
const adminApp = admin.initializeApp(firebaseConfig);

const db = adminApp.firestore();

const options = adminApp.options;
const app_domain = options.storageBucket;
const OGP_IMG_WIDTH = 1000;
const OGP_IMG_HEIGHT = 500;

const _ = require('lodash');

exports.event = functions.https.onRequest((req, res) => {
  const path = req.path.split('/');
  const eventId = path[path.length - 1];
  return db.collection('events').doc(eventId).get().then(snap => {
    if (!snap) {
      res.status(404).end('404 Not Found');
      return;
    }
    const eventItem = snap.data();
    const name = `${eventItem.name} -- Event Setting` || 'event-setting';
    const photoURL = eventItem.photoURL || 'https://event-setting.wakuwakup.net/event-setting.jpg';
    const description = eventItem.description || '';
    const html = createHtml(name, eventId, photoURL, description);
    res.set('Cache-Control', 'public, max-age=600, s-maxage=600');
    res.status(200).end(html);
    return;
  }).catch((err) => {
    console.warn(err)
    // 略 : エラー時はデフォルトのhtml（固定のOGP）を返す
  })
});

const createHtml = (name, eventId, photoURL, description) => {
  const SITEURL = `https://event-setting.wakuwakup.net`;
  const PAGEURL = `${SITEURL}/event/detail/${eventId}`;
  const TITLE = `${name}`;
  const DESCRIPTION = '';
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>event-setting</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${photoURL}">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="event setting">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${photoURL}">
    <meta name="twitter:description" content="${description}">
  </head>
  <body>
    <script type="text/javascript">window.location="/ogp/event/detail/${eventId}";</script>
  </body>
</html>
`
}
