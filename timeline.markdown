---
layout: shamgate-layout
title: timeline
---

<link rel="stylesheet" type="text/css" media="all" href="timeline.css" />

[← back to main page](/)

<details class="filter-section" open>
  <summary>filter by type</summary>
  <div class="filter-controls" id="filters">
    <label><input type="checkbox" value="music" checked> 🎶 music</label>
    <label><input type="checkbox" value="code" checked> 🧑‍💻 code</label>
    <label><input type="checkbox" value="work" checked> 💼 work</label>
    <label><input type="checkbox" value="radio" checked> 📻 radio</label>
    <label><input type="checkbox" value="release" checked> 💿 release</label>
    <label><input type="checkbox" value="recording" checked> 🎙️ recording</label>
    <label><input type="checkbox" value="making" checked> 🪡 making</label>
    <label><input type="checkbox" value="video" checked> 📹 video</label>
    <label><input type="checkbox" value="education" checked> 🎓 education</label>
    <label><input type="checkbox" value="personal" checked> 🏠 personal</label>

  </div>
  <p style="margin-top: 0.5em; font-size: 0.85em;">
    <button type="button" onclick="toggleAll(true)">select all</button>
    <button type="button" onclick="toggleAll(false)">clear all</button>
    <span id="count-display" style="margin-left: 1em;"></span>
  </p>
</details>

<div class="timeline" id="timeline">
{% assign ongoing_projects = site.data.projects | where: "ongoing", true | sort: "start" | reverse %}
{% assign all_projects = site.data.projects | sort: "end" | reverse %}
{% assign sorted_projects = ongoing_projects %}
{% for project in all_projects %}{% unless project.ongoing %}{% assign sorted_projects = sorted_projects | push: project %}{% endunless %}{% endfor %}
{% assign current_year = "" %}

{% for project in sorted_projects %}
  {% if project.ongoing %}
    {% assign project_year = "ongoing" %}
  {% elsif project.end %}
    {% assign project_year = project.end | slice: 0, 4 %}
  {% else %}
    {% assign project_year = project.start | slice: 0, 4 %}
  {% endif %}
  
  {% if project_year != current_year %}
    {% if current_year != "" %}
</div>
    {% endif %}
    {% assign current_year = project_year %}
<div class="year-section" data-year="{{ current_year }}">
  <h3 class="year-header">{{ current_year }}</h3>
  {% endif %}
  
  {% assign start_year = project.start | slice: 0, 4 %}
  {% if project.ongoing %}
    {% assign end_year = "now" %}
  {% elsif project.end %}
    {% assign end_year = project.end | slice: 0, 4 %}
  {% else %}
    {% assign end_year = start_year %}
  {% endif %}
  
  <div class="project-item" data-tags="{{ project.tags | join: ' ' }}">
    <div class="project-header">
      <span class="project-title">{{ project.title }}</span>
      <span class="project-date">
        {% if start_year == end_year %}
          {{ start_year }}
        {% else %}
          {{ start_year }}-{{ end_year }}
        {% endif %}
      </span>
      {% if project.ongoing %}<span class="project-ongoing">ongoing</span>{% endif %}
    </div>
    <p class="project-description">{{ project.description }}</p>
    {% if project.links %}
    <div class="project-links">
      {% for link in project.links %}
      <a href="{{ link.url }}">{{ link.label }}</a>
      {% endfor %}
    </div>
    {% endif %}
    {% if project.image or project.sub_items %}
    <details class="sub-items-section">
      <summary style="cursor: pointer; font-size: 0.85em; color: #666;">{% if project.sub_items %}{{ project.sub_items | size }} items{% else %}view image{% endif %}</summary>
      {% if project.image %}<img src="{{ project.image }}" alt="{{ project.title }}" style="max-width: 300px; margin: 0.5em 0; display: block;">{% endif %}
      {% if project.sub_items %}
      <ul style="margin: 0.5em 0 0 1em; padding: 0; font-size: 0.85em; list-style: none;">
        {% for item in project.sub_items %}{% assign item_year = item.date | slice: 0, 4 %}{% assign item_month_num = item.date | slice: 5, 2 %}{% case item_month_num %}{% when "01" %}{% assign item_month = "Jan" %}{% when "02" %}{% assign item_month = "Feb" %}{% when "03" %}{% assign item_month = "Mar" %}{% when "04" %}{% assign item_month = "Apr" %}{% when "05" %}{% assign item_month = "May" %}{% when "06" %}{% assign item_month = "Jun" %}{% when "07" %}{% assign item_month = "Jul" %}{% when "08" %}{% assign item_month = "Aug" %}{% when "09" %}{% assign item_month = "Sep" %}{% when "10" %}{% assign item_month = "Oct" %}{% when "11" %}{% assign item_month = "Nov" %}{% when "12" %}{% assign item_month = "Dec" %}{% else %}{% assign item_month = "" %}{% endcase %}
        <li style="margin-bottom: 0.25em;">• {% if item.url %}<a href="{{ item.url }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}{% if item.date %} ({% if item_month %}{{ item_month }} {% endif %}{{ item_year }}){% endif %}{% if item.description %} — <em>{{ item.description }}</em>{% endif %}</li>
        {% endfor %}
      </ul>
      {% endif %}
    </details>
    {% endif %}
    <div class="project-tags">
      {% for tag in project.tags %}
      <span class="tag tag-{{ tag }}">{% case tag %}{% when "music" %}🎶{% when "code" %}🧑‍💻{% when "work" %}💼{% when "radio" %}📻{% when "release" %}💿{% when "recording" %}🎙️{% when "making" %}🪡{% when "video" %}📹{% when "education" %}🎓{% endcase %} {{ tag }}</span>
      {% endfor %}
    </div>
  </div>
{% endfor %}
</div>
</div>

<script>
// Simple filtering script
const filters = document.getElementById('filters');
const timeline = document.getElementById('timeline');
const countDisplay = document.getElementById('count-display');

function updateFilters() {
  const checked = Array.from(filters.querySelectorAll('input:checked')).map(cb => cb.value);
  const items = timeline.querySelectorAll('.project-item');
  let visibleCount = 0;
  
  items.forEach(item => {
    const tags = item.dataset.tags.split(' ');
    const visible = checked.length > 0 && tags.some(tag => checked.includes(tag));
    item.classList.toggle('hidden', !visible);
    if (visible) visibleCount++;
  });
  
  // Hide empty year sections
  timeline.querySelectorAll('.year-section').forEach(section => {
    const visibleItems = section.querySelectorAll('.project-item:not(.hidden)');
    section.style.display = visibleItems.length ? '' : 'none';
  });
  
  countDisplay.textContent = `showing ${visibleCount} of ${items.length} projects`;
}

function toggleAll(state) {
  filters.querySelectorAll('input').forEach(cb => cb.checked = state);
  updateFilters();
}

filters.addEventListener('change', updateFilters);
updateFilters();
</script>
