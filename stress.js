const { stressRAM, stopRAMStress } = require('./stressers/RAM/multiRamStresser');
const { stressDiskReader, stopDiskReaderStress } = require('./stressers/DISK/diskReader');
const { stressDisk, stopDiskStress } = require('./stressers/DISK/diskWriter');
const { stressCPU, stopCPUStress } = require('./stressers/CPU/cpuStresser');

const args = process.argv.slice(2);

const timeIndex = args.indexOf('--time');
let durationInSeconds = 0;

if (timeIndex !== -1 && args[timeIndex + 1]) {
  durationInSeconds = parseInt(args[timeIndex + 1], 10);
}

if (args.includes('cpu')) {
  stressCPU();
  if (durationInSeconds) {
    setTimeout(() => {
      stopCPUStress()
    }, durationInSeconds * 1000);
  }
}

if (args.includes('ram')) {
  stressRAM();
  if (durationInSeconds) {
    setTimeout(() => {
      stopRAMStress()
    }, durationInSeconds * 1000);
  }
}

if (args.includes('disk-write')) {
  stressDisk();
  if (durationInSeconds) {
    setTimeout(() => {
      console.log('Stopping disk write stress...');
      stopDiskStress();
    }, durationInSeconds * 1000);
  }
}

if (args.includes('disk-read')) {
  stressDiskReader();
  if (durationInSeconds) {
    setTimeout(() => {
      console.log('Stopping disk read stress...');
      stopDiskReaderStress();
    }, durationInSeconds * 1000);
  }
}
