---
layout: shamgate-layout
title: scroll
---

<style>
body {
  overflow-x: hidden;
}
.marquee-item.hidden {
  display: none;
}
.instructions {
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 1em 0;
}
.marquee-container {
  position: relative;
  width: 100%;
  margin: 2em 0;
}
.marquee-track {
  display: flex;
  animation: scroll-left 120s linear infinite;
  width: max-content;
}
.marquee-track:hover {
  animation-play-state: paused;
}
.marquee-item {
  flex-shrink: 0;
  padding: 0.5em 2em;
  margin-right: 1em;
  background: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.marquee-item:hover {
  background: #ffff99;
}
.marquee-item .title {
  font-weight: bold;
}
.marquee-item .year {
  font-size: 0.8em;
  color: #666;
}
.marquee-item .sub-count {
  font-size: 0.75em;
  color: #999;
}
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.detail-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 2px solid #000;
  padding: 1.5em;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  max-height: 50vh;
  overflow-y: auto;
}
.detail-panel.open {
  transform: translateY(0);
}
.detail-panel .close-btn {
  position: absolute;
  top: 0.5em;
  right: 1em;
  cursor: pointer;
  font-size: 1.5em;
}
.detail-panel h3 {
  margin-top: 0;
}
.detail-panel .tags span {
  display: inline-block;
  background: #eee;
  padding: 0.2em 0.5em;
  margin-right: 0.3em;
  font-size: 0.85em;
}
.sub-items-section {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px dashed #ccc;
}
.sub-items-list {
  font-size: 0.9em;
  line-height: 1.6;
  max-height: 150px;
  overflow-y: auto;
}
.sub-items-list .sub-item {
  margin-bottom: 0.3em;
}
.sub-items-list .sub-item a {
  color: inherit;
}
.detail-image {
  max-width: 300px;
  margin: 0.5em 0;
  display: block;
}
.filter-marquee {
  overflow: hidden;
  background: #f0f0f0;
  border: 1px solid #ccc;
  padding: 0.5em 0;
  margin: 1em 0;
}
.filter-track {
  display: flex;
  animation: scroll-left 30s linear infinite;
  width: max-content;
}
.filter-track:hover {
  animation-play-state: paused;
}
.filter-item {
  flex-shrink: 0;
  padding: 0.3em 1em;
  margin-right: 0.5em;
  background: #fff;
  border: 1px solid #999;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}
.filter-item:hover {
  background: #ffff99;
}
.filter-item.active {
  background: #000;
  color: #fff;
  border-color: #000;
}
.filter-item input {
  display: none;
}
.filter-buttons {
  text-align: center;
  margin: 0.5em 0;
}
.filter-buttons button {
  margin: 0 0.3em;
  cursor: pointer;
}

/* Mobile styles */
@media (max-width: 600px) {
  .marquee-container {
    margin: 1em 0;
  }
  
  .marquee-item {
    padding: 0.75em 1em;
    font-size: 14px;
  }
  
  .marquee-track {
    animation-duration: 60s; /* Slower on mobile */
  }
  
  .filter-marquee {
    margin: 0.5em 0;
  }
  
  .filter-track {
    animation-duration: 20s;
  }
  
  .filter-item {
    padding: 8px 12px;
    font-size: 12px;
  }
  
  .detail-panel {
    max-height: 60vh;
    padding: 1em;
  }
  
  .detail-panel h3 {
    font-size: 1.1em;
    padding-right: 2em;
  }
  
  .detail-panel .close-btn {
    font-size: 1.2em;
    padding: 8px;
  }
  
  .detail-image {
    max-width: 100%;
  }
  
  .instructions {
    font-size: 12px;
  }
  
  .filter-buttons button {
    padding: 8px 12px;
  }
}
</style>

[← back to main page](/)

<div class="filter-marquee">
  <div class="filter-track" id="filters">
    <label class="filter-item active"><input type="checkbox" value="music" checked>🎶 music</label>
    <label class="filter-item active"><input type="checkbox" value="code" checked>🧑‍💻 code</label>
    <label class="filter-item active"><input type="checkbox" value="work" checked>💼 work</label>
    <label class="filter-item active"><input type="checkbox" value="radio" checked>📻 radio</label>
    <label class="filter-item active"><input type="checkbox" value="release" checked>💿 release</label>
    <label class="filter-item active"><input type="checkbox" value="recording" checked>🎙️ recording</label>
    <label class="filter-item active"><input type="checkbox" value="making" checked>🪡 making</label>
    <label class="filter-item active"><input type="checkbox" value="video" checked>📹 video</label>
    <label class="filter-item active"><input type="checkbox" value="education" checked>🎓 education</label>
    <label class="filter-item active"><input type="checkbox" value="personal" checked>🏠 personal</label>
    <!-- duplicate for seamless loop -->
    <label class="filter-item active"><input type="checkbox" value="music" checked>🎶 music</label>
    <label class="filter-item active"><input type="checkbox" value="code" checked>🧑‍💻 code</label>
    <label class="filter-item active"><input type="checkbox" value="work" checked>💼 work</label>
    <label class="filter-item active"><input type="checkbox" value="radio" checked>📻 radio</label>
    <label class="filter-item active"><input type="checkbox" value="release" checked>💿 release</label>
    <label class="filter-item active"><input type="checkbox" value="recording" checked>🎙️ recording</label>
    <label class="filter-item active"><input type="checkbox" value="making" checked>🪡 making</label>
    <label class="filter-item active"><input type="checkbox" value="video" checked>📹 video</label>
    <label class="filter-item active"><input type="checkbox" value="education" checked>🎓 education</label>
    <label class="filter-item active"><input type="checkbox" value="personal" checked>🏠 personal</label>
  </div>
</div>
<p class="filter-buttons">
  <button type="button" onclick="toggleAll(true)">select all</button>
  <button type="button" onclick="toggleAll(false)">clear all</button>
  <span id="count-display" style="margin-left: 1em;"></span>
</p>

<p class="instructions">hover to pause · click for details</p>

<div class="marquee-container">
  <div class="marquee-track" id="track1">
    {% assign ongoing_projects = site.data.projects | where: "ongoing", true | sort: "start" | reverse %}
    {% assign all_projects = site.data.projects | sort: "end" | reverse %}
    {% assign sorted_projects = ongoing_projects %}
    {% for project in all_projects %}{% unless project.ongoing %}{% assign sorted_projects = sorted_projects | push: project %}{% endunless %}{% endfor %}
    {% for project in sorted_projects %}
    {% assign start_year = project.start | slice: 0, 4 %}
    {% if project.ongoing %}{% assign end_year = "now" %}{% elsif project.end %}{% assign end_year = project.end | slice: 0, 4 %}{% else %}{% assign end_year = start_year %}{% endif %}
    {% if start_year == end_year %}{% assign year_display = start_year %}{% else %}{% assign year_display = start_year | append: "-" | append: end_year %}{% endif %}
    <div class="marquee-item" data-index="{{ forloop.index0 }}" data-tags="{{ project.tags | join: ', ' }}">
      <span class="title">{{ project.title }}</span><br>
      <span class="year">{{ year_display }}</span>{% if project.sub_items %}<br><span class="sub-count">{{ project.sub_items | size }} items</span>{% endif %}
    </div>
    {% endfor %}
    <!-- Duplicate for seamless loop -->
    {% for project in sorted_projects %}
    {% assign start_year = project.start | slice: 0, 4 %}
    {% if project.ongoing %}{% assign end_year = "now" %}{% elsif project.end %}{% assign end_year = project.end | slice: 0, 4 %}{% else %}{% assign end_year = start_year %}{% endif %}
    {% if start_year == end_year %}{% assign year_display = start_year %}{% else %}{% assign year_display = start_year | append: "-" | append: end_year %}{% endif %}
    <div class="marquee-item" data-index="{{ forloop.index0 }}" data-tags="{{ project.tags | join: ', ' }}">
      <span class="title">{{ project.title }}</span><br>
      <span class="year">{{ year_display }}</span>{% if project.sub_items %}<br><span class="sub-count">{{ project.sub_items | size }} items</span>{% endif %}
    </div>
    {% endfor %}
  </div>
</div>

<div class="marquee-container">
  <div class="marquee-track" id="track2" style="animation-direction: reverse; animation-duration: 90s;">
    {% assign shuffled = site.data.projects | sort: "title" %}
    {% for project in shuffled %}
    {% assign start_year = project.start | slice: 0, 4 %}
    {% if project.ongoing %}{% assign end_year = "now" %}{% elsif project.end %}{% assign end_year = project.end | slice: 0, 4 %}{% else %}{% assign end_year = start_year %}{% endif %}
    {% if start_year == end_year %}{% assign year_display = start_year %}{% else %}{% assign year_display = start_year | append: "-" | append: end_year %}{% endif %}
    {% assign orig_index = 0 %}{% for p in sorted_projects %}{% if p.title == project.title %}{% assign orig_index = forloop.index0 %}{% break %}{% endif %}{% endfor %}
    <div class="marquee-item" data-index="{{ orig_index }}" data-tags="{{ project.tags | join: ', ' }}">
      <span class="title">{{ project.title }}</span><br>
      <span class="year">{{ year_display }}</span>{% if project.sub_items %}<br><span class="sub-count">{{ project.sub_items | size }} items</span>{% endif %}
    </div>
    {% endfor %}
    {% for project in shuffled %}
    {% assign start_year = project.start | slice: 0, 4 %}
    {% if project.ongoing %}{% assign end_year = "now" %}{% elsif project.end %}{% assign end_year = project.end | slice: 0, 4 %}{% else %}{% assign end_year = start_year %}{% endif %}
    {% if start_year == end_year %}{% assign year_display = start_year %}{% else %}{% assign year_display = start_year | append: "-" | append: end_year %}{% endif %}
    {% assign orig_index = 0 %}{% for p in sorted_projects %}{% if p.title == project.title %}{% assign orig_index = forloop.index0 %}{% break %}{% endif %}{% endfor %}
    <div class="marquee-item" data-index="{{ orig_index }}" data-tags="{{ project.tags | join: ', ' }}">
      <span class="title">{{ project.title }}</span><br>
      <span class="year">{{ year_display }}</span>{% if project.sub_items %}<br><span class="sub-count">{{ project.sub_items | size }} items</span>{% endif %}
    </div>
    {% endfor %}
  </div>
</div>

<div class="marquee-container">
  <div class="marquee-track" id="track3" style="animation-duration: 150s;">
    {% for project in sorted_projects %}
    {% assign start_year = project.start | slice: 0, 4 %}
    {% if project.ongoing %}{% assign end_year = "now" %}{% elsif project.end %}{% assign end_year = project.end | slice: 0, 4 %}{% else %}{% assign end_year = start_year %}{% endif %}
    {% if start_year == end_year %}{% assign year_display = start_year %}{% else %}{% assign year_display = start_year | append: "-" | append: end_year %}{% endif %}
    <div class="marquee-item" data-index="{{ forloop.index0 }}" data-tags="{{ project.tags | join: ', ' }}">
      <span class="title">{{ project.title }}</span><br>
      <span class="year">{{ year_display }}</span>{% if project.sub_items %}<br><span class="sub-count">{{ project.sub_items | size }} items</span>{% endif %}
    </div>
    {% endfor %}
    {% for project in sorted_projects %}
    {% assign start_year = project.start | slice: 0, 4 %}
    {% if project.ongoing %}{% assign end_year = "now" %}{% elsif project.end %}{% assign end_year = project.end | slice: 0, 4 %}{% else %}{% assign end_year = start_year %}{% endif %}
    {% if start_year == end_year %}{% assign year_display = start_year %}{% else %}{% assign year_display = start_year | append: "-" | append: end_year %}{% endif %}
    <div class="marquee-item" data-index="{{ forloop.index0 }}" data-tags="{{ project.tags | join: ', ' }}">
      <span class="title">{{ project.title }}</span><br>
      <span class="year">{{ year_display }}</span>{% if project.sub_items %}<br><span class="sub-count">{{ project.sub_items | size }} items</span>{% endif %}
    </div>
    {% endfor %}
  </div>
</div>

<div class="detail-panel" id="detail">
  <span class="close-btn" onclick="closeDetail()">×</span>
  <h3 id="detail-title"></h3>
  <p id="detail-year"></p>
  <p id="detail-desc"></p>
  <img id="detail-image" class="detail-image" style="display: none;">
  <p class="tags" id="detail-tags"></p>
  <p id="detail-links"></p>
  <div class="sub-items-section" id="detail-subitems" style="display: none;">
    <div class="sub-items-list" id="subitems-list"></div>
  </div>
</div>

<script>
// Store all project data in JavaScript to avoid HTML escaping issues
const allProjects = [
{% assign ongoing_projects = site.data.projects | where: "ongoing", true | sort: "start" | reverse %}
{% assign all_projects = site.data.projects | sort: "end" | reverse %}
{% assign sorted_projects = ongoing_projects %}
{% for project in all_projects %}{% unless project.ongoing %}{% assign sorted_projects = sorted_projects | push: project %}{% endunless %}{% endfor %}
{% for project in sorted_projects %}
{% assign start_year = project.start | slice: 0, 4 %}
{% if project.ongoing %}{% assign end_year = "now" %}{% elsif project.end %}{% assign end_year = project.end | slice: 0, 4 %}{% else %}{% assign end_year = start_year %}{% endif %}
{% if start_year == end_year %}{% assign year_display = start_year %}{% else %}{% assign year_display = start_year | append: "-" | append: end_year %}{% endif %}
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

const detailPanel = document.getElementById('detail');
const detailTitle = document.getElementById('detail-title');
const detailYear = document.getElementById('detail-year');
const detailDesc = document.getElementById('detail-desc');
const detailImage = document.getElementById('detail-image');
const detailTags = document.getElementById('detail-tags');
const detailLinks = document.getElementById('detail-links');
const detailSubitems = document.getElementById('detail-subitems');
const subitemsList = document.getElementById('subitems-list');

document.querySelectorAll('.marquee-item').forEach(item => {
  item.addEventListener('click', () => {
    const index = parseInt(item.dataset.index, 10);
    const p = allProjects[index];
    if (!p) return;
    
    detailTitle.textContent = p.title;
    detailYear.textContent = p.year;
    detailDesc.textContent = p.description;
    
    // Image
    if (p.image) {
      detailImage.src = p.image;
      detailImage.alt = p.title;
      detailImage.style.display = '';
    } else {
      detailImage.style.display = 'none';
    }
    
    // Tags
    detailTags.innerHTML = '';
    if (p.tags) {
      p.tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        detailTags.appendChild(span);
      });
    }
    
    // Links
    detailLinks.innerHTML = '';
    if (p.links && p.links.length) {
      p.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = '[' + link.label + ']';
        a.style.marginRight = '0.5em';
        a.target = '_blank';
        detailLinks.appendChild(a);
      });
    }
    
    // Sub-items
    if (p.subItems && p.subItems.length) {
      detailSubitems.style.display = '';
      subitemsList.innerHTML = '';
      p.subItems.forEach(si => {
        const div = document.createElement('div');
        div.className = 'sub-item';
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
        subitemsList.appendChild(div);
      });
    } else {
      detailSubitems.style.display = 'none';
    }
    
    detailPanel.classList.add('open');
  });
});

