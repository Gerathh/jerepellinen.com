document.addEventListener('DOMContentLoaded', function() {
  // Select all navigation links inside .topbar
  const links = document.querySelectorAll('.topbar a');
  let accordionContainer = null;
  let currentLink = null;

  // Create the accordion container dynamically and insert it between .topbar and .main-content
  function createAccordionContainer() {
    accordionContainer = document.createElement('div');
    accordionContainer.id = 'accordion-container';
    const container = document.querySelector('.container');
    const mainContent = document.querySelector('.main-content');
    container.insertBefore(accordionContainer, mainContent);
  }

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.getAttribute('href');

      // If no accordion container exists yet, create one
      if (!accordionContainer) {
        createAccordionContainer();
      }

      // If the same link is clicked and the accordion is open, toggle (close) it
      if (currentLink === url && accordionContainer.classList.contains('open')) {
        accordionContainer.classList.remove('open');
        // Optionally clear the content after the slide-up animation
        setTimeout(() => {
          accordionContainer.innerHTML = '';
        }, 500);
        currentLink = null;
        return;
      }

      // Otherwise, fetch the new content
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          accordionContainer.innerHTML = html;
          accordionContainer.classList.add('open');
          currentLink = url;
        })
        .catch(error => {
          console.error('Error loading content:', error);
          accordionContainer.innerHTML = '<p>Error loading content.</p>';
          accordionContainer.classList.add('open');
          currentLink = url;
        });
    });
  });
});
