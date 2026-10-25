# Mohammed Faizan — Portfolio Website

A single-page portfolio for **Mohammed Faizan, PMP** — Program & Continuous-Improvement
Manager working at the intersection of engineering, operations and intelligent manufacturing.
Built as a static site (no build step) so it deploys directly to GitHub Pages.

## Structure

```
website/
├── index.html              # All page content (single page, anchored sections)
├── css/style.css           # Dark "engineering blueprint" theme, responsive
├── js/main.js              # Nav, scroll-reveal, active links, stat counters
├── .nojekyll               # Tells GitHub Pages to serve files as-is
└── assets/
    ├── img/                # muffler + seabin infographics, CAD section
    └── docs/               # résumé + CAD drawings (PDF)
```

## Sections

1. Hero — name, tagline, headline metrics
2. About & Philosophy
3. Career Progression (timeline)
4. Experience & Impact (Perdue, Cornerstone, UMBC, Canara)
5. Featured Projects (Muffler, Seabin, Turbine Vane, AI Superintendent, Perdue CI)
6. Research (IEEE BigData 2025, PV segmentation, TDABC costing)
7. Skills & Tooling
8. Education & Certifications
9. Contact

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
# from the website/ folder
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages

**Option A — project site (`username.github.io/portfolio`)**

1. Create a repo and push the contents of this `website/` folder to the repo root.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. Your site publishes at `https://<username>.github.io/<repo>/`.

**Option B — user site (`username.github.io`)**

1. Create a repo named exactly `<username>.github.io`.
2. Push the contents of this `website/` folder to its root.
3. The site publishes at `https://<username>.github.io/`.

> Tip: keep the `website/` contents at the repo **root** (i.e. `index.html` at the top level),
> or point Pages at the folder that contains `index.html`.

## Editing content

All text lives in `index.html`. To swap images, drop replacements in `assets/img/` and update
the `src` attributes. Accent colors are CSS variables at the top of `css/style.css` (`--accent`).

## Note on evidence

Product renders, process diagrams and reconstructed CAD on this site are **illustrations** —
not certified drawings or evidence of measured performance. Headline résumé metrics are the
primary record; supplementary figures are labeled and require source verification.
