import puppeteer from "puppeteer";

(async () => {
  // Inicia o browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // 250ms
  });

  // Esta e a versao do projeto mais limpa, onde
  // toda a implementação fica por sua conta. Leia
  // o Readme para entender o exercicio e siga
  // os comentarios para desenvolver passo-a-passo.

  // 1 - Ir para página principal da Wikipedia
  // link: https://en.wikipedia.org/wiki/Main_Page

  // 2 - Selecionar a lista desejada
  // 3 - Tratar os dados obtidos
  // 4 - Salvar os dados

  console.log("Insira seu código aqui!");

  await browser.close();
})();
