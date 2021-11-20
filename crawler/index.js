import puppeteer from "puppeteer";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Connection URI
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const saveData = async (documentData) => {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const db = await client.db("Wiki");
    const collection = await db.collection("quotes");

    const insertManyresult = await collection.insertMany(documentData);
    const ids = insertManyresult.insertedIds;
    console.log(`Inserted ${JSON.stringify(ids)} ids`);
  } catch (error) {
    throw `Error while persisting data: ${error}`;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

const goToWikipediaPage = async (browser) => {
  const url = "https://en.wikipedia.org/wiki/Main_Page";
  const landingPageButtonSelector = "#mp-dyk > div.dyk-img > div > a > img";
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(landingPageButtonSelector);
  return page;
};

const getTodayDate = () => {
  return new Date().toISOString();
};

const parseBySelector = async (page, cssSelector, type) => {
  if (!page) {
    throw "Page is not set, restart the crawler";
  }
  const parsedList = [];

  try {
    const itemList = await page.$$(cssSelector);

    // Tratar texto
    for (let item of itemList) {
      // Encontra elemento html da lista e seu texto
      const text = await item.evaluate((el) => el.innerText);

      // Avalia o mesmo elemento mas buscando pelos links vinculados a ele
      const linkList = await item.$$eval("a", (links) =>
        links.map((link) => ({ value: link.href, text: link.innerText }))
      );

      console.log(
        `Collected new text: ${text.substring(0, 10)}... with ${
          linkList.length
        } links`
      );
      // Salva objeto contendo texto e links!
      parsedList.push({
        type,
        fullText: text,
        links: linkList,
        rating: 0,
        reviewCount: 0,
        date: getTodayDate()
      });
    }
  } catch (err) {
    console.log(`Error while parsing ${type}, Trace: \n ${err}`);
  }
  return parsedList;
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // 250ms
  });

  // Ir para pagina principal wikipedia
  const page = await goToWikipediaPage(browser);
  const selectors = {
    onThisDay: "#mp-otd > ul > li",
    inTheNews: "#mp-itn > ul > li",
    didYouKnow: "#mp-dyk > ul > li"
  };

  // Scrappers
  try {
    for (const [type, selector] of Object.entries(selectors)) {
      const data = await parseBySelector(page, selector, type);

      // Persistir dados tratados
      if (data) {
        saveData(data);
        console.log("Dados salvos com sucesso!");
      }
    }
  } catch (error) {
    throw `Scrapping error ${error}`;
  }

  // Finalizar browser criado
  await browser.close();
})();
