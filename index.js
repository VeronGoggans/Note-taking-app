import { ApplicationController } from '/src/frontend/js/controller/applicationController.js';

document.addEventListener('DOMContentLoaded', () => {
    const appController = new ApplicationController();
  
    async function navigate(event) {
      event.preventDefault();
      const link = event.target.getAttribute('data-link');
      if (link) {
        await loadContent(link);
        history.pushState({}, '', `#${link}`);
      }
    }
  
    async function loadContent(route) {
      try {
        const response = await fetch(`/view/${route}`);
        if (response.ok) {
          const html = await response.text();
          document.getElementById('content').innerHTML = html;
          appController.routeChange(route);
        } else {
          document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
        }
      } catch (error) {
        document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
      }
    }
  
    async function loadInitialContent() {
      const path = window.location.hash.substring(1) || 'home';
      await loadContent(path);
    }
  
    document.querySelector('navigation').addEventListener('click', navigate);
    window.addEventListener('popstate', loadInitialContent);
  
    loadInitialContent();
  });