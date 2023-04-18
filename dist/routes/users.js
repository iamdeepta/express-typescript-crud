"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post("/v1/users", user_1.createUser);
router.get("/v1/users", user_1.getUsers);
router.get("/v1/users/:id", user_1.getUser);
router.put("/v1/users/:id", user_1.updateUser);
router.delete("/v1/users/:id", user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map