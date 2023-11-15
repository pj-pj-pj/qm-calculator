/* eslint-disable import/no-cycle */
import fdtuUIinit from './ui-freq-dist';
import skewnessInit from './ui-skewness';
import simpCorreUIinit from './ui-simple-correlation';

// for the responsive sidebar, show on click then hide
const menuBtn = document.querySelector('nav #nav-button');
const sidebar = document.querySelector('aside');

function windowOnClick(event) {
  if (!sidebar.contains(event.target) && !menuBtn.contains(event.target) && !sidebar.classList.contains('hidden')) {
    sidebar.classList.add('hidden');
    window.removeEventListener('click', windowOnClick);
  }
}

menuBtn.onclick = () => {
  sidebar.classList.toggle('hidden');
  window.addEventListener('click', windowOnClick);
};
//

// add link to the logo of the website to homepage
// also set up the changing of page when a sidebar button is clicked
const homepage = document.querySelector('main').innerHTML;
const siteLogo = document.querySelector('header img');

const main = document.querySelector('main');
const sidebarsBtn = document.querySelectorAll('aside button');

// eslint-disable-next-line import/prefer-default-export
export function unchild(parent) {
  if (parent) {
    let child = parent.firstChild;
    while (child) {
      child.remove();
      child = parent.firstChild;
    }
  }
}

siteLogo.onclick = () => {
  unchild(main);
  main.innerHTML = homepage;
};

sidebarsBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    unchild(main);
  });
});

sidebarsBtn[0].addEventListener('click', fdtuUIinit);
sidebarsBtn[1].addEventListener('click', skewnessInit);
sidebarsBtn[2].addEventListener('click', simpCorreUIinit);
