// mirage/mirage-server.js
import { createServer } from "miragejs";
import posts from "./fixtures/posts";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    fixtures: {
      posts,
    },

    routes() {
      this.get("/api/posts", function (schema, request) {
        const { posts } = schema.db;
        return posts;
      });

      this.get("/api/posts/:id", function (schema, request) {
        let post = schema.db.posts.find(request.params.id);
        return post;
      });

      this.patch("/api/posts/:id", function (schema, request) {
        let id = request.params.id;
        let changes = JSON.parse(request.requestBody);

        const data = schema.db.posts.update(id, changes);
        return data;
      });

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
