document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.nav-button');
  let openAccordion = null;

  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Create or find the accordion container
      let accordion = button.nextElementSibling;
      if (!accordion || !accordion.classList.contains('accordion')) {
        accordion = document.createElement('div');
        accordion.classList.add('accordion');
        button.parentNode.insertBefore(accordion, button.nextSibling);
      }

      // If this accordion is already open, close it
      if (accordion === openAccordion) {
        accordion.classList.remove('open');
        openAccordion = null;
        return;
      }

      // Close any previously opened accordion
      if (openAccordion) {
        openAccordion.classList.remove('open');
      }

      // Fetch content for the button
      const url = button.parentElement.getAttribute('href');
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch content');
          return response.text();
        })
        .then((data) => {
          accordion.innerHTML = data;
          accordion.classList.add('open');
          openAccordion = accordion;
        })
        .catch((error) => {
          console.error(error);
          accordion.innerHTML = '<p>Content could not be loaded.</p>';
          accordion.classList.add('open');
          openAccordion = accordion;
        });
    });
  });
});
