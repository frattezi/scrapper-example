import puppeteer from "puppeteer";
import fs from "fs";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const persistData = (newData) => {
  const date = Date.now();
  let data = fs.readFileSync("./data.json", "utf-8");
  data = JSON.parse(data);

  data[date] = newData;

  const finalData = JSON.stringify(data);
  fs.writeFileSync("./data.json", finalData, "utf-8");
};

const goToWikipediaPage = async (browser) => {
  const url = "https://en.wikipedia.org/wiki/Main_Page";
  const landingPageButtonSelector = "#mp-dyk > div.dyk-img > div > a > img";
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(landingPageButtonSelector);
  return page;
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // 250ms
  });

  // Ir para pagina principal wikipedia
  const page = await goToWikipediaPage(browser);
  const didYouKnowList = await page.$$("#mp-dyk > ul > li");
  const parsedList = [];

  // Tratar texto
  for (let item of didYouKnowList) {
    // Encontra elemento html da lista e seu texto
    let text = await item.evaluate((el) => el.innerText);

    // Avalia o mesmo elemento mas buscando pelos links vinculados a ele
    let linkList = await item.$$eval("a", (links) =>
      links.map((link) => ({ value: link.href, text: link.innerText }))
    );

    // Salva objeto contendo texto e links!
    parsedList.push({
      fullText: text,
      links: linkList
    });
  }

  // Persistir dados tratados
  if (parsedList) {
    persistData(parsedList);
    console.log("Dados salvos com sucesso!");
  }

  // Finalizar browser criado
  await browser.close();
})();
