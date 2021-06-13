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

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
