# Northcoders News API

[Project on Heroku](https://nameless-garden-54007.herokuapp.com/api)

A restful API to be used in the Northcoders News Sprint during the Front End block of the course.

## Getting Started

Clone the project

```bash
git clone https://github.com/thatrussguy/russ-nc-news.git
```

Install dependencies

```bash
npm install
```

Start the app locally

```bash
npm run start
```

The app should now running on [http://localhost:9090](http://localhost:9090)

Make a http GET request to /api for endpoint descriptions

## Deploying to Heroku

Start the app locally

```bash
heroku local web
```

The app should now running on [http://localhost:5000](http://localhost:5000)

Log in to Heroku

```bash
heroku login
```

Create Heroku project

```bash
heroku create
```

Deploy new Heroku project

```bash
git push heroku master
```

Launch in browser

```bash
heroku open
```

## Prerequisites

- [Node.JS](https://nodejs.org)
- [Heroku account](https://signup.heroku.com/signup/dc)
- [Heroku CLI](https://cli.heroku.com/)

## Running the tests

Run tests

```bash
npm test
```

## Built With

- [Node.JS](https://nodejs.org)
- [Express](https://expressjs.com/)
- [Knex.js](https://knexjs.org)
- [PostgreSQL](https://www.postgresql.org/)
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [SuperTest](https://github.com/visionmedia/supertest)
