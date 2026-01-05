function formatList(text) {
    if (!text) return "";
    return text.split("\n").filter(line => line.trim() !== "").map(line => {
        if (line.includes("|")) {
            const [title, year] = line.split("|");
            return `<li style="display:flex; justify-content:space-between; margin-bottom:8px;"><strong>${title.trim()}</strong> <span>${year.trim()}</span></li>`;
        }
        return `<li style="margin-bottom:8px;">${line.trim()}</li>`;
    }).join("");
}

function generateContent() {
    const resume = document.getElementById("resume");
    const template = document.getElementById("template").value;
    resume.className = template;

    const fields = ['name', 'email', 'phone', 'summary', 'education', 'experience', 'skills'];
    const data = {};
    fields.forEach(id => data[id] = document.getElementById(id).value);

    const skillsHTML = data.skills ? 
        `<div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">${data.skills.split(',').map(s => `<span style="background:#f3f4f6; padding:4px 12px; border-radius:15px; font-size:12px; font-weight:bold; border:1px solid #d1d5db;">${s.trim()}</span>`).join("")}</div>` : '';

    resume.innerHTML = `
        <h1 style="text-align:center; margin-bottom:5px;">${data.name}</h1>
        <p style="text-align:center; font-size:14px; margin-bottom:20px;">
            ${data.email}${data.email && data.phone ? ' | ' : ''}${data.phone}
        </p>
        
        ${data.summary ? `<div style="margin-top:20px;"><h3 style="border-bottom:2px solid #eee; text-transform:uppercase; font-size:14px; padding-bottom:5px;">Professional Summary</h3><p>${data.summary}</p></div>` : ''}
        ${data.education ? `<div style="margin-top:20px;"><h3 style="border-bottom:2px solid #eee; text-transform:uppercase; font-size:14px; padding-bottom:5px;">Education</h3><ul style="list-style:none; padding:0;">${formatList(data.education)}</ul></div>` : ''}
        ${data.experience ? `<div style="margin-top:20px;"><h3 style="border-bottom:2px solid #eee; text-transform:uppercase; font-size:14px; padding-bottom:5px;">Work Experience</h3><ul style="list-style:none; padding:0;">${formatList(data.experience)}</ul></div>` : ''}
        ${data.skills ? `<div style="margin-top:20px;"><h3 style="border-bottom:2px solid #eee; text-transform:uppercase; font-size:14px; padding-bottom:5px;">Skills</h3>${skillsHTML}</div>` : ''}
    `;
}

function showPreview() { generateContent(); window.print(); }
function downloadPDF() { generateContent(); window.print(); }

function clearAll() {
    if(confirm("Are you sure you want to clear all information?")) {
        const fields = ['name', 'email', 'phone', 'summary', 'education', 'experience', 'skills'];
        fields.forEach(id => document.getElementById(id).value = "");
    }
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const btn = document.getElementById("theme-toggle");
    btn.innerText = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
}

function downloadWord() {
    generateContent();
    const name = document.getElementById("name").value || "Resume";
    alert("Word download started for " + name);
    // Add full docx logic here if needed
}
