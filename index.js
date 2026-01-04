import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id == postId);
  res.render("edit.ejs", { post });
});

app.post("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id == postId);
  if (!post) {
    return res.redirect("/");
  }
  post.title = req.body.newPostTitle;
  post.content = req.body.newPostContent;
  res.redirect("/");
});

app.post("/new", (req, res) => {
  posts.push({
    id: Date.now(),
    title: req.body.newPostTitle,
    content: req.body.newPostContent,
  });
  console.log(posts);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const postId = req.params.id;
  const index = posts.findIndex((p) => p.id == postId);
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
