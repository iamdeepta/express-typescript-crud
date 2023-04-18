"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
//middlewares
app.use(express_1.default.json());
//routes
app.use("/api", [users_1.default]);
app.use("/", (req, res) => {
    res.send("Welcome to express-typescript-crud api");
});
app.listen(port, () => {
    console.log(`API is working on port ${port}`);
});
