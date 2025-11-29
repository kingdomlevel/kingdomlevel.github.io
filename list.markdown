---
layout: shamgate-layout
title: list
---

<style>
.project-list {
  font-family: monospace;
  line-height: 1.8;
}
.project-list a {
  color: inherit;
  text-decoration: none;
}
.project-list a:hover {
  text-decoration: underline;
}
.project-line {
  transition: color 0.2s;
}
.project-line:hover {
  opacity: 0.7;
}
.project-line .sub-items {
  margin-left: 2em;
  font-size: 0.9em;
  color: #666;
  display: none;
}
.project-line.expanded .sub-items {
  display: block;
}
.project-line .expand-toggle {
  cursor: pointer;
  user-select: none;
}
.project-line .expand-toggle:hover {
  color: #000;
}
.sub-item-line {
  line-height: 1.5;
}
.project-image {
  max-width: 300px;
  margin: 0.5em 0;
  display: block;
}
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #000;
  width: 0%;
  z-index: 1000;
  transition: width 0.1s;
}
</style>

<div class="progress-bar" id="progress"></div>

[← back to main page](/)

<details class="filter-section" open>
  <summary>filter by type</summary>
  <div class="filter-controls" id="filters" style="font-family: monospace;">
    <label><input type="checkbox" value="music" checked> [🎶 music]</label>
    <label><input type="checkbox" value="code" checked> [🧑‍💻 code]</label>
    <label><input type="checkbox" value="work" checked> [💼 work]</label>
    <label><input type="checkbox" value="radio" checked> [📻 radio]</label>
    <label><input type="checkbox" value="release" checked> [💿 release]</label>
    <label><input type="checkbox" value="recording" checked> [🎙️ recording]</label>
    <label><input type="checkbox" value="making" checked> [🪡 making]</label>
    <label><input type="checkbox" value="video" checked> [📹 video]</label>
    <label><input type="checkbox" value="education" checked> [🎓 education]</label>
    <label><input type="checkbox" value="personal" checked> [🏠 personal]</label>

  </div>
  <p style="margin-top: 0.5em; font-size: 0.85em; font-family: monospace;">
    <button type="button" onclick="toggleAll(true)">[select all]</button>
    <button type="button" onclick="toggleAll(false)">[clear all]</button>
    <span id="count-display" style="margin-left: 1em;"></span>
  </p>
</details>

<div class="project-list" id="list">
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
<div class="project-line" data-tags="{{ project.tags | join: ' ' }}" data-has-expandable="{% if project.sub_items or project.image %}true{% else %}false{% endif %}">{% if project.sub_items or project.image %}<span class="expand-toggle" onclick="this.parentElement.classList.toggle('expanded')">[+]</span>{% else %}☉{% endif %} <strong>{{ project.title }}</strong>{% if project.sub_items %} ({{ project.sub_items | size }}){% endif %} ({{ year_display }}) — {{ project.description }}{% if project.links %} {% for link in project.links %}<a href="{{ link.url }}">[{{ link.label }}]</a> {% endfor %}{% endif %}
{% if project.sub_items or project.image %}<div class="sub-items">{% if project.image %}<img src="{{ project.image }}" alt="{{ project.title }}" class="project-image">{% endif %}{% for item in project.sub_items %}{% assign item_year = item.date | slice: 0, 4 %}{% assign item_month_num = item.date | slice: 5, 2 %}{% case item_month_num %}{% when "01" %}{% assign item_month = "Jan" %}{% when "02" %}{% assign item_month = "Feb" %}{% when "03" %}{% assign item_month = "Mar" %}{% when "04" %}{% assign item_month = "Apr" %}{% when "05" %}{% assign item_month = "May" %}{% when "06" %}{% assign item_month = "Jun" %}{% when "07" %}{% assign item_month = "Jul" %}{% when "08" %}{% assign item_month = "Aug" %}{% when "09" %}{% assign item_month = "Sep" %}{% when "10" %}{% assign item_month = "Oct" %}{% when "11" %}{% assign item_month = "Nov" %}{% when "12" %}{% assign item_month = "Dec" %}{% else %}{% assign item_month = "" %}{% endcase %}<div class="sub-item-line">└─ {% if item.url %}<a href="{{ item.url }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}{% if item.date %} ({% if item_month %}{{ item_month }} {% endif %}{{ item_year }}){% endif %}{% if item.description %} — <em>{{ item.description }}</em>{% endif %}</div>{% endfor %}</div>{% endif %}</div>
{% endfor %}
</div>

---

e-mail: [niall@shamgate.co](mailto:niall@shamgate.co)

<script>
// Filtering
const filters = document.getElementById('filters');
const countDisplay = document.getElementById('count-display');

function updateFilters() {
  const checked = Array.from(filters.querySelectorAll('input:checked')).map(cb => cb.value);
  const items = document.querySelectorAll('.project-line');
  let visibleCount = 0;
  
  items.forEach(item => {
    const tags = (item.dataset.tags || '').split(' ');
    const visible = checked.length > 0 && tags.some(tag => checked.includes(tag));
    item.style.display = visible ? '' : 'none';
    if (visible) visibleCount++;
  });
  
  countDisplay.textContent = `showing ${visibleCount} of ${items.length} projects`;
}

function toggleAll(state) {
  filters.querySelectorAll('input').forEach(cb => cb.checked = state);
  updateFilters();
}

filters.addEventListener('change', updateFilters);
updateFilters();

// Scroll-triggered background colour changes (ALKU style)
const colors = [
  '#ffffff', '#ffe4e1', '#e6e6fa', '#f0fff0', '#fff8dc', 
  '#e0ffff', '#ffefd5', '#f5f5dc', '#fffacd', '#e6f3ff',
  '#fff0f5', '#f0f8ff', '#faf0e6', '#ffe4b5', '#f5fffa',
  '#ffeef0', '#e8f5e9', '#fff3e0', '#e3f2fd', '#fce4ec'
];

let colorIndex = 0;
let lastScrollY = window.scrollY;

// Progress bar
const progressBar = document.getElementById('progress');

function updateProgress() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / scrollHeight) * 100;
  progressBar.style.width = progress + '%';
}

window.addEventListener('scroll', () => {
  // Update progress bar
  updateProgress();
  
  // Change background on scroll direction change or every 100px
  const scrollDelta = Math.abs(window.scrollY - lastScrollY);
  if (scrollDelta > 50) {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
    document.body.style.transition = 'background-color 0.3s ease';
    lastScrollY = window.scrollY;
  }
});

updateProgress();
</script>
