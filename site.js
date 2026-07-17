/* =========================================================
   site.js — shared sidebar + top navigation
   ---------------------------------------------------------
   EDIT YOUR INFO IN THE "SITE" OBJECT BELOW.
   Everything else builds the sidebar and tabs automatically,
   so you only enter your name / photo / links in ONE place.
   ========================================================= */

const SITE = {
  name: "Lachlan Watts-Tobin",                       // <-- your name
  tagline: "EECS Student • UC Berkeley",        // <-- short line under your name
  photo: "assets/pfp.png",             // <-- drop your photo in the assets folder

  // Add, remove, or edit links freely.
  // "icon" picks a logo from the ICONS list further down.
  links: [
    { label: "Email",    href: "https://mail.google.com/mail/?view=cm&fs=1&to=lachlanwt@berkeley.edu", icon: "email" },
    { label: "GitHub",   href: "https://github.com/LachlanWT",         icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lachlanwt/", icon: "linkedin" },
  ],
};

// Small logo library (SVG). Add more here if you add more links.
const ICONS = {
  email:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  github:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
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
    .map((l) => {
      const icon = l.icon && ICONS[l.icon] ? ICONS[l.icon] : "";
      return `<li><a href="${l.href}" target="_blank" rel="noopener">${icon}<span>${l.label}</span></a></li>`;
    })
    .join("");

  el.innerHTML = `
    <img class="photo" src="${BASE}${SITE.photo}" alt="${SITE.name}"
         onerror="this.style.visibility='hidden'">
    <div class="sidebar-body">
      <div class="name">${SITE.name}</div>
      <div class="tagline">${SITE.tagline}</div>
      <ul class="links">${linksHtml}</ul>
    </div>
  `;
}

// On mobile the only fixed element is the menu bar (the "page header"),
// pinned at 14px. Everything else - the blue About-page banner and the
// page content - flows and scrolls normally beneath it. So we just pad
// the top of the whole column enough to clear that fixed menu bar.
function adjustMobileHeader() {
  const nav = document.getElementById("topnav");
  const main = document.querySelector(".main");
  const layout = document.querySelector(".layout");
  if (!layout) return;

  if (window.matchMedia("(max-width: 800px)").matches) {
    const GAP = 12;
    const navTop = 0;               // full-width banner pinned to the top edge
    if (nav) nav.style.top = navTop + "px";
    layout.style.paddingTop = navTop + (nav ? nav.offsetHeight : 0) + GAP + "px";
    if (main) main.style.paddingTop = "";
  } else {
    layout.style.paddingTop = "";   // let the desktop stylesheet take over
    if (main) main.style.paddingTop = "";
    if (nav) nav.style.top = "";
  }
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
  adjustMobileHeader();
});
window.addEventListener("load", adjustMobileHeader);
window.addEventListener("resize", adjustMobileHeader);

/* Quick-return header that tracks the scroll 1:1: scrolling down pushes it
   up until it is hidden just above the top, and scrolling up pulls it
   straight back down — it only ever moves at the exact rate you scroll.
   The upward shift is stored in --nav-offset and applied as a translate
   in the CSS (no transition, so it stays locked to your finger). */
(function () {
  let lastY = Math.max(0, window.scrollY);
  let offset = 0;
  let maxOffset = 0;
  let ticking = false;

  function measure() {
    const nav = document.getElementById("topnav");
    if (!nav) { maxOffset = 0; return; }
    maxOffset = nav.offsetHeight + 6;   // the header's own height
    if (offset > maxOffset) offset = maxOffset;
    apply();
  }

  function apply() {
    document.documentElement.style.setProperty("--nav-offset", offset + "px");
  }

  function onFrame() {
    const y = Math.max(0, window.scrollY);
    offset = Math.min(maxOffset, Math.max(0, offset + (y - lastY)));
    lastY = y;
    apply();
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onFrame); ticking = true; }
  });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  document.addEventListener("DOMContentLoaded", measure);
})();

/* Fade the page out before following an internal link. External links,
   downloads, new-tab links, and mailto/anchor links are left alone. */
document.addEventListener("click", function (e) {
  const a = e.target.closest("a");
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href) return;
  if (a.target === "_blank" || a.hasAttribute("download")) return;
  if (href.startsWith("#") || href.startsWith("mailto:") ||
      href.startsWith("http://") || href.startsWith("https://")) return;

  e.preventDefault();
  document.body.style.opacity = "0";
  setTimeout(function () { window.location.href = href; }, 120);
});
