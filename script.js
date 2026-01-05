function formatList(text) {
    if (!text) return "";
    return text.split("\n").filter(line => line.trim() !== "").map(line => {
        if (line.includes("|")) {
            const [title, year] = line.split("|");
            return `<li><strong>${title.trim()}</strong> <span>${year.trim()}</span></li>`;
        }
        return `<li>${line.trim()}</li>`;
    }).join("");
}

function generate() {
    const resume = document.getElementById("resume");
    const template = document.getElementById("template").value;
    resume.className = template;

    const vals = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        summary: document.getElementById("summary").value,
        edu: document.getElementById("education").value,
        exp: document.getElementById("experience").value,
        skills: document.getElementById("skills").value
    };

    const skillsHTML = vals.skills ? 
        `<div class="skills-container">${vals.skills.split(',').map(s => `<span class="skill-badge">${s.trim()}</span>`).join("")}</div>` : '';

    resume.innerHTML = `
        <h1>${vals.name}</h1>
        <p class="contact">
            ${vals.email}${vals.email && vals.phone ? ' | ' : ''}${vals.phone}
        </p>
        
        ${vals.summary ? `<div><h3>Professional Summary</h3><p>${vals.summary}</p></div>` : ''}
        ${vals.edu ? `<div><h3>Education</h3><ul>${formatList(vals.edu)}</ul></div>` : ''}
        ${vals.exp ? `<div><h3>Experience</h3><ul>${formatList(vals.exp)}</ul></div>` : ''}
        ${vals.skills ? `<div><h3>Skills</h3>${skillsHTML}</div>` : ''}
    `;
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    document.getElementById("theme-toggle").innerText = isDark ? "☀️" : "🌙";
}

function downloadPDF() {
    window.print();
}

window.onload = generate;
