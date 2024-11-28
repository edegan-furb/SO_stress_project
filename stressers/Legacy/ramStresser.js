// stressers/ramStresser.js
let memoryHog = [];

function stressRAM() {
  console.log("Starting RAM stress...");
  const chunkSize = 50 * 1024 * 1024; // 50 MB por chunk

  setInterval(() => {
    const largeArray = new Array(chunkSize).fill(Math.random());
    memoryHog.push(largeArray);
    console.log(`RAM used: ~${memoryHog.length * 50} MB`);
  }, 500);
}

module.exports = stressRAM;
