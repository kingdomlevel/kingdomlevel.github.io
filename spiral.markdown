---
layout: shamgate-layout
title: spiral
---

[← back to main page](/)

<style>
html, body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}

.spiral-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.spiral-text {
  position: relative;
  width: 90vmin;
  height: 90vmin;
  font-size: 11px;
  line-height: 1.4;
}

.spiral-item {
  position: absolute;
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: pointer;
  color: #ccc;
}

.spiral-item.active {
  color: #000;
  font-weight: bold;
  transform: scale(1.1);
  z-index: 10;
}

.spiral-item:hover {
  color: #666;
}

.spiral-item.active:hover {
  color: #000;
}

.detail-popup {
  position: fixed;
  bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 2px solid #000;
  padding: 1em 2em;
  max-width: 500px;
  text-align: center;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.detail-popup.visible {
  opacity: 1;
  pointer-events: auto;
}

.detail-popup .title {
  font-weight: bold;
  font-size: 1.2em;
}

.detail-popup .date {
  color: #666;
  font-size: 0.9em;
  margin: 0.3em 0;
}

.detail-popup .description {
  margin: 0.5em 0;
}

.detail-popup .links a {
  color: blue;
  margin: 0 0.5em;
}

.scroll-hint {
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  color: #999;
  font-size: 0.8em;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-5px); }
}

.filter-buttons {
  position: fixed;
  top: 1em;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: #fff;
  padding: 0.5em;
  border: 1px solid #ccc;
}

.filter-buttons button {
  margin: 2px;
  padding: 2px 6px;
  cursor: pointer;
  background: white;
  border: 1px solid #ccc;
  font-size: 0.8em;
}

.filter-buttons button.active {
  background: #333;
  color: white;
}

.spiral-item.filtered-out {
  opacity: 0.1;
  pointer-events: none;
}

/* Mobile styles */
@media (max-width: 600px) {
  .spiral-text {
    font-size: 9px;
  }
  
  .filter-buttons {
    top: auto;
    bottom: auto;
    position: relative;
    transform: none;
    left: auto;
    margin-bottom: 0.5em;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .detail-popup {
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    max-width: 100%;
    border-left: none;
    border-right: none;
    border-bottom: none;
    padding: 0.8em;
  }
  
  .detail-popup .description {
    font-size: 0.9em;
  }
  
  .scroll-hint {
    display: none;
  }
}
</style>

<div class="filter-buttons">
  <button class="filter-btn active" data-filter="all">all</button>
  <button class="filter-btn" data-filter="music">music</button>
  <button class="filter-btn" data-filter="code">code</button>
  <button class="filter-btn" data-filter="work">work</button>
  <button class="filter-btn" data-filter="radio">radio</button>
  <button class="filter-btn" data-filter="release">release</button>
  <button class="filter-btn" data-filter="recording">recording</button>
  <button class="filter-btn" data-filter="making">making</button>
  <button class="filter-btn" data-filter="video">video</button>
  <button class="filter-btn" data-filter="education">education</button>
  <button class="filter-btn" data-filter="personal">personal</button>
</div>

<div class="spiral-container">
  <div class="spiral-text" id="spiral"></div>
</div>

<div class="detail-popup" id="detail-popup">
  <div class="title"></div>
  <div class="date"></div>
  <div class="description"></div>
  <div class="links"></div>
</div>

<div class="scroll-hint">↕ scroll or hover to explore ↕</div>

<script>
const projects = [
{%- assign sorted_projects = site.data.projects | sort: "start" | reverse -%}
{%- for project in sorted_projects -%}
{%- if project.ongoing -%}
  {
    title: {{ project.title | jsonify }},
    description: {{ project.description | jsonify }},
    date: "ongoing",
    tags: {{ project.tags | jsonify }},
    links: [{% for link in project.links %}{ label: {{ link.label | jsonify }}, url: {{ link.url | jsonify }} }{% unless forloop.last %},{% endunless %}{% endfor %}]
  },
{%- endif -%}
{%- endfor -%}
{%- for project in sorted_projects -%}
{%- unless project.ongoing -%}
  {
    title: {{ project.title | jsonify }},
    description: {{ project.description | jsonify }},
    date: "{{ project.start | date: '%b %Y' }}{% if project.end != project.start %} – {{ project.end | date: '%b %Y' }}{% endif %}",
    tags: {{ project.tags | jsonify }},
    links: [{% for link in project.links %}{ label: {{ link.label | jsonify }}, url: {{ link.url | jsonify }} }{% unless forloop.last %},{% endunless %}{% endfor %}]
  },
{%- endunless -%}
{%- endfor -%}
];

const spiral = document.getElementById('spiral');
const popup = document.getElementById('detail-popup');
const scrollHint = document.querySelector('.scroll-hint');

// Create spiral layout - outside to inside (newest on outside)
const centerX = spiral.offsetWidth / 2;
const centerY = spiral.offsetHeight / 2;
const totalProjects = projects.length;
const maxRadius = Math.min(centerX, centerY) * 0.95;
const minRadius = 30;
const totalRotations = 5;

projects.forEach((project, i) => {
  const progress = i / totalProjects;
  // Reverse: start from outside (maxRadius) go to inside (minRadius)
  const angle = progress * totalRotations * 2 * Math.PI;
  const radius = maxRadius - (maxRadius - minRadius) * progress;
  
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
  
  const item = document.createElement('span');
  item.className = 'spiral-item';
  item.textContent = project.title;
  item.dataset.index = i;
  item.dataset.tags = project.tags.join(',');
  item.style.left = x + 'px';
  item.style.top = y + 'px';
  item.style.transform = `translate(-50%, -50%) rotate(${angle + Math.PI/2}rad)`;
  
  item.addEventListener('click', () => showDetail(i));
  item.addEventListener('mouseenter', () => showDetail(i));
  
  spiral.appendChild(item);
});

function showDetail(index) {
  const project = projects[index];
  popup.querySelector('.title').textContent = project.title;
  popup.querySelector('.date').textContent = project.date;
  popup.querySelector('.description').textContent = project.description;
  
  const linksHtml = project.links.map(l => `<a href="${l.url}">${l.label}</a>`).join(' ');
  popup.querySelector('.links').innerHTML = linksHtml;
  
  popup.classList.add('visible');
  
  // Update active state
  document.querySelectorAll('.spiral-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}

// Wheel-based highlighting (since body doesn't scroll)
let currentIndex = 0;
let scrollAccumulator = 0;
const scrollThreshold = 50; // pixels of wheel movement to change project

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollAccumulator += e.deltaY;
  
  const visibleItems = document.querySelectorAll('.spiral-item:not(.filtered-out)');
  
  if (Math.abs(scrollAccumulator) > scrollThreshold) {
    const direction = scrollAccumulator > 0 ? 1 : -1;
    let newIndex = currentIndex + direction;
    
    // Clamp to valid range
    newIndex = Math.max(0, Math.min(newIndex, visibleItems.length - 1));
    
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      const actualIndex = parseInt(visibleItems[currentIndex].dataset.index);
      showDetail(actualIndex);
    }
    
    scrollAccumulator = 0;
  }
  
  // Hide scroll hint after any wheel movement
  scrollHint.style.opacity = '0';
}, { passive: false });

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    document.querySelectorAll('.spiral-item').forEach(item => {
      if (filter === 'all') {
        item.classList.remove('filtered-out');
      } else {
        const tags = item.dataset.tags.split(',');
        item.classList.toggle('filtered-out', !tags.includes(filter));
      }
    });
    
    currentIndex = -1; // Reset to trigger update
  });
});

// Initialize with first project
showDetail(0);
</script>
