import { Router } from "express";
import todoController from "./todo-controller";
import { parseQueryParams } from "../../middleware/pager";

const todoRouter = Router();

todoRouter.get("/", parseQueryParams, todoController.getAll);
todoRouter.get("/:id", todoController.getById);
todoRouter.post("/", todoController.create);
todoRouter.patch("/:id", todoController.update);
todoRouter.delete("/:id", todoController.remove);

export default todoRouter;
