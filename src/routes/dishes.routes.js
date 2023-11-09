const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishesImageController = require("../controllers/DishesImageController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishesImageController = new DishesImageController();


dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", verifyUserAuthorization("customer"), dishesController.create);
dishesRoutes.put("/:id", verifyUserAuthorization("customer"),dishesController.update);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", verifyUserAuthorization("customer"), dishesController.delete);
dishesRoutes.patch("/", verifyUserAuthorization("customer"),ensureAuthenticated, upload.single("imgdish"), dishesImageController.update)

module.exports = dishesRoutes;