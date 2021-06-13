// mirage/mirage-server.js
import { createServer } from "miragejs";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    routes() {
      // routes here...

      this.get("/api/posts", function (schema, request) {
        return [
          {
            id: "1",
            title: "Post title 1",
            content: "Maecenas ut molestie ante. Ut a nisi nec dolor lacinia fringilla vel eget nibh. Pellentesque rutrum sem vel nulla sodales, sit amet pellentesque est faucibus. Nam sed congue sapien. Sed quis leo eget elit sagittis tempus. Vivamus pretium magna nisi, maximus molestie elit semper eget. Vivamus ac fermentum purus. Quisque sit amet eros augue. Nam vitae diam nec ante sodales pharetra. Pellentesque fringilla ultrices lectus, vel facilisis magna consectetur vitae. Vestibulum vehicula feugiat dolor, at congue felis blandit in. Integer quis accumsan libero. Praesent vitae mauris metus. Sed nec metus interdum, vulputate ex id, dictum sapien. Mauris ultrices fermentum dui quis aliquet.",
          },
          {
            id: "2",
            title: "Post title 2",
            content: "Nam eget leo eget turpis mattis dignissim eget elementum ipsum. Nulla facilisi. Curabitur blandit condimentum nisi sed semper. Praesent eget dignissim tortor, non luctus diam. Pellentesque eu tempus orci. Aliquam erat volutpat. Donec ac egestas ipsum. Sed aliquam molestie eleifend. Suspendisse porttitor mauris eget odio porta, id cursus purus vestibulum. Donec dapibus volutpat ex et congue. Fusce semper justo id pellentesque dictum. Morbi vehicula nisi ac tellus cursus posuere. Pellentesque facilisis mauris neque. Nullam vitae vestibulum ipsum. Nunc volutpat nunc vitae risus bibendum interdum. Vestibulum sit amet libero tincidunt, sagittis velit at, lacinia elit.",
          },
        ];
      });
      this.passthrough((request) => !request.url.includes("/api/posts"));
    },
  });
}
