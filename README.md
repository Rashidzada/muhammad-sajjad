# Muhammad Sajjad Portfolio (Static Website)

A complete single-page personal profile website built with:

- HTML
- Tailwind CSS (CDN)
- Vanilla JavaScript

## Project Structure

```text
muhammad-sajjad-portfolio/
|-- index.html
|-- assets/
|   `-- img/
|       `-- profile.jpeg
|-- css/
|   `-- custom.css
|-- js/
|   `-- main.js
|-- vercel.json
`-- README.md
```

## Features

- Sticky navbar with active section highlight
- Smooth scrolling
- Mobile menu (hamburger)
- Dark mode toggle with `localStorage` persistence
- Scroll reveal animations
- Contact form validation with in-page success/error messages (no backend)
- Responsive single-page layout (mobile-first)

## Run Locally (No Build Step)

1. Open `index.html` directly in a browser, or
2. Use a local static server (recommended):

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500/`

## Customize

- Replace the profile image at `assets/img/profile.jpeg`
- Update text content in `index.html`
- Edit colors/visual effects in `css/custom.css`
- Adjust interactions in `js/main.js`

## Deploy on Vercel

1. Import the repository into Vercel.
2. Keep **Root Directory** as `.` (project root).
3. Framework preset: **Other** or **Static**.
4. Leave **Build Command** empty.
5. Leave **Output Directory** empty.
6. Deploy.

## Deploy on Netlify

### Drag-and-drop

1. Open Netlify.
2. Drag the project folder into Netlify Drop.

### Git-based deploy

1. Connect the repository in Netlify.
2. Set **Base directory** to `.` (or leave empty).
3. Leave build command empty.
4. Set publish directory to `.`.

## Notes

- The contact form is front-end only and does not send emails.
- To receive real messages later, connect the form to Formspree, Netlify Forms, or your own backend.
