// Motor de la rejilla de triángulos. Coded by Erik Zitzermann www.erikz.info
// Reusable: recibe un canvas y el número de columnas/filas. El módulo mide 110x110 por
// defecto, así que el tamaño del triángulo es el mismo en cualquier canvas (home, header).
export function initGrid(canvas, modulesColumns, modulesgridRow, moduloSize) {
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

  function Modulo(col, row, opacity1, opacity2, modtype) {
    var gridColumn = col;
    var gridRow = row;
    var moduloOpacity1 = opacity1;
    var moduloOpacity2 = opacity2;
    var moduloType = modtype;

    switch (moduloType) {
      case 0:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo((moduloW) + moduloW * gridColumn, moduloH * gridRow);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo((moduloW) + moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;

      case 1:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo((moduloW) + moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo((moduloW) + moduloW * gridColumn, moduloH * gridRow);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;

      case 2:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;

      case 3:
        ctx.beginPath();
        ctx.moveTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW / 2) + moduloW * gridColumn, (moduloH / 2) + moduloH * gridRow);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;

      case 4:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;

      case 5:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;

      case 6:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.lineTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();
        break;

      case 7:
        ctx.beginPath();
        ctx.moveTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;

      case 8:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity1 + ")";
        ctx.fill();
        break;

      case 9:
        ctx.beginPath();
        ctx.moveTo(moduloW * gridColumn, moduloH * gridRow);
        ctx.lineTo((moduloW * gridColumn) + moduloW, (moduloH * gridRow) + moduloH);
        ctx.lineTo((moduloW * gridColumn) + moduloW, moduloH * gridRow);
        ctx.lineTo(moduloW * gridColumn, (moduloH * gridRow) + moduloH);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,0,0," + moduloOpacity2 + ")";
        ctx.fill();
        break;
    }
  }

  var opacityAnimation1 = 0;
  var opacityAnimation2 = 1;
  var opacityFlag = true;

  function createGrid() {
    for (var gridRow = 0; gridRow < modulesgridRow; gridRow++) {
      for (var gridColumn = 0; gridColumn < modulesColumns; gridColumn++) {
        var randomModulo = Math.floor(Math.random() * 10);
        listaModulosTipos.push(randomModulo);

        var opacitySpeed = .07 / (10 + (Math.random() * 30));
        listaOpacitySpeeds.push(opacitySpeed);

        listaOpacityFlags.push(opacityFlag);
        listaOpacity1.push(opacityAnimation1);
        listaOpacity2.push(opacityAnimation2);

        Modulo(gridColumn, gridRow, opacityAnimation1, opacityAnimation2, randomModulo);
      }
    }
    animacionModulos();
  }

  function animacionModulos() {
    // Al navegar (Astro reemplaza el DOM) el canvas viejo se desconecta: paramos el bucle
    // para no acumular animaciones sobre canvas que ya no existen.
    if (!canvas.isConnected) return;

    ctx.clearRect(0, 0, W, H);
    var i = 0;
    for (var gridRow = 0; gridRow < modulesgridRow; gridRow++) {
      for (var gridColumn = 0; gridColumn < modulesColumns; gridColumn++) {
        Modulo(gridColumn, gridRow, listaOpacity1[i], listaOpacity2[i], listaModulosTipos[i]);

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

        i++;
      }
    }
    requestAnimationFrame(animacionModulos);
  }

  createGrid();
}

// Arranca todos los canvas de la página. Idempotente: marca cada canvas para no
// re-inicializarlo si se llama otra vez.
export function drawGrids() {
  var home = document.getElementById("canvas");
  if (home && !home.dataset.gridInit) {
    home.dataset.gridInit = "1";
    initGrid(home, 6, 5);
  }

  var grids = document.querySelectorAll("canvas[data-grid]");
  for (var i = 0; i < grids.length; i++) {
    var c = grids[i];
    if (c.dataset.gridInit) continue;
    c.dataset.gridInit = "1";
    var size = parseInt(c.getAttribute("data-size"), 10) || 110;
    var cols = parseInt(c.getAttribute("data-cols"), 10) || Math.ceil(c.width / size);
    var rows = parseInt(c.getAttribute("data-rows"), 10) || Math.ceil(c.height / size);
    initGrid(c, cols, rows, size);
  }
}
