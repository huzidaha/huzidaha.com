import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <title>胡子大哈</title>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <meta name='keywords' content='胡子大哈,react.js,vue,web,前端,javascript' />
          <meta name='renderer' content='webkit' />
          <meta httpEquiv='Cache-Control' content='no-siteapp' />
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
          <meta name="baidu-site-verification" content='eZfmmOaY5i' />
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
          <link rel='stylesheet' href='/static/styles.css' />
        </Head>
        <body style={{ backgroundColor: '#f7fafc' }}>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{__html: `
            var _hmt = _hmt || [];
            (function() {
              if (window.location.origin.match(/localhost/)) return
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?d5ee7d3fe5b2bec89fac3d2f347d6816";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          `}} />
        </body>
      </html>
    )
  }
}
