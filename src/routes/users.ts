import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user";

const router: Router = express.Router();

router.post("/v1/users", createUser);
router.get("/v1/users", getUsers);
router.get("/v1/users/:id", getUser);
router.put("/v1/users/:id", updateUser);
router.delete("/v1/users/:id", deleteUser);

export default router;
