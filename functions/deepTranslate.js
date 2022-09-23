const puppeteer = require("puppeteer");
const { performance } = require("perf_hooks");

const deepTranslate = async () => {
  browser = puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto(`https://www.deepl.com/translator#auto/pt/Hello`);
  return async (from, to, text) =>
    await getDeeplTranslation(page, from, to, text);
};

const getDeeplTranslation = async (browser, page, from, to, text) => {
  // Get the "viewport" of the page, as reported by the page.
  var startTime = performance.now();

  await page.waitForFunction(
    'document.querySelector("#target-dummydiv").textContent.trim() != ""'
  );
  const element = await page.waitForSelector("#target-dummydiv");

  const outputText = await page.evaluate(
    (element) => element.textContent,
    element
  );
  await browser.close();
  var endTime = performance.now();
  console.log("Time for deepL: " + (endTime - startTime) + "ms");
  return outputText;
};

module.exports = deepTranslate;
getDeeplTranslation("pt", "en", "Olá, tudo bem?").then((result) => {
  console.log(result);
});
