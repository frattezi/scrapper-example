import puppeteer from "puppeteer";
import fs from "fs";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  // Inicia o browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // 250ms
  });

  const url = "https://en.wikipedia.org/wiki/Main_Page";
  const waitSelector = "#mp-dyk > ul > li:nth-child(7)";
  const page = await browser.newPage();

  // Esta e a versao do projeto mais limpa, onde
  // toda a implementação fica por sua conta. Leia
  // o Readme para entender o exercicio e siga
  // os comentarios para desenvolver passo-a-passo.

  // 1 - Ir para página principal da Wikipedia
  // link: https://en.wikipedia.org/wiki/Main_Page
  await page.goto(url);
  await page.waitForSelector(waitSelector);

  // 2 - Selecionar a lista desejada
  const didYouKnowList = await page.$$("#mp-dyk > ul > li");
  const resultList = [];

  // 3 - Tratar os dados obtidos
  for (let item of didYouKnowList) {
    const text = await item.evaluate((el) => el.innerText);
    resultList.push(text);
  }

  console.log(JSON.stringify(resultList));
  fs.writeFileSync("./data.json", JSON.stringify(resultList), "utf-8");

  // 4 - Salvar os dados

  await sleep(5000);
  await browser.close();
})();
