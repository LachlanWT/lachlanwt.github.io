# Personal Portfolio

Personal portfolio website showcasing my projects and background.
Built with plain HTML & CSS, hosted on GitHub Pages, and portable
enough to move to self-hosting later.

## How the site is organized

```
index.html                 About page (home)
coursework.html            Coursework, grouped by semester
projects.html              Grid of clickable project cards
resume.html                Resume, embedded from assets/resume.pdf
site.js                    <-- EDIT ONCE: your name, photo, links, tabs
style.css                  Colors and layout (color variables at the top)
assets/                    Your photo, resume PDF, project images
projects/
  project-template.html    Copy this to add a new project
  project-1.html           Example project detail page
  project-2.html           Example project detail page
```

## How to fill it in

1. **Your identity:** open `site.js` and edit the `SITE` object
   (name, tagline, photo path, and links). This updates the sidebar
   and tabs everywhere at once.
2. **Photo & resume:** put `profile.jpg` and `resume.pdf` in `assets/`.
3. **About / Coursework:** edit the placeholder text in `index.html`
   and `coursework.html`.
4. **Projects:** edit `project-1.html` / `project-2.html`, and to add
   more, copy `projects/project-template.html` to a new file and add a
   matching card in `projects.html`.
5. **Colors:** tweak the variables at the top of `style.css`.

## Publish changes

From this folder, in your terminal:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

The live site updates a minute or two after each push.

## Local preview

```bash
python -m http.server 8000
```

Then visit http://localhost:8000
