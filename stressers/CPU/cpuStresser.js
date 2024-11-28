const { Worker } = require('worker_threads');
const os = require('os');

// Variável que vai armazenar os workers criados para estressar o CPU
let cpuWorkers = [];

// Função que começa o estresse no CPU
function stressCPU() {
  console.log("Starting CPU stress...");

  // Obtém o número de núcleos de CPU disponíveis no sistema
  const cpuCount = os.cpus().length;

  // Cria um worker para cada núcleo de CPU para estressar o processador
  for (let i = 0; i < cpuCount; i++) {
    // Cria um novo worker que vai rodar um script para estressar o CPU
    const worker = new Worker('./stressers/CPU/cpuWorker.js');
    // Adiciona o worker à lista cpuWorkers
    cpuWorkers.push(worker);
  }

  console.log(`${cpuCount} workers started to stress the CPU.`);
}

// Função que para o estresse no CPU
function stopCPUStress() {
  console.log("Stopping CPU stress...");

  // Para cada worker na lista de workers, chamamos a função terminate() para parar o trabalho dele
  cpuWorkers.forEach(worker => worker.terminate());

  // Limpa a lista de workers, pois todos foram finalizados
  cpuWorkers = [];

  console.log("CPU stress stopped.");
}

module.exports = { stressCPU, stopCPUStress };
