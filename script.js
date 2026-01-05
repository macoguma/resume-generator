function toList(text, splitBy = "\n") {
  return text
    .split(splitBy)
    .filter(i => i.trim() !== "")
    .map(i => `<li>${i.trim()}</li>`)
    .join("");
}

function generate() {
  const resume = document.getElementById("resume");
  const template = document.getElementById("template").value;
  resume.className = template;

  resume.innerHTML = `
    <h1>${name.value}</h1>
    <p>${email.value} | ${phone.value}</p>

    <h3>Professional Summary</h3>
    <p>${summary.value}</p>

    <h3>Education</h3>
    <ul>${toList(education.value)}</ul>

    <h3>Experience</h3>
    <ul>${toList(experience.value)}</ul>

    <h3>Skills</h3>
    <ul>${toList(skills.value, ",")}</ul>
  `;
}
