const fs = require('fs');
const path = require('path');

let diskInterval = null;

function stressDisk() {
  console.log("Starting Disk stress...");
  const filePath = path.join(__dirname, 'stress_disk_test');
  const chunkSize = 500 * 1024 * 1024; 
  
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

  diskInterval = setInterval(() => {
    const fileName = `file_${Date.now()}.bin`;
    const data = Buffer.alloc(chunkSize, 'A'); 
    fs.writeFile(path.join(filePath, fileName), data, (err) => {
      if (err) console.error('Error writing file:', err);
    });
  }, 500);
}

function stopDiskStress() {
  if (diskInterval) {
    clearInterval(diskInterval);
    diskInterval = null;  
    console.log('Disk stress stopped.');
  } else {
    console.log('Disk stress was not running.');
  }
}

module.exports = { stressDisk, stopDiskStress };
