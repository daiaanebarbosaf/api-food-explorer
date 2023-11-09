const { Router } = require("express");

const AdminController = require("../controllers/AdminController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.use(ensureAuthenticated);
adminRoutes.use(verifyUserAuthorization(["admin"]));
adminRoutes.get("/", adminController.index);

module.exports = adminRoutes;