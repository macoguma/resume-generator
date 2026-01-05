function toList(text, splitBy = "\n") {
    if (!text) return "";
    return text.split(splitBy)
        .filter(i => i.trim() !== "")
        .map(i => `<li>${i.trim()}</li>`)
        .join("");
}

function generate() {
    const resume = document.getElementById("resume");
    const template = document.getElementById("template").value;
    resume.className = template;

    const data = {
        name: document.getElementById("name").value || "YOUR NAME",
        email: document.getElementById("email").value || "email@example.com",
        phone: document.getElementById("phone").value || "+254 000 000",
        summary: document.getElementById("summary").value || "Professional summary goes here...",
        edu: document.getElementById("education").value,
        exp: document.getElementById("experience").value,
        skills: document.getElementById("skills").value
    };

    resume.innerHTML = `
        <h1>${data.name}</h1>
        <p style="text-align:center">${data.email} | ${data.phone}</p>
        <hr>
        <h3>Professional Summary</h3>
        <p>${data.summary}</p>
        ${data.edu ? `<h3>Education</h3><ul>${toList(data.edu)}</ul>` : ''}
        ${data.exp ? `<h3>Experience</h3><ul>${toList(data.exp)}</ul>` : ''}
        ${data.skills ? `<h3>Skills</h3><ul>${toList(data.skills, ",")}</ul>` : ''}
    `;
}

function downloadPDF() {
    window.print();
}

function downloadWord() {
    const { Document, Packer, Paragraph, HeadingLevel, TextRun } = window.docx;
    
    const nameVal = document.getElementById("name").value || "Resume";
    
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({ text: nameVal, heading: HeadingLevel.TITLE }),
                new Paragraph({
                    children: [new TextRun(`Email: ${document.getElementById("email").value} | Phone: ${document.getElementById("phone").value}`)]
                }),
                new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_1 }),
                new Paragraph(document.getElementById("summary").value),
            ]
        }]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `${nameVal.replace(/\s/g, '_')}_Resume.docx`);
    });
}

function generateCoverLetter() {
    const name = document.getElementById("name").value || "Applicant";
    const text = `Dear Hiring Manager,\n\nI am writing to express interest... \n\nBest regards,\n${name}`;
    const w = window.open("");
    w.document.write(`<pre style="padding:40px; font-family:sans-serif;">${text}</pre>`);
}

// Initialize preview on load
generate();
