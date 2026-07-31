# The Next Scroll — Landing Page

A single-page, fully responsive marketing site (no build step, no framework — pure HTML/CSS/JS) ready to deploy on GitHub Pages or any static host.

## Files
```
index.html      Page structure & content
style.css        All styling (design tokens at the top of the file)
script.js        Mobile nav, scroll animations, contact form handling
assets/          Put your images here (see below)
```

## 1. Add your photo
The hero section expects an image at:
```
assets/founder-photo.jpg
```
Drop your photo in with that exact filename (recommended: portrait orientation, at least 800x1000px) and it'll appear automatically. Until you add it, a placeholder box shows instead — the site still works fine either way.

## 2. Connect the contact form
GitHub Pages only serves static files, so the form needs a third-party form backend. Both options below are free and take 2 minutes:

**Option A — Formspree (recommended)**
1. Go to https://formspree.io and create a free account.
2. Create a new form, copy the endpoint it gives you (looks like `https://formspree.io/f/xxxxxxx`).
3. In `index.html`, find:
   ```html
   <form class="contact-form" id="growthForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with your real endpoint.

**Option B — Web3Forms**
1. Go to https://web3forms.com and get a free Access Key (no signup wall).
2. Replace the form's `action` with `https://api.web3forms.com/submit` and add a hidden field:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
   ```

Until you do this, the form will show a friendly message telling visitors (well, telling you, in dev) that it isn't configured yet — it won't silently fail.

## 3. Deploy on GitHub Pages
1. Create a new GitHub repo (e.g. `thenextscroll`) and push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. In the repo, go to **Settings -> Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
4. GitHub will give you a URL like `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a minute or two.

## 4. Point your own domain at it
1. In your domain registrar's DNS settings, add:
   - An `A` record for the root domain pointing to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `YOUR_USERNAME.github.io`
2. Back in **Settings -> Pages** on GitHub, enter your custom domain in the "Custom domain" field and save. This creates a `CNAME` file in your repo automatically.
3. Check "Enforce HTTPS" once it becomes available (can take a few hours for the cert to issue).

## Editing content
All copy lives directly in `index.html` — search for the text you want to change (e.g. stats, service names, process steps) and edit in place. Colors and fonts are controlled by the CSS variables at the top of `style.css` under `:root`.

## Browser support
Modern evergreen browsers (Chrome, Safari, Firefox, Edge). Uses `IntersectionObserver` with a graceful fallback for older browsers, and respects `prefers-reduced-motion`.
