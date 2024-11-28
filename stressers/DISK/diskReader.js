const fs = require('fs');
const path = require('path');

// Variável para armazenar o intervalo do estresse do disco
let diskInterval = null;

// Função que inicia o estresse de leitura do disco
function stressDiskReader() {
  console.log("Starting Disk read stress...");

  // Define o caminho do diretório onde os arquivos de teste estão localizados
  const filePath = path.join(__dirname, 'stress_disk_test');

  // Verifica se o diretório existe. Se não, exibe uma mensagem de erro e sai da função
  if (!fs.existsSync(filePath)) {
    console.error("Directory for stress test files not found.");
    return;
  }

  // Inicia um intervalo para realizar a leitura do diretório e de arquivos a cada 500ms
  diskInterval = setInterval(() => {
    // Lê o conteúdo do diretório especificado
    fs.readdir(filePath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      // Verifica se o diretório está vazio
      if (files.length === 0) {
        console.error('No files to read in the directory.');
        return;
      }

      // Seleciona um arquivo aleatório da lista de arquivos no diretório
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const fileToRead = path.join(filePath, randomFile);

      // Lê o conteúdo do arquivo selecionado aleatoriamente
      fs.readFile(fileToRead, (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
        }
      });
    });
  }, 500); // O intervalo de 500ms faz a leitura do diretório e arquivo a cada meio segundo
}

// Função que para o estresse de leitura do disco
function stopDiskReaderStress() {
  // Verifica se o intervalo foi iniciado
  if (diskInterval) {
    // Limpa o intervalo, parando a execução do estresse de leitura
    clearInterval(diskInterval);
    diskInterval = null;  // Define a variável de intervalo como null após parar
    console.log('Disk read stress stopped.');
  } else {
    console.log('Disk read stress was not running.');
  }
}

module.exports = { stressDiskReader, stopDiskReaderStress };