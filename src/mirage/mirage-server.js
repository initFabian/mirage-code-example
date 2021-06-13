// mirage/mirage-server.js
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
