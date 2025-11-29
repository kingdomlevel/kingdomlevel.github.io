---
layout: shamgate-layout
title: ascii
---

<style>
.ascii-timeline {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  background: #fff;
  padding: 1em;
  border: 1px solid #ccc;
  max-width: 800px;
}
.ascii-timeline .year-header {
  font-weight: bold;
  margin-top: 1.5em;
}
.ascii-timeline .project-line {
  margin-left: 2em;
}
.ascii-timeline .project-line:hover {
  background: #ffff99;
}
.ascii-timeline a {
  color: inherit;
}
.ascii-timeline pre {
  margin: 0;
  padding: 0;
}
.copy-btn {
  margin: 1em 0;
  padding: 0.5em 1em;
  cursor: pointer;
}
.stats {
  font-family: monospace;
  margin: 1em 0;
  padding: 1em;
  background: #f5f5f5;
  border: 1px dashed #999;
}
.ascii-filter {
  font-family: monospace;
  background: #fff;
  padding: 0;
  margin: 1em 0;
  border: 1px solid #ccc;
}
.ascii-filter label {
  cursor: pointer;
}
.ascii-filter label:hover {
  background: #ffff99;
}
.ascii-filter input[type="checkbox"] {
  display: none;
}
.ascii-filter button {
  font-family: monospace;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.ascii-filter button:hover {
  background: #ffff99;
}

/* Mobile styles */
@media (max-width: 600px) {
  .ascii-timeline {
    font-size: 11px;
    padding: 0.5em;
    max-width: 100%;
    overflow-x: auto;
  }
  
  .ascii-filter {
    font-size: 11px;
    overflow-x: auto;
  }
  
  .stats {
    font-size: 11px;
    overflow-x: auto;
  }
  
  .stats pre,
  .ascii-timeline pre {
    white-space: pre;
    overflow-x: auto;
  }
  
  .copy-btn {
    width: 100%;
    padding: 12px;
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .ascii-timeline,
  .ascii-filter,
  .stats {
    font-size: 9px;
  }
}
</style>

[← back to main page](/)

<pre class="ascii-filter" id="filters">
┌───────────────────────────────────────────────────────┐
│  FILTER BY TYPE                                       │
├───────────────────────────────────────────────────────┤
│  <label><input type="checkbox" value="music" checked>[X] music    </label> <label><input type="checkbox" value="code" checked>[X] code     </label> <label><input type="checkbox" value="work" checked>[X] work     </label>            │
│  <label><input type="checkbox" value="radio" checked>[X] radio    </label> <label><input type="checkbox" value="release" checked>[X] release  </label> <label><input type="checkbox" value="recording" checked>[X] recording</label>            │
│  <label><input type="checkbox" value="making" checked>[X] making   </label> <label><input type="checkbox" value="video" checked>[X] video    </label> <label><input type="checkbox" value="education" checked>[X] education</label>            │
│  <label><input type="checkbox" value="personal" checked>[X] personal </label>                                        │
├───────────────────────────────────────────────────────┤
│  <button type="button" onclick="toggleAll(true)">[SELECT ALL]</button>  <button type="button" onclick="toggleAll(false)">[CLEAR ALL]</button>  <span id="count-display"></span>                    │
└───────────────────────────────────────────────────────┘
</pre>

<button class="copy-btn" onclick="copyToClipboard()">📋 copy to clipboard</button>

<div class="stats">
{%- assign total = site.data.projects | size -%}
{%- assign ongoing = site.data.projects | where: "ongoing", true | size -%}
{%- assign all_years = "" -%}{%- for p in site.data.projects -%}{%- assign yr = p.start | slice: 0, 4 -%}{%- unless all_years contains yr -%}{%- assign all_years = all_years | append: yr | append: "," -%}{%- endunless -%}{%- endfor -%}{%- assign years_active = all_years | split: "," | size | minus: 1 -%}
<pre>
╔═══════════════════════════════════════════════════════╗
║  NIALL MORRIS - PROJECT STATISTICS                    ║
╠═══════════════════════════════════════════════════════╣
║  Total Projects: {{ total }}                                   ║
║  Ongoing: {{ ongoing }}                                           ║
║  Years Active: {{ years_active }}                                     ║
╚═══════════════════════════════════════════════════════╝
</pre>
</div>

<div class="ascii-timeline" id="ascii-content">
<pre>
┌───────────────────────────────────────────────────────┐
│  NIALL MORRIS - TIMELINE OF PROJECTS                  │
│  Generated: {{ "now" | date: "%Y-%m-%d" }}                                │
└───────────────────────────────────────────────────────┘
</pre>
{%- assign ongoing_projects = site.data.projects | where: "ongoing", true | sort: "start" | reverse -%}
{%- assign all_projects = site.data.projects | sort: "end" | reverse -%}
{%- assign sorted_projects = ongoing_projects -%}
{%- for project in all_projects -%}{%- unless project.ongoing -%}{%- assign sorted_projects = sorted_projects | push: project -%}{%- endunless -%}{%- endfor -%}
{%- assign current_year = "" -%}
{%- for project in sorted_projects -%}
{%- assign start_year = project.start | slice: 0, 4 -%}
{%- if project.ongoing -%}
{%- assign end_year = "now" -%}
{%- assign group_year = "ongoing" -%}
{%- elsif project.end -%}
{%- assign end_year = project.end | slice: 0, 4 -%}
{%- assign group_year = end_year -%}
{%- else -%}
{%- assign end_year = start_year -%}
{%- assign group_year = start_year -%}
{%- endif -%}
{%- if start_year == end_year -%}
{%- assign year_display = start_year -%}
{%- else -%}
{%- assign year_display = start_year | append: "-" | append: end_year -%}
{%- endif -%}
{%- if group_year != current_year -%}
{%- assign current_year = group_year %}
<pre class="year-block" data-year="{{ current_year }}">
═══════════════════════════════════════
  {{ current_year | upcase }}
═══════════════════════════════════════</pre>{%- endif -%}
<pre class="project-block" data-tags="{{ project.tags | join: ' ' }}">  │
  ├── {{ project.title }} ({{ year_display }}){%- if project.ongoing %} [ONGOING]{% endif %}{%- if project.image %} [📷]{% endif %}
  │   {{ project.description | truncate: 70 }}
  │   Tags: {% for tag in project.tags %}[{{ tag }}]{% unless forloop.last %} {% endunless %}{% endfor %}
{%- if project.links %}
  │   Links: {% for link in project.links %}{{ link.url }}{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}
{%- if project.sub_items %}
  │   Contains {{ project.sub_items | size }} items:
{%- for item in project.sub_items limit: 5 -%}
{%- assign item_year = item.date | slice: 0, 4 -%}
{%- assign item_month_num = item.date | slice: 5, 2 -%}
{%- case item_month_num -%}{%- when "01" -%}{%- assign item_month = "Jan" -%}{%- when "02" -%}{%- assign item_month = "Feb" -%}{%- when "03" -%}{%- assign item_month = "Mar" -%}{%- when "04" -%}{%- assign item_month = "Apr" -%}{%- when "05" -%}{%- assign item_month = "May" -%}{%- when "06" -%}{%- assign item_month = "Jun" -%}{%- when "07" -%}{%- assign item_month = "Jul" -%}{%- when "08" -%}{%- assign item_month = "Aug" -%}{%- when "09" -%}{%- assign item_month = "Sep" -%}{%- when "10" -%}{%- assign item_month = "Oct" -%}{%- when "11" -%}{%- assign item_month = "Nov" -%}{%- when "12" -%}{%- assign item_month = "Dec" -%}{%- else -%}{%- assign item_month = "" -%}{%- endcase %}
  │     • {{ item.title }}{% if item.date %} ({% if item_month %}{{ item_month }} {% endif %}{{ item_year }}){% endif %}{% if item.description %} — {{ item.description | truncate: 50 }}{% endif %}
{%- endfor %}
{%- if project.sub_items.size > 5 %}
  │     • ... and {{ project.sub_items.size | minus: 5 }} more
{%- endif %}
{%- endif %}</pre>{%- endfor %}
<pre>  │
  └── END OF TIMELINE
</pre>
</div>

---

e-mail: [niall@shamgate.co](mailto:niall@shamgate.co)<br/>thank you for visiting my website <3

<script>
function copyToClipboard() {
  const content = document.getElementById('ascii-content').innerText;
  navigator.clipboard.writeText(content).then(() => {
    const btn = document.querySelector('.copy-btn');
    const original = btn.textContent;
    btn.textContent = '✓ copied!';
    setTimeout(() => btn.textContent = original, 2000);
  });
}

// Filtering
const filters = document.getElementById('filters');
const countDisplay = document.getElementById('count-display');
const labels = filters.querySelectorAll('label');

// Update visual checkbox display
function updateCheckboxDisplay() {
  labels.forEach(label => {
    const input = label.querySelector('input');
    const text = label.textContent;
    const name = input.value;
    const pad = 9 - name.length; // align to fixed width
    label.innerHTML = `<input type="checkbox" value="${name}"${input.checked ? ' checked' : ''}>${input.checked ? '[X]' : '[ ]'} ${name}${' '.repeat(pad > 0 ? pad : 0)}`;
  });
}

// Click handler for labels
labels.forEach(label => {
  label.addEventListener('click', (e) => {
    e.preventDefault();
    const input = label.querySelector('input');
    input.checked = !input.checked;
    updateCheckboxDisplay();
    updateFilters();
  });
});

function updateFilters() {
  const checked = Array.from(filters.querySelectorAll('input:checked')).map(cb => cb.value);
  const items = document.querySelectorAll('.project-block');
  let visibleCount = 0;
  
  items.forEach(item => {
    const tags = (item.dataset.tags || '').split(' ');
    const visible = checked.length > 0 && tags.some(tag => checked.includes(tag));
    item.style.display = visible ? '' : 'none';
    if (visible) visibleCount++;
  });
  
  // Hide year headers with no visible projects
  document.querySelectorAll('.year-block').forEach(yearBlock => {
    const year = yearBlock.dataset.year;
    let hasVisible = false;
    let sibling = yearBlock.nextElementSibling;
    while (sibling && sibling.classList.contains('project-block')) {
      if (sibling.style.display !== 'none') {
        hasVisible = true;
        break;
      }
      sibling = sibling.nextElementSibling;
    }
    yearBlock.style.display = hasVisible ? '' : 'none';
  });
  
  countDisplay.textContent = `${visibleCount}/${items.length}`;
}

function toggleAll(state) {
  filters.querySelectorAll('input').forEach(cb => cb.checked = state);
  updateCheckboxDisplay();
  updateFilters();
}

updateFilters();
</script>
