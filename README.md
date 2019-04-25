# Northcoders News API

[Project on Heroku](https://nameless-garden-54007.herokuapp.com/api)

This API will power the frontend of my NC News app. NC News will be a reddit-style app with users/topics/articles/comments.

## Getting Started

#### Set up a local copy to try out the API

Clone the project

```bash
git clone https://github.com/thatrussguy/russ-nc-news.git
```

Install dependencies

```bash
npm install
```

Set up databases

```bash
npm run setup-dbs
```

Seed database

```bash
npm run seed
```

Start the app locally

```bash
npm run start
```

The app should now running on [http://localhost:9090](http://localhost:9090)

Make a http GET request to /api for endpoint descriptions

## Using the API

The following endpoints are available

```http
GET /api

GET /api/topics
POST /api/topics

GET /api/articles
POST /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id
DELETE /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

POST /api/users
GET /api/users

GET /api/users/:username
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
- [generator-knexpress](https://github.com/AnthonyMedina/generator-knexpress)
- [Express](https://expressjs.com/)
- [Knex.js](https://knexjs.org)
- [PostgreSQL](https://www.postgresql.org/)
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [SuperTest](https://github.com/visionmedia/supertest)
