let express = require("express");
let app = express();
let db = require("./config/db");
let Post = require("./models/Post");
let port = 3000;

db();

app.use(express.json());

// to check the health of the api
app.get("/api/", (req, res) => {
  res.status(200).json({ message: "Api is available" });
});

// to fetch all the posts
app.get("/api/posts", (req, res) => {
  Post.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => res.status(500).json({ message: err }));
});

// to fetch specific posts
app.get("/api/posts/:id", (req, res) => {
   let id =req.params.id;
   Post.findById({_id:id})
   .then((data) => {
    res.status(200).json({ data });
  })
  .catch((err) => res.status(500).json({ message: err }));
  });

// to create posts
app.post("/api/posts/", (req, res) => {
let newPost = new Post({
    title:req.body.title,
    description:req.body.description
})
newPost.save()
  .then((data) => {
    res.status(201).json({ message:"Data Saved successfully"});
  })
  .catch((err) => res.status(500).json({ message: err }));
   });

// to update specific posts
app.put("/api/posts/:id", (req, res) => {
    let id =req.params.id;
    let newInfo ={
        title: req.body.title,
        description: req.body.description
    }
    Post.findByIdAndUpdate(id, newInfo)
    .then((data) => {
     res.status(201).json({ message:"Data Updated successfully"});
    })
   .catch((err) => res.status(500).json({ message: err }));
   });

// to update specific posts
app.delete("/api/posts/:id", (req, res) => {
    let id =req.params.id;
    Post.findByIdAndDelete(id)
    .then((data) => {
     res.status(200).json({ message:"Data deleted successfully"});
    })
    .catch((err) => res.status(500).json({ message: err }));
   });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
