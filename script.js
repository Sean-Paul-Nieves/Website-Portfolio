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
  const response = await fetch('./assets/data/projects.json');
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

async function displayCredentials(jsonPath, containerSelector, itemClass) {
  const response = await fetch(jsonPath);
  const certificates = await response.json();
  const container = document.querySelector(containerSelector);

  if (!container) return;

  certificates.forEach((certificate) => {
    const certItem = document.createElement("article");
    certItem.className = itemClass;

    const image = document.createElement("img");
    image.src = new URL(certificate.imgPath, response.url).href;
    image.alt = `${certificate.title} badge`;

    const title = document.createElement("h3");
    title.textContent = certificate.title;

    const date = document.createElement("h4");
    date.textContent = `Issued: ${certificate.date}`;

    const cta = document.createElement("a");
    cta.textContent = "Verify →";
    cta.href = certificate.publicURL;
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";

    certItem.append(image, title, date, cta);
    container.append(certItem);
  });
}

displayProjects();
displayCredentials("./assets/data/certificates.json", ".cert-cat", "cert-item");
displayCredentials("./assets/data/badges.json", ".badge-cat", "badge-item");

const email = document.querySelector("#email-to-copy");
const copyButton = document.querySelector("#copy-email");

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(email.textContent.trim());

  copyButton.textContent = "COPIED!";
  setTimeout(() => {
    copyButton.textContent = "COPY";
  }, 1500);
});

