import { createServer, Model } from "miragejs";
import posts from "./fixtures/posts";
import _ from "lodash";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    fixtures: {
      posts,
    },
    models: {
      post: Model,
    },

    seeds(server) {
      server.loadFixtures();
    },

    routes() {
      this.get("/api/posts", function (schema, request) {
        const { pageOffset, pageSize } = request.queryParams;

        const posts = _.map(schema.db.posts, ({ id, title }) => ({
          id,
          title,
        }));

        if (Number(pageSize)) {
          const start = Number(pageSize) * Number(pageOffset);
          const end = start + Number(pageSize);
          const page = posts.slice(start, end);

          return {
            items: page,
            nextPageOffset:
              posts.length > end ? Number(pageOffset) + 1 : undefined,
          };
        }

        return posts;
      });

      this.post("/api/posts", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.db.posts.insert(attrs);
      });

      this.get("/api/posts/:id", function (schema, request) {
        const id = request.params.id;
        return this.serialize(schema.posts.find(id)).post;
      });

      this.patch("/api/posts/:id", function (schema, request) {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);

        const data = schema.posts.find(id).update(attrs);
        data.save();
        return this.serialize(data).post;
      });

      this.delete("/api/posts/:id", (schema, request) => {
        const id = request.params.id;
        return schema.posts.find(id).destroy();
      });

      this.passthrough();
    },
  });
}
