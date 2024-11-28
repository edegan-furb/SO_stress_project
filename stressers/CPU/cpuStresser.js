const { Worker } = require('worker_threads');
const os = require('os');

let cpuWorkers = [];

function stressCPU() {
  console.log("Starting CPU stress...");

  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    const worker = new Worker('./stressers/CPU/cpuWorker.js');
    cpuWorkers.push(worker);
  }

  console.log(`${cpuCount} workers started to stress the CPU.`);
}

function stopCPUStress() {
  console.log("Stopping CPU stress...");
  cpuWorkers.forEach(worker => worker.terminate());
  cpuWorkers = [];
  console.log("CPU stress stopped.");
}

module.exports = { stressCPU, stopCPUStress };
