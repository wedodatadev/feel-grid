var cookieparser = require('cookieparser')

export default function ({ req, store, app, redirect }) {

  console.log('\n-MW-Middleware : checkCookieLocale...')
  let parsed = undefined 

  if (process.server) {
    // console.log('-MW-checkCookieLocale : process.server == TRUE ')
    if (req.headers.cookie) {
      let cookie = req.headers.cookie
      parsed = cookieparser.parse(cookie)
    }
  }

  else {
    // console.log('-MW-checkCookieLocale : process.server == FALSE ')
    let cookie = document.cookie
    parsed = cookieparser.parse(cookie)
  }

  // console.log('-MW-checkCookieLocale / parsed :', parsed)

  let cookieLocale = parsed.locale
  if ( cookieLocale ){
    // console.log('-MW-checkCookieLocale / cookieLocale :', cookieLocale)
    store.dispatch('setLocaleCookie', cookieLocale)
  }
}