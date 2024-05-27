// based on code found at:
// https://stackoverflow.com/questions/55695667/adsense-injecting-style-tag-into-my-page-in-chrome
const flex = document.getElementById('__next');
const observer = new MutationObserver(function (mutations, observer) {
  flex.style.height = '';
});
observer.observe(flex, {
  attributes: true,
  attributeFilter: ['style']
});
