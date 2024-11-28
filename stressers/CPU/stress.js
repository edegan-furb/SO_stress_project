const { stressCPU, stopCPUStress } = require('./cpuStresser');

const args = process.argv.slice(2);

if (args.includes('cpu')) {
  stressCPU();
}

if (args.includes('stop')) {
  stopCPUStress();
}