function closeDetail() {
  detailPanel.classList.remove('open');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDetail();
});

// Filtering
const filters = document.getElementById('filters');
const countDisplay = document.getElementById('count-display');
const filterItems = document.querySelectorAll('.filter-item');

// Click to toggle filter items
filterItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const input = item.querySelector('input');
    const value = input.value;
    const newState = !input.checked;
    
    // Update all filter items with the same value (for duplicates)
    filterItems.forEach(fi => {
      const fiInput = fi.querySelector('input');
      if (fiInput.value === value) {
        fiInput.checked = newState;
        fi.classList.toggle('active', newState);
      }
    });
    
    updateFilters();
  });
});

function updateFilters() {
  const checked = [...new Set(Array.from(filters.querySelectorAll('input:checked')).map(cb => cb.value))];
  const items = document.querySelectorAll('.marquee-item');
  let visibleCount = 0;
  
  items.forEach(item => {
    const tags = (item.dataset.tags || '').split(', ');
    const visible = checked.length > 0 && tags.some(tag => checked.includes(tag));
    item.classList.toggle('hidden', !visible);
    if (visible) visibleCount++;
  });
  
  countDisplay.textContent = `showing ${Math.floor(visibleCount / 2)} of ${allProjects.length} projects`;
}

function toggleAll(state) {
  filterItems.forEach(item => {
    const input = item.querySelector('input');
    input.checked = state;
    item.classList.toggle('active', state);
  });
  updateFilters();
}

updateFilters();
</script>
