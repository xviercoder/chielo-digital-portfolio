# Chielo Agrapana — Integrated Portfolio

A static personal portfolio website connecting the project materials supplied for review.

## Resume integration

- The latest English CV PDF is included at `assets/docs/Chielo_Agrapana_CV_English.pdf`.
- Download links are available in the main navigation, hero section, and contact section.
- The CV is served from the same static site, so the relative download link works after GitHub Pages or Netlify deployment.
- This package includes the English CV only. Do not add an older Indonesian CV until its contents have been updated to match the current profile.

## Included projects

### 1. CoffeeGuard
- Presented as a project case study with desktop/mobile UI preview images.
- The full CoffeeGuard application source is **not included** because its supplied `composer.json` marks the application as `proprietary`.
- The supplied handoff classifies the project as a staging candidate / production no-go. The website states the documented test scope and outstanding release gates.
- The screenshots are from a separate UI/UX demo using fictitious browser-local data. They are not screenshots of a live production system.

### 2. UNESA Preloved
- Includes the supplied static frontend prototype under `projects/unesa-preloved/demo/`.
- The prototype includes landing, login/register UI, marketplace, detail, sell, cart, checkout, and profile pages.
- It is labelled as a frontend prototype. Real authentication, backend persistence, transaction processing, and database integration are not implemented in the supplied package.
- Product images in the prototype reference remote Unsplash URLs.

## Visual direction and motion

The website keeps the original midnight-navy, blue-accent, grid-based visual identity and the portrait + device composition from the supplied Chielo design. The updated interface uses a more editorial layout, restrained borders, stronger typography hierarchy, and real project screenshots rather than decorative placeholder cards.

Motion is implemented with native CSS and JavaScript: scroll progress, sticky-header state, section reveal on scroll, subtle hero parallax, slow device/orbit movement, active navigation state, and small hover transitions. The site respects `prefers-reduced-motion` and does not require an animation library.

## Run locally

From this folder, run:

```bash
python -m http.server 8080
```

Then open:

- Portfolio: `http://localhost:8080/`
- UNESA Preloved demo: `http://localhost:8080/projects/unesa-preloved/demo/`
- CoffeeGuard case study: `http://localhost:8080/projects/coffeeguard.html`

The CoffeeGuard full-stack source is not exposed by this portfolio package.

## Deploy

This is a static website. It can be deployed to GitHub Pages, Netlify, or another static hosting service. Keep the relative folder structure unchanged so the project links continue to work.

## Profile links currently connected

- LinkedIn: https://www.linkedin.com/in/chilo-agrapana-5b9878434/
- GitHub profile: https://github.com/xviercoder
- GitHub portfolio repository from LinkedIn Featured: https://github.com/xviercoder/chielo-digital-portfolio
- Email shown in the supplied CV: chilotyrano@gmail.com

## Before publishing publicly

1. Confirm the spelling of the name across public profiles. The supplied LinkedIn PDF displays **Chilo Agrapana**, while the CV and portfolio project files display **Chielo Agrapana**. This site currently follows the CV/portfolio spelling.
2. Confirm that the email address should be displayed publicly.
3. Confirm that the personal portrait and device images may be used on the public site.
4. Do not add CoffeeGuard backend source to a public repository without resolving its proprietary license and publication rights.
5. Do not describe CoffeeGuard as production-ready. Its supplied handoff lists open PHPUnit, MySQL integration/concurrency, live API UAT, backup/restore, deployment, and rollback gates.
6. Do not describe UNESA Preloved as a production marketplace. It is a static frontend prototype.

## File structure

```text
Chielo_Portfolio_Integrated/
├── index.html
├── style.css
├── script.js
├── README.md
├── assets/
│   ├── docs/
│   │   └── Chielo_Agrapana_CV_English.pdf
│   ├── chielo.png
│   ├── iphone15.png
│   ├── tuf-a15.png
│   ├── coffeeguard-demo-desktop.png
│   ├── coffeeguard-demo-mobile.png
│   ├── coffeeguard-card-preview.jpg
│   └── unesa-preloved-cover.svg
└── projects/
    ├── coffeeguard.html
    ├── unesa-preloved.html
    └── unesa-preloved/demo/...
```

## Publish to the existing GitHub portfolio repository

The LinkedIn export supplied for this review links to:
`https://github.com/xviercoder/chielo-digital-portfolio`

Before replacing anything, confirm that this is still the repository you want to use and make a backup of its current contents. Then copy the contents of this folder into the repository root and commit the update:

```bash
git add .
git commit -m "Integrate selected projects into portfolio"
git push
```

For GitHub Pages, open the repository's **Settings → Pages**, select deployment from the intended branch and root folder, then save. GitHub's interface and available options may vary by repository configuration.


## Quick publish checklist

1. Extract this ZIP.
2. Open the extracted `Chielo_Portfolio_Integrated` folder.
3. Upload the **contents of this folder** (not the enclosing folder and not the ZIP itself) to the root of the public GitHub repository `chielo-digital-portfolio`.
4. Commit the changes to the `main` branch.
5. In GitHub, open **Settings → Pages** and confirm deployment from `main` / root.
6. Wait for the Pages deployment to complete, then test the homepage and the **Download CV** button.
7. Test the project detail pages and UNESA Preloved demo after deployment.

Do not publish CoffeeGuard full-stack source code. This portfolio contains only the case study and approved UI preview assets.
