# sssr-server
Realtime comment posting demo

## Prerequisite
git, Node.js version 6+

## Install
```
$ git clone git@github.com:kuu/realtime-comment-demo.git
$ cd realtime-comment-demo
$ git submodule init
$ git submodule update
$ npm install
$ npm run build
```

## Config
Please put config file(s) in your work directory.
```js
$ mkdir config
$ vi config/default.json
{
  "server": {
    "host": "localhost",
    "port": 3004
  },
  "api": {
    "key": "Your Ooyala API Key",
    "secret": "Your Ooyala API Secret"
  },
  "player": {
    "pcode": "Provider Code (Left part of the api key)",
    "playerBrandingId": "Player Id",
    "version": "Player version"
  }
}
```

## Run
```
$ npm run watch
```
