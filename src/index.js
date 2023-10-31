// for the responsive sidebar, show on click then hide
const calculatorsBtn = document.querySelector('nav #nav-button');
const sideBar = document.querySelector('aside');

function windowOnClick(event) {
  if (!sideBar.contains(event.target) && !calculatorsBtn.contains(event.target) && !sideBar.classList.contains('hidden')) {
    sideBar.classList.add('hidden');
    window.removeEventListener('click', windowOnClick);
  }
}

calculatorsBtn.onclick = () => {
  sideBar.classList.toggle('hidden');
  window.addEventListener('click', windowOnClick);
};
//
