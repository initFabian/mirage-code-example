### Demo introduction

1.  Show screenshots/video of what we're trying to build
2.  I wanted to avoid using Redux or implementing logic around server state, so im using React query v3
    - If youre not familiar with React query, dont worry, I linked a tutorial in the references slide at the end
    - "In short, react query is an awesome library to help clean up your server state" (find a better way to describe react-query)

---

### Stage 0 (empty data - no posts/comments)

Explain the codebase that we dont have any posts or comments. So lets add mirageJS to our codebase.

```sh
npm install miragejs
```

```js
// index.js
import { makeServer } from "./mirage/mirage-server";

global.mirageServer = makeServer({ environment: "development" });

// ------

// mirage-server.js
import { createServer } from "miragejs";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    routes() {
      // routes here...

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
```

---

### Stage 1 - populate the application with (JSON) mock posts

**Solution: Create a mirage server with 1 route and it responding with JSON directly**

```js
export function makeServer({ environment = "test" }) {
  return createServer({

    environment,

    routes() {
      this.get("/api/posts", function (schema, request) {
        return [...];
      });

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
```

---

### Stage 2 - populate the application using Fixtures

Fixture give you a way to initially seed some data for your mock data. The way you accesses this data is by using mirage's database which is a simple in-memory database that gets reset when you refresh your browser.

```js
import posts from "./fixtures/posts"; // <- Here

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    fixtures: {
      posts, // <- Here
    },

    routes() {
      this.get("/api/posts", function (schema, request) {
        const { posts } = schema.db; // <- Here
        return posts;
      });

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
```

---

### Stage 3 - Getting an individual post

But what happens if the user wants to load an individual post? We need to add an endpoint for `/api/posts/:id`.

```js
export function makeServer({ environment = "test" }) {
  return createServer({
    // ...

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

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
```

---

### Stage 4 - Updating individual post

Now how do we handle when a user wants to update a Post?

```js
export function makeServer({ environment = "test" }) {
  return createServer({
    // ...

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
```

---

### Stage 5 - Creating a post

```js
export function makeServer({ environment = "test" }) {
  return createServer({
    // ...

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

      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
```

---

### Stage 6 - Deleting a post

```js
export function makeServer({ environment = "test" }) {
  return createServer({
    // ...

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
```

---

### Stage 7 - Factories

- Talk about traits

```js
export function makeServer({ environment = "test" }) {
  return createServer({
    // ...

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

        video: trait({
          type: 'video'
        })

        text: trait({
          type: 'video'
        })
      }),
    },

    seeds(server) {
      server.createList("post", 2);
    },

    routes() {
      // ...
    },
  });
}
```

---

### Stage 8 - Relationships

- Introduce the comments model
- `afterCreate`
- have response have `commentIds`
- Talk about the conventions that mirage uses
- create endpoints for comments

```js
// create the models for post and comment
```

---

### Stage 9 - Serializers

- include comments model within the post JSON

---

### Next steps:

1. showing more documentation like the many ways to [update a model](https://miragejs.com/api/classes/db-collection/#update)
