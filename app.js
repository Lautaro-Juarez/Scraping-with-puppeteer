import puppeteer from "puppeteer";

const base = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 700,
  });
  await page.setViewport({
    width: 1600,
    height: 1000,
    deviceScaleFactor: 1,
  });
  const page = await browser.newPage();

  return { page, browser };
};

const openWebSite = async () => {
  const { page } = await base();
  await page.goto("https://example.com");
  await browser.close();
};

//openWebSite();

const captionScreenshot = async () => {
  await page.goto("https://google.com");
  await page.screenshot({ path: "example.png" });
  await browser.close();
};

//captionScreenshot()

const navigateWebPage = async () => {
  const page = await base();
  await page.goto("https://quotes.toscrape.com");
  await page.click('a[href="/login"]');
  await new Promise((r) => setTimeout(r, 6000));

  await browser.close();
};
//navigateWebPage()

const getDataFromWebPage = async () => {
  const { page, browser } = await base();
  await page.goto("https://example.com");

  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const description = document.querySelector("p").innerText;
    const more = document.querySelector("a").innerText;

    return {
      title,
      description,
      more,
    };
  });
  console.log(result);
  await browser.close();
};
const handleDynamicWebPage = async () => {
  const { page, browser } = await base();
  await page.goto("https://quotes.toscrape.com");

  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.innerText
      );

      return {
        quoteText,
        author,
        tags,
      };
    });
    return data;
  });
  console.log(result);
  await browser.close();
};

//handleDynamicWebPage();
