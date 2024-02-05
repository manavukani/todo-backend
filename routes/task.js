import express from "express";
import {
  newTask,
  allTask,
  updateTask,
  deleteTask,
} from "./../controllers/task.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/new", isAuth, newTask);
router.get("/my", isAuth, allTask);

router.route("/:id").put(isAuth, updateTask).delete(isAuth, deleteTask);

export default router;
