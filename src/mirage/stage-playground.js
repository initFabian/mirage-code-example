import { createServer, Factory } from "miragejs";
import posts from "./fixtures/posts";
import faker from "faker";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    fixtures: {
      posts,
    },

    factories: {
      post: Factory.extend({
        title() {
          return faker.lorem.words(4);
        },
        content() {
          return faker.lorem.paragraph(1);
        },
        createdAt() {
          return faker.date.recent();
        },
        type() {
          return faker.random.arrayElement(["text", "video"]);
        },
      }),
    },

    seeds(server) {
      server.createList("post", 2);
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

      this.post("/api/posts", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.posts.insert(attrs);
      });

      this.delete("/api/posts/:id", (schema, request) => {
        const id = request.params.id;
        return schema.db.posts.remove(id);
      });
      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
