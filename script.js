// Converts text to bullet points
function toList(text, splitBy = "\n") {
  return text
    .split(splitBy)
    .filter(i => i.trim() !== "")
    .map(i => `<li>${i.trim()}</li>`)
    .join("");
}

// Generate live preview
function generate() {
  const resume = document.getElementById("resume");
  const template = document.getElementById("template").value;
  resume.className = template;

  const nameVal = document.getElementById("name").value || "Full Name";
  const emailVal = document.getElementById("email").value || "email@example.com";
  const phoneVal = document.getElementById("phone").value || "+254 700 000 000";
  const summaryVal = document.getElementById("summary").value || "Motivated professional with strong skills and passion for excellence.";
  const educationVal = document.getElementById("education").value;
  const experienceVal = document.getElementById("experience").value;
  const skillsVal = document.getElementById("skills").value;

  resume.innerHTML = `
    <h1>${nameVal}</h1>
    <p><strong>Email:</strong> ${emailVal} | <strong>Phone:</strong> ${phoneVal}</p>

    <h3>Professional Summary</h3>
    <p>${summaryVal}</p>

    <h3>Education</h3>
    <ul>${toList(educationVal)}</ul>

    <h3>Experience</h3>
    <ul>${toList(experienceVal)}</ul>

    <h3>Skills</h3>
    <ul style="list-style-type: disc; margin-left: 20px;">${toList(skillsVal, ",")}</ul>
  `;
}

// Download PDF
function downloadPDF() {
    window.print();
}

// Download Word (.docx)
function downloadWord() {
    const { Document, Packer, Paragraph, TextRun } = docx;

    const doc = new Document();

    const nameVal = document.getElementById("name").value || "Full Name";
    const emailVal = document.getElementById("email").value || "email@example.com";
    const phoneVal = document.getElementById("phone").value || "+254 700 000 000";
    const summaryVal = document.getElementById("summary").value || "Motivated professional with strong skills and passion for excellence.";
    const educationVal = document.getElementById("education").value;
    const experienceVal = document.getElementById("experience").value;
    const skillsVal = document.getElementById("skills").value;

    doc.addSection({
        properties: {},
        children: [
            new Paragraph({ text: nameVal, heading: docx.HeadingLevel.TITLE }),
            new Paragraph(`Email: ${emailVal} | Phone: ${phoneVal}`),
            new Paragraph({ text: "Professional Summary", heading: docx.HeadingLevel.HEADING_1 }),
            new Paragraph(summaryVal),
            new Paragraph({ text: "Education", heading: docx.HeadingLevel.HEADING_1 }),
            ...educationVal.split("\n").map(e => new Paragraph({ text: `• ${e}` })),
            new Paragraph({ text: "Experience", heading: docx.HeadingLevel.HEADING_1 }),
            ...experienceVal.split("\n").map(e => new Paragraph({ text: `• ${e}` })),
            new Paragraph({ text: "Skills", heading: docx.HeadingLevel.HEADING_1 }),
            ...skillsVal.split(",").map(s => new Paragraph({ text: `• ${s.trim()}` })),
        ],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Resume.docx");
    });
}

// Generate Cover Letter
function generateCoverLetter() {
    const nameVal = document.getElementById("name").value || "Full Name";
    const emailVal = document.getElementById("email").value || "email@example.com";
    const phoneVal = document.getElementById("phone").value || "+254 700 000 000";
    const summaryVal = document.getElementById("summary").value || "Motivated professional with strong skills and passion for excellence.";

    const today = new Date().toLocaleDateString();

    const coverLetterText = `
Date: ${today}

Dear Hiring Manager,

My name is ${nameVal}. ${summaryVal} I am excited to apply for a position in your organization, where I can utilize my skills and experience effectively.

I have attached my resume for your review and would welcome the opportunity to discuss how I can contribute to your team.

Thank you for your time and consideration.

Sincerely,
${nameVal}
Email: ${emailVal}
Phone: ${phoneVal}
`;

    const w = window.open("", "_blank");
    w.document.write(`<pre style="font-family: Arial; white-space: pre-wrap;">${coverLetterText}</pre>`);
}
