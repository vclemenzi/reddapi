import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { subreddit } from "./subreddit.ts";

const router = new Router();
const browser = await puppeteer.launch();

router
  .get("/", (ctx) => {
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body =
      '<p style="font-family: Arial, Helvetica, sans-serif; font-size: 1.3rem; text-align: center; margin-top: 3rem;">Welcome to <b>ReddAPI</b> the web scraping based api for reddit,<br> this api is opensource and can be found here: <a href="https://github.com/vclemenzi/reddapi" style="text-decoration: none;">vclemenzi/reddapi</a></p>';
  })
  .get("/r/:name", async (ctx) => {
    const { name } = ctx.params;
    const sr = subreddit(name, { browser: browser });

    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(await sr.getBasicInfo());
  })
  .get("/r/:name/hot", async (ctx) => {
    const { name } = ctx.params;
    const sr = subreddit(name, { browser: browser });

    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(await sr.getHotPosts());
  });

const app = new Application();
app.use(router.routes());

await app.listen({ port: 8000 });
