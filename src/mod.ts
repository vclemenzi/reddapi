import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const router = new Router();
const browser = puppeteer.launch();

router
  .get("/", (ctx) => {
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body =
      '<p style="font-family: Arial, Helvetica, sans-serif; font-size: 1.3rem; text-align: center; margin-top: 3rem;">Welcome to <b>ReddAPI</b> the web scraping based api for reddit,<br> this api is opensource and can be found here: <a href="https://github.com/vclemenzi/reddapi" style="text-decoration: none;">vclemenzi/reddapi</a></p>';
  });

const app = new Application();
app.use(router.routes());

await app.listen({ port: 8000 });
