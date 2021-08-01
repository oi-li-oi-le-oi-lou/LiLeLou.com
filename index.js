const fs = require("fs");
const remark = require("remark");
const { JSDOM } = require("jsdom");
const { html } = require("@leafac/html");
const { css, extractInlineStyles } = require("@leafac/css");

const feedItems = [];
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
      href="/vendor/node_modules/@ibm/plex/css/ibm-plex.min.css"
    />
    <link
      rel="stylesheet"
      href="vendor/node_modules/@fortawesome/fontawesome-free/css/all.min.css"
    />

    <link
      rel="alternate"
      type="application/rss+xml"
      title="RSS"
      href="/feed.xml"
    />

    <script src="/vendor/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
    <script src="/vendor/node_modules/tippy.js/dist/tippy-bundle.umd.js"></script>
    <script>
      tippy.setDefaultProps({
        arrow: tippy.roundArrow,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 1
          : 150,
      });
    </script>
    <link
      rel="stylesheet"
      href="/vendor/node_modules/tippy.js/dist/svg-arrow.css"
    />
    <link
      rel="stylesheet"
      href="/vendor/node_modules/tippy.js/dist/border.css"
    />

    <script>
      window.addEventListener("DOMContentLoaded", () => {
        for (const element of document.querySelectorAll(
          "[data-ondomcontentloaded]"
        ))
          new Function(element.dataset.ondomcontentloaded).call(element);
      });
    </script>
  `
);
const body = document.querySelector("body");
body.outerHTML = html`
  <body
    style="${css`
      @at-root {
        body {
          font-family: "IBM Plex Sans", var(--font-family--sans-serif);
          font-size: var(--font-size--sm);
          line-height: var(--line-height--sm);
          color: var(--color--amber--700);
          background-color: var(--color--amber--50);
          @media (prefers-color-scheme: dark) {
            color: var(--color--amber--200);
            background-color: var(--color--amber--900);
          }
          display: flex;
          justify-content: center;
        }

        a {
          color: var(--color--amber--500);
          &:hover,
          &:focus-within {
            color: var(--color--amber--400);
          }
          &:active {
            color: var(--color--amber--600);
          }
          @media (prefers-color-scheme: dark) {
            color: var(--color--amber--500);
            &:hover,
            &:focus-within {
              color: var(--color--amber--400);
            }
            &:active {
              color: var(--color--amber--600);
            }
          }
          cursor: pointer;
          transition-property: var(--transition-property--colors);
          transition-duration: var(--transition-duration--150);
          transition-timing-function: var(--transition-timing-function--in-out);
        }

        header {
          a {
            font-weight: var(--font-weight--semibold);
            color: var(--color--amber--900);
            &:hover,
            &:focus-within {
              color: var(--color--amber--700);
            }
            &:active {
              color: var(--color--amber--600);
            }
            @media (prefers-color-scheme: dark) {
              color: var(--color--amber--500);
              &:hover,
              &:focus-within {
                color: var(--color--amber--400);
              }
              &:active {
                color: var(--color--amber--600);
              }
            }
          }
        }

        .tippy-box {
          color: var(--color--amber--200);
          background-color: var(--color--amber--900);
          .tippy-svg-arrow {
            fill: var(--color--amber--900);
          }
        }

        /*
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
        */
      }
    `}"
  >
    <div
      style="${css`
        flex: 1;
        max-width: var(--width--prose);
        margin: var(--space--4);
      `}"
    >
      $${body.innerHTML}
    </div>
  </body>
`;
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
