const fields = ['name','email','phone','summary','education','experience','skills','template'];
let photoData = "";

/* ===== Utilities ===== */
function escapeHTML(str="") {
  return str.replace(/[&<>"']/g, m =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])
  );
}

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

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  generateContent();
}

window.onload = loadDraft;

/* ===== Live Preview ===== */
fields.forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    saveDraft();
    generateContent();
  });
});

/* ===== Photo ===== */
document.getElementById("photo").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    photoData = reader.result;
    saveDraft();
    generateContent();
  };
  reader.readAsDataURL(file);
});

/* ===== Helpers ===== */
function formatList(text) {
  return escapeHTML(text).split("\n").filter(Boolean).map(line => {
    if (line.includes("|")) {
      const [a,b] = line.split("|");
      return `<li><strong>${a.trim()}</strong> <span>${b.trim()}</span></li>`;
    }
    return `<li>${line}</li>`;
  }).join("");
}

/* ===== Resume Generator ===== */
function generateContent() {
  const r = document.getElementById("resume");
  const t = document.getElementById("template").value;
  const g = id => escapeHTML(document.getElementById(id).value);

  r.className = `resume ${t}`;
  r.innerHTML = `
    <div class="resume-header">
      ${photoData ? `<img src="${photoData}" class="photo">` : ``}
      <h1>${g("name")}</h1>
      <p>${g("email")} | ${g("phone")}</p>
    </div>

    <div class="resume-body">
      <section>
        <h2>Profile</h2>
        <p>${g("summary")}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <ul>${formatList(document.getElementById("experience").value)}</ul>
      </section>

      <section>
        <h2>Education</h2>
        <ul>${formatList(document.getElementById("education").value)}</ul>
      </section>

      <section>
        <h2>Skills</h2>
        <ul class="skills">
          ${g("skills").split(",").map(s=>`<li>${s.trim()}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;
}

/* ===== Actions ===== */
function downloadPDF() {
  if (!document.getElementById("name").value.trim()) {
    alert("Please enter your name first.");
    return;
  }
  window.print();
}

function clearAll() {
  if (!confirm("Clear all data?")) return;
  fields.forEach(id => document.getElementById(id).value = "");
  photoData = "";
  localStorage.clear();
  generateContent();
}

/* ===== Theme ===== */
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
               }
