// stressers/diskStresser.js
const fs = require('fs');
const path = require('path');

let diskInterval = null;

function stressDisk() {
  console.log("Starting Disk stress...");
  const filePath = path.join(__dirname, 'stress_disk_test');
  const chunkSize = 500 * 1024 * 1024; // 50 MB por arquivo
  
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

  diskInterval = setInterval(() => {
    const fileName = `file_${Date.now()}.bin`;
    const data = Buffer.alloc(chunkSize, 'A'); // 50 MB de dados
    fs.writeFile(path.join(filePath, fileName), data, (err) => {
      if (err) console.error('Error writing file:', err);
    });
  }, 500);
}

module.exports = stressDisk;
