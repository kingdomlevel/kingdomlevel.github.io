---
layout: shamgate-layout
title: spin
---

[← back to main page](/)

<style>
body {
  overflow-x: hidden;
}

.spin-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2em 1em;
  position: relative;
}

.spin-project {
  opacity: 0;
  margin: 4em 0;
  padding: 1.5em;
  border: 3px solid #000;
  background: #fff;
  position: relative;
  cursor: crosshair;
}

.spin-project.visible {
  opacity: 1;
  animation: spin-in 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes spin-in {
  0% { 
    transform: rotate(calc(180deg + var(--final-rotate, 0deg))); 
    opacity: 0;
  }
  100% { 
    transform: rotate(var(--final-rotate, 0deg)); 
    opacity: 1;
  }
}

/* Random positioning offsets */
.spin-project:nth-child(4n) { margin-left: 15%; }
.spin-project:nth-child(6n) { margin-right: 20%; margin-left: auto; width: 70%; }
.spin-project:nth-child(10n) { border-style: dashed; }
.spin-project:nth-child(13n) { border-radius: 50%; padding: 3em; text-align: center; }
.spin-project:nth-child(8n) { border-width: 8px; }

.spin-project .title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 0.3em;
}

.spin-project .date {
  font-size: 0.85em;
  color: #666;
  margin-bottom: 0.5em;
}

.spin-project .description {
  margin-bottom: 0.5em;
}

.spin-project .tags {
  font-size: 0.8em;
  color: #999;
}

.spin-project .links {
  margin-top: 0.5em;
}

.spin-project .links a {
  color: blue;
  margin-right: 0.5em;
}

.spin-project .sub-items {
  margin-top: 0.5em;
  padding-left: 1em;
  border-left: 2px solid currentColor;
  font-size: 0.9em;
}

.spin-project .sub-item {
  margin: 0.3em 0;
}

.spin-project img {
  max-width: 150px;
  margin-top: 0.5em;
  transition: transform 0.3s;
}

.spin-project:hover img {
  animation: img-spin 1s linear infinite;
}

@keyframes img-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin-project.filtered-out {
  display: none;
}

.filter-buttons {
  text-align: center;
  margin-bottom: 2em;
  position: sticky;
  top: 0;
  background: #fff;
  padding: 1em 0;
  z-index: 100;
}

.filter-buttons button {
  margin: 2px;
  padding: 4px 8px;
  cursor: pointer;
  background: white;
  border: 2px solid #000;
  transition: all 0.2s;
  font-family: monospace;
}

.filter-buttons button:hover {
  animation: btn-shake 0.3s infinite;
  background: #ff0;
}

@keyframes btn-shake {
  0%, 100% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(-3px) rotate(-5deg); }
  75% { transform: translateX(3px) rotate(5deg); }
}

.filter-buttons button.active {
  background: #000;
  color: #fff;
  transform: scale(1.1);
}

/* Mobile styles */
@media (max-width: 600px) {
  .spin-container {
    padding: 1em 0.5em;
  }
  
  .spin-project {
    margin: 2em 0;
    padding: 1em;
  }
  
  /* Disable random positioning on mobile - too chaotic */
  .spin-project:nth-child(4n),
  .spin-project:nth-child(6n) {
    margin-left: 0;
    margin-right: 0;
    width: auto;
  }
  
  /* Smaller circular ones */
  .spin-project:nth-child(13n) {
    border-radius: 20px;
    padding: 1em;
  }
  
  .spin-project .title {
    font-size: 1em;
  }
  
  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
    padding: 0.5em;
  }
  
  .filter-buttons button {
    padding: 6px 10px;
    font-size: 12px;
  }
  
  /* Disable shake on mobile - annoying */
  .filter-buttons button:hover {
    animation: none;
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

<div class="spin-container">
{%- assign sorted_projects = site.data.projects | sort: "start" | reverse -%}
{%- for project in sorted_projects -%}
{%- if project.ongoing -%}
<div class="spin-project" data-tags="{{ project.tags | join: ',' }}">
  <div class="title">{{ project.title }}</div>
  <div class="date">ongoing · started {{ project.start | date: "%b %Y" }}</div>
  <div class="description">{{ project.description }}</div>
  <div class="tags">{{ project.tags | join: " · " }}</div>
  {% if project.image %}<img src="{{ project.image }}" alt="">{% endif %}
  {% if project.sub_items %}<div class="sub-items">{% for item in project.sub_items %}<div class="sub-item">• {{ item.title }} ({{ item.date | date: "%b %Y" }}){% if item.description %} — {{ item.description }}{% endif %}</div>{% endfor %}</div>{% endif %}
  {% if project.links %}<div class="links">{% for link in project.links %}<a href="{{ link.url }}">{{ link.label }}</a>{% endfor %}</div>{% endif %}
</div>
{%- endif -%}
{%- endfor -%}
{%- for project in sorted_projects -%}
{%- unless project.ongoing -%}
<div class="spin-project" data-tags="{{ project.tags | join: ',' }}">
  <div class="title">{{ project.title }}</div>
  <div class="date">{{ project.start | date: "%b %Y" }}{% if project.end != project.start %} – {{ project.end | date: "%b %Y" }}{% endif %}</div>
  <div class="description">{{ project.description }}</div>
  <div class="tags">{{ project.tags | join: " · " }}</div>
  {% if project.image %}<img src="{{ project.image }}" alt="">{% endif %}
  {% if project.sub_items %}<div class="sub-items">{% for item in project.sub_items %}<div class="sub-item">• {{ item.title }} ({{ item.date | date: "%b %Y" }}){% if item.description %} — {{ item.description }}{% endif %}</div>{% endfor %}</div>{% endif %}
  {% if project.links %}<div class="links">{% for link in project.links %}<a href="{{ link.url }}">{{ link.label }}</a>{% endfor %}</div>{% endif %}
</div>
{%- endunless -%}
{%- endfor -%}
</div>

<script>
// Random colors and rotation for each project
document.querySelectorAll('.spin-project').forEach((el, i) => {
  // Random border color
  el.style.borderColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
  
  // Random final rotation between -8 and 8 degrees
  const rotation = (Math.random() - 0.5) * 16;
  el.style.setProperty('--final-rotate', `${rotation}deg`);
  
  // Slight stagger delay
  el.style.setProperty('--delay', `${i * 0.05}s`);
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.spin-project').forEach(el => {
  observer.observe(el);
});

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    document.querySelectorAll('.spin-project').forEach(p => {
      if (filter === 'all') {
        p.classList.remove('filtered-out');
        p.classList.remove('visible');
        setTimeout(() => observer.observe(p), 50);
      } else {
        const tags = p.dataset.tags.split(',');
        if (tags.includes(filter)) {
          p.classList.remove('filtered-out');
          p.classList.remove('visible');
          setTimeout(() => observer.observe(p), 50);
        } else {
          p.classList.add('filtered-out');
        }
      }
    });
  });
});
</script>
