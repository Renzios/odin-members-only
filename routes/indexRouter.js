const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.isAuthenticated, indexController.getIndex);

indexRouter.get("/signup", indexController.isUnauthenticated, indexController.getSignUp);
indexRouter.post("/signup", indexController.postSignUp);

indexRouter.get("/login", indexController.isUnauthenticated, indexController.getLogin);
indexRouter.post("/login", indexController.postLogin);

indexRouter.get("/logout", indexController.isAuthenticated, indexController.getLogout);

indexRouter.get("/create", indexController.isAuthenticated, indexController.getCreate);
indexRouter.post("/create", indexController.postCreate);

indexRouter.post("/:id/delete", indexController.postDelete);

module.exports = indexRouter;