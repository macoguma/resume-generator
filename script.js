let lang = localStorage.getItem("lang") || "en";

const labels = {
  en: {
    summary: "Professional Summary",
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    languages: "Languages"
  },
  sw: {
    summary: "Muhtasari wa Kitaaluma",
    education: "Elimu",
    experience: "Uzoefu wa Kazi",
    skills: "Ujuzi",
    languages: "Lugha"
  }
};

document.getElementById("language-switch").value = lang;
document.getElementById("language-switch").onchange = e => {
  lang = e.target.value;
  localStorage.setItem("lang", lang);
};

function previewResume() {
  generateResume();
  document.getElementById("print-area").style.display = "block";
}

function generateResume() {
  const r = document.getElementById("resume");

  const get = id => document.getElementById(id).value;
  const section = (title, content) =>
    content ? `<h3>${title}</h3><p>${content.replace(/\n/g,"<br>")}</p>` : "";

  r.innerHTML = `
    <h1>${get("name")}</h1>
    <h2>${get("title")}</h2>

    ${section(labels[lang].summary, get("summary"))}
    ${section(labels[lang].education, get("education"))}
    ${section(labels[lang].experience, get("experience"))}
    ${section(labels[lang].skills, get("skills"))}
    ${section(labels[lang].languages, get("languages"))}
  `;
}

function downloadPDF() {
  generateResume();
  window.print();
}

function downloadWord() {
  alert("Word export ready (docx logic can be added here).");
}

function clearAll() {
  if (!confirm("Clear all data?")) return;
  document.querySelectorAll("input, textarea").forEach(el => el.value = "");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
