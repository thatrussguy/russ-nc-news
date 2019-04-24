process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");

const app = require("../app");
const connection = require("../db/connection");
const request = supertest(app);

chai.use(chaiSorted);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    describe("GET", () => {
      it("200", () => {
        return request
          .get("/api")
          .expect(200)
          .then(({ body }) => {
            expect(body.ok).to.equal(true);
          });
      });
    });
    describe("/topics", () => {
      describe("GET", () => {
        it("200 - returns a list of topics under key 'topics'", () => {
          return request
            .get("/api/topics")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.contain.keys("topics");
              expect(body.topics).to.be.an("array");
              expect(body.topics[0]).to.contain.keys("slug", "description");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("GET", () => {
        it("200 - returns a list of articles under key 'articles'", () => {
          return request
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.contain.keys("articles");
              expect(body.articles).to.be.an("array");
              expect(body.articles[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
            });
        });
        it("200 - accepts an 'author' query", () => {
          return request
            .get("/api/articles?author=butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(3);
            });
        });
        it("200 - accepts a 'topic' query", () => {
          return request
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(11);
            });
        });
        it("200 - accepts a 'sort_by' query which defaults to 'created_at'", () => {
          return request
            .get("/api/articles?sort_by=title")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.descendingBy("title");
            });
        });
        it("200 - accepts an 'order' query which defaults to 'desc'", () => {
          return request
            .get("/api/articles?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.ascendingBy("created_at");
            });
        });
      });
      describe("/:article_id", () => {
        describe("GET", () => {
          it("200 - returns an article object under key 'article", () => {
            return request
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.contain.keys("article");
                expect(body.article).to.be.an("object");
                expect(body.article).to.contain.keys(
                  "author",
                  "title",
                  "article_id",
                  "body",
                  "topic",
                  "created_at",
                  "votes",
                  "comment_count"
                );
              });
          });
          it("404 if article_id is not in database", () => {
            return request
              .get("/api/articles/1000")
              .expect(404)
              .then(({ body }) => {
                expect(body.message).to.equal("No such article: 1000");
              });
          });
          it("400 if article_id is not a number", () => {
            return request
              .get("/api/articles/abcd")
              .expect(400)
              .then(({ body }) => {
                expect(body.message).to.equal(
                  'error: invalid input syntax for integer: "abcd"'
                );
              });
          });
          it("400 if article_id is out of range", () => {
            return request
              .get("/api/articles/2147483648")
              .expect(400)
              .then(({ body }) => {
                expect(body.message).to.equal(
                  'error: value "2147483648" is out of range for type integer'
                );
              });
          });
        });
        describe("PATCH", () => {
          it("200 - increments votes by the amount specified by inc_votes in the body and returns the updated article", () => {
            return request
              .patch("/api/articles/1")
              .send({ inc_votes: 10 })
              .expect(200)
              .then(({ body }) => {
                expect(body.article.votes).to.equal(110);
              });
          });
        });
        describe("/comments", () => {
          describe("GET", () => {
            it("200 - returns an array of comments under key 'comments'", () => {
              return request
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body }) => {
                  expect(body).to.contain.keys("comments");
                  expect(body.comments).to.be.an("array");
                  expect(body.comments[0]).to.contain.keys(
                    "comment_id",
                    "votes",
                    "created_at",
                    "author",
                    "body"
                  );
                  expect(body.comments.length).to.equal(13);
                });
            });
            it("200 - accepts a 'sort_by' query which defaults to 'created_at'", () => {
              return request
                .get("/api/articles/1/comments?sort_by=comment_id")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments).to.be.descendingBy("comment_id");
                });
            });
            it("200 - accepts an 'order' query which defaults to 'desc'", () => {
              return request
                .get("/api/articles/1/comments?order=asc")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments).to.be.ascendingBy("created_at");
                });
            });
          });
          describe("POST", () => {
            it("201 - inserts a comment with username/body from the request body and returns the new comment", () => {
              return request
                .post("/api/articles/1/comments")
                .send({ username: "lurker", body: "lurker's comment" })
                .expect(201)
                .then(({ body }) => {
                  expect(body).to.contain.keys("comment");
                  expect(body.comment).to.be.an("object");
                  expect(body.comment).to.contain.keys(
                    "comment_id",
                    "votes",
                    "created_at",
                    "author",
                    "body",
                    "article_id"
                  );
                  expect(body.comment.article_id).to.equal(1);
                  expect(body.comment.author).to.equal("lurker");
                  expect(body.comment.body).to.equal("lurker's comment");
                  expect(body.comment.comment_id).to.equal(19);
                  expect(body.comment.votes).to.equal(0);
                });
            });
          });
        });
      });
    });
    describe("/comments", () => {
      describe("/:comment_id", () => {
        describe("PATCH", () => {
          it("200 - increments votes by the amount specified by inc_votes in the body and returns the updated comment", () => {
            return request
              .patch("/api/comments/1")
              .send({ inc_votes: 10 })
              .expect(200)
              .then(({ body }) => {
                expect(body.comment.votes).to.equal(26);
              });
          });
          it("404 - if comment_id is not in database", () => {
            return request
              .patch("/api/comments/1000")
              .send({ inc_votes: 10 })
              .expect(404)
              .then(({ body }) => {
                expect(body.message).to.equal("No such comment: 1000");
              });
          });
        });
        describe("DELETE", () => {
          it("204 - deletes the comment and returns nothing", () => {
            return request
              .delete("/api/comments/1")
              .expect(204)
              .then(({ body }) => {
                expect(body).to.deep.equal({});
              });
          });
        });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        describe("GET", () => {
          it("200 - returns a user object under key 'user'", () => {
            return request
              .get("/api/users/lurker")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.contain.keys("user");
                expect(body.user).to.be.an("object");
                expect(body.user).to.contain.keys(
                  "username",
                  "avatar_url",
                  "name"
                );
                expect(body.user.username).to.equal("lurker");
              });
          });
        });
      });
    });
  });
});
