// stressers/cpuStresser.js
const { Worker } = require('worker_threads');
const os = require('os');

let cpuWorkers = [];

function stressCPU() {
  console.log("Starting CPU stress...");

  // Verifica o número de núcleos da CPU
  const cpuCount = os.cpus().length; 

  // Cria workers para cada núcleo da CPU
  for (let i = 0; i < cpuCount; i++) {
    // Cria cada worker com um laço infinito de operações matemáticas
    const worker = new Worker(`
      while (true) {
        Math.random() * Math.random()
      }
    `, { eval: true });

    cpuWorkers.push(worker);
  }

  console.log(`${cpuCount} workers started to stress the CPU.`);
}

module.exports = stressCPU;
