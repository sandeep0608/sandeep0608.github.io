# Sandeep Tharakaram — Service Website

A marketing site with a blog and a contact form that sends leads to Google Sheets.
Neon palette (lime + twin purples) on a soft paper base; fonts Bricolage Grotesque + IBM Plex Sans.

## Project structure

```
site/
├── index.html              ← home page
├── blog.html               ← blog index (lists your articles)
├── posts/                  ← one HTML file per article
│   ├── ai-b2b-content-marketing.html      (full example)
│   ├── automate-marketing-with-n8n.html   (example)
│   └── ai-lead-generation-framework.html  (example)
├── css/style.css           ← all styles (colors at the top in :root)
├── js/main.js              ← animations, Calendly link, contact form
├── images/                 ← swap these placeholders (keep the filenames)
├── apps-script/Code.gs     ← Google Sheets script
└── README.md
```

## Quick settings (edit these first)

Open `js/main.js` and set the two values at the top:

```js
var CALENDLY_URL  = "https://calendly.com/your-handle";  // your scheduling link
var LEAD_ENDPOINT = "";                                   // your form endpoint (below)
```

`CALENDLY_URL` powers every "Book a call" button automatically.

## Preview it locally

Open `index.html` in a browser. Design, animations, blog, and navigation all work offline.
Only the form *submission* needs hosting (below).

## Writing a blog article (good for SEO/AEO)

Each article is its own page — which is exactly what search engines and AI answer-engines like.

1. Copy any file in `posts/` and rename it (e.g. `posts/my-new-article.html`). Keep the filename lowercase with hyphens — that becomes its URL.
2. Edit the `<title>`, the `<meta name="description">`, the JSON-LD block (`headline`, `description`, `datePublished`), and the article body.
3. On `blog.html` (and, if you like, in the Blog section of `index.html`), add a card linking to your new file.

The JSON-LD "BlogPosting" block and meta description are already in each post — they help Google and AI assistants understand and surface your content.

## Add your own images

Replace the files in `images/` keeping the same filenames. The set is:
`hero`, `about`, `work-1/2/3`, `favicon`, and one per service:
`svc-content`, `svc-automation`, `svc-social`, `svc-resume`, `svc-consulting`, `svc-research` (~640×400 each).
Use JPG/PNG for photos. If you change the extension, update the matching `src` in the HTML.

## Connect the contact form to Google Sheets (~10 min, one-time)

The form now collects **Name, Email, Phone, Message**.

1. **Create a Google Sheet.** Row 1 headers: `Timestamp | Name | Email | Phone | Message | Page` (optional: rename the tab `Leads`).
2. **Extensions → Apps Script.** Paste everything from `apps-script/Code.gs`, Save.
3. **Deploy → New deployment → Web app.** Execute as: **Me**. Access: **Anyone**. Deploy, authorize, copy the **Web app URL**.
4. Paste that URL into `js/main.js` as `LEAD_ENDPOINT`.

Prefer no-code? Swap in an **n8n webhook**, **Formspree**, or **SheetDB** URL instead — any endpoint works.

## Put it online (free)

- **Netlify Drop** (easiest): drag the whole `site` folder onto app.netlify.com/drop → instant URL.
- Or Cloudflare Pages / Vercel / GitHub Pages. Point your domain at it later.

## Links already set

- LinkedIn: linkedin.com/in/sandeep-tharakaram
- GitHub: github.com/sandeep0608
- (Calendly + form endpoint: set in `js/main.js` as above.)
