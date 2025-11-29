---
layout: shamgate-layout
title: shuffle
---

<style>
.shuffle-container {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2em;
}
.project-card {
  max-width: 600px;
  padding: 2em;
  border: 2px solid #000;
  background: #fff;
  margin: 1em 0;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.project-card h2 {
  margin-top: 0;
}
.project-card .year {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 1em;
}
.project-card .description {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 1em;
}
.project-card .tags span {
  display: inline-block;
  background: #f0f0f0;
  padding: 0.2em 0.6em;
  margin: 0.2em;
  font-size: 0.9em;
}
.project-card .links {
  margin-top: 1em;
}
.project-card .links a {
  margin-right: 1em;
}
.project-card .sub-items-section {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px dashed #ccc;
  text-align: left;
}
.project-card .sub-items-section h4 {
  margin: 0 0 0.5em 0;
  font-size: 0.9em;
  color: #666;
}
.project-card .sub-items-list {
  font-size: 0.85em;
  max-height: 120px;
  overflow-y: auto;
  line-height: 1.5;
}
.project-card .sub-items-list a {
  color: inherit;
}
.project-card .project-image {
  max-width: 300px;
  margin: 1em auto;
  display: block;
}
.controls {
  margin: 2em 0;
}
.controls button {
  font-size: 1.2em;
  padding: 0.5em 1.5em;
  cursor: pointer;
  margin: 0 0.5em;
}
.counter {
  font-size: 0.9em;
  color: #666;
  margin-top: 1em;
}
.instructions {
  font-size: 0.9em;
  color: #888;
  margin-top: 0.5em;
}
.slot-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;
  margin: 1em 0;
}
.slot-item {
  display: inline-block;
  padding: 0.5em 1em;
  border: 2px solid #000;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}
.slot-item:hover {
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 #000;
}
.slot-item:active {
  transform: translateY(0);
  box-shadow: none;
}
.slot-item.active {
  background: #000;
  color: #fff;
}
.slot-item input {
  display: none;
}
.slot-buttons {
  text-align: center;
  margin: 0.5em 0;
}
.slot-buttons button {
  font-size: 1em;
  padding: 0.3em 1em;
  margin: 0 0.3em;
  cursor: pointer;
  border: 2px solid #000;
  background: #fff;
}
.slot-buttons button:hover {
  background: #f0f0f0;
}

/* Mobile styles */
@media (max-width: 600px) {
  .shuffle-container {
    padding: 1em;
    min-height: 40vh;
  }
  
  .project-card {
    max-width: 100%;
    padding: 1em;
    margin: 0.5em 0;
  }
  
  .project-card h2 {
    font-size: 1.2em;
  }
  
  .project-card .description {
    font-size: 1em;
  }
  
  .project-card .project-image {
    max-width: 100%;
  }
  
  .controls {
    margin: 1em 0;
  }
  
  .controls button {
    font-size: 1em;
    padding: 12px 16px;
    margin: 4px;
  }
  
  .slot-filters {
    gap: 4px;
  }
  
  .slot-item {
    padding: 8px 10px;
    font-size: 12px;
  }
  
  .slot-buttons button {
    padding: 8px 16px;
  }
}
</style>

[← back to main page](/)

<div class="slot-filters" id="filters">
  <label class="slot-item active"><input type="checkbox" value="music" checked>🎶 music</label>
  <label class="slot-item active"><input type="checkbox" value="code" checked>🧑‍💻 code</label>
  <label class="slot-item active"><input type="checkbox" value="work" checked>💼 work</label>
  <label class="slot-item active"><input type="checkbox" value="radio" checked>📻 radio</label>
  <label class="slot-item active"><input type="checkbox" value="release" checked>💿 release</label>
  <label class="slot-item active"><input type="checkbox" value="recording" checked>🎙️ recording</label>
  <label class="slot-item active"><input type="checkbox" value="making" checked>🪡 making</label>
  <label class="slot-item active"><input type="checkbox" value="video" checked>📹 video</label>
  <label class="slot-item active"><input type="checkbox" value="education" checked>🎓 education</label>
  <label class="slot-item active"><input type="checkbox" value="personal" checked>🏠 personal</label>
</div>
<p class="slot-buttons">
  <button type="button" onclick="toggleAll(true)">all</button>
  <button type="button" onclick="toggleAll(false)">none</button>
  <span id="count-display" style="margin-left: 0.5em;"></span>
</p>

<div class="shuffle-container">
  <div class="project-card" id="card">
    <h2 id="title">loading...</h2>
    <div class="year" id="year"></div>
    <div class="description" id="desc"></div>
    <img id="image" class="project-image" style="display: none;">
    <div class="tags" id="tags"></div>
    <div class="links" id="links"></div>
    <div class="sub-items-section" id="subitems" style="display: none;">
      <div class="sub-items-list" id="subitems-list"></div>
    </div>
  </div>
  
  <div class="controls">
    <button onclick="prevProject()">← prev</button>
    <button onclick="shuffle()">🎲 shuffle</button>
    <button onclick="nextProject()">next →</button>
  </div>
  
  <div class="counter" id="counter"></div>
  <div class="instructions">press spacebar or arrow keys</div>
</div>

---

e-mail: [niall@shamgate.co](mailto:niall@shamgate.co)

<script>
const allProjects = [
{% assign ongoing_projects = site.data.projects | where: "ongoing", true | sort: "start" | reverse %}
{% assign all_projects = site.data.projects | sort: "end" | reverse %}
{% assign sorted_projects = ongoing_projects %}
{% for project in all_projects %}{% unless project.ongoing %}{% assign sorted_projects = sorted_projects | push: project %}{% endunless %}{% endfor %}
{% for project in sorted_projects %}
{% assign start_year = project.start | slice: 0, 4 %}
{% if project.ongoing %}
{% assign end_year = "now" %}
{% elsif project.end %}
{% assign end_year = project.end | slice: 0, 4 %}
{% else %}
{% assign end_year = start_year %}
{% endif %}
{% if start_year == end_year %}
{% assign year_display = start_year %}
{% else %}
{% assign year_display = start_year | append: "-" | append: end_year %}
{% endif %}
  {
    title: {{ project.title | jsonify }},
    description: {{ project.description | jsonify }},
    year: "{{ year_display }}",
    tags: {{ project.tags | jsonify }},
    links: [{% if project.links %}{% for link in project.links %}{ label: {{ link.label | jsonify }}, url: {{ link.url | jsonify }} }{% unless forloop.last %},{% endunless %}{% endfor %}{% endif %}],
    image: {{ project.image | default: "" | jsonify }},
    subItems: [{% if project.sub_items %}{% for item in project.sub_items %}{ title: {{ item.title | jsonify }}, date: {{ item.date | jsonify }}, description: {{ item.description | jsonify }}, url: {{ item.url | default: "" | jsonify }} }{% unless forloop.last %},{% endunless %}{% endfor %}{% endif %}]
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];

let projects = [...allProjects];
let currentIndex = Math.floor(Math.random() * projects.length);
let history = [currentIndex];
let historyPos = 0;

const card = document.getElementById('card');
const titleEl = document.getElementById('title');
const yearEl = document.getElementById('year');
const descEl = document.getElementById('desc');
const imageEl = document.getElementById('image');
const tagsEl = document.getElementById('tags');
const linksEl = document.getElementById('links');
const subitemsEl = document.getElementById('subitems');
const subitemsListEl = document.getElementById('subitems-list');
const counterEl = document.getElementById('counter');
const filters = document.getElementById('filters');
const countDisplay = document.getElementById('count-display');
const slotItems = document.querySelectorAll('.slot-item');

// Click handler for slot items
slotItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const input = item.querySelector('input');
    input.checked = !input.checked;
    item.classList.toggle('active', input.checked);
    updateFilters();
  });
});

