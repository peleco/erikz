// Interacción del sitio: el motor de canvas + el cuadro amarillo único que sigue la
// atención en la lista del home, y el enganche con el router de Astro para el morph
// cuadro <-> barra del proyecto.
import { drawGrids } from './grid.js';
import { navigate } from 'astro:transitions/client';

var REM = 16; // 1rem = 16px (html font-size: 1em)
var INSET = 1.25 * REM; // sangrado del cuadro a cada lado, igual que la barra del proyecto

function slugOf(pathname) {
  var seg = (pathname || '').split('?')[0].split('#')[0].replace(/\/$/, '').split('/').pop() || '';
  return seg.replace(/\.html$/i, '').toLowerCase();
}
function isHomePath(p) { return p === '/' || p === '' || /\/index(\.html)?$/.test(p); }
function isProjectPath(p) { return /^\/projects\//.test(p); }

// Coloca el cuadro amarillo sobre un item de la lista. Mismas dimensiones EXACTAS que la
// barra del header (item = 79px = barra), así el morph es un desplazamiento puro, sin
// cambio de tamaño: se mueve idéntico al título. Las líneas las tapa la clase box-target,
// no el sobre-tamaño, así que no hace falta el +2 / -1 de antes.
function placeHighlight(box, item) {
  box.style.width = (item.offsetWidth + INSET * 2) + 'px';
  box.style.height = item.offsetHeight + 'px';
  box.style.transform = 'translate(' + (item.offsetLeft - INSET) + 'px,' + item.offsetTop + 'px)';
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

  var current = null;
  function markTarget(item) {
    for (var i = 0; i < items.length; i++) items[i].classList.remove('box-target');
    if (item) item.classList.add('box-target'); // solo mientras el cuadro está sobre el item
  }
  function activate(item) {
    if (item === current) return;
    current = item;
    var wasOn = box.classList.contains('on');
    moveHighlight(box, item, wasOn); // si ya estaba visible, se desliza; si no, salta
    box.classList.add('on');
    markTarget(item);
  }
  function deactivate() {
    current = null;
    box.classList.remove('on'); // se desvanece en su sitio (estela lenta)
    markTarget(null); // las líneas vuelven cuando el cuadro se va
  }

  // Activamos con el MOVIMIENTO real del puntero (pointermove), no con mouseenter: cuando el
  // home reaparece bajo un cursor quieto el navegador dispara un mouseenter sintético que
  // movía la barra sola. Con pointermove, un mouse quieto no hace nada hasta que se mueve.
  list.addEventListener('pointermove', function (e) {
    // Durante una transición (saliendo al proyecto o volviendo) la barra está comprometida
    // con un item; ignoramos el hover para que no se mueva a otros proyectos.
    var cl = document.documentElement.classList;
    if (cl.contains('is-leaving-home') || cl.contains('is-returning')) return;
    var item = e.target.closest ? e.target.closest('.projects-home-item') : null;
    if (item) activate(item);
  });
  list.addEventListener('pointerleave', deactivate);
  // Teclado: el foco sí activa de inmediato (es intencional).
  list.addEventListener('focusin', function (e) {
    var item = e.target.closest ? e.target.closest('.projects-home-item') : null;
    if (item) activate(item);
  });
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
    // Fijamos el cuadro en el item de forma INSTANTÁNEA (como en la bajada), no con la
    // animación de hover: si venías moviéndote y clicaste rápido, el cuadro podía estar aún
    // en camino y la transición lo capturaba corrido, haciéndolo llegar tarde vs el título.
    setMorph(hit, false);
  }
});

// La flecha de back: si venimos del home dentro de la misma sesión, usamos el historial
// (Astro restaura el scroll y anima la vuelta, y el morph inverso aterriza sobre el item
// visible). Si se llegó directo al proyecto, el link cae a "/" normal. Captura para
// adelantarnos al router de Astro y que no navegue a "/" además.
// Salida al home: reproducimos las fases inversas en la página del proyecto (contenido +
// back + canvas se van) y recién ahí navegamos, para que la View Transition capture la barra
// ya vaciada. La bajada del cuadro + título (juntos, directo) la hace el router.
function startLeaving() {
  document.documentElement.classList.add('is-leaving');
  setTimeout(function () { history.back(); }, 550); // deja correr el fade de contenido/back/canvas
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

// Salida del home (forward): al hacer click en un proyecto, primero desaparece el resto de
// la página (queda solo el cuadro + el nombre del item), y con el mismo delay que la vuelta
// arranca la subida. Interceptamos en captura para adelantarnos al router y navegar nosotros.
document.addEventListener('click', function (e) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return; // dejar abrir en pestaña
  var link = e.target.closest ? e.target.closest('a.projects-home-item') : null;
  if (!link) return;
  var href = link.getAttribute('href');
  if (!href || href.indexOf('/projects/') !== 0) return;
  e.preventDefault();
  e.stopPropagation();
  var list = document.querySelector('.projects-list');
  var box = list && list.querySelector('.projects-highlight');
  if (box) { moveHighlight(box, link, box.classList.contains('on')); box.classList.add('on'); }
  link.classList.add('is-leaving-target');
  document.documentElement.classList.add('is-leaving-home');
  setTimeout(function () { navigate(href); }, 550);
}, true);

function clearMorphNames() {
  var box = document.querySelector('.projects-highlight');
  if (box) box.style.viewTransitionName = '';
  var names = document.querySelectorAll('.projects-home-item-name');
  for (var i = 0; i < names.length; i++) names[i].style.viewTransitionName = '';
}

// Llegada al proyecto (forward): dejamos el header en su estado "entrando"
// (back/divisor/canvas/contenido ocultos). Eso es lo que captura la View Transition; el
// título viaja directo a su posición final junto con el cuadro. Al terminar se quita la
// clase y back/canvas/contenido aparecen (ver CSS is-entering).
function prepareProjectEntrance() {
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
    var hit = highlightForSlug(slugOf(lastNav.from));
    setMorph(hit, false);
    if (hit && hit.item) hit.item.classList.add('is-here'); // líneas ocultas hasta el final
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
        var here = document.querySelector('.projects-home-item.is-here');
        if (here) here.classList.remove('is-here'); // las líneas aparecen con su fade (1s)
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
