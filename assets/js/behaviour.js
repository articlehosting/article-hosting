/* eslint-disable */
function buildToggle() {
  const button = document.createElement('button');
  button.classList.add('see-more-toggle');
  button.innerText = 'See more';
  return button;
}

setTimeout(() => {
  const captions = document.getElementsByClassName('caption-text__body');
  [...captions].forEach((caption) => {
    const { innerHTML } = caption;
    const maxChar = 200;

    if (innerHTML.length > maxChar) {
      const teaser = innerHTML.slice(0, maxChar);
      const rest = innerHTML.slice(maxChar, innerHTML.length);
      caption.innerHTML = teaser + '...';
      const toggleBtn = buildToggle();
      caption.parentElement.appendChild(toggleBtn);

      toggleBtn.addEventListener('click', () => {
        if (toggleBtn.classList.contains('toggled')) {
          caption.innerHTML = teaser + '...';
          toggleBtn.classList.remove('toggled');
          toggleBtn.innerText = 'See more';
        } else {
          caption.innerHTML = teaser + rest;
          toggleBtn.classList.add('toggled');
          toggleBtn.innerText = 'See less';
        }
      });
    }
  });
}, 0);
