---
layout: shamgate-layout
---

<div id="random-layout-container">
  <p style="text-align: center; color: #666;">loading a random view...</p>
</div>

<script>
(function() {
  const layouts = ['timeline', 'list', 'scroll', 'shuffle', 'ascii', 'dense'];
  const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
  
  fetch('/' + randomLayout + '/')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const body = doc.body;
      let content = body.innerHTML;
      
      // Remove the h1 since the homepage already has one from the layout
      content = content.replace(
        /<h1[^>]*>.*?<\/h1>/gi,
        ''
      );
      
      // Remove the markdown-style link
      content = content.replace(
        /\[← back to main page\]\(\/\)/g,
        ''
      );
      
      // Also handle the HTML-rendered version
      content = content.replace(
        /<a href="\/">← back to main page<\/a>/g,
        ''
      );
      
      // Add a footer note about other layouts
      content += `<p style="margin-top: 2em; text-align: center;"><em>viewing: ${randomLayout}</em> · <a href="/" onclick="location.reload(); return false;">🎲 refresh for a different layout</a></p>`;
      
      document.getElementById('random-layout-container').innerHTML = content;
      
      // Re-execute any scripts that were in the loaded content
      const scripts = document.getElementById('random-layout-container').querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    })
    .catch(err => {
      console.error('Failed to load random layout:', err);
      document.getElementById('random-layout-container').innerHTML = `
        <p>failed to load random view. try one of these:</p>
        <p><a href="/timeline/">timeline</a> · <a href="/list/">list</a> · <a href="/scroll/">scroll</a> · <a href="/shuffle/">shuffle</a> · <a href="/ascii/">ascii</a> · <a href="/dense/">dense</a></p>
      `;
    });
})();
</script>

