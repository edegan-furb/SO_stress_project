const fs = require('fs');
const path = require('path');

let diskInterval = null;

function stressDiskReader() {
  console.log("Starting Disk read stress...");

  const filePath = path.join(__dirname, 'stress_disk_test');

  if (!fs.existsSync(filePath)) {
    console.error("Directory for stress test files not found.");
    return;
  }

  diskInterval = setInterval(() => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      
      if (files.length === 0) {
        console.error('No files to read in the directory.');
        return;
      }

      const randomFile = files[Math.floor(Math.random() * files.length)];
      const fileToRead = path.join(filePath, randomFile);

      fs.readFile(fileToRead, (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
        }
      });
    });
  }, 500); 
}

function stopDiskReaderStress() {
  if (diskInterval) {
    clearInterval(diskInterval);
    diskInterval = null;  
    console.log('Disk read stress stopped.');
  } else {
    console.log('Disk read stress was not running.');
  }
}

module.exports = { stressDiskReader, stopDiskReaderStress };
