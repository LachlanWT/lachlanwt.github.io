/* =========================================================
   site.js — shared sidebar + top navigation
   ---------------------------------------------------------
   EDIT YOUR INFO IN THE "SITE" OBJECT BELOW.
   Everything else builds the sidebar and tabs automatically,
   so you only enter your name / photo / links in ONE place.
   ========================================================= */

const SITE = {
  name: "Your Name",                       // <-- your name
  tagline: "Student • UC Berkeley",        // <-- short line under your name
  photo: "assets/profile.jpg",             // <-- drop your photo in the assets folder

  // Add, remove, or edit links freely:
  links: [
    { label: "Email",    href: "mailto:you@example.com" },
    { label: "GitHub",   href: "https://github.com/YOURUSERNAME" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/YOURUSERNAME/" },
  ],
};

// Top navigation tabs. (Project detail pages are intentionally
// NOT listed here — they're reached only by clicking a project card.)
const NAV = [
  { label: "About",      href: "index.html" },
  { label: "Coursework", href: "coursework.html" },
  { label: "Projects",   href: "projects.html" },
  { label: "Resume",     href: "resume.html" },
];

/* ---------------------------------------------------------
   You normally don't need to edit below this line.
   --------------------------------------------------------- */

// BASE handles pages that live in a subfolder (e.g. /projects/).
// Those pages set: <script>window.SITE_BASE = "../";</script> before this file.
const BASE = window.SITE_BASE || "";

function buildSidebar() {
  const el = document.getElementById("sidebar");
  if (!el) return;

  const linksHtml = SITE.links
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("");

  el.innerHTML = `
    <img class="photo" src="${BASE}${SITE.photo}" alt="${SITE.name}"
         onerror="this.style.visibility='hidden'">
    <div class="name">${SITE.name}</div>
    <div class="tagline">${SITE.tagline}</div>
    <ul class="links">${linksHtml}</ul>
  `;
}

function buildNav() {
  const el = document.getElementById("topnav");
  if (!el) return;

  // The active tab is set per page via <body data-page="...">.
  const current = document.body.getAttribute("data-page");

  el.innerHTML = NAV.map((n) => {
    const page = n.href.replace(".html", "");
    const active = page === current ? " class=\"active\"" : "";
    return `<a href="${BASE}${n.href}"${active}>${n.label}</a>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", function () {
  buildSidebar();
  buildNav();
});
