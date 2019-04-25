exports.apiDescription = {
  "GET /api": {
    description:
      "serves up a json representation of all the available endpoints of the api"
  },
  "GET /api/topics": {
    description: "serves an array of all topics",
    queries: [],
    exampleResponse: {
      topics: [
        {
          slug: "football",
          description: "FOOTIE!"
        }
      ]
    }
  },
  "POST /api/topics": {
    description: "inserts a new topic and serves the new topic",
    queries: [],
    "req.body": {
      slug: "string",
      description: "string"
    },
    exampleResponse: {
      topic: {
        slug: "new topic",
        description: "new topic description"
      }
    }
  },
  "GET /api/articles": {
    description: "serves an array of all articles",
    queries: ["author", "topic", "sort_by", "order", "limit", "p"],
    exampleResponse: {
      articles: [
        {
          article_id: 33,
          author: "weegembump",
          created_at: "2018-05-30T15:59:13.341Z",
          title: "Seafood substitutions are increasing",
          topic: "cooking",
          votes: 0,
          comment_count: "6"
        }
      ],
      total_count: 1
    }
  },
  "POST /api/articles": {
    description: "inserts a new article and serves the new article",
    queries: [],
    "req.body": {
      title: "string",
      body: "string",
      topic: "string",
      author: "string"
    },
    exampleResponse: {
      article: {
        article_id: 37,
        author: "weegembump",
        created_at: "2018-05-30T15:59:13.341Z",
        title: "New cooking article",
        topic: "cooking",
        votes: 0,
        comment_count: "0"
      }
    }
  },
  "GET /api/articles/:article_id": {
    description: "serves an article object",
    queries: [],
    exampleResponse: {
      article: {
        article_id: 1,
        title: "Running a Node App",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        votes: 0,
        topic: "coding",
        author: "jessjelly",
        created_at: "2016-08-18T12:07:52.389Z",
        comment_count: "8"
      }
    }
  },
  "PATCH /api/articles/:article_id": {
    description:
      "increments article votes by inc_votes and serves updated article",
    queries: [],
    "req.body": { inc_votes: "integer" },
    exampleResponse: {
      article: {
        article_id: 1,
        title: "Running a Node App",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        votes: 1,
        topic: "coding",
        author: "jessjelly",
        created_at: "2016-08-18T12:07:52.389Z",
        comment_count: "8"
      }
    }
  },
  "DELETE /api/articles/:article_id": {
    description: "deletes article and serves no response",
    queries: [],
    exampleResponse: {}
  },
  "GET /api/articles/:article_id/comments": {
    description: "serves an array of comments for article",
    queries: ["sort_by", "order", "limit", "p"],
    exampleResponse: {
      comments: [
        {
          comment_id: 44,
          author: "grumpy19",
          body:
            "Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non.",
          created_at: "2017-11-20T08:58:48.322Z",
          votes: 4
        }
      ]
    }
  },
  "POST /api/articles/:article_id/comments": {
    description: "inserts a new comment for article and serves the new comment",
    queries: [],
    "req.body": { username: "string", body: "string" },
    exampleResponse: {
      comment: {
        comment_id: 301,
        body: "example",
        votes: 0,
        article_id: 1,
        author: "grumpy19",
        created_at: "2019-04-24T14:56:07.710Z"
      }
    }
  },
  "PATCH /api/comments/:comment_id": {
    description:
      "increments comment votes by inc_votes and serves updated comment",
    queries: [],
    "req.body": { inc_votes: "integer" },
    exampleResponse: {
      comment: {
        comment_id: 301,
        body: "example",
        votes: 1,
        article_id: 1,
        author: "grumpy19",
        created_at: "2019-04-24T14:56:07.710Z"
      }
    }
  },
  "DELETE /api/comments/:comment_id": {
    description: "deletes comment and serves no response",
    queries: [],
    exampleResponse: {}
  },
  "POST /api/users": {
    description: "inserts a new user and serves the new user",
    queries: [],
    "req.body": {
      username: "string",
      avatar_url: "string",
      name: "string"
    },
    exampleResponse: {
      user: {
        username: "new username",
        avatar_url: "new avatar URL",
        name: "new name"
      }
    }
  },
  "GET /api/users": {
    description: "serves an array of all users",
    queries: [],
    exampleResponse: {
      users: [
        {
          username: "weegembump",
          avatar_url:
            "https://www.upandrunning.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/r/mr-bump.jpg",
          name: "Gemma Bump"
        }
      ]
    }
  },
  "GET /api/users/:username": {
    description: "serves a user object",
    queries: [],
    exampleResponse: {
      user: {
        username: "weegembump",
        avatar_url:
          "https://www.upandrunning.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/r/mr-bump.jpg",
        name: "Gemma Bump"
      }
    }
  }
};
