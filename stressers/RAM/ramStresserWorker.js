// Cria um array 'memoryHog' para armazenar os arrays de dados grandes que serão usados para consumir memória
let memoryHog = [];

// Função que inicia o estresse de RAM
function stressRAM() {
  console.log(`Worker ${process.pid} starting RAM stress...`);

  // Define o tamanho de cada array que será alocado
  const chunkSize = 100 * 1024 * 1024;  // 100MB em bytes

  try {
    // Inicia um loop infinito para alocar memória continuamente
    while (true) {
      // Cria um novo array de 'chunkSize' elementos, preenchido com números aleatórios
      const largeArray = new Array(chunkSize).fill(Math.random());

      // Adiciona o array criado ao array 'memoryHog' para manter uma referência a ele
      memoryHog.push(largeArray);

      // Calcula a quantidade aproximada de memória usada em megabytes
      const usedMB = (memoryHog.length * chunkSize) / (1024 * 1024);  // Convertendo bytes para MB

      // Exibe no console a quantidade de memória usada, arredondada para o valor inteiro mais próximo
      console.log(`Worker ${process.pid}: RAM used ~${Math.round(usedMB)} MB`);
    }
  } catch (err) {
    // Falha ao alocar memória
    console.error(`Worker ${process.pid}: Memory allocation failed.`);
  }
}

stressRAM();
