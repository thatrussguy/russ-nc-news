process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");
const request = supertest(app);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe("/topics", () => {
      it("GET status:200 returns a list of topics under key 'topics'", () => {
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
    describe("/articles", () => {
      it("GET status:200 returns a list of articles under key 'articles'", () => {
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
      describe("/:article_id", () => {
        it("GET status:200 returns an article object under key 'article", () => {
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
        it("PATCH status:200 increments votes by the amount specified by inc_votes in the body and returns the updated article", () => {
          return request
            .patch("/api/articles/1")
            .send({ inc_votes: 10 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.equal(110);
            });
        });
        describe("/comments", () => {
          it("GET status:200 returns an array of comments under key 'comments", () => {
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
          it("POST status:201 inserts a comment with username/body from the request body and returns the new comment", () => {
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
    describe("/comments", () => {
      describe("/:comment_id", () => {
        it("PATCH status:200 increments votes by the amount specified by inc_votes in the body and returns the updated comment", () => {
          return request
            .patch("/api/comments/1")
            .send({ inc_votes: 10 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(26);
            });
        });
        it("DELETE status:204 deletes the comment and returns nothing", () => {
          return request
            .delete("/api/comments/1")
            .expect(204)
            .then(({ body }) => {
              expect(body).to.deep.equal({});
            })
            .then(_ => {
              return request
                .patch("/api/comments/1")
                .send({ inc_votes: 10 })
                .expect(400)
                .then(({ body }) => {
                  expect(body.message).to.equal("No such comment");
                });
            });
        });
      });
    });
  });
});