function updateFilters() {
  const checked = Array.from(filters.querySelectorAll('input:checked')).map(cb => cb.value);
  
  projects = allProjects.filter(p => {
    return checked.length > 0 && p.tags && p.tags.some(tag => checked.includes(tag));
  });
  
  countDisplay.textContent = `${projects.length}/${allProjects.length}`;
  
  // Reset to valid index
  if (projects.length > 0) {
    currentIndex = Math.floor(Math.random() * projects.length);
    history = [currentIndex];
    historyPos = 0;
    showProject(currentIndex);
  } else {
    titleEl.textContent = 'no projects match';
    yearEl.textContent = '';
    descEl.textContent = 'Select some filters above';
    tagsEl.innerHTML = '';
    linksEl.innerHTML = '';
    counterEl.textContent = '';
  }
}

function toggleAll(state) {
  slotItems.forEach(item => {
    const input = item.querySelector('input');
    input.checked = state;
    item.classList.toggle('active', state);
  });
  updateFilters();
}

filters.addEventListener('change', updateFilters);

function showProject(index) {
  if (projects.length === 0) return;
  const p = projects[index];
  
  // Animate
  card.style.animation = 'none';
  card.offsetHeight; // trigger reflow
  card.style.animation = 'fadeIn 0.3s ease';
  
  titleEl.textContent = p.title;
  yearEl.textContent = p.year;
  descEl.textContent = p.description;
  
  // Image
  if (p.image) {
    imageEl.src = p.image;
    imageEl.alt = p.title;
    imageEl.style.display = '';
  } else {
    imageEl.style.display = 'none';
  }
  
  // Tags
  tagsEl.innerHTML = '';
  if (p.tags) {
    const emojis = {
      music: '🎶', code: '🧑‍💻', work: '💼', radio: '📻',
      release: '💿', recording: '🎙️', making: '🪡', video: '📹', education: '🎓', personal: '🏠'
    };
    p.tags.forEach(tag => {
      const span = document.createElement('span');
      span.textContent = (emojis[tag] || '') + ' ' + tag;
      tagsEl.appendChild(span);
    });
  }
  
  // Links
  linksEl.innerHTML = '';
  if (p.links && p.links.length) {
    p.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = '[' + link.label + ']';
      a.target = '_blank';
      linksEl.appendChild(a);
    });
  }
  
  // Sub-items
  if (p.subItems && p.subItems.length) {
    subitemsEl.style.display = '';
    subitemsListEl.innerHTML = '';
    p.subItems.forEach(si => {
      const div = document.createElement('div');
      let dateStr = '';
      if (si.date) {
        const [year, month] = si.date.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dateStr = month ? ` (${monthNames[parseInt(month, 10) - 1]} ${year})` : ` (${year})`;
      }
      let html = '• ';
      if (si.url) {
        html += `<a href="${si.url}" target="_blank">${si.title}</a>${dateStr}`;
      } else {
        html += `${si.title}${dateStr}`;
      }
      if (si.description) {
        html += ` — <em>${si.description}</em>`;
      }
      div.innerHTML = html;
      subitemsListEl.appendChild(div);
    });
  } else {
    subitemsEl.style.display = 'none';
  }
  
  counterEl.textContent = `project ${index + 1} of ${projects.length}`;
}

function shuffle() {
  if (projects.length === 0) return;
  const newIndex = Math.floor(Math.random() * projects.length);
  currentIndex = newIndex;
  // Add to history
  history = history.slice(0, historyPos + 1);
  history.push(currentIndex);
  historyPos = history.length - 1;
  showProject(currentIndex);
}

function nextProject() {
  if (projects.length === 0) return;
  if (historyPos < history.length - 1) {
    historyPos++;
    currentIndex = history[historyPos];
  } else {
    currentIndex = (currentIndex + 1) % projects.length;
    history.push(currentIndex);
    historyPos = history.length - 1;
  }
  showProject(currentIndex);
}

function prevProject() {
  if (projects.length === 0) return;
  if (historyPos > 0) {
    historyPos--;
    currentIndex = history[historyPos];
    showProject(currentIndex);
  }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    shuffle();
  } else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
    e.preventDefault();
    nextProject();
  } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
    e.preventDefault();
    prevProject();
  }
});

// Initial display
updateFilters();
</script>
