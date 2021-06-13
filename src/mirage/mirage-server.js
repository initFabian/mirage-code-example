// mirage/mirage-server.js
import {
  createServer,
  Model,
  Factory,
  hasMany,
  belongsTo,
  RestSerializer,
} from "miragejs";
import faker from "faker";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    models: {
      post: Model.extend({
        comments: hasMany(),
      }),
      comment: Model.extend({
        post: belongsTo(),
      }),
    },

    serializers: {
      post: RestSerializer.extend({
        include: ["comments"],
        embed: true,
      }),
    },

    factories: {
      comment: Factory.extend({
        text() {
          return faker.lorem.sentences(1);
        },
        createdAt() {
          return faker.date.recent();
        },
      }),
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
        afterCreate(post, server) {
          server.createList("comment", 3, { postId: post.id });
        },
      }),
    },

    seeds(server) {
      server.createList("post", 2);
    },

    routes() {
      this.get("/api/posts", function (schema, request) {
        return schema.posts.all();
      });

      this.get("/api/posts/:id", function (schema, request) {
        let post = schema.posts.find(request.params.id);
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
