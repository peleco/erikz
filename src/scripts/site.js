// Interacción del sitio: el motor de canvas + el cuadro amarillo único que sigue la
// atención en la lista del home, y el enganche con el router de Astro para el morph
// cuadro <-> barra del proyecto.
import { drawGrids } from './grid.js';

var REM = 16; // 1rem = 16px (html font-size: 1em)
var INSET = 1.25 * REM; // sangrado del cuadro a cada lado, igual que la barra del proyecto

function slugOf(pathname) {
  var seg = (pathname || '').split('?')[0].split('#')[0].replace(/\/$/, '').split('/').pop() || '';
  return seg.replace(/\.html$/i, '').toLowerCase();
}
function isHomePath(p) { return p === '/' || p === '' || /\/index(\.html)?$/.test(p); }
function isProjectPath(p) { return /^\/projects\//.test(p); }

// Coloca el cuadro amarillo sobre un item de la lista (mismo sangrado que la barra).
function placeHighlight(box, item) {
  box.style.width = (item.offsetWidth + INSET * 2) + 'px';
  box.style.height = (item.offsetHeight + 2) + 'px';
  box.style.transform = 'translate(' + (item.offsetLeft - INSET) + 'px,' + (item.offsetTop - 1) + 'px)';
}
// Mueve el cuadro; si animate es false, salta sin transición (primer hover / reposición).
function moveHighlight(box, item, animate) {
  if (!animate) {
    var prev = box.style.transition;
    box.style.transition = 'none';
    placeHighlight(box, item);
    void box.offsetWidth; // fuerza reflow para que el salto no se anime
    box.style.transition = prev;
  } else {
    placeHighlight(box, item);
  }
}

// El cuadro amarillo de la lista del home: uno solo, sigue el mouse y el foco de teclado.
function initHighlight() {
  var list = document.querySelector('.projects-list');
  if (!list) return;
  var box = list.querySelector('.projects-highlight');
  var items = list.querySelectorAll('.projects-home-item');
  if (!box || !items.length) return;

  function activate(item) {
    var wasOn = box.classList.contains('on');
    moveHighlight(box, item, wasOn); // si ya estaba visible, se desliza; si no, salta
    box.classList.add('on');
  }
  function deactivate() {
    box.classList.remove('on'); // se desvanece en su sitio (estela lenta)
  }

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('mouseenter', function () { activate(this); });
    items[i].addEventListener('focusin', function () { activate(this); });
  }
  list.addEventListener('mouseleave', deactivate);
  list.addEventListener('focusout', function (e) {
    if (!list.contains(e.relatedTarget)) deactivate();
  });
}

// --- Enganche con las transiciones de Astro (router same-document) -------------------
// Solo el cuadro amarillo hace morph (view-transition-name: proj-box): en la lista es el
// cuadro del hover, en el proyecto es la barra del header. El resto entra con el fade que
// el router aplica por defecto. Así no hay dos grupos que sincronizar ni saltos.

function highlightForSlug(slug) {
  var list = document.querySelector('.projects-list');
  if (!list) return null;
  var items = list.querySelectorAll('.projects-home-item');
  for (var i = 0; i < items.length; i++) {
    if (slugOf(items[i].getAttribute('href')) === slug) {
      return { box: list.querySelector('.projects-highlight'), item: items[i] };
    }
  }
  return null;
}

// En navegación same-document document.referrer no se actualiza, así que guardamos el
// origen y destino de cada navegación aquí para usarlos en la vuelta (after-swap no los trae).
var lastNav = null;

// Ida (home -> proyecto): antes de capturar el estado viejo, dejamos el cuadro colocado
// sobre el item de destino y con el nombre de transición, para que suba a la barra.
document.addEventListener('astro:before-preparation', function (e) {
  var from = e.from ? e.from.pathname : location.pathname;
  var to = e.to ? e.to.pathname : '';
  lastNav = { from: from, to: to };
  if (isHomePath(from) && isProjectPath(to)) {
    try { sessionStorage.setItem('fromHome', '1'); } catch (err) {}
    var hit = highlightForSlug(slugOf(to));
    if (hit && hit.box) {
      moveHighlight(hit.box, hit.item, hit.box.classList.contains('on'));
      hit.box.classList.add('on');
      hit.box.style.viewTransitionName = 'proj-box';
    }
  }
});

// La flecha de back: si venimos del home dentro de la misma sesión, usamos el historial
// (Astro restaura el scroll y anima la vuelta, y el morph inverso aterriza sobre el item
// visible). Si se llegó directo al proyecto, el link cae a "/" normal. Captura para
// adelantarnos al router de Astro y que no navegue a "/" además.
document.addEventListener('click', function (e) {
  var back = e.target.closest ? e.target.closest('a.topbar-back') : null;
  if (!back) return;
  var fromHome = false;
  try { fromHome = sessionStorage.getItem('fromHome') === '1'; } catch (err) {}
  if (fromHome && window.history.length > 1) {
    e.preventDefault();
    e.stopPropagation();
    history.back();
  }
}, true);

function clearHighlightName() {
  var box = document.querySelector('.projects-highlight');
  if (box) box.style.viewTransitionName = '';
}

// Vuelta (proyecto -> home): el DOM del home ya está vivo; colocamos el cuadro sobre el
// item de origen y le damos el nombre, para que la barra baje a su sitio (morph inverso).
document.addEventListener('astro:after-swap', function () {
  if (!lastNav || !isProjectPath(lastNav.from) || !isHomePath(lastNav.to)) return;
  var hit = highlightForSlug(slugOf(lastNav.from));
  if (hit && hit.box) {
    moveHighlight(hit.box, hit.item, false);
    hit.box.classList.add('on');
    hit.box.style.viewTransitionName = 'proj-box';
  }
});

// El nombre de transición se limpia CUANDO la transición termina (no en page-load, que
// corre demasiado pronto y borraba el morph inverso antes de que se capturara el estado
// nuevo). Así el hover vuelve a funcionar normal después de cada navegación.
document.addEventListener('astro:before-swap', function (e) {
  if (e.viewTransition && e.viewTransition.finished) {
    e.viewTransition.finished.finally(clearHighlightName);
  }
});

// En cada página (inicial y tras cada navegación): arrancar canvas y montar el cuadro.
document.addEventListener('astro:page-load', function () {
  drawGrids();
  initHighlight();
});
