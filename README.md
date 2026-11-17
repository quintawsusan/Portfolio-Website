# Quinta Susan – Portfolio

Next.js (App Router, plain JavaScript/JSX) with a separate CSS file for each component.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Needs Node 20 or newer. Fonts (Plus Jakarta Sans, JetBrains Mono) load through `next/font/google`, so the first build needs internet.

## Where things are

| File | What it does |
| --- | --- |
| `data/content.js` | **All the words.** Edit this to change text, skills, projects, links. |
| `app/layout.jsx` | Fonts, page title, light/dark theme script |
| `app/globals.css` | Colours (design tokens), reset, buttons |
| `app/page.jsx` + `app/page.css` | The page and its footer |
| `components/Nav.jsx` + `.css` | Floating pill nav and theme toggle |
| `components/Hero.jsx` + `.css` | Hero section |
| `components/Clive.jsx` + `.css` | The mascot, speech bubbles, mascot stage |
| `components/Book.jsx` + `.css` | Scroll-driven book: cover, page turns, controls |
| `components/BookPages.jsx` | The ten pages of the book |
| `components/Contact.jsx` + `.css` | Contact section |
| `lib/bookNav.js` | Lets the nav and hero jump to a page in the book |

## Change the colours

Edit the variables at the top of `app/globals.css`. Dark values are in `:root`, light values are in the two light blocks below it.

## Notes

- Below 900px wide (or with "reduce motion" on) the book becomes a stack of page cards instead of animating.
- The "Illustrative graphic" drawings on the projects page are placeholders. Swap them in `BookPages.jsx` for real screenshots when you have them.
