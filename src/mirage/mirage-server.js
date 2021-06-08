import {
  RestSerializer,
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  trait,
} from "miragejs";
import faker from "faker";
import posts from "./fixtures/posts";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    fixtures: {
      posts,
    },

    serializers: {
      application: RestSerializer,
      postWithComments: RestSerializer.extend({
        include: ["comments"],
        embed: true,
      }),
    },

    models: {
      post: Model.extend({
        comments: hasMany(),
      }),
      comment: Model.extend({
        post: belongsTo(),
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
        withComments: trait({
          afterCreate(post, server) {
            server.createList("comment", 3, { post });
          },
        }),
      }),
    },
    seeds(server) {
      // server.loadFixtures();
      server.createList("post", 10, "withComments");
    },

    routes() {
      this.get("/api/posts", function (schema, request) {
        const { posts } = schema.db;
        return posts;
      });

      this.post("/api/posts", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.posts.insert(attrs);
      });

      this.post("/api/posts/:id/comments", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let post = schema.posts.find(request.params.id);
        post.newComment(attrs);
        post.save();
        return attrs;
      });

      this.get("/api/posts/:id", function (schema, request) {
        let post = schema.posts.find(request.params.id);
        let json = this.serialize(post, "post-with-comments");
        return json.post;
      });

      this.patch("/api/posts/:id", function (schema, request) {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);

        const data = schema.db.posts.update(id, attrs);
        return data;
      });

      this.delete("/api/posts/:id", (schema, request) => {
        const id = request.params.id;
        return schema.posts.find(id).destroy();
      });

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
