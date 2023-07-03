<div align="center">

# 🥤 Reddapi
🐢 This is an API built in Deno that uses web scraping to retrieve data. The API currently consists of only a few endpoints, but it could be expanded in the future.

</div> 

### 📄 Endpoints
1. `/r/:subreddit` -> Get information about the subreddit.  
2. `/r/:subreddit/hot` -> Get the latest hot posts from the subreddit.  
3. `/r/:subreddit/new` -> Get the newest posts from the subreddit.  
4. `/r/:subreddit/top` -> Get the top posts from the subreddit.  
5. `/u/:user` -> Get information about a user.  

### 📎 Try
1. Download the repository
```
$ git clone https://github.com/vclemenzi/reddapi
```

2. Open the directory
```shell
$ cd reddapi
```

3. Run it
```shell
$ deno task start
```
