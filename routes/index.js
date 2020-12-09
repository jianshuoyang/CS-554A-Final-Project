const userRoutes = require("./users");
const songRoutes = require("./songs");
const commentRoutes = require("./comments")

const constructorMethod = app => {
  app.use("/users", userRoutes);
  app.use("/songs", songRoutes);
  app.use("/comments", commentRoutes)

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;