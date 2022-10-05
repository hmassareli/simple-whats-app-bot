const puppeteer = require("puppeteer");
const { performance } = require("perf_hooks");

const deepTranslate = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const [page] = await browser.pages();
  await page.goto(`https://www.deepl.com/translator#auto/pt/Hello`);
  return async (from, to, text) =>
    await getDeeplTranslation(browser, page, from, to, text);
};

const getDeeplTranslation = async (browser, page, from, to, text) => {
  var startTime = performance.now();
  await page.waitForFunction(
    'document.querySelector("#target-dummydiv").textContent.trim() != ""'
  );
  const element = await page.waitForSelector("#target-dummydiv");

  await page.$eval(
    ".lmt__source_textarea",
    (el, text) => {
      el.value = text;
    },
    text
  );
  await page.focus("#source-dummydiv");
  await page.keyboard.press("Enter");

  await page.waitForFunction(
    'document.querySelector("#target-dummydiv").textContent.trim() != "Olá"'
  );
  const outputText = await page.evaluate(
    (element) => element.textContent,
    element
  );

  await browser.close();
  var endTime = performance.now();
  console.log("Time for deepL: " + (endTime - startTime) + "ms");
  return outputText.split("\n")[0];
};

module.exports = deepTranslate;
