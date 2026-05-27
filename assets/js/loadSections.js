async function loadSection(id, file) {
    const response = await fetch(file);
    const data = await response.text();
    document.getElementById(id).innerHTML = data;
}

async function initSections() {
    await Promise.all([
        loadSection("home", "sections/home.html"),
        loadSection("about", "sections/about.html"),
        loadSection("skills", "sections/skills.html"),
        loadSection("projects", "sections/projects.html"),
        loadSection("experience", "sections/experience.html"),
        loadSection("education", "sections/education.html"),
        loadSection("contact", "sections/contact.html")
    ]);
}

initSections();
