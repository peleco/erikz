//Coded by Erik Zitzermann www.erikzitzermann.com

function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var modulesColumns = 6;
    var modulesgridRow = 5;
    var modulesN = modulesColumns * modulesgridRow;
    var listaModulosTipos = new Array();
    var listaOpacitySpeeds = new Array();
    var listaOpacityFlags = new Array();
    var listaOpacity1 = new Array();
    var listaOpacity2 = new Array();
    // console.log(opacitySpeed);

    var requestAnimationFrame = window.requestAnimationFrame;

    function Modulo (col, row, opacity1, opacity2, modtype) {
      var moduloW = 110;
      var moduloH = 110;
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

          // ctx.beginPath();
          // ctx.moveTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
          // ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
          // ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
          // ctx.closePath();
          // ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
          // ctx.fill();

          break;

        case 7:

          ctx.beginPath();
          ctx.moveTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
          ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
          ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
          ctx.closePath();
          ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
          ctx.fill();

          // ctx.beginPath();
          // ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
          // ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
          // ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
          // ctx.closePath();
          // ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
          // ctx.fill();

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

          // ctx.beginPath();
          // ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
          // ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
          // ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
          // ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
          // ctx.closePath();
          // ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
          // ctx.fill();

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

          // ctx.beginPath();
          // ctx.moveTo(moduloW*gridColumn,moduloH*gridRow);
          // ctx.lineTo((moduloW*gridColumn)+moduloW,moduloH*gridRow);
          // ctx.lineTo(moduloW*gridColumn,(moduloH*gridRow)+moduloH);
          // ctx.lineTo((moduloW*gridColumn)+moduloW,(moduloH*gridRow)+moduloH);
          // ctx.closePath();
          // ctx.fillStyle = "rgba(0,0,0,"+ moduloOpacity2 +")";
          // ctx.fill();

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
          // console.log(listaModulosTipos);

          var opacitySpeed = .07/(10+(Math.random()*30));
          listaOpacitySpeeds.push(opacitySpeed);
          // console.log(listaOpacitySpeeds);

          listaOpacityFlags.push(opacityFlag);
          listaOpacity1.push(opacityAnimation1);
          listaOpacity2.push(opacityAnimation2);

          Modulo(gridColumn,gridRow,opacityAnimation1,opacityAnimation2,randomModulo);
        }
      }
      animacionModulos();
    }
    createGrid();



    function animacionModulos () {
      ctx.clearRect(0, 0, 660, 550);
      var i = 0;
      for (var gridRow=0; gridRow<modulesgridRow; gridRow++) {
        for (var gridColumn=0; gridColumn<modulesColumns; gridColumn++) {

          Modulo(gridColumn,gridRow,listaOpacity1[i],listaOpacity2[i],listaModulosTipos[i]);

          if ((listaOpacity1[i]) <= 0) {
            listaOpacityFlags[i] = true;
          }
          else if ((listaOpacity1[i]) >= 1) {
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
          // console.log(listaOpacity[i]);
          // console.log(Modulo);

          i ++;
          // console.log(listaOpacityFlags);
        }
      }
      // console.log(listaOpacity[0], listaOpacitySpeeds[0], listaOpacityFlags[0]);
      // console.log(listaOpacitySpeeds);
      // console.log(listaOpacity)
      requestAnimationFrame(animacionModulos);

    }

  }

}
window.onload = draw;
