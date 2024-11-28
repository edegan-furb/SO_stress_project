const { parentPort } = require('worker_threads');

function stressCPU() {
  let x = 0;
  while (true) {
    for (let i = 0; i < 1e8; i++) {
      x += Math.sin(i) * Math.cos(i) * Math.tan(i); 
      x = x % 1000000;
    }
  }
}

stressCPU();
