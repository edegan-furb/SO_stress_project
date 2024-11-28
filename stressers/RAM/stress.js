const { stressRAM, stopRAMStress } = require('./multiRamStresser');

const args = process.argv.slice(2);

if (args.includes('ram')) stressRAM();
if (args.includes('stop')) stopRAMStress();
