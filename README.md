# Northcoders News API

[Project on Heroku](https://russ-nc-news-api.herokuapp.com/api)

This API will power the frontend of my NC News app. NC News will be a reddit-style app with users/topics/articles/comments.

## Getting Started

### Set up a local copy to try out the API

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
```

### Responds with

- JSON describing all available endpoints

---

```http
GET /api/topics
```

### Responds with

- an array of topic objects, each of which has the following properties:
  - `slug`
  - `description`

---

```http
POST /api/topics
```

### Request body accepts

- an object with the following properties:
  - `slug`
  - `description`

### Responds with

- the posted topic

---

```http
GET /api/articles
```

### Responds with

- an `articles` array of article objects, each of which has the following properties:
  - `author`
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count`
- a `total_count` property which is the total matched articles ignoring limit

### Accepts queries

- `author`, which filters the articles by the username value specified in the query
- `topic`, which filters the articles by the topic value specified in the query
- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `limit`, which limits the number of articles returned
- `p`, which specifies what page of results to return

---

```http
POST /api/articles
```

### Request body accepts

- an object with the following properties:
  - `title`
  - `body`
  - `topic`
  - `author`

### Responds with

- the posted article

---

```http
GET /api/articles/:article_id
```

### Responds with

- an article object, which should has the following properties:
  - `author`
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count`

---

```http
PATCH /api/articles/:article_id
```

### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` indicates how much the `votes` property in the database will be updated by

  e.g.

  `{ inc_votes : 1 }` increments the current article's vote property by 1

  `{ inc_votes : -100 }` decrements the current article's vote property by 100

### Responds with

- the updated article

---

```http
DELETE /api/articles/:article_id
```

### Result

- delete article `article_id`

### Responds with

- status 204 and no content

---

```http
GET /api/articles/:article_id/comments
```

### Responds with

- an array of comments for the given `article_id` of which each comment has the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author`
  - `body`

### Accepts queries

- `sort_by`, which sorts the articles by any valid column (defaults to created_at)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `limit`, which limits the number of articles returned
- `p`, which specifies what page of results to return

---

```http
POST /api/articles/:article_id/comments
```

Request body accepts

- an object with the following properties:
  - `username`
  - `body`

### Responds with

- the posted comment

---

```http
PATCH /api/comments/:comment_id
```

### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database will be updated by

  e.g.

  `{ inc_votes : 1 }` increments the current comment's vote property by 1

  `{ inc_votes : -1 }` decrements the current comment's vote property by 1

### Responds with

- the updated comment

---

```http
DELETE /api/comments/:comment_id
```

### Result

- delete comment `comment_id`

### Responds with

- status 204 and no content

---

```http
POST /api/users
```

### Request body accepts

- an object with the following properties:
  - `username`
  - `avatar_url`
  - `name`

### Responds with

- the posted user

---

```http
GET /api/users
```

### Responds with

- a `users` array of user objects, each of which has the following properties:
  - `username`
  - `avatar_url`
  - `name`

```http
GET /api/users/:username
```

### Responds with

- a user object which has the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

## Prerequisites

- [Node.JS](https://nodejs.org)
- [Heroku account](https://signup.heroku.com/signup/dc)
- [Heroku CLI](https://cli.heroku.com/)

## Built With

- [Node.JS](https://nodejs.org)
- [generator-knexpress](https://github.com/AnthonyMedina/generator-knexpress)
- [Express](https://expressjs.com/)
- [Knex.js](https://knexjs.org)
- [PostgreSQL](https://www.postgresql.org/)
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [SuperTest](https://github.com/visionmedia/supertest)
