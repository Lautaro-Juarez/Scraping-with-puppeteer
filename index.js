import puppeteer from "puppeteer";

export const base = async () => {
  const browser = await puppeteer.launch({
    headless: false,
   /*  defaultViewport: false,
    userDataDir: "./trip" */
  });
  const page = await browser.newPage();

  return { page, browser };
};

const trytry = async () => {
  const { page, browser } = await base();
  await page.goto("https://www.mercadolibre.com.ar/c/construccion#menu=categories");
};

