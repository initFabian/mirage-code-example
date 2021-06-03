import { NavBar } from "./shared/NavBar";
import { Switch, Route } from "react-router-dom";
import { PostsList } from "./PostsList";
import { CreatePost } from "./CreatePost";
import { UpdatePost } from "./UpdatePost";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route path="/update-post/:id">
          <UpdatePost />
        </Route>
        <Route path="/">
          <PostsList />
        </Route>
      </Switch>
    </>
  );
}

export default App;
