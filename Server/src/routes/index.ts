import { Router } from "express";
import todoRouter from "./todo/todo-router";

const router = Router();

// router.use('/auth', authRouter)
router.use("/todos", todoRouter);

export default router;
