import { base } from "./index.js";

const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : "Volbeat";
const searchTermENV = "Green day";

//interface testing
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

  const firstMatch = await page.$eval(
    "ytd-video-renderer h3 a#video-title",
    (elem) => {
      //runs when that a#video-title is found
      return elem.innerText;
    }
  );
  console.log({ firstMatch });
  await Promise.all([
    page.waitForNavigation(), //waitForNetworkIdle()
    page.click("ytd-video-renderer h3 a#video-title"),
    new Promise((resolve) => setTimeout(resolve, 17000)),
  ]);
  await page.screenshot({ path: "./screens/first-video.jpg" });
  await page.waitForSelector("ytd-comments-header-renderer");
  const videoComments = await page.$eval(
    "ytd-comments-header-renderer h2",
    (h2) => {
      return h2.innerText;
    }
  );
  console.log({ videoComments });
  const firstSuggested = await page.$eval(
    "ytd-compact-video-renderer",
    (elem) => {
      return elem.querySelector("h3").innerText;
    }
  );
  console.log({ firstSuggested });

  await browser.close();
};

