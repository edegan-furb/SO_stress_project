// Função que estressa a CPU, mantendo o processo ocupado
function stressCPU() {
  let x = 0; // Inicializa uma variável 'x' com 0

  // Inicia um loop infinito (esse loop nunca termina)
  while (true) {
    // Um loop interno que executa uma operação matemática em grande escala
    for (let i = 0; i < 1e8; i++) {
      // A operação matemática combina funções trigonométricas e aritméticas,
      // apenas para gerar carga de processamento
      x += Math.sin(i) * Math.cos(i) * Math.tan(i); 

      // O valor de 'x' é mantido dentro de um limite, usando o operador módulo (%)
      // Isso impede que 'x' cresça para números muito grandes
      x = x % 1000000;
    }
  }
}

stressCPU();