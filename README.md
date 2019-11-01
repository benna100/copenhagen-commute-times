## Installation

Install npm dependencies

```sh
 npm install 
```

## Running the project
The project is written in ES6 and is transpiled with Babel using Webpack. To start the development server

```sh
npm start
```

To build for production

```sh
npm run build
```


## Deploying to github pages
`npm run deploy`
from git bash admin rights

## Tests
The most critical functions have unit tests, located in the `/src/sketch.test.js` folder. To run the test suite with JEST run the command `npm run test`.

Current status: [![Build Status](https://travis-ci.com/zkwsk/game-of-life.svg?branch=master)](https://travis-ci.com/zkwsk/game-of-life)

## Easter Eggs
As a little added bonus, if you load the game on a modern smartphone (iOS 4.2.1+, Android 4.0.3+) you can shake the phone to reset the application. After a while the cellular automation tends to reach a stable state so this is a way to disrupt it. Alternatively you can resize the screen or reload the page. To detect motion [shake.js](https://github.com/alexgibson/shake.js/) was used.






# Template Really Fuckong good

## Table of Contents
+ [About](#about)
+ [Getting Started](#getting_started)
+ [Usage](#usage)
+ [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>
This template is for creating a vanilla js website with everything included like

- Favicon automatic generation
- Social media text and image
- Sass
- Deploy to github pages
- Babel, minification, webpack loaders. You got it!

## Getting Started <a name = "getting_started"></a>
1. Clone this repo 
2. Change the favicon under `src/assets/social.png`
3. Change the title of the html page
4. Change the meta descriptions in `package.json`
5. Change the social media text in `webpack.prod.js`
6. Change the social media images in `src/assets/social.png`


### Installing

`npm install`

## Usage <a name = "usage"></a>

For development:

`npm run start`

Access on `http://localhost:8080/`

For build:

`npm run build`

For deploy to github pages:

`npm run deploy`


