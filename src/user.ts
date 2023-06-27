import { Browser } from "https://deno.land/x/puppeteer@16.2.0/vendor/puppeteer-core/puppeteer/common/Browser.js";

class User {
  public name: string;
  private browser: Browser;

  constructor(name: string, browser: Browser) {
    this.name = name;
    this.browser = browser;
  }

  /*
   * @deprecated To speed up taking data from reddit this method will be implemented in each method so that the page will load only once
   */
  public async exist(): Promise<boolean> {
    const page = await this.browser.newPage();
    await page.goto(`https://www.reddit.com/user/${this.name}`);
    const srExist = await page.evaluate(() => {
      return document.querySelectorAll("._2XKLlvmuqdor3RvVbYZfgz")[0]
        ? false
        : true;
    });

    await page.close();
    return srExist;
  }

  public async getBasicInfo(): Promise<{
    name: string;
    karma: string;
    joined: number;
  }> {
    const page = await this.browser.newPage();
    await page.goto(`https://www.reddit.com/user/${this.name}`);

    const srExist = await page.evaluate(() => {
      return document.querySelectorAll("._2XKLlvmuqdor3RvVbYZfgz")[0]
        ? false
        : true;
    });

    if (!srExist) {
      await page.close();
      return { name: "", karma: "", joined: 0 };
    }

    const [name, karma, joined] = await Promise.all([
      page.evaluate(() => {
        return document.querySelectorAll("._3LM4tRaExed4x1wBfK1pmg")[0]
          .innerText;
      }),
      page.evaluate(() => {
        return document.querySelectorAll("._1hNyZSklmcC7R_IfCUcXmZ")[0]
          .innerText;
      }),
      page.evaluate(() => {
        return document.querySelectorAll("._1hNyZSklmcC7R_IfCUcXmZ")[1]
          .innerText;
      }),
    ]);

    await page.close();

    return {
      name,
      karma: karma,
      joined: Math.floor(new Date(joined).getTime() / 1000),
    };
  }
}

export function user(name: string, pptr: { browser: Browser }) {
  return new User(name, pptr.browser);
}
