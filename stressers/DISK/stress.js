const { stressDiskReader } = require('./diskReader');
const { stressDisk } = require('./diskWriter');

const args = process.argv.slice(2);

if (args.includes('disk-write')) stressDisk();
if (args.includes('disk-read')) stressDiskReader();
