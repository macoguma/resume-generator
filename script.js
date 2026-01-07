const fields = ['name','email','phone','summary','education','experience','skills'];
let photoData = "";

/* ===== Autosave ===== */
function saveDraft() {
  const data = {};
  fields.forEach(id => data[id] = document.getElementById(id).value);
  localStorage.setItem("resumeDraft", JSON.stringify(data));
  localStorage.setItem("resumePhoto", photoData);
}

function loadDraft() {
  const data = JSON.parse(localStorage.getItem("resumeDraft") || "{}");
  fields.forEach(id => {
    if (data[id]) document.getElementById(id).value = data[id];
  });
  const savedPhoto = localStorage.getItem("resumePhoto");
  if (savedPhoto) photoData = savedPhoto;
}

window.onload = loadDraft;
fields.forEach(id =>
  document.getElementById(id).addEventListener("input", saveDraft)
);

/* ===== Photo Upload ===== */
document.getElementById("photo").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    photoData = reader.result;
    saveDraft();
  };
  reader.readAsDataURL(file);
});

/* ===== Resume Generation ===== */
function generateContent() {
  const r = document.getElementById("resume");
  const get = id => document.getElementById(id).value;

  r.className = "resume";
  r.innerHTML = `
    <aside class="left">
      ${photoData ? `<img src="${photoData}" class="photo">` : ``}

      <div class="section">
        <h3>Contact</h3>
        <p>${get("email")}</p>
        <p>${get("phone")}</p>
      </div>

      <div class="section">
        <h3>Profile</h3>
        <p>${get("summary")}</p>
      </div>

      <div class="section">
        <h3>Skills</h3>
        <ul>${get("skills").split(",").map(s=>`<li>${s.trim()}</li>`).join("")}</ul>
      </div>
    </aside>

    <main class="right">
      <h1>${get("name")}</h1>
      <div class="job-title">Professional Resume</div>

      <div class="section">
        <h2>Experience</h2>
        <ul>${formatList(get("experience"))}</ul>
      </div>

      <div class="section">
        <h2>Education</h2>
        <ul>${formatList(get("education"))}</ul>
      </div>
    </main>
  `;
}

function formatList(text) {
  return text.split("\n").filter(Boolean).map(line => {
    if (line.includes("|")) {
      const [a,b] = line.split("|");
      return `<li><strong>${a.trim()}</strong> <span>${b.trim()}</span></li>`;
    }
    return `<li>${line}</li>`;
  }).join("");
}

function downloadPDF() {
  generateContent();
  window.print();
}

function clearAll() {
  if (!confirm("Clear all data?")) return;
  fields.forEach(id => document.getElementById(id).value = "");
  photoData = "";
  localStorage.clear();
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}      
