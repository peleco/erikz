//Coded by Erik Zitzermann www.erikz.info

// Motor de la rejilla de triángulos. Reusable: recibe un canvas y el número de
// columnas/filas. El módulo mide siempre 110x110, así que el tamaño del triángulo es
// el mismo en cualquier canvas (home, header de proyecto, etc.).
function initGrid(canvas, modulesColumns, modulesgridRow, moduloSize) {
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  var moduloW = moduloSize || 110;
  var moduloH = moduloSize || 110;

  var listaModulosTipos = [];
  var listaOpacitySpeeds = [];
  var listaOpacityFlags = [];
  var listaOpacity1 = [];
  var listaOpacity2 = [];

  var requestAnimationFrame = window.requestAnimationFrame;

  function Modulo (col, row, opacity1, opacity2, modtype) {
    var gridColumn = col;
    var gridRow = row;
    var moduloOpacity1 = opacity1;
    var moduloOpacity2 = opacity2;
    var moduloType = modtype;

    switch (moduloType) {
      case 0:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo((moduloW)+moduloW*gridColumn, moduloH*gridRow);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo((moduloW)+moduloW*gridColumn, (moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;

      case 1:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo((moduloW)+moduloW*gridColumn, (moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo((moduloW)+moduloW*gridColumn, moduloH*gridRow);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;

      case 2:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW, (moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;

      case 3:
        ctx.beginPath();
        ctx.moveTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW, (moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW/2)+moduloW*gridColumn,(moduloH/2)+moduloH*gridRow);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;

      case 4:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;

      case 5:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;

      case 6:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();
        break;

      case 7:
        ctx.beginPath();
        ctx.moveTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;

      case 8:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity1 +")";
        ctx.fill();
        break;

      case 9:
        ctx.beginPath();
        ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
        ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
        ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
        ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
        ctx.fill();
        break;
    }
  }

  var opacityAnimation1 = 0;
  var opacityAnimation2 = 1;
  var opacityFlag = true;

  function createGrid () {
    for (var gridRow=0; gridRow<modulesgridRow; gridRow++) {
      for (var gridColumn=0; gridColumn<modulesColumns; gridColumn++) {
        var randomModulo = Math.floor(Math.random() * 10);
        listaModulosTipos.push(randomModulo);

        var opacitySpeed = .07/(10+(Math.random()*30));
        listaOpacitySpeeds.push(opacitySpeed);

        listaOpacityFlags.push(opacityFlag);
        listaOpacity1.push(opacityAnimation1);
        listaOpacity2.push(opacityAnimation2);

        Modulo(gridColumn,gridRow,opacityAnimation1,opacityAnimation2,randomModulo);
      }
    }
    animacionModulos();
  }

  function animacionModulos () {
    ctx.clearRect(0, 0, W, H);
    var i = 0;
    for (var gridRow=0; gridRow<modulesgridRow; gridRow++) {
      for (var gridColumn=0; gridColumn<modulesColumns; gridColumn++) {
        Modulo(gridColumn,gridRow,listaOpacity1[i],listaOpacity2[i],listaModulosTipos[i]);

        if ((listaOpacity1[i]) <= 0) {
          listaOpacityFlags[i] = true;
        } else if ((listaOpacity1[i]) >= 1) {
          listaOpacityFlags[i] = false;
        }
        if (listaOpacityFlags[i] == true) {
          opacityAnimation1 = listaOpacity1[i] + listaOpacitySpeeds[i];
          opacityAnimation2 = listaOpacity2[i] - listaOpacitySpeeds[i];
        } else {
          opacityAnimation1 = listaOpacity1[i] - listaOpacitySpeeds[i];
          opacityAnimation2 = listaOpacity2[i] + listaOpacitySpeeds[i];
        }
        listaOpacity1[i] = opacityAnimation1;
        listaOpacity2[i] = opacityAnimation2;

        i ++;
      }
    }
    requestAnimationFrame(animacionModulos);
  }

  createGrid();
}

function drawGrids() {
  // Home: canvas de 6x5 (660x550), como siempre.
  var home = document.getElementById("canvas");
  if (home) initGrid(home, 6, 5);

  // Cualquier otro canvas marcado con data-grid usa el mismo módulo de 110px;
  // las columnas/filas se derivan de su tamaño (o se declaran con data-cols/data-rows).
  var grids = document.querySelectorAll("canvas[data-grid]");
  for (var i = 0; i < grids.length; i++) {
    var c = grids[i];
    var size = parseInt(c.getAttribute("data-size"), 10) || 110;
    var cols = parseInt(c.getAttribute("data-cols"), 10) || Math.ceil(c.width / size);
    var rows = parseInt(c.getAttribute("data-rows"), 10) || Math.ceil(c.height / size);
    initGrid(c, cols, rows, size);
  }
}

window.addEventListener("load", drawGrids);

// Al entrar a un proyecto, marcamos el item de la lista con el mismo
// view-transition-name que la barra del detalle, para que ese cuadro amarillo
// "suba" y se convierta en la barra (mismo ancho). Solo GME por ahora.
function initBoxMorph() {
  var link = document.querySelector('a.projects-home-item[href*="gme.html"]');
  if (!link) return;
  var bg = link.querySelector(".projects-home-item-bg");
  var name = link.querySelector(".projects-home-item-name");

  // Los nombres de transición NO viven fijos en el DOM (eso creaba un contexto de
  // composición que provocaba un salto al hacer scroll). Se ponen solo al hacer click,
  // para el morph de ida, y se limpian al cargar o al volver (incluye bfcache).
  function clearNames() {
    if (bg) bg.style.viewTransitionName = "";
    if (name) name.style.viewTransitionName = "";
  }
  clearNames();

  link.addEventListener("click", function () {
    if (bg) bg.style.viewTransitionName = "proj-box";
    if (name) name.style.viewTransitionName = "vt-gme";
  });
  window.addEventListener("pageshow", clearNames);
}
window.addEventListener("load", initBoxMorph);

// Dirección de la navegación (tipos de la View Transition), para diferenciar la ida
// (home -> proyecto) de la vuelta (proyecto -> home) y coreografiarlas distinto.
(function () {
  function pathOf(url) { try { return new URL(url, location.href).pathname; } catch (e) { return ""; } }
  function isProject(p) { return p.indexOf("/projects/") === 0; }
  function isHome(p) { return p === "/" || p === "/index.html"; }
  function navType(from, to) {
    if (isHome(from) && isProject(to)) return "to-project";
    if (isProject(from) && isHome(to)) return "to-home";
    return null;
  }

  // Página que se va: fija el tipo y, si volvemos al home, hace que el header viaje como
  // una sola pieza (quita los nombres de sus hijos para que no se separen del cuadro).
  window.addEventListener("pageswap", function (e) {
    if (!e.viewTransition) return;
    var to = (e.activation && e.activation.entry) ? pathOf(e.activation.entry.url) : "";
    var t = navType(location.pathname, to);
    if (t) e.viewTransition.types.add(t);
    if (t === "to-home") {
      // El gráfico entra a la transición (le damos nombre) para que pueda desvanecerse,
      // igual que en la ida entraba con fade. El resto de elementos ya tienen su nombre.
      var g = document.querySelector(".topbar-graphic");
      if (g) g.style.viewTransitionName = "topbar-graphic";
    }
  });

  // Página que llega: fija el tipo también (es otro documento).
  window.addEventListener("pagereveal", function (e) {
    if (!e.viewTransition) return;
    var from = document.referrer ? pathOf(document.referrer) : "";
    var t = navType(from, location.pathname);
    if (t) e.viewTransition.types.add(t);
  });
})();

// Al volver al home, recuperar la posición de scroll que tenías cuando entraste al
// proyecto. El "back" es una navegación normal (carga desde arriba), así que guardamos
// la posición al hacer click en un proyecto y la restauramos si venimos de uno.
(function () {
  var KEY = "homeScrollY";
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  function onHome() { return !!document.querySelector(".projects-home"); }
  function cameFromProject() {
    try { return !!document.referrer && new URL(document.referrer).pathname.indexOf("/projects/") === 0; }
    catch (e) { return false; }
  }
  function restore() {
    if (!onHome() || !cameFromProject()) return;
    var y = null;
    try { y = sessionStorage.getItem(KEY); } catch (e) {}
    if (y !== null) window.scrollTo(0, parseInt(y, 10) || 0);
  }

  // Al volver al home desde GME, preparamos el destino del morph inverso: le ponemos
  // al item de la lista los mismos nombres de transición que la barra del detalle, para
  // que la barra "baje" a su lugar. Debe correr en pagereveal (antes de la captura).
  function setReverseTarget() {
    if (!onHome() || !cameFromProject()) return;
    var ref;
    try { ref = new URL(document.referrer).pathname; } catch (e) { return; }
    if (ref.indexOf("gme.html") === -1) return;
    var link = document.querySelector('a.projects-home-item[href*="gme.html"]');
    if (!link) return;
    var bg = link.querySelector(".projects-home-item-bg");
    if (bg) bg.style.viewTransitionName = "proj-box";
    var name = link.querySelector(".projects-home-item-name");
    if (name) name.style.viewTransitionName = "vt-gme";
  }

  // Cuanto antes, para que no se vea el salto (pagereveal corre durante la transición,
  // antes de pintar la página nueva).
  window.addEventListener("pagereveal", function () { restore(); setReverseTarget(); });
  document.addEventListener("DOMContentLoaded", restore);

  document.addEventListener("DOMContentLoaded", function () {
    if (!onHome()) return;
    var items = document.querySelectorAll("a.projects-home-item");
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch (e) {}
      });
    }
  });
})();

