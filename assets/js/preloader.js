(function () {
  document.documentElement.classList.add('pl-lock');
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  var minVisible = 1100;
  var start = Date.now();

  function hidePreloader() {
    var wait = Math.max(minVisible - (Date.now() - start), 0);
    setTimeout(function () {
      preloader.classList.add('pl-hidden');
      document.documentElement.classList.remove('pl-lock');
      setTimeout(function () { preloader.remove(); }, 750);
    }, wait);
  }

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 4000);
  }
})();
