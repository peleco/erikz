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

// Prepara el morph sobre un item: el cuadro (proj-box) sube/baja a la barra, y el nombre
// del item (proj-title) viaja al título de la barra. Los dos tienen el mismo texto y la
// misma duración/easing en el CSS, así que se mueven juntos (el título se corre de lado
// para dejar sitio al back, no aparece ni desaparece).
function setMorph(hit, animateMove) {
  if (!hit || !hit.box) return;
  moveHighlight(hit.box, hit.item, animateMove);
  hit.box.classList.add('on');
  hit.box.style.viewTransitionName = 'proj-box';
  var name = hit.item.querySelector('.projects-home-item-name');
  if (name) name.style.viewTransitionName = 'proj-title';
}

// Ida (home -> proyecto): antes de capturar el estado viejo, dejamos el cuadro y el título
// colocados sobre el item de destino y con sus nombres de transición.
document.addEventListener('astro:before-preparation', function (e) {
  var from = e.from ? e.from.pathname : location.pathname;
  var to = e.to ? e.to.pathname : '';
  lastNav = { from: from, to: to };
  if (isHomePath(from) && isProjectPath(to)) {
    try { sessionStorage.setItem('fromHome', '1'); } catch (err) {}
    var hit = highlightForSlug(slugOf(to));
    setMorph(hit, hit && hit.box ? hit.box.classList.contains('on') : false);
  }
});

// La flecha de back: si venimos del home dentro de la misma sesión, usamos el historial
// (Astro restaura el scroll y anima la vuelta, y el morph inverso aterriza sobre el item
// visible). Si se llegó directo al proyecto, el link cae a "/" normal. Captura para
// adelantarnos al router de Astro y que no navegue a "/" además.
// Salida al home: reproducimos las fases inversas en la página del proyecto (contenido +
// back + canvas se van, el título vuelve a la izquierda) y recién ahí navegamos, para que
// la View Transition capture la barra ya vaciada. La bajada del cuadro la hace el router.
function startLeaving() {
  var title = document.querySelector('.topbar-title');
  var back = document.querySelector('.topbar-back');
  if (title && back) {
    var shift = title.offsetLeft - back.offsetLeft;
    if (shift > 0) title.style.setProperty('--title-shift', shift + 'px');
  }
  document.documentElement.classList.add('is-leaving');
  setTimeout(function () { history.back(); }, 550); // deja correr contenido/back/canvas + título
}

document.addEventListener('click', function (e) {
  var back = e.target.closest ? e.target.closest('a.topbar-back') : null;
  if (!back) return;
  var fromHome = false;
  try { fromHome = sessionStorage.getItem('fromHome') === '1'; } catch (err) {}
  if (fromHome && window.history.length > 1) {
    e.preventDefault();
    e.stopPropagation();
    startLeaving();
  }
}, true);

function clearMorphNames() {
  var box = document.querySelector('.projects-highlight');
  if (box) box.style.viewTransitionName = '';
  var names = document.querySelectorAll('.projects-home-item-name');
  for (var i = 0; i < names.length; i++) names[i].style.viewTransitionName = '';
}

// Llegada al proyecto (forward): dejamos el header en su estado "entrando" (título a la
// izquierda, back/divisor/canvas/contenido ocultos). Eso es lo que captura la View
// Transition; al terminar se quita la clase y todo anima a su lugar (ver CSS is-entering).
// Medimos cuánto tiene que correrse el título a la derecha (distancia del back al título).
function prepareProjectEntrance() {
  var title = document.querySelector('.topbar-title');
  var back = document.querySelector('.topbar-back');
  if (title && back) {
    var shift = title.offsetLeft - back.offsetLeft;
    if (shift > 0) title.style.setProperty('--title-shift', shift + 'px');
  }
  document.documentElement.classList.add('is-entering');
}

document.addEventListener('astro:after-swap', function () {
  if (!lastNav) return;
  if (isHomePath(lastNav.from) && isProjectPath(lastNav.to)) {
    prepareProjectEntrance();
  } else if (isProjectPath(lastNav.from) && isHomePath(lastNav.to)) {
    // Vuelta (proyecto -> home): colocamos el cuadro y el título sobre el item de origen
    // para que la barra baje a su sitio (morph inverso). is-returning retrasa la aparición
    // del home hasta que el cuadro llega (ver CSS).
    setMorph(highlightForSlug(slugOf(lastNav.from)), false);
    document.documentElement.classList.add('is-returning');
  }
});

// Al terminar la transición: limpiar nombres (para que el hover vuelva a lo normal) y
// quitar el estado "entrando" (dispara las etapas 3 y 4). Se hace en `finished`, no en
// page-load, que corre demasiado pronto y borraba el morph antes de capturar el estado.
function onTransitionEnd() {
  var reverse = lastNav && isProjectPath(lastNav.from) && isHomePath(lastNav.to);
  // Los elementos vivos no se pintan durante la transición (los reemplaza el snapshot). Si
  // cambiamos su estado en el mismo frame en que reaparecen, el navegador no ve el estado
  // de partida y las transiciones no arrancan. Con dos requestAnimationFrame dejamos que se
  // pinten una vez y luego: revelamos el header (entrada) o desvanecemos el cuadro (vuelta).
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.documentElement.classList.remove('is-entering');
      document.documentElement.classList.remove('is-returning');
      if (reverse) {
        var box = document.querySelector('.projects-highlight');
        if (box) box.classList.remove('on'); // el cuadro se desvanece al llegar a la lista
      }
      clearMorphNames();
    });
  });
}
document.addEventListener('astro:before-swap', function (e) {
  if (e.viewTransition && e.viewTransition.finished) {
    e.viewTransition.finished.finally(onTransitionEnd);
  }
});

// En cada página (inicial y tras cada navegación): arrancar canvas y montar el cuadro.
document.addEventListener('astro:page-load', function () {
  drawGrids();
  initHighlight();
});
