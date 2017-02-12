import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <title>胡子大哈</title>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <meta name='renderer' content='webkit' />
          <meta httpEquiv='Cache-Control' content='no-siteapp' />
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
          <link rel="stylesheet" href="/static/styles.css" />
        </Head>
        <body style={{ backgroundColor: '#f7fafc' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
