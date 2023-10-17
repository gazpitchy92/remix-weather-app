# Remix Weather App

Welcome to the Remix Weather App, built using Remix.js and MaterialUI.

![alt text](https://i.imgur.com/JiAL1Al.png)
![alt text](https://i.imgur.com/2UIFeG3.png)

- Example Server: http://weather.gazpitchy.online:3000/
- Username: ipgautomotive
- Password: carmaker

## Installation

From your terminal in the root of the repo:

```sh
npm install --legacy-peer-deps
```

We currently require --legacy-peer-deps for the npm install.

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

## To-Do

1. Use Remix cookie storage.
2. Move calls to weather API into a backend Express.js API proxy.
3. Add full OAuth process.

## Known Problems

1. Hard refreshing the `/HomePage` causes the CSS to break.
2. NPM install requires --legacy-peer-deps due to beta versions.
