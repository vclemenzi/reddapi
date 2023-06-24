import { Browser } from "https://deno.land/x/puppeteer@16.2.0/vendor/puppeteer-core/puppeteer/common/Browser.js";

class Subreddit {
  public name: string;
  private browser: Browser;

  constructor(name: string, browser: Browser) {
    this.name = name;
    this.browser = browser;
  }

  /*
   * @deprecated To speed up taking data from reddit this method will be implemented in each method so that the page will load only once
   */
  public async exist(): boolean {
    const page = await this.browser.newPage();
    await page.goto(`https://www.reddit.com/r/${this.name}`);
    const srExist = await page.evaluate(() => {
      return document.querySelectorAll("._2XKLlvmuqdor3RvVbYZfgz")[0]
        ? false
        : true;
    });

    return srExist;
  }

  public async getBasicInfo(): Promise<{
    name: string;
    members: string;
    online: string;
  }> {
    const page = await this.browser.newPage();
    await page.goto(`https://www.reddit.com/r/${this.name}`);

    const srExist = await page.evaluate(() => {
      return document.querySelectorAll("._2XKLlvmuqdor3RvVbYZfgz")[0]
        ? false
        : true;
    });

    if (!srExist) return { name: "", members: "", online: "" };

    const [name, members, online] = await Promise.all([
      page.evaluate(() => {
        return document.querySelectorAll("._2yYPPW47QxD4lFQTKpfpLQ")[0]
          .innerText;
      }),
      page.evaluate(() => {
        return document.querySelectorAll("._3b9utyKN3e_kzVZ5ngPqAu")[0]
          .innerText;
      }),
      page.evaluate(() => {
        return document.querySelectorAll("._21RLQh5PvUhC6vOKoFeHUP")[0]
          .innerText;
      }),
    ]);

    await page.close();

    return {
      name,
      members,
      online,
    };
  }
}

export function subreddit(name: string, pptr: { browser: Browser }) {
  return new Subreddit(name, pptr.browser);
}
