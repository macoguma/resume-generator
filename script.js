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
        name: document.getElementById("name").value || "Oguma Austine Ouma",
        email: document.getElementById("email").value || "austineouma748@gmail.com",
        phone: document.getElementById("phone").value || "0118289255",
        summary: document.getElementById("summary").value || "Student at Pwani University...",
        edu: document.getElementById("education").value,
        exp: document.getElementById("experience").value,
        skills: document.getElementById("skills").value
    };

    const skillsHTML = vals.skills ? 
        `<div class="skills-container">${vals.skills.split(',').map(s => `<span class="skill-badge">${s.trim()}</span>`).join("")}</div>` : '';

    resume.innerHTML = `
        <h1>${vals.name}</h1>
        <p style="text-align:center">${vals.email} | ${vals.phone}</p>
        <hr>
        <div>
            <h3>Professional Summary</h3>
            <p>${vals.summary}</p>
        </div>
        ${vals.edu ? `<div><h3>Education</h3><ul>${formatList(vals.edu)}</ul></div>` : ''}
        ${vals.exp ? `<div><h3>Experience</h3><ul>${formatList(vals.exp)}</ul></div>` : ''}
        ${vals.skills ? `<div><h3>Skills</h3>${skillsHTML}</div>` : ''}
    `;
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    document.getElementById("theme-toggle").innerText = isDark ? "☀️" : "🌙";
}

function downloadPDF() { window.print(); }

// Initialize
window.onload = generate;
