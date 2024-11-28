// Array que irá armazenar os workers criados
let workers = [];

// Função que inicia o estresse de RAM usando múltiplos processos
function stressRAM() {
  console.log("Starting multi-process RAM stress...");

  // Obtém o número de CPUs disponíveis no sistema
  const cpuCount = os.cpus().length; 
  console.log(`Spawning ${cpuCount} workers...`);

  // Cria um worker (processo filho) para cada CPU disponível
  for (let i = 0; i < cpuCount; i++) {
    // Inicia um processo filho usando o script 'ramStresserWorker.js'
    const worker = fork('./stressers/RAM/ramStresserWorker.js');
    
    // Adiciona o worker à lista de workers
    workers.push(worker);

    // monitorar quando um worker sai
    // worker.on('exit', (code) => {
    //   console.log(`Worker ${worker.pid} exited with code ${code}`);
    // });
  }

  // Exibe no console o número de workers que foram iniciados para o estresse de RAM
  console.log(`${cpuCount} workers started for RAM stress.`);
}

// Função que para o estresse de RAM, finalizando todos os workers
function stopRAMStress() {
  console.log("Stopping all RAM stress workers...");
  
  // Para cada worker na lista de workers, chamamos a função kill() para finalizar o processo
  workers.forEach((worker) => worker.kill());
  
  // Limpa a lista de workers após terminar todos
  workers = [];
  
  console.log("All workers stopped.");
}

module.exports = { stressRAM, stopRAMStress };