const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndex);

indexRouter.get("/login", indexController.getLogin);
indexRouter.post("/login", indexController.postLogin);

indexRouter.get("/signup", indexController.getSignUp);
indexRouter.post("/signup", indexController.postSignUp);

indexRouter.get("/logout", indexController.getLogout);

indexRouter.get("/create", indexController.getCreate);
indexRouter.post("/create", indexController.postCreate);

indexRouter.post("/:id/delete", indexController.postDelete);

module.exports = indexRouter;