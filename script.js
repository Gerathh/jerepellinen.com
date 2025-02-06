document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.nav-button');
  let activeAccordion = null;

  buttons.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const url = this.getAttribute('href');
      let accordion = this.nextElementSibling;

      // Create accordion if it doesn't exist
      if (!accordion || !accordion.classList.contains('accordion')) {
        accordion = document.createElement('div');
        accordion.classList.add('accordion');
        this.parentNode.insertBefore(accordion, this.nextSibling);
      }

      // Toggle accordion visibility
      if (activeAccordion === accordion) {
        accordion.classList.remove('open');
        activeAccordion = null;
        return;
      }

      if (activeAccordion) {
        activeAccordion.classList.remove('open');
      }

      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          accordion.innerHTML = data;
          accordion.classList.add('open');
          activeAccordion = accordion;
        })
        .catch(() => {
          accordion.innerHTML = '<p>Could not load content.</p>';
          accordion.classList.add('open');
          activeAccordion = accordion;
        });
    });
  });
});
