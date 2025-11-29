---
layout: shamgate-layout
title: dense
---

[← back to main page](/)

<style>
#dense-container {
  line-height: 1.6;
  text-align: justify;
}

.dense-project {
  display: inline;
  cursor: pointer;
}

.dense-project .title {
  font-weight: bold;
}

.dense-project .desc {
  color: #666;
}

.dense-project .details {
  display: none;
  background: #ffffcc;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ccc;
}

.dense-project:hover {
  background: #ffffcc;
}

.dense-project:hover .desc {
  color: #333;
}

.dense-project.expanded .details {
  display: block;
}

.dense-project .links a {
  color: blue;
  margin-right: 8px;
}

.filter-buttons {
  margin-bottom: 16px;
}

.filter-buttons button {
  margin: 2px;
  padding: 2px 6px;
  cursor: pointer;
  background: white;
  border: 1px solid #ccc;
}

.filter-buttons button.active {
  background: #333;
  color: white;
}

.dense-project.filtered-out {
  display: none;
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

---

<div id="dense-container">
{%- assign sorted_projects = site.data.projects | sort: "start" | reverse -%}
{%- for project in sorted_projects -%}
{%- if project.ongoing -%}
<span class="dense-project" data-tags="{{ project.tags | join: ',' }}" onclick="this.classList.toggle('expanded')"><span class="title">{{ project.title }}</span> <span class="desc">(ongoing) {{ project.description }}</span>{% if project.links or project.sub_items %}<span class="details">{% if project.image %}<img src="{{ project.image }}" style="max-width: 200px; display: block; margin-bottom: 8px;">{% endif %}{% if project.sub_items %}<br>{% for item in project.sub_items %}• {{ item.title }} ({{ item.date | date: "%b %Y" }}){% if item.description %} — {{ item.description }}{% endif %}<br>{% endfor %}{% endif %}{% if project.links %}<span class="links">{% for link in project.links %}<a href="{{ link.url }}">{{ link.label }}</a>{% endfor %}</span>{% endif %}</span>{% endif %}</span> {%- endif -%}
{%- endfor -%}
{%- for project in sorted_projects -%}
{%- unless project.ongoing -%}
<span class="dense-project" data-tags="{{ project.tags | join: ',' }}" onclick="this.classList.toggle('expanded')"><span class="title">{{ project.title }}</span> <span class="desc">{{ project.description }}</span>{% if project.links or project.sub_items %}<span class="details">{% if project.image %}<img src="{{ project.image }}" style="max-width: 200px; display: block; margin-bottom: 8px;">{% endif %}{% if project.sub_items %}<br>{% for item in project.sub_items %}• {{ item.title }} ({{ item.date | date: "%b %Y" }}){% if item.description %} — {{ item.description }}{% endif %}<br>{% endfor %}{% endif %}{% if project.links %}<span class="links">{% for link in project.links %}<a href="{{ link.url }}">{{ link.label }}</a>{% endfor %}</span>{% endif %}</span>{% endif %}</span> {%- endunless -%}
{%- endfor -%}
</div>

<script>
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.dense-project').forEach(p => {
      if (filter === 'all') {
        p.classList.remove('filtered-out');
      } else {
        const tags = p.dataset.tags.split(',');
        p.classList.toggle('filtered-out', !tags.includes(filter));
      }
    });
  });
});
</script>
