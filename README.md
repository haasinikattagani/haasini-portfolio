# Personal Portfolio Website

This is my submission for the personal portfolio website assignment. I built
a 4-page site — Home, About, Projects, and Contact — using plain HTML, CSS,
and JavaScript, without using any frameworks or libraries, as required.

## What I built

I wanted the site to actually feel like mine rather than a generic template,
so along with the basic pages I added a few interactive bits:

- A **light/dark mode toggle** in the navbar that remembers your choice
  (saved in `localStorage`) so it doesn't reset every time you switch pages.
- A **typewriter-style animated intro** on the home page that cycles through
  a few lines about myself.
- An **expandable timeline** on the About page — clicking a year opens up
  more detail about that year, and the sections fade in as you scroll.
- **Filterable project cards** on the Projects page. You can click on a tag
  (C, Python, JavaScript, HTML & CSS) to only show projects using that tech,
  and the filter even updates the URL so it's shareable.
- A **contact form with proper validation** — it checks the name, email,
  subject, and message fields as you type and shows an error message if
  something's wrong, and shows a "message sent" confirmation on successful
  submit instead of just reloading the page.

## Pages

| Page | What's on it |
|---|---|
| `index.html` | Landing page with my name, a short animated intro, and a profile photo |
| `about.html` | A longer personal statement plus the interactive milestones timeline |
| `projects.html` | Coursework projects I've completed, with tag-based filtering |
| `contact.html` | A validated contact form |

## Tech I used

- HTML5 — tried to keep the markup semantic and add ARIA attributes where it
  made sense for accessibility (e.g. `aria-expanded` on the timeline, form
  labels linked properly to inputs)
- CSS3 — used CSS custom properties for the color palette so the dark mode
  toggle is basically just swapping variable values, plus Flexbox/Grid for
  layout
- Vanilla JavaScript — used `IntersectionObserver` for the scroll-reveal
  animations, `localStorage` for remembering the theme, and
  `URLSearchParams` for the project filter/URL sync

No npm, no build step — it's just static files you can open in a browser.

## How to run it

Clone the repo and open `index.html`:

```bash
git clone https://github.com/haasinikattagani/haasini-portfolio.git
cd haasini-portfolio
```

You can just double-click `index.html` to open it, or run a quick local
server (I'd recommend this over opening the file directly, since some
browsers are a bit stricter about how they load scripts from local files):

```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Project structure

```
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── nav.js          → theme toggle + nav highlighting
│   ├── typed.js         → typewriter animation
│   ├── about.js         → timeline + scroll reveal
│   ├── projects.js      → tag filtering + URL sync
│   └── contact.js       → form validation
└── images/
