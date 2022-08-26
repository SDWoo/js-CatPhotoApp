import { throttling } from './throttle.js';

const throttler = throttling();

export function scrollFetch(fetchData) {
  // fetchData 콜백 함수를 이용한다.
  window.addEventListener('scroll', () => {
    throttler.throttle(() => {
      console.log('Active Scroll Event');
      if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
      fetchData();
    }, 700);
  });
}

function getScrollTop() {
  return window.scrollY !== undefined
    ? window.scrollY
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}

function getDocumentHeight() {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}
