import { NavBar } from "./shared/NavBar";
import { Switch, Route } from "react-router-dom";
import { Posts } from "./pages/Posts";
import { CreatePost } from "./pages/CreatePost";
import { UpdatePost } from "./pages/UpdatePost";
import { PostDetailView } from "./pages/PostDetailView";

import { makeServer } from "./mirage/mirage-server";

global.mirageServer = makeServer({ environment: "development" });

function App() {
  return (
    <div style={{ margin: 0 }}>
      <NavBar />
      <Switch>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route path="/post/:id/update">
          <UpdatePost />
        </Route>
        <Route path="/post/:id">
          <PostDetailView />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
