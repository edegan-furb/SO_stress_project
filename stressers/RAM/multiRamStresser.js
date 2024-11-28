const { fork } = require('child_process');
const os = require('os');

let workers = [];

function stressRAM() {
  console.log("Starting multi-process RAM stress...");

  const cpuCount = os.cpus().length; 
  console.log(`Spawning ${cpuCount} workers...`);

  for (let i = 0; i < cpuCount; i++) {
    const worker = fork('./stressers/RAM/ramStresserWorker.js');
    workers.push(worker);

    // worker.on('exit', (code) => {
    //   console.log(`Worker ${worker.pid} exited with code ${code}`);
    // });
  }

  console.log(`${cpuCount} workers started for RAM stress.`);
}

function stopRAMStress() {
  console.log("Stopping all RAM stress workers...");
  workers.forEach((worker) => worker.kill());
  workers = [];
  console.log("All workers stopped.");
}

module.exports = { stressRAM, stopRAMStress };
