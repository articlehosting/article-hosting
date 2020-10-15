/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
function buildToggle() {
  const button = document.createElement('button');
  button.classList.add('see-more-toggle');
  button.innerText = 'See more';
  return button;
}

setTimeout(() => {
  const captions = document.getElementsByClassName('figcaptioned-asset');
  console.log(captions.length);
  [...captions].forEach((caption) => {
    const { innerText } = caption;
    if (innerText.length > 200) {
      const teaser = innerText.slice(0, 200);
      const rest = innerText.slice(200, innerText.length);
      caption.innerText = teaser;
      const toggleBtn = buildToggle();
      caption.parentElement.appendChild(toggleBtn);

      toggleBtn.addEventListener('click', () => {
        if (toggleBtn.classList.contains('toggled')) {
          caption.innerText = teaser;
          toggleBtn.classList.remove('toggled');
          toggleBtn.innerText = 'See more';
        } else {
          caption.innerText = teaser + rest;
          toggleBtn.classList.add('toggled');
          toggleBtn.innerText = 'See less';
        }
      });
    }
  });
}, 0);
