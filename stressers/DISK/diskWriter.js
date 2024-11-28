// Variável para armazenar o intervalo do estresse do disco
let diskInterval = null;

// Função que inicia o estresse de escrita no disco
function stressDisk() {
  console.log("Starting Disk stress...");

  // Define o caminho do diretório onde os arquivos de teste serão criados
  const filePath = path.join(__dirname, 'stress_disk_test');

  // Define o tamanho de cada arquivo a ser escrito (500MB)
  const chunkSize = 500 * 1024 * 1024; 

  // Se o diretório 'stress_disk_test' não existir, cria ele
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

  // Inicia um intervalo para escrever arquivos no disco a cada 500ms
  diskInterval = setInterval(() => {
    // Cria um nome único para o arquivo com base no timestamp atual
    const fileName = `file_${Date.now()}.bin`;

    // Cria um buffer de dados com o tamanho definido (500MB) e preenche com o caractere 'A'
    const data = Buffer.alloc(chunkSize, 'A'); 

    // Escreve o arquivo no diretório 'stress_disk_test'
    fs.writeFile(path.join(filePath, fileName), data, (err) => {
      if (err) {
        // Caso haja erro na escrita, exibe no console
        console.error('Error writing file:', err);
      }
    });
  }, 500); // O intervalo de 500ms faz a escrita a cada meio segundo
}

// Função que para o estresse de escrita no disco
function stopDiskStress() {
  // Verifica se o intervalo foi iniciado
  if (diskInterval) {
    // Limpa o intervalo, parando a execução do estresse de escrita
    clearInterval(diskInterval);
    diskInterval = null;  // Define a variável de intervalo como null após parar
    console.log('Disk stress stopped.');
  } else {
    console.log('Disk stress was not running.');
  }
}

module.exports = { stressDisk, stopDiskStress };