// mirage/mirage-server.js
import { createServer, Factory } from "miragejs";
import faker from "faker";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

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
        let newPost = JSON.parse(request.requestBody);
        return schema.db.posts.insert(newPost);
      });

      this.delete("/api/posts/:id", (schema, request) => {
        const id = request.params.id;
        return schema.db.posts.remove(id);
      });

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
