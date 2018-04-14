function draw() {
  var canvas = document.getElementById('modules-canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var moduleW = 110;
    var moduleH = 110;
    var modulesColumns = 6;
    var modulesRows = 5;
    var modulesN = modulesColumns * modulesRows;

    for (var rows=0; rows<modulesRows; rows++) {

      for (var cols=0; cols<modulesColumns; cols++) {

        var randomModule = Math.floor(Math.random() * 10);

        switch (randomModule) {
          case 0:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,moduleH*rows);
            ctx.lineTo((moduleW/2)+moduleW*cols,(moduleH/2)+moduleH*rows);
            ctx.lineTo((moduleW)+moduleW*cols, moduleH*rows);
            ctx.lineTo(moduleW*cols, moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 1:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,(moduleH*rows)+moduleH);
            ctx.lineTo((moduleW/2)+moduleW*cols,(moduleH/2)+moduleH*rows);
            ctx.lineTo((moduleW)+moduleW*cols, (moduleH*rows)+moduleH);
            ctx.lineTo(moduleW*cols, (moduleH*rows)+moduleH);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 2:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,(moduleH*rows)+moduleH);
            ctx.lineTo((moduleW/2)+moduleW*cols,(moduleH/2)+moduleH*rows);
            ctx.lineTo((moduleW)+moduleW*cols, (moduleH*rows)+moduleH);
            ctx.lineTo(moduleW*cols, moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 3:
            ctx.beginPath();
            ctx.moveTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.lineTo((moduleW/2)+moduleW*cols,(moduleH/2)+moduleH*rows);
            ctx.lineTo((moduleW*cols)+moduleW, (moduleH*rows)+moduleH);
            ctx.lineTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 4:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,moduleH*rows);
            ctx.lineTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.lineTo((moduleW*cols)+moduleW,(moduleH*rows)+moduleH);
            ctx.lineTo(moduleW*cols,moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 5:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,moduleH*rows);
            ctx.lineTo(moduleW*cols,(moduleH*rows)+moduleH);
            ctx.lineTo((moduleW*cols)+moduleW,(moduleH*rows)+moduleH);
            ctx.lineTo(moduleW*cols,moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 6:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,moduleH*rows);
            ctx.lineTo(moduleW*cols,(moduleH*rows)+moduleH);
            ctx.lineTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.lineTo(moduleW*cols,moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 7:
            ctx.beginPath();
            ctx.moveTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.lineTo((moduleW*cols)+moduleW,(moduleH*rows)+moduleH);
            ctx.lineTo(moduleW*cols,(moduleH*rows)+moduleH);
            ctx.lineTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 8:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,moduleH*rows);
            ctx.lineTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.lineTo(moduleW*cols,(moduleH*rows)+moduleH);
            ctx.lineTo((moduleW*cols)+moduleW,(moduleH*rows)+moduleH);
            ctx.lineTo(moduleW*cols,moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

          case 9:
            ctx.beginPath();
            ctx.moveTo(moduleW*cols,moduleH*rows);
            ctx.lineTo((moduleW*cols)+moduleW,(moduleH*rows)+moduleH);
            ctx.lineTo((moduleW*cols)+moduleW,moduleH*rows);
            ctx.lineTo(moduleW*cols,(moduleH*rows)+moduleH);
            ctx.lineTo(moduleW*cols,moduleH*rows);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();
            break;

        }
        if (cols==modulesColumns) {cols = 0;}
      }
    }

  }
}
window.onload = draw;






// function createmodulos() {
//   const moduloNb = 30;
//   const moduloTemplate = document.querySelector('.modulo');
//
//   for (i=0; i < moduloNb; i++) {
//     const newNode = document.createElement('div');
//     newNode.className = 'modulo';
//     document.querySelector('.modules-container').appendChild(newNode);
//     addAnimation(newNode);
//   }
// }
//
// function addAnimation(node) {
//   const animationNumber = Math.ceil(Math.random() * 8);
//   node.classList.add('animation-'+animationNumber);
//   //node.classList.add(`animation-${Math.ceil(Math.random() * 10)}`);
// }
//
// window.onload = createmodulos;
