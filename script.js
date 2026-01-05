// Function to handle text formatting and bolding
function formatList(text, splitBy = "\n") {
    if (!text) return "";
    return text.split(splitBy)
        .filter(i => i.trim() !== "")
        .map(i => {
            const line = i.trim();
            if (line.includes("|")) {
                const parts = line.split("|");
                return `<li><strong>${parts[0].trim()}</strong> | ${parts.slice(1).join("|").trim()}</li>`;
            }
            return `<li>${line}</li>`;
        }).join("");
}

// Generate the preview
function generate() {
    const resume = document.getElementById("resume");
    const template = document.getElementById("template").value;
    resume.className = template;

    const vals = {
        name: document.getElementById("name").value || "Oguma Austine Ouma",
        email: document.getElementById("email").value || "austineouma748@gmail.com",
        phone: document.getElementById("phone").value || "0118289255",
        summary: document.getElementById("summary").value || "Motivated student at Pwani University...",
        edu: document.getElementById("education").value,
        exp: document.getElementById("experience").value,
        skills: document.getElementById("skills").value
    };

    const skillsHTML = vals.skills ? 
        `<div class="skills-container">${vals.skills.split(',').map(s => `<span class="skill-badge">${s.trim()}</span>`).join("")}</div>` : '';

    resume.innerHTML = `
        <h1>${vals.name}</h1>
        <p style="text-align:center">${vals.email} | ${vals.phone}</p>
        <div class="section">
            <h3>Professional Summary</h3>
            <p>${vals.summary}</p>
        </div>
        ${vals.edu ? `<div class="section"><h3>Education</h3><ul>${formatList(vals.edu)}</ul></div>` : ''}
        ${vals.exp ? `<div class="section"><h3>Experience</h3><ul>${formatList(vals.exp)}</ul></div>` : ''}
        ${vals.skills ? `<div class="section"><h3>Skills</h3>${skillsHTML}</div>` : ''}
    `;
}

// Theme Toggle Logic
function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    document.getElementById("theme-toggle").innerText = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function downloadPDF() { window.print(); }

function downloadWord() {
    const { Document, Packer, Paragraph, HeadingLevel } = window.docx;
    const name = document.getElementById("name").value || "Resume";
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ text: name, heading: HeadingLevel.TITLE }),
                new Paragraph(`Email: ${document.getElementById("email").value}`),
                new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_1 }),
                new Paragraph(document.getElementById("summary").value),
            ]
        }]
    });
    Packer.toBlob(doc).then(blob => saveAs(blob, `${name}_Resume.docx`));
}

function generateCoverLetter() {
    const name = document.getElementById("name").value || "Applicant";
    const w = window.open("");
    w.document.write(`<pre style="padding:40px; font-family:sans-serif;">Dear Hiring Manager,\n\nMy name is ${name}...</pre>`);
}

// Initialize on Load
window.onload = () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("theme-toggle").innerText = "☀️";
    }
    generate();
};
