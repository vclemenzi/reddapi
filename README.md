# Reddapi
This is an API built in Deno that uses web scraping to retrieve data. The API currently consists of only a few endpoints, but it could be expanded in the future.

## Endpoints
`/r/:subreddit` -> Get information about the subreddit
`/r/:subreddit/hot` -> Get the latest hot posts from the subreddit
`/r/:subreddit/new` -> Get the newest posts from the subreddit
`/r/:subreddit/top` -> Get the top posts from the subreddit
`/u/:user` -> Get information about a user

## Try
Download the repository
```bash
git clone https://github.com/vclemenzi/reddapi
```

Open the directory
```bash
cd reddapi
```

Run it
```bash
deno task start
```
