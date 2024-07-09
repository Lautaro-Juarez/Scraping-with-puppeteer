import { base } from "./index.js";

const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : "Volbeat";
const searchTermENV = "Green day";
const scraper = async () => {
  const { browser, page } = await base();

  await page.goto("https://youtube.com/");
  await page.waitForSelector("#search-input #search");
  await page.type("#search-input #search", searchTermCLI, { delay: 100 });
  await page.emulateVisionDeficiency("blurredVision");
  await page.screenshot({ path: "./screens/youtube-homeblurred.png" });
  await page.emulateVisionDeficiency("none");
  await page.screenshot({ path: "./screens/youtube-home.png" });
  await Promise.all([
    page.waitForNavigation(),
    page.click("#search-icon-legacy"),
  ]);
  //await till next page
  await page.waitForSelector("ytd-video-renderer h3 a#video-title");
  await page.screenshot({ path: "./screens/search-results.jpg" });

  const firtsMatch = await page.$eval(
    "ytd-video-renderer h3 a#video-title",
    (elem) => {elem.innerText}
  );

  await Promise.all([
    page.waitForNavigation(),
    page.click("ytd-video-renderer h3 a#video-title")
  ])
  await page.screenshot("./screens/first-video.png")

  

  await browser.close();
};

scraper();
