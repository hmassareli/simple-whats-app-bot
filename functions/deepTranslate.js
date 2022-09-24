const puppeteer = require("puppeteer");
const { performance } = require("perf_hooks");

const deepTranslate = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const [page] = await browser.pages();
  console.log("chegou nessa parte");
  await page.goto(`https://www.deepl.com/translator#auto/pt/Hello`);
  return async (from, to, text) =>
    await getDeeplTranslation(browser, page, from, to, text);
};

const getDeeplTranslation = async (browser, page, from, to, text) => {
  var startTime = performance.now();
  console.log("chegou nessa parte 2" + text);
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
