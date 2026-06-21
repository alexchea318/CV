export default function Root() {
  return (
    <html lang="ru">
      <head>
        <meta httpEquiv="refresh" content="0; url=/ru/" />
        <link rel="canonical" href="/ru/" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `location.replace('/ru/')` }} />
        <a href="/ru/">Continue / Продолжить</a>
      </body>
    </html>
  );
}
