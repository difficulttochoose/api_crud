const express = require("express");
const { UserController } = require("./controllers");
const { validateUser } = require("./middleware");
// create express app
const app = express();

app.use(express.json()); // parse Content-Type: application/json on all HTTP METHODS and all URI

// routing

app.post("/user", validateUser.validateUserOnCreate, UserController.createUser); // create
app.get("/users/:userId", UserController.getUser); //read
app.get("/users", UserController.getAllUsers); // read all
app.patch(
  "/users/:userId",
  validateUser.validateUserOnUpdate,
  UserController.updateUser
); //update
app.delete("/users/:userId", UserController.removeUser); //delete

module.exports = app;
