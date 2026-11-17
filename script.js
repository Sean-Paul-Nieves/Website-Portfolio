// Vanilla JS for Sean Paul Nieves portfolio.
// Adds smooth scrolling to in-page nav links and highlights the active section.

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      // Only intercept in-page anchors; external links open normally.
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

async function displayProjects() {
  const response = await fetch('./projects.json');
  const projects = await response.json();
  const container = document.querySelector("#projects-container");

  projects.forEach((project) => {
    const card = document.createElement("article");

    const header = document.createElement("div");
    header.className = "header";

    const tag = document.createElement("h5");
    tag.textContent = `${project.tag}`;

    const cta = document.createElement("a");
    cta.textContent = 'View Project →';
    cta.href = `${project.link}`;
    cta.target = "_blank";

    header.append(tag, cta);

    const title = document.createElement("h2");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const techstack = document.createElement("h5");
    techstack.textContent = `${project.techstack}`;

    card.append(header, title, description, techstack);

    const divider = document.createElement("hr");

    card.append(divider);

    container.append(card);
  });
}

displayProjects();