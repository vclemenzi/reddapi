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

  public async getHotPosts(): Promise<
    { title: string; image: string | null }[]
  > {
    const page = await this.browser.newPage();
    await page.goto(`https://www.reddit.com/r/${this.name}/hot`);

    const srExist = await page.evaluate(() => {
      return document.querySelectorAll("._1oQyIsiPHYt6nx7VOmd1sz").length > 0;
    });

    if (!srExist) {
      await page.close();
      return [{ title: "", image: null }];
    }

    const posts = await page.evaluate(async () => {
      const postElements = Array.from(
        document.querySelectorAll("._1oQyIsiPHYt6nx7VOmd1sz"),
      );

      const titlePromises = postElements.map((postElement) => {
        const titleElement = postElement.querySelector(
          "._eYtD2XCVieq6emjKBH3m",
        );
        return titleElement ? titleElement.innerText : "";
      });

      const mediaPromises = postElements.map((postElement) => {
        const videoElement = postElement.querySelector(
          ".tErWI93xEKrI2OkozPs7J",
        );
        if (videoElement) {
          const sourceElement = videoElement.querySelector("source");
          return sourceElement ? sourceElement.src : null;
        }
        const imageElement = postElement.querySelector(
          "._2_tDEnGMLxpM6uOa2kaDB3",
        );
        return imageElement ? imageElement.src : null;
      });

      const titles = await Promise.all(titlePromises);
      const media = await Promise.all(mediaPromises);

      return titles.map((t, i) => {
        return { title: t, image: media[i] };
      });
    });

    await page.close();

    return posts;
  }

  public async getNewPosts(): Promise<
    { title: string; image: string | null }[]
  > {
    const page = await this.browser.newPage();
    await page.goto(`https://www.reddit.com/r/${this.name}/new`);

    const srExist = await page.evaluate(() => {
      return document.querySelectorAll("._1oQyIsiPHYt6nx7VOmd1sz").length > 0;
    });

    if (!srExist) {
      await page.close();
      return [{ title: "", image: null }];
    }

    const posts = await page.evaluate(async () => {
      const postElements = Array.from(
        document.querySelectorAll("._1oQyIsiPHYt6nx7VOmd1sz"),
      );

      const titlePromises = postElements.map((postElement) => {
        const titleElement = postElement.querySelector(
          "._eYtD2XCVieq6emjKBH3m",
        );
        return titleElement ? titleElement.innerText : "";
      });

      const mediaPromises = postElements.map((postElement) => {
        const videoElement = postElement.querySelector(
          ".tErWI93xEKrI2OkozPs7J",
        );
        if (videoElement) {
          const sourceElement = videoElement.querySelector("source");
          return sourceElement ? sourceElement.src : null;
        }
        const imageElement = postElement.querySelector(
          "._2_tDEnGMLxpM6uOa2kaDB3",
        );
        return imageElement ? imageElement.src : null;
      });

      const titles = await Promise.all(titlePromises);
      const media = await Promise.all(mediaPromises);

      return titles.map((t, i) => {
        return { title: t, image: media[i] };
      });
    });

    await page.close();

    return posts;
  }

  public async getTopPosts(): Promise<
    { title: string; image: string | null }[]
  > {
    const page = await this.browser.newPage();
    await page.goto(`https://www.reddit.com/r/${this.name}/top`);

    const srExist = await page.evaluate(() => {
      return document.querySelectorAll("._1oQyIsiPHYt6nx7VOmd1sz").length > 0;
    });

    if (!srExist) {
      await page.close();
      return [{ title: "", image: null }];
    }

    const posts = await page.evaluate(async () => {
      const postElements = Array.from(
        document.querySelectorAll("._1oQyIsiPHYt6nx7VOmd1sz"),
      );

      const titlePromises = postElements.map((postElement) => {
        const titleElement = postElement.querySelector(
          "._eYtD2XCVieq6emjKBH3m",
        );
        return titleElement ? titleElement.innerText : "";
      });

      const mediaPromises = postElements.map((postElement) => {
        const videoElement = postElement.querySelector(
          ".tErWI93xEKrI2OkozPs7J",
        );
        if (videoElement) {
          const sourceElement = videoElement.querySelector("source");
          return sourceElement ? sourceElement.src : null;
        }
        const imageElement = postElement.querySelector(
          "._2_tDEnGMLxpM6uOa2kaDB3",
        );
        return imageElement ? imageElement.src : null;
      });

      const titles = await Promise.all(titlePromises);
      const media = await Promise.all(mediaPromises);

      return titles.map((t, i) => {
        return { title: t, image: media[i] };
      });
    });

    await page.close();

    return posts;
  }

}

export function subreddit(name: string, pptr: { browser: Browser }) {
  return new Subreddit(name, pptr.browser);
}
