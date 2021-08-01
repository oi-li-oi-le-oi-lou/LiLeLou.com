const fs = require("fs");
const remark = require("remark");
const { JSDOM } = require("jsdom");
const { html } = require("@leafac/html");
const { css, extractInlineStyles } = require("@leafac/css");

let feedItems = [];
const markdown = fs.readFileSync("index.md", "utf8");
const renderedMarkdown = remark()
  .use(require("remark-html"))
  .processSync(markdown).contents;
const dom = new JSDOM(renderedMarkdown);
const document = dom.window.document;
document.querySelector("head").insertAdjacentHTML(
  "afterbegin",
  html`
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    <link
      rel="stylesheet"
      href="/vendor/node_modules/@fontsource/public-sans/latin.css"
    />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="RSS"
      href="/feed.xml"
    />
  `
);
document.querySelector("body").setAttribute(
  "style",
  css`
    body {
      line-height: 1.5;
      font-size: 14px;
      font-family: "Public Sans";
      max-width: 600px;
      padding: 0 1em;
      margin: 2em auto;
    }

    a {
      color: #0366d6;
      text-decoration: none;
    }

    h1 {
      line-height: 1.3;
      margin-top: 2em;
      font-size: 1.5em;
    }

    .date {
      font-size: 0.875em;
      margin-top: -1.5em;
    }

    header,
    figure {
      text-align: center;
      margin: 2em 0;
    }

    figcaption {
      font-weight: bold;
      font-size: 0.875em;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 3px;
    }

    audio {
      width: 100%;
    }

    summary {
      cursor: pointer;
    }

    hr {
      border: none;
      border-top: 1px solid black;
    }
  `
);
for (const element of document.querySelectorAll("main section")) {
  const { oiLiOiLe, slug, date, duration, size } = element.dataset;
  const [title, description, ...notes] = element.children;
  const id = `${date}--${slug}`;
  element.id = id;
  const uri = oiLiOiLe !== undefined ? "oi-li-oi-le" : "LiLeLou";
  const link = `https://LiLeLou.com/#${id}`;
  const guid = `https://${uri}.com/#${id}`;
  const audio = `https://archive.org/download/${uri}/${uri}--${id}.mp3`;
  title.insertAdjacentHTML(
    "afterend",
    html`
      <p class="date"><time>${date}</time></p>
      <p><audio src="${audio}" controls preload="none"></audio></p>
    `
  );
  if (notes.length > 0) {
    notes.forEach((note) => note.remove());
    description.insertAdjacentHTML(
      "afterend",
      html`
        <details>
          <summary>Anotações do Episódio</summary>
          $${notes.map((note) => note.outerHTML).join("")}
        </details>
      `
    );
  }
  feedItems.push(html`
    <item>
      <title>${title.textContent}</title>
      <enclosure url="${audio}" length="${size}" type="audio/mpeg" />
      <guid>${guid}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description>${description.textContent}

Anotações do Episódio: ${link}

Contato: LiLeLou@LiLeLou.com
</description>
      <itunes:duration>${duration}</itunes:duration>
      <link>${link}</link>
    </item>
  `);
}
fs.writeFileSync("index.html", extractInlineStyles(dom.serialize()));
fs.writeFileSync(
  "feed.xml",
  html`
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Oi Li. Oi Lê. Oi Lou.</title>
        <description>A Li é a mãe, o Lê é o pai, e o filho é o Lou. Nós falamos sobre coisas de bebê e outras coisas que não são de bebê.</description>
        <itunes:image href="https://lilelou.com/artwork--2020-11-03.png" />
        <language>pt</language>
        <itunes:category text="Society &amp; Culture"><itunes:category text="Personal Journals" /></itunes:category>
        <itunes:explicit>false</itunes:explicit>
        <itunes:author>Li &amp; Lê &amp; Lou</itunes:author>
        <link>https://LiLeLou.com</link>
        <itunes:owner><itunes:name>Lê &amp; Lê &amp; Lou</itunes:name><itunes:email>LiLeLou@LiLeLou.com</itunes:email></itunes:owner>
        $${feedItems}
      </channel>
    </rss>
`.trim()
);
