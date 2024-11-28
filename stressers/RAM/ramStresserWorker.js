let memoryHog = [];

function stressRAM() {
  console.log(`Worker ${process.pid} starting RAM stress...`);
  const chunkSize = 100 * 1024 * 1024; 

  try {
    while (true) {
      const largeArray = new Array(chunkSize).fill(Math.random()); 
      memoryHog.push(largeArray);

      const usedMB = (memoryHog.length * chunkSize) / (1024 * 1024);
      console.log(`Worker ${process.pid}: RAM used ~${Math.round(usedMB)} MB`);
    }
  } catch (err) {
    console.error(`Worker ${process.pid}: Memory allocation failed.`);
  }
}

stressRAM();
