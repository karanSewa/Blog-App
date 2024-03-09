import express from "express";
import ejs from "ejs";
const app = express();
const port = 3000;
let blogPosts = [];
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/new", (req, res) => {
  res.render("partials/new.ejs");
});
app.get("/posts", (req, res) => {
  res.render("partials/posts.ejs", { posts: blogPosts });
});
app.post("/posts", (req, res) => {
  let postTitle = req.body["blogHeading"];
  let postContent = req.body["blogText"];
  blogPosts.push({ title: postTitle, content: postContent });
  res.redirect("/new");
});
app.post("/delete/:id", (req, res) => {
  let postId = req.params.id;
  blogPosts.splice(postId, 1);
  res.redirect("/posts");
});
app.get("/edit/:id", (req, res) => {
  let postId = req.params.id;
  res.render("partials/edit.ejs", { post: blogPosts[postId], id: postId });
});
app.post("/edit/:id", (req, res) => {
  let postId = req.params.id;
  let postTitle = req.body["blogHeading"];
  let postContent = req.body["blogText"];
  blogPosts[postId] = { title: postTitle, content: postContent };
  res.redirect("/posts");
});
app.get("/view/:id", (req, res) => {
  let postId = req.params.id;
  res.render("partials/view.ejs", { post: blogPosts[postId], id: postId });
});
app.post("view/:id", (req, res) =>{
  let postId = req.params.id;
  let postTitle = req.body["blogHeading"];
  let postContent = req.body["blogText"];
  blogPosts[postId] = { title: postTitle, content: postContent };
  res.redirect("/posts");
});
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
